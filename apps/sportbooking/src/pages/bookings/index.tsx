import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import {
    Grid,
    GridFilterModel,
    GridLogicOperator,
    GridPaginationModel,
    GridSortModel,
    DataGrid,
    RismunLogo,
    UserDataType,
    useAuth,
} from '@mf-core/core-ui';
import {
    useBookingStatuses,
    useBookings,
    useViewBookings,
    IBookingStatus,
} from '@mf-core/sportbooking-core';
import { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';
import { PageViewComponent } from '../../views/bookings/view';
import { PageNewComponent } from '../../views/bookings/add';

const getStatusOptions = (t: TFunction, statuses: IBookingStatus[]) =>
    statuses.map((status) => ({
        value: status.code,
        label: t(`booking.status.${status.code}`, { defaultValue: status.label || status.code }),
    }));

const getTableColumns = (t: TFunction, statuses: IBookingStatus[]) => [
    {
        field: 'id',
        headerName: t('booking.list.columns.id'),
        type: 'link',
        maxWidth: 80,
        getHref: (value: number) => `/sportbooking/bookings/view/${value}`,
    },
    {
        field: 'userFullName',
        headerName: t('booking.list.columns.booker'),
        type: 'string',
        minWidth: 180,
        flex: 0.2,
    },
    {
        field: 'mobile',
        headerName: t('booking.list.columns.phone'),
        type: 'string',
        minWidth: 140,
        maxWidth: 180,
    },
    {
        field: 'statusCode',
        headerName: t('booking.list.columns.status'),
        type: 'singleSelect',
        minWidth: 160,
        maxWidth: 200,
        valueOptions: getStatusOptions(t, statuses),
    },
    {
        field: 'total',
        headerName: t('booking.list.columns.total'),
        type: 'number',
        minWidth: 140,
        flex: 0.15,
    },
    {
        field: 'lineCount',
        headerName: t('booking.list.columns.activeLines'),
        type: 'number',
        maxWidth: 140,
    },
    {
        field: 'totalQty',
        headerName: t('booking.list.columns.reservedQty'),
        type: 'number',
        maxWidth: 140,
    },
    {
        field: 'createdAt',
        headerName: t('booking.list.columns.createdAt'),
        type: 'dateTime',
        minWidth: 180,
        flex: 0.18,
    },
    {
        field: 'firstStartAt',
        headerName: t('booking.list.columns.firstStart'),
        type: 'dateTime',
        minWidth: 180,
        flex: 0.18,
    },
    {
        field: 'lastEndAt',
        headerName: t('booking.list.columns.lastEnd'),
        type: 'dateTime',
        minWidth: 180,
        flex: 0.18,
    },
];

type FilterItem = {
    id: string;
    field: string;
    operator: string;
    value?: string | number | string[];
};

const buildStatusFilter = (codes: string[], idSuffix: string): FilterItem | undefined => {
    if (!codes.length) {
        return undefined;
    }
    if (codes.length === 1) {
        return { id: `status-${idSuffix}`, field: 'statusCode', operator: 'equals', value: codes[0] };
    }
    return { id: `status-${idSuffix}`, field: 'statusCode', operator: 'isAnyOf', value: codes };
};

const getPageSettingsByUrl = (t: TFunction, user: UserDataType | undefined, path?: string) => {
    let titleKey = 'booking.list.title.all';
    const filters: FilterItem[] = [];

    switch (path) {
        case 'my-bookings':
        case 'my-tickets':
            titleKey = 'booking.list.title.mine';
            if (user?.id) {
                filters.push({ id: 'user-own', field: 'userId', operator: 'equals', value: user.id });
            }
            break;
        case 'waiting-response':
        case 'awaiting-teacher':
        case 'awaiting_teacher':
            titleKey = 'booking.list.title.awaitingTeacher';
            {
                const statusFilter = buildStatusFilter(['awaiting_teacher'], 'awaiting-teacher');
                if (statusFilter) filters.push(statusFilter);
            }
            break;
        case 'waiting-payment':
        case 'waiting-time':
        case 'pending-payment':
        case 'pending_payment':
            titleKey = 'booking.list.title.pendingPayment';
            {
                const statusFilter = buildStatusFilter(['pending_payment'], 'pending-payment');
                if (statusFilter) filters.push(statusFilter);
            }
            break;
        case 'hold':
            titleKey = 'booking.list.title.hold';
            {
                const statusFilter = buildStatusFilter(['hold'], 'hold');
                if (statusFilter) filters.push(statusFilter);
            }
            break;
        case 'doing':
        case 'done':
        case 'confirmed':
            titleKey = 'booking.list.title.confirmed';
            {
                const statusFilter = buildStatusFilter(['confirmed'], 'confirmed');
                if (statusFilter) filters.push(statusFilter);
            }
            break;
        case 'closed':
        case 'canceled':
        case 'cancelled':
            titleKey = 'booking.list.title.cancelled';
            {
                const statusFilter = buildStatusFilter(['cancelled'], 'cancelled');
                if (statusFilter) filters.push(statusFilter);
            }
            break;
        case 'failed':
        case 'payment-failed':
        case 'payment_failed':
            titleKey = 'booking.list.title.paymentFailed';
            {
                const statusFilter = buildStatusFilter(['payment_failed'], 'payment-failed');
                if (statusFilter) filters.push(statusFilter);
            }
            break;
        case 'refunded':
            titleKey = 'booking.list.title.refunded';
            {
                const statusFilter = buildStatusFilter(['refunded'], 'refunded');
                if (statusFilter) filters.push(statusFilter);
            }
            break;
        case 'expired':
            titleKey = 'booking.list.title.expired';
            {
                const statusFilter = buildStatusFilter(['expired'], 'expired');
                if (statusFilter) filters.push(statusFilter);
            }
            break;
        default:
            titleKey = 'booking.list.title.all';
            break;
    }

    const filterModel: GridFilterModel | undefined = filters.length
        ? { items: filters as any, logicOperator: GridLogicOperator.And }
        : undefined;

    return { title: t(titleKey), filter: filterModel };
};

const BookingsPage = () => {
    const router = useRouter();
    const { user } = useAuth();
    const { t } = useTranslation();

    const path = router.asPath.split('/').filter((segment) => segment.length > 0).pop();
    const pageSettings = useMemo(() => getPageSettingsByUrl(t, user, path), [t, user?.id, path]);

    const [pagination, setPagination] = useState<GridPaginationModel>({ page: 0, pageSize: 10 });
    const [sort, setSort] = useState<GridSortModel | undefined>([{ field: 'id', sort: 'desc' }]);
    const [filter, setFilter] = useState<GridFilterModel | undefined>(pageSettings.filter);

    const statuses = useBookingStatuses();

    const bookings = useBookings(pagination, sort, filter);
    // const viewBookings = useViewBookings(pagination, sort, filter);
    // console.log(viewBookings);

    const reload = useCallback(async () => {
        await Promise.all([bookings.reload()]);
    }, [bookings.reload]);

    const fetchAllData = useCallback(async () => bookings.items.data, [bookings.items]);

    const data = useMemo(() => ({
        isLoading: bookings.isLoading || bookings.isLoading,
        items: {
            data: bookings.items.data,
            count: bookings.items.count,
        },
        reload,
        fetchAllData,
    }), [bookings.isLoading, bookings.items.count, fetchAllData, reload, bookings.items]);

    const serializedFilter = useMemo(() => JSON.stringify(pageSettings.filter ?? null), [pageSettings.filter]);

    useEffect(() => {
        setFilter(pageSettings.filter);
    }, [serializedFilter]);

    const columns = useMemo(() => getTableColumns(t, statuses.items || []), [t, statuses.items]);

    const getComponent = useCallback(
        (rowId: number, handleBack: () => void, handleBackAndReload: () => void, showInsideViewByRowId: (key: number) => void) => (
            rowId ? (
                <PageViewComponent
                    id={rowId}
                    isNew={false}
                    handleBack={handleBack}
                    handleBackAndReload={handleBackAndReload}
                    showInsideViewByRowId={showInsideViewByRowId}
                />
            ) : (
                <PageNewComponent
                    id={0}
                    isNew={true}
                    handleBack={handleBack}
                    handleBackAndReload={handleBackAndReload}
                    showInsideViewByRowId={showInsideViewByRowId}
                />
            )
        ),
        [],
    );

    return (
        <Grid container spacing={0} key="bookings" sx={{ height: '100%' }}>
            <Grid item xs={12} sx={{ position: 'relative' }}>
                <DataGrid
                    primaryKey='id'
                    columns={columns}
                    headerPrintLogo={<RismunLogo height={64} themeBasedColor="lighten" />}
                    sx={{
                        height: 'calc(100vh - 184px)',
                    }}
                    data={data}
                    onChangePagination={(newPagination) => setPagination(newPagination)}
                    onChangeFilter={(newFilter) => setFilter(newFilter)}
                    onChangeSort={(newSort) => setSort(newSort)}
                    fastSearchColumns={['id', 'userFullName', 'mobile', 'statusCode']}
                    searchPlaceHolder={t('booking.list.searchPlaceholder')}
                    title={t('booking.list.pageTitle', { title: pageSettings.title })}
                    newRecordButton={{
                        url: '/sportbooking/bookings/new',
                        label: t('booking.list.newBooking'),
                    }}
                    actionsColumn={[
                        {
                            title: t('booking.list.actions.details'),
                            icon: 'mdi:eye-outline',
                            getComponent,
                            getHref: (key: string | number) => `/sportbooking/bookings/view/${key}`,
                        },
                    ]}
                    insideView={{
                        getComponent,
                        getURL: (rowId: number) => (rowId === 0 ? '/sportbooking/bookings/new' : `/sportbooking/bookings/view/${rowId}`),
                    }}
                />
            </Grid>
        </Grid>
    );
};

export default BookingsPage;

