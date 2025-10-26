import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import {
    ActionForm,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    CircularProgress,
    Divider,
    FormControl,
    Grid,
    Icon,
    InputLabel,
    MenuItem,
    RismunLogo,
    Select,
    SelectChangeEvent,
    Typography,
    axiosInstance,
    getURLWithVersion,
    toast,
    addDays,
    format,
    isValid,
    parseISO,
    startOfDay,
    DateCalendar,
    useDateUtils,
} from '@mf-core/core-ui';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import {
    IBooking,
    IFacility,
    IPlace,
    IPlaceWorkingHour,
    ISport,
    useAllFacilities,
    useAllSports,
    useBooking,
} from '@mf-core/sportbooking-core';

interface IPageNewComponent {
    id: number;
    isNew: boolean;
    handleBack?: () => void;
    handleBackAndReload?: () => void;
    showInsideViewByRowId?: (rowId: number) => void;
}

type DayStatus = 'available' | 'reserved' | 'blocked' | 'closed';

type SlotStatus = Exclude<DayStatus, 'closed'>;

interface IAvailabilitySlot {
    start: string;
    end: string;
    status: SlotStatus;
}

interface IAvailabilityDay {
    date: string;
    slots: IAvailabilitySlot[];
}

interface IFacilityPlaceOption {
    facility: IFacility;
    place: IPlace;
}

const AVAILABILITY_RANGE_DAYS = 30;

const dayStatusStyles: Record<DayStatus, Record<string, string | number>> = {
    available: {
        backgroundColor: 'rgba(46, 125, 50, 0.2)',
        color: '#1b5e20',
        borderRadius: '50%',
    },
    reserved: {
        backgroundColor: 'rgba(211, 47, 47, 0.18)',
        color: '#b71c1c',
        borderRadius: '50%',
    },
    blocked: {
        backgroundColor: 'rgba(251, 140, 0, 0.25)',
        color: '#e65100',
        borderRadius: '50%',
    },
    closed: {
        backgroundColor: 'rgba(117, 117, 117, 0.18)',
        color: '#424242',
        borderRadius: '50%',
        opacity: 0.6,
    },
};

const makeOptionKey = (facilityId: number, placeId: number): string => `${facilityId}:${placeId}`;

const normalizeDateKey = (value: string | Date | null | undefined): string | undefined => {
    if (!value) {
        return undefined;
    }
    const date = typeof value === 'string' ? parseISO(value) : value;
    if (!date || !isValid(date)) {
        return undefined;
    }
    return format(date, 'yyyy-MM-dd');
};

const normalizeWeekday = (weekday: number | null | undefined): number | undefined => {
    if (weekday === null || weekday === undefined) {
        return undefined;
    }
    if (weekday >= 0 && weekday <= 6) {
        return weekday;
    }
    if (weekday === 7) {
        return 0;
    }
    return weekday % 7;
};

export const NewComponent: FC<IPageNewComponent> = ({ isNew, handleBack, handleBackAndReload }) => {
    const { calendar } = useDateUtils();
    const booking = useBooking(undefined);
    const sports = useAllSports();
    const facilities = useAllFacilities();

    const [selectedSportId, setSelectedSportId] = useState<number | null>(null);
    const [placeOptions, setPlaceOptions] = useState<IFacilityPlaceOption[]>([]);
    const [placeLoading, setPlaceLoading] = useState<boolean>(false);
    const [selectedPlaceKey, setSelectedPlaceKey] = useState<string>('');

    const [workingHours, setWorkingHours] = useState<IPlaceWorkingHour[]>([]);
    const [availabilityLoading, setAvailabilityLoading] = useState<boolean>(false);
    const [slotsByDate, setSlotsByDate] = useState<Record<string, IAvailabilitySlot[]>>({});
    const [calendarStatuses, setCalendarStatuses] = useState<Record<string, DayStatus>>({});

    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedSlot, setSelectedSlot] = useState<IAvailabilitySlot | null>(null);
    const [submitting, setSubmitting] = useState<boolean>(false);

    const selectedPlace = useMemo(() => {
        if (!selectedPlaceKey) {
            return undefined;
        }
        return placeOptions.find((option) => makeOptionKey(option.facility.id, option.place.id) === selectedPlaceKey);
    }, [placeOptions, selectedPlaceKey]);

    const canSubmit = Boolean(selectedSportId && selectedPlace && selectedSlot);

    const timeLocale = calendar === 'jalali' ? 'fa-IR' : 'en-US';

    const formatSlotLabel = useCallback(({ start, end }: IAvailabilitySlot): string => {
        const startDate = parseISO(start);
        const endDate = parseISO(end);
        if (!isValid(startDate) || !isValid(endDate)) {
            return '-';
        }
        const startTime = startDate.toLocaleTimeString(timeLocale, { hour: '2-digit', minute: '2-digit' });
        const endTime = endDate.toLocaleTimeString(timeLocale, { hour: '2-digit', minute: '2-digit' });
        return `${startTime} تا ${endTime}`;
    }, [timeLocale]);

    useEffect(() => {
        if (!selectedSportId) {
            setPlaceOptions([]);
            setSelectedPlaceKey('');
            return;
        }

        const facilityList = facilities.items?.data ?? [];
        if (!facilityList.length) {
            setPlaceOptions([]);
            return;
        }

        let active = true;
        const fetchPlaces = async () => {
            setPlaceLoading(true);  
            try {
                const requests = facilityList.map(async (facility) => {
                    try {
                        const url = getURLWithVersion(`facility/${facility.id}/places`);
                        const { data } = await axiosInstance.get<IPlace[]>(url);
                        return data
                            .filter((place) => place.sportId === selectedSportId)
                            .map((place) => ({ facility, place }));
                    } catch (error) {
                        console.error(error);
                        return [] as IFacilityPlaceOption[];
                    }
                });

                const results = await Promise.all(requests);
                if (!active) {
                    return;
                }
                const flattened = results.flat();
                setPlaceOptions(flattened);
                if (flattened.length === 0) {
                    toast.info({ message: 'محل فعالی برای این ورزش یافت نشد.' });
                }
            } finally {
                if (active) {
                    setPlaceLoading(false);
                }
            }
        };

        void fetchPlaces();
        return () => {
            active = false;
        };
    }, [facilities.items?.data, selectedSportId]);

    useEffect(() => {
        if (!selectedPlace) {
            setWorkingHours([]);
            return;
        }

        let active = true;
        const fetchHours = async () => {
            try {
                const url = getURLWithVersion(`facility/${selectedPlace.facility.id}/places/${selectedPlace.place.id}/hours`);
                const { data } = await axiosInstance.get<IPlaceWorkingHour[]>(url);
                if (!active) {
                    return;
                }
                setWorkingHours(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error(error);
                if (active) {
                    setWorkingHours([]);
                }
            }
        };

        void fetchHours();
        return () => {
            active = false;
        };
    }, [selectedPlace]);

    useEffect(() => {
        if (!selectedPlace) {
            setSlotsByDate({});
            setCalendarStatuses({});
            return;
        }

        let active = true;
        const fetchAvailability = async () => {
            setAvailabilityLoading(true);
            const rangeStart = startOfDay(new Date());
            const rangeEnd = addDays(rangeStart, AVAILABILITY_RANGE_DAYS);
            try {
                const url = getURLWithVersion(`booking/availability?placeId=${selectedPlace.place.id}&from=${rangeStart.toISOString()}&to=${rangeEnd.toISOString()}`);
                const { data } = await axiosInstance.get<IAvailabilityDay[] | { data: IAvailabilityDay[] }>(url);
                if (!active) {
                    return;
                }
                const days = Array.isArray(data) ? data : data?.data;
                if (Array.isArray(days)) {
                    const map: Record<string, IAvailabilitySlot[]> = {};
                    days.forEach((day) => {
                        const key = normalizeDateKey(day?.date);
                        if (!key) {
                            return;
                        }
                        map[key] = Array.isArray(day?.slots) ? day.slots : [];
                    });
                    setSlotsByDate(map);
                } else {
                    setSlotsByDate({});
                }
            } catch (error) {
                console.error(error);
                if (active) {
                    toast.error('امکان دریافت وضعیت تقویم وجود ندارد.');
                    setSlotsByDate({});
                }
            } finally {
                if (active) {
                    setAvailabilityLoading(false);
                }
            }
        };

        void fetchAvailability();
        return () => {
            active = false;
        };
    }, [selectedPlace]);

    useEffect(() => {
        if (!selectedPlace) {
            setCalendarStatuses({});
            return;
        }

        const start = startOfDay(new Date());
        const statuses: Record<string, DayStatus> = {};

        for (let offset = 0; offset <= AVAILABILITY_RANGE_DAYS; offset += 1) {
            const date = addDays(start, offset);
            const key = format(date, 'yyyy-MM-dd');
            const slots = slotsByDate[key];
            const weekday = date.getDay();
            const dayWorkingHours = workingHours.filter((hour) => normalizeWeekday(hour.weekday) === weekday);

            let status: DayStatus = 'available';
            if (dayWorkingHours.length === 0 || dayWorkingHours.every((hour) => hour.isClosed)) {
                status = 'closed';
            } else if (slots && slots.some((slot) => slot.status === 'available')) {
                status = 'available';
            } else if (slots && slots.some((slot) => slot.status === 'reserved')) {
                status = 'reserved';
            } else if (slots && slots.some((slot) => slot.status === 'blocked')) {
                status = 'blocked';
            } else if (slots && slots.length > 0) {
                status = 'blocked';
            }

            statuses[key] = status;
        }

        setCalendarStatuses(statuses);
    }, [selectedPlace, slotsByDate, workingHours]);

    const handleSportChange = useCallback((event: SelectChangeEvent<number>) => {
        const value = Number(event.target.value);
        setSelectedSportId(Number.isFinite(value) && value > 0 ? value : null);
        setSelectedPlaceKey('');
        setSelectedDate(null);
        setSelectedSlot(null);
    }, []);

    const handlePlaceChange = useCallback((event: SelectChangeEvent<string>) => {
        setSelectedPlaceKey(event.target.value);
        setSelectedDate(null);
        setSelectedSlot(null);
    }, []);

    const handleDateChange = useCallback((value: Date | null) => {
        setSelectedDate(value);
        setSelectedSlot(null);
    }, []);

    const handleSlotSelect = useCallback((slot: IAvailabilitySlot) => () => {
        setSelectedSlot(slot);
    }, []);

    const renderDay = useCallback((day: Date, _value: Date | null, pickersDayProps: PickersDayProps<Date>) => {
        const key = format(day, 'yyyy-MM-dd');
        const status = calendarStatuses[key];
        const isSelectable = status === 'available';
        const disabled = pickersDayProps.disabled || !selectedPlace || !isSelectable;
        const baseStyles = status && !pickersDayProps.outsideCurrentMonth ? dayStatusStyles[status] : undefined;

        return (
            <PickersDay
                {...pickersDayProps}
                disabled={disabled}
                sx={{
                    ...(pickersDayProps.sx || {}),
                    ...(baseStyles || {}),
                    ...(pickersDayProps.selected ? { border: '2px solid', borderColor: '#1976d2' } : {}),
                }}
            />
        );
    }, [calendarStatuses, selectedPlace]);

    const handleSubmit = useCallback(async (): Promise<{ success: boolean; rowId?: number }> => {
        if (!selectedSportId || !selectedPlace || !selectedSlot) {
            toast.error('لطفا ورزش، محل و زمان را انتخاب کنید.');
            return { success: false };
        }

        setSubmitting(true);
        const toastId = toast.loading('در حال ثبت رزرو ...');
        try {
            const payload: Partial<IBooking> & {
                sportId: number;
                facilityId: number;
                placeId: number;
                startAt: string;
                endAt: string;
            } = {
                sportId: selectedSportId,
                facilityId: selectedPlace.facility.id,
                placeId: selectedPlace.place.id,
                startAt: selectedSlot.start,
                endAt: selectedSlot.end,
            };

            const response = await booking.updateCustomServerData(payload);
            toast.dismiss(toastId);

            const responseData = response?.data ?? response;
            if (response?.error) {
                toast.error(response.error);
                setSubmitting(false);
                return { success: false };
            }

            const bookingId = responseData?.id ?? responseData?.bookingId;
            if (bookingId) {
                toast.success(`رزرو جدید با شماره "${bookingId}" ذخیره شد.`);
                setSubmitting(false);
                return { success: true, rowId: bookingId };
            }

            toast.success('رزرو با موفقیت ثبت شد.');
            setSubmitting(false);
            return { success: true };
        } catch (error) {
            console.error(error);
            toast.dismiss(toastId);
            toast.error('خطا در هنگام ذخیره رزرو! لطفا مجددا تلاش بفرمایید.');
            setSubmitting(false);
            return { success: false };
        }
    }, [booking, selectedPlace, selectedSlot, selectedSportId]);

    const sportsOptions = sports.items?.data ?? [];

    const selectedDateKey = selectedDate ? normalizeDateKey(selectedDate) : undefined;
    const daySlots = selectedDateKey ? slotsByDate[selectedDateKey] ?? [] : [];
    const availableSlots = daySlots.filter((slot) => slot.status === 'available');
    const reservedSlots = daySlots.filter((slot) => slot.status === 'reserved');
    const blockedSlots = daySlots.filter((slot) => slot.status === 'blocked');
    const dayStatus = selectedDateKey ? calendarStatuses[selectedDateKey] : undefined;

    return (
        <ActionForm
            headerPrintLogo={<RismunLogo height={64} themeBasedColor="lighten" />}
            title={`کورتیک - ${isNew ? 'رزرو جدید' : 'ویرایش رزرو'}`}
            hidePrintButton
            disable={booking.isLoading || submitting}
            loading={booking.isLoading || submitting}
            submitButton={{
                label: isNew ? 'ثبت رزرو' : 'ثبت تغییرات',
                onClick: handleSubmit,
                disable: !canSubmit || submitting,
            }}
            backButton={{
                onClick: handleBack,
                url: handleBack ? undefined : '/sportbooking/bookings',
            }}
            afterSubmit={{
                viewRecord: {
                    getUrl: (rowId?: number) => `/sportbooking/bookings/view/${rowId}`,
                },
                clearRecord: {
                    clear: () => {
                        setSelectedSportId(null);
                        setSelectedPlaceKey('');
                        setSelectedDate(null);
                        setSelectedSlot(null);
                        setPlaceOptions([]);
                    },
                },
                backToURL: {
                    onClick: handleBackAndReload,
                },
            }}
            helperText={[
                'لطفا ابتدا ورزش مورد نظر را انتخاب کرده و سپس محل مناسب را از لیست انتخاب کنید.',
                'روزهای سبز قابل رزرو، روزهای قرمز رزرو شده و روزهای خاکستری تعطیل هستند.',
            ]}
        >
            <Card>
                <CardContent>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth disabled={booking.isLoading || submitting}>
                                <InputLabel id="sport-select">انتخاب ورزش</InputLabel>
                                <Select
                                    labelId="sport-select"
                                    label="انتخاب ورزش"
                                    value={selectedSportId ? selectedSportId : undefined}
                                    onChange={handleSportChange}
                                >
                                    {sportsOptions.map((sport: ISport) => (
                                        <MenuItem key={sport.id} value={sport.id}>
                                            {sport.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth disabled={!selectedSportId || placeLoading || booking.isLoading || submitting}>
                                <InputLabel id="place-select">انتخاب محل</InputLabel>
                                <Select
                                    labelId="place-select"
                                    label="انتخاب محل"
                                    value={selectedPlaceKey}
                                    onChange={handlePlaceChange}
                                >
                                    {placeOptions.map(({ facility, place }) => (
                                        <MenuItem key={makeOptionKey(facility.id, place.id)} value={makeOptionKey(facility.id, place.id)}>
                                            {facility.name} - {place.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            {placeLoading && (
                                <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <CircularProgress size={20} />
                                    <Typography variant="caption">در حال بارگذاری مکان‌ها ...</Typography>
                                </Box>
                            )}
                        </Grid>
                    </Grid>
                </CardContent>
                <Divider />
                <CardContent>
                    {!selectedPlace && (
                        <Box sx={{ textAlign: 'center', py: 6 }}>
                            <Typography variant="subtitle1">برای مشاهده تقویم لطفا ورزش و محل را انتخاب کنید.</Typography>
                        </Box>
                    )}
                    {selectedPlace && (
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={6}>
                                <DateCalendar
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    renderDay={renderDay}
                                    disablePast
                                    disabled={!selectedPlace}
                                />
                                {availabilityLoading && (
                                    <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <CircularProgress size={20} />
                                        <Typography variant="caption">در حال بروزرسانی وضعیت تقویم ...</Typography>
                                    </Box>
                                )}
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mt: 2 }}>
                                    <Chip label="قابل رزرو" sx={{ backgroundColor: dayStatusStyles.available.backgroundColor, color: dayStatusStyles.available.color }} />
                                    <Chip label="رزرو شده" sx={{ backgroundColor: dayStatusStyles.reserved.backgroundColor, color: dayStatusStyles.reserved.color }} />
                                    <Chip label="غیرفعال" sx={{ backgroundColor: dayStatusStyles.blocked.backgroundColor, color: dayStatusStyles.blocked.color }} />
                                    <Chip label="تعطیل" sx={{ backgroundColor: dayStatusStyles.closed.backgroundColor, color: dayStatusStyles.closed.color }} />
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                    <Icon icon="mdi:clock-outline" />
                                    <Typography variant="subtitle2">ساعات روز انتخاب شده</Typography>
                                </Box>
                                {!selectedDate && (
                                    <Typography variant="body2" color="text.secondary">
                                        لطفا روز مورد نظر را از تقویم انتخاب کنید.
                                    </Typography>
                                )}
                                {selectedDate && dayStatus === 'closed' && (
                                    <Typography variant="body2" color="text.secondary">
                                        این روز برای این محل تعطیل است.
                                    </Typography>
                                )}
                                {selectedDate && dayStatus !== 'closed' && availableSlots.length === 0 && !availabilityLoading && (
                                    <Typography variant="body2" color="text.secondary">
                                        ساعت آزادی برای این روز یافت نشد.
                                    </Typography>
                                )}
                                <Grid container spacing={2}>
                                    {availableSlots.map((slot) => {
                                        const key = `${slot.start}-${slot.end}`;
                                        const isSelected = selectedSlot?.start === slot.start && selectedSlot?.end === slot.end;
                                        return (
                                            <Grid item key={key} xs={12} sm={6}>
                                                <Button
                                                    fullWidth
                                                    variant={isSelected ? 'contained' : 'outlined'}
                                                    onClick={handleSlotSelect(slot)}
                                                    startIcon={<Icon icon="mdi:check" />}
                                                >
                                                    {formatSlotLabel(slot)}
                                                </Button>
                                            </Grid>
                                        );
                                    })}
                                </Grid>
                                {(reservedSlots.length > 0 || blockedSlots.length > 0) && (
                                    <Box sx={{ mt: 3 }}>
                                        {reservedSlots.length > 0 && (
                                            <Box sx={{ mb: 2 }}>
                                                <Typography variant="subtitle2" sx={{ mb: 1 }}>ساعات رزرو شده</Typography>
                                                <Grid container spacing={1}>
                                                    {reservedSlots.map((slot) => (
                                                        <Grid item key={`reserved-${slot.start}-${slot.end}`}>
                                                            <Chip label={formatSlotLabel(slot)} color="error" variant="outlined" />
                                                        </Grid>
                                                    ))}
                                                </Grid>
                                            </Box>
                                        )}
                                        {blockedSlots.length > 0 && (
                                            <Box>
                                                <Typography variant="subtitle2" sx={{ mb: 1 }}>ساعات غیرفعال</Typography>
                                                <Grid container spacing={1}>
                                                    {blockedSlots.map((slot) => (
                                                        <Grid item key={`blocked-${slot.start}-${slot.end}`}>
                                                            <Chip label={formatSlotLabel(slot)} color="warning" variant="outlined" />
                                                        </Grid>
                                                    ))}
                                                </Grid>
                                            </Box>
                                        )}
                                    </Box>
                                )}
                            </Grid>
                        </Grid>
                    )}
                </CardContent>
            </Card>
        </ActionForm>
    );
};

export const PageNewComponent: FC<IPageNewComponent> = (props) => <NewComponent {...props} />;
