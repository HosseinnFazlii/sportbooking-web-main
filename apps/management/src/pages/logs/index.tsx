import { useMemo, useState, } from 'react';
import { Grid, GridFilterModel, GridPaginationModel, GridSortModel, DataGrid, RismunLogo } from '@mf-core/core-ui';
import { ILogType, useAllLogTypes, useLogs } from '@mf-core/sportbooking-core';

const getTableColumns = (logTypes: ILogType[]) => {
  return [
    {
      field: 'logId',
      headerName: 'شناسه',
      type: "link",
      maxWidth: 80,
      getHref: (value: number) => `/management/logs/view/${value}`
    },
    {
      field: 'logTypeId',
      headerName: 'نوع فعالیت',
      type: 'singleSelect',
      maxWidth: 200,
      valueOptions: logTypes.map(m => ({ value: m.logTypeId, label: m.name })),
    },
    {
      field: 'text1',
      headerName: 'متن یک',
      type: "string"
    },
    {
      field: 'text2',
      headerName: 'متن دو',
      type: "string"
    },
    {
      field: 'text3',
      headerName: 'متن سه',
      type: "string"
    },
    {
      field: 'text4',
      headerName: 'متن چهار',
      type: "string"
    },
    {
        field: 'createdByUser.name',
        headerName: 'سازنده',
        maxWidth: 150,
    },
    {
      field: 'createdAt',
      headerName: 'تاریخ ایجاد',
      minWidth: 100,
      maxWidth: 100,
      type: "date",
    },
  ]
}

const CompaniesPage = () => {
  const [pagination, setPagination] = useState<GridPaginationModel>({ page: 0, pageSize: 10 });
  const [sort, setSort] = useState<GridSortModel | undefined>([{ field: "logId", sort: "desc" }]);
  const [filter, setFilter] = useState<GridFilterModel | undefined>();

  const logTypes = useAllLogTypes();
  const columns = useMemo(() =>
    getTableColumns(logTypes.items.data),
    [logTypes.items.data]
  );

  const logs = useLogs(pagination, sort, filter);
  // const getComponent = (rowId: number, handleBack: () => void, handleBackAndReload: () => void) => (<LogsView logId={rowId} isNew={!rowId} handleBack={handleBack} handleBackAndReload={handleBackAndReload} />);

  return (
    <Grid container spacing={0} key="logs" sx={{ height: "100%" }}>
      <Grid item xs={12} sx={{ position: "relative" }}>
        <DataGrid
          primaryKey='logId'
          columns={columns}
          headerPrintLogo={<RismunLogo height={64} themeBasedColor="lighten" />}
          sx={{
            height: "calc(100vh - 184px)",
          }}
          data={logs}
          onChangePagination={(newPagination) => setPagination(newPagination)}
          onChangeFilter={(newFilter) => setFilter(newFilter)}
          onChangeSort={(newSort) => setSort(newSort)}
          fastSearchColumns={["text1", "logId"]}
          searchPlaceHolder="جستجوی سریع در متن یک و شناسه"
          title="کورتیک - کلیه فعالیت‌ها"
          actionsColumn={[
            // {
            //   title: "نمایش",
            //   icon: "mdi:eye-outline",
            //   getComponent,
            //   getHref: (key: string | number) => `/management/logs/view/${key}`
            // }
          ]}
          // insideView={{
          //   getComponent,
          //   getURL: (rowId: number) => rowId === 0 ? "" : `/management/companies/view/${rowId}`
          // }}
        />
      </Grid>
    </Grid>
  )
}
export default CompaniesPage;