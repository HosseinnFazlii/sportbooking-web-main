import { useMemo, useState, } from 'react';
import { Grid, GridFilterModel, GridPaginationModel, GridSortModel, DataGrid, RismunLogo, toast } from '@mf-core/core-ui';
import { useTicketTemplates, useAllTicketTypes, useAllTicketPriorities, useAllStatuses, useAllGroups, IGroup, IStatus, ITicketPriority, ITicketType } from '@mf-core/sportbooking-core';
import { TicketTemplatesEdit } from '../../views/templates/new-edit';

const getTableColumns = (groups: IGroup[], statuses: IStatus[], ticketPriorities: ITicketPriority[], ticketTypes: ITicketType[]) => {
    return [
        {
            field: 'ticketTemplateId',
            headerName: 'شماره',
            type: "link",
            maxWidth: 80,
            getHref: (value: number) => `/sportbooking/templates/edit/${value}`
        },
        {
            field: 'title',
            headerName: 'عنوان',
            type: "string"
        },
        {
            field: 'firstMessage',
            headerName: 'متن',
            type: "string"
        },
        {
            field: 'groupId',
            headerName: 'گروه',
            type: 'singleSelect',
            maxWidth: 200,
            valueOptions: groups.map(m => ({ value: m.groupId, label: m.name })),
        },
        {
            field: 'statusId',
            headerName: 'وضعیت',
            type: 'singleSelect',
            maxWidth: 150,
            valueOptions: statuses.map(m => ({ value: m.statusId, label: m.name })),
        },
        {
            field: 'ticketPriorityId',
            headerName: 'اولویت',
            type: 'singleSelect',
            maxWidth: 80,
            valueOptions: ticketPriorities.map(m => ({ value: m.ticketPriorityId, label: m.name })),
        },
        {
            field: 'ticketTypeId',
            headerName: 'نوع',
            maxWidth: 120,
            type: 'singleSelect',
            valueOptions: ticketTypes.map(m => ({ value: m.ticketTypeId, label: m.name })),
        },
    ]
}

const TicketTemplatesPage = () => {
    const [pagination, setPagination] = useState<GridPaginationModel>({ page: 0, pageSize: 10 });
    const [sort, setSort] = useState<GridSortModel | undefined>([{ field: "ticketTemplateId", sort: "desc" }]);
    const [filter, setFilter] = useState<GridFilterModel | undefined>();

    const ticketTypes = useAllTicketTypes();
    const ticketPriorities = useAllTicketPriorities();
    const statuses = useAllStatuses();
    const groups = useAllGroups();
    const columns = useMemo(() =>
        getTableColumns(groups.items.data, statuses.items.data, ticketPriorities.items.data, ticketTypes.items.data),
        [groups.items.data, statuses.items.data, ticketPriorities.items.data, ticketTypes.items.data]
    );

    const ticketTemplates = useTicketTemplates(pagination, sort, filter);
    const handleDelete = (key: string | number) => async () => {
        const response = await ticketTemplates.deleteRecord(key);
        if (response) {
            if (response.error) {
                toast.error(response.error);
            } else if (response.data) {
                ticketTemplates.reload();
                toast.success(`رکورد شماره ${key} با موفقیت حذف شد.`);
            } else {
                ticketTemplates.reload();
                toast.error("خطا در هنگام حذف رکورد. لطفا مجددا تلاش کنید.");
            }
        }
    }

    const getComponent = (rowId: number, handleBack: () => void, handleBackAndReload: () => void) => (<TicketTemplatesEdit templateId={rowId} isNew={!rowId} handleBack={handleBack} handleBackAndReload={handleBackAndReload} />);

    return (
        <Grid container spacing={0} key="tickets" sx={{ height: "100%" }}>
            <Grid item xs={12} sx={{ position: "relative" }}>
                <DataGrid
                    primaryKey='ticketTemplateId'
                    columns={columns}
                    headerPrintLogo={<RismunLogo height={64} themeBasedColor="lighten" />}
                    sx={{
                        height: "calc(100vh - 184px)",
                    }}
                    data={ticketTemplates}
                    onChangePagination={(newPagination) => setPagination(newPagination)}
                    onChangeFilter={(newFilter) => setFilter(newFilter)}
                    onChangeSort={(newSort) => setSort(newSort)}
                    fastSearchColumns={["ticketTemplateId", "title"]}
                    searchPlaceHolder="جستجوی سریع در شماره و عنوان"
                    title="کورتیک - قالب‌های تیکت"
                    newRecordButton={{
                        url: "/sportbooking/templates/new",
                        label: "ایجاد قالب"
                    }}
                    actionsColumn={[
                        {
                            title: "ویرایش",
                            icon: "mdi:edit",
                            getComponent,
                            getHref: (key: string | number) => `/sportbooking/templates/edit/${key}`
                        },
                        {
                            title: "حذف",
                            icon: "mdi:delete",
                            confirmationDialog: {
                                getDialogText: (id, row) => `آیا رکورد شماره ${id} با عنوان "${row.title}" حذف شود؟`,
                                agreeButtonLabel: "حذف رکورد"
                            },
                            onClick: handleDelete
                        }
                    ]}
                    insideView={{
                        getComponent,
                        getURL: (rowId: number) => rowId === 0 ? `/sportbooking/templates/new` : `/sportbooking/templates/edit/${rowId}`
                    }}
                />
            </Grid>
        </Grid>
    )
}
export default TicketTemplatesPage;