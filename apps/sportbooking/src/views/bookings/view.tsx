import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import {
    ActionForm,
    Box,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    RismunLogo,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    useDateUtils,
} from '@mf-core/core-ui';
import { useBooking } from '@mf-core/sportbooking-core';
import { useTranslation } from 'react-i18next';

interface IPageViewComponent {
    id: number;
    isNew: boolean;
    handleBack?: () => void;
    handleBackAndReload?: () => void;
    showInsideViewByRowId?: (rowId: number) => void;
}

const formatDateTime = (formatFn: (date: Date, formatString: string) => string, value?: string | Date | null): string => {
    if (!value) {
        return '-';
    }
    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) {
        return '-';
    }
    return formatFn(date, 'yyyy-MM-dd HH:mm:ss');
};

const toNumber = (value?: string | number | null): number | undefined => {
    if (typeof value === 'number') {
        return Number.isFinite(value) ? value : undefined;
    }
    if (typeof value === 'string') {
        const parsed = parseFloat(value);
        return Number.isFinite(parsed) ? parsed : undefined;
    }
    return undefined;
};

const formatCurrency = (value?: string | number | null): string => {
    const numeric = toNumber(value);
    if (numeric === undefined) {
        return '-';
    }
    return (numeric).toLocaleString();//numeric.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

export const PageViewComponent: FC<IPageViewComponent> = ({ id, isNew, handleBack, handleBackAndReload }) => {
    const { format } = useDateUtils();
    const { t } = useTranslation();
    const [isDataUpdated, setIsDataUpdated] = useState<boolean>(false);
    const booking = useBooking(isNew ? undefined : id);
    const lines = booking.item.lines ?? [];

    const summary = useMemo(() => {
        const quantity = lines.reduce((sum, line) => sum + (line.qty ?? 0), 0);
        const amount = lines.reduce((sum, line) => {
            const price = toNumber(line.price);
            if (price === undefined) {
                return sum;
            }
            return sum + price * (line.qty ?? 0);
        }, 0);

        return { quantity, amount };
    }, [lines]);

    const user = booking.item.user;
    const userName = user?.fullName || user?.name || '-';
    const userEmail = user?.email || '-';
    const userMobile = user?.mobile ? String(user.mobile) : '-';
    const lineCount = lines.length;
    const statusCode = booking.item.status?.code || booking.item.status?.label || '';
    const statusLabel = statusCode
        ? t(`booking.status.${statusCode}`, { defaultValue: booking.item.status?.label || statusCode })
        : '-';
    const formatMoneyWithCurrency = (value?: string | number | null) => {
        const formatted = formatCurrency(value);
        return booking.item.currency && formatted !== '-' ? `${formatted} ${booking.item.currency === "IRR" ? "ریال" : booking.item.currency}` : formatted;
    };
    const formatSlotRange = useCallback((slotValue?: string | null): string => {
        if (!slotValue) {
            return '-';
        }
        const trimmedValue = slotValue.trim();

        const parseSlotRange = (): [string, string] | undefined => {
            try {
                const parsed = JSON.parse(trimmedValue);
                if (Array.isArray(parsed) && parsed.length >= 2) {
                    const [start, end] = parsed;
                    if (typeof start === 'string' && typeof end === 'string') {
                        return [start, end];
                    }
                } else if (parsed && typeof parsed === 'object') {
                    const maybeStart = (parsed as Record<string, unknown>).start ?? (parsed as Record<string, unknown>).from;
                    const maybeEnd = (parsed as Record<string, unknown>).end ?? (parsed as Record<string, unknown>).to;
                    if (typeof maybeStart === 'string' && typeof maybeEnd === 'string') {
                        return [maybeStart, maybeEnd];
                    }
                }
            } catch (error) {
                /* no-op: fall back to regex parsing */
            }

            const match = trimmedValue.match(/^[\[(]\s*([^,]+?)\s*,\s*([^\]\)]+?)\s*[\])]?$/);
            if (match) {
                return [match[1], match[2]];
            }

            const parts = trimmedValue.split(',');
            if (parts.length === 2) {
                return [parts[0].trim().replace(/^"|"$/g, ''), parts[1].trim().replace(/^"|"$/g, '')];
            }

            return undefined;
        };

        const parsedRange = parseSlotRange();
        if (!parsedRange) {
            return slotValue;
        }

        const [startRaw, endRaw] = parsedRange;
        const startDate = new Date(startRaw);
        const endDate = new Date(endRaw);
        if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
            return slotValue;
        }
        const datePart = format(startDate, 'yyyy-MM-dd');
        const startTime = format(startDate, 'HH:mm');
        const endTime = format(endDate, 'HH:mm');
        return t('booking.view.slotRange', { date: datePart, start: startTime, end: endTime });
    }, [format, t]);

    const handleViewBack = useCallback(() => {
        if (handleBackAndReload && handleBack) {
            if (isDataUpdated) {
                handleBackAndReload();
                booking.reload();
            } else {
                handleBack();
            }
        }
        setIsDataUpdated(false);
    }, [handleBack, handleBackAndReload, isDataUpdated, booking]);

    useEffect(() => {
        booking.addListenerServerUpdate(() => {
            setIsDataUpdated(true);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <ActionForm
            headerPrintLogo={<RismunLogo height={64} themeBasedColor="lighten" />}
            title={t('booking.view.pageTitle')}
            backButton={{
                onClick: handleViewBack,
                url: handleBack && handleBackAndReload ? undefined : '/sportbooking/bookings'
            }}
            disable={booking.isLoading}
            loading={booking.isLoading}
        >
            <Card className="no-break">
                <CardHeader title={t('booking.view.sections.bookingSummary')} />
                <CardContent>
                    <Grid container spacing={4}>
                        <Grid item xl={3} xs={12}>
                            <Typography variant="caption">{t('booking.view.fields.bookingId')}</Typography>
                            <Typography variant="subtitle1">{booking.isLoading ? '...' : booking.item.id || '-'}</Typography>
                        </Grid>
                        <Grid item xl={3} xs={12}>
                            <Typography variant="caption">{t('booking.view.fields.status')}</Typography>
                            <Typography variant="subtitle1">{statusLabel}</Typography>
                        </Grid>
                        <Grid item xl={3} xs={12}>
                            <Typography variant="caption">{t('booking.view.fields.totalAmount')}</Typography>
                            <Typography variant="subtitle1">{formatMoneyWithCurrency(booking.item.total)}</Typography>
                        </Grid>
                        <Grid item xl={3} xs={12}>
                            <Typography variant="caption">{t('booking.view.fields.reservedQty')}</Typography>
                            <Typography variant="subtitle1">{summary.quantity}</Typography>
                        </Grid>
                        <Grid item xl={3} xs={12}>
                            <Typography variant="caption">{t('booking.view.fields.activeLineCount')}</Typography>
                            <Typography variant="subtitle1">{lineCount}</Typography>
                        </Grid>
                        <Grid item xl={3} xs={12}>
                            <Typography variant="caption">{t('booking.view.fields.createdAt')}</Typography>
                            <Typography variant="subtitle1">{booking.isLoading ? '...' : formatDateTime(format, booking.item.createdAt)}</Typography>
                        </Grid>
                        <Grid item xl={3} xs={12}>
                            <Typography variant="caption">{t('booking.view.fields.updatedAt')}</Typography>
                            <Typography variant="subtitle1">{booking.isLoading ? '...' : formatDateTime(format, booking.item.updatedAt)}</Typography>
                        </Grid>
                        <Grid item xl={3} xs={12}>
                            <Typography variant="caption">{t('booking.view.fields.holdExpiresAt')}</Typography>
                            <Typography variant="subtitle1">{formatDateTime(format, booking.item.holdExpiresAt)}</Typography>
                        </Grid>
                        <Grid item xl={3} xs={12}>
                            <Typography variant="caption">{t('booking.view.fields.paidAt')}</Typography>
                            <Typography variant="subtitle1">{formatDateTime(format, booking.item.paidAt)}</Typography>
                        </Grid>
                        <Grid item xl={3} xs={12}>
                            <Typography variant="caption">{t('booking.view.fields.paymentReference')}</Typography>
                            <Typography variant="subtitle1">{booking.item.paymentReference || '-'}</Typography>
                        </Grid>
                        {booking.item.paymentFailureReason && (
                            <Grid item xl={3} xs={12}>
                                <Typography variant="caption">{t('booking.view.fields.paymentFailureReason')}</Typography>
                                <Typography variant="subtitle1">{booking.item.paymentFailureReason}</Typography>
                            </Grid>
                        )}
                        <Grid item xl={3} xs={12}>
                            <Typography variant="caption">{t('booking.view.fields.linesAmount')}</Typography>
                            <Typography variant="subtitle1">{formatMoneyWithCurrency(summary.amount)}</Typography>
                        </Grid>
                    </Grid>
                </CardContent>
                <Divider />
                <CardHeader title={t('booking.view.sections.customerInfo')} />
                <CardContent>
                    <Grid container spacing={4}>
                        <Grid item xl={4} xs={12}>
                            <Typography variant="caption">{t('booking.view.customer.name')}</Typography>
                            <Typography variant="subtitle1">{userName}</Typography>
                        </Grid>
                        <Grid item xl={4} xs={12}>
                            <Typography variant="caption">{t('booking.view.customer.email')}</Typography>
                            <Typography variant="subtitle1">{userEmail}</Typography>
                        </Grid>
                        <Grid item xl={4} xs={12}>
                            <Typography variant="caption">{t('booking.view.customer.phone')}</Typography>
                            <Typography variant="subtitle1">{userMobile}</Typography>
                        </Grid>
                    </Grid>
                </CardContent>
                {lines.length > 0 && (
                    <>
                        <Divider />
                        <CardHeader title={t('booking.view.sections.lines')} action={
                            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
                                <Typography variant="body2">{t('booking.view.lines.summary.capacity', { count: summary.quantity })}</Typography>
                                <Typography variant="body2">{t('booking.view.lines.summary.amount', { amount: formatMoneyWithCurrency(summary.amount) })}</Typography>
                            </Box>
                        } />
                        <CardContent>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell><Typography variant="caption">{t('booking.view.lines.table.columns.index')}</Typography></TableCell>
                                        <TableCell><Typography variant="caption">{t('booking.view.lines.table.columns.place')}</Typography></TableCell>
                                        <TableCell><Typography variant="caption">{t('booking.view.lines.table.columns.slot')}</Typography></TableCell>
                                        <TableCell><Typography variant="caption">{t('booking.view.lines.table.columns.teacher')}</Typography></TableCell>
                                        <TableCell align="right"><Typography variant="caption">{t('booking.view.lines.table.columns.quantity')}</Typography></TableCell>
                                        <TableCell align="right"><Typography variant="caption">{t('booking.view.lines.table.columns.unitPrice')}</Typography></TableCell>
                                        <TableCell align="right"><Typography variant="caption">{t('booking.view.lines.table.columns.total')}</Typography></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {lines.map((line, index) => {
                                        const unitPrice = toNumber(line.price);
                                        const lineTotal = unitPrice === undefined ? undefined : unitPrice * (line.qty ?? 0);
                                        const teacher = line.teacher;
                                        const teacherName = teacher?.name || '-';
                                        const placeLabel = line.place?.facility?.name
                                            ? `${line.place?.name || '-'} – ${line.place?.facility?.name}`
                                            : line.place?.name || '-';
                                        return (
                                            <TableRow key={line.id || `${index}-${line.placeId}`}>
                                                <TableCell><Typography variant="subtitle1">{index + 1}</Typography></TableCell>
                                                <TableCell><Typography variant="subtitle1">{placeLabel}</Typography></TableCell>
                                                <TableCell><Typography variant="subtitle1">{formatSlotRange(line.slot)}</Typography></TableCell>
                                                <TableCell><Typography variant="subtitle1">{teacherName}</Typography></TableCell>
                                                <TableCell align="right"><Typography variant="subtitle1">{line.qty ?? 0}</Typography></TableCell>
                                                <TableCell align="right"><Typography variant="subtitle1">{formatMoneyWithCurrency(unitPrice)}</Typography></TableCell>
                                                <TableCell align="right"><Typography variant="subtitle1">{formatMoneyWithCurrency(lineTotal)}</Typography></TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </>
                )}
            </Card>
        </ActionForm>
    );
};
