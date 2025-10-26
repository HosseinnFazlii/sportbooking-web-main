import { useMemo, useState, } from 'react';
import { Grid, GridFilterModel, GridPaginationModel, GridSortModel, DataGrid, RismunLogo } from '@mf-core/core-ui';
import { ICompany, useAllCompanies, useGroups } from '@mf-core/sportbooking-core';
import { GroupsEdit } from '../../views/groups/new-edit';

const getTableColumns = (companies: ICompany[]) => {
  return [
    {
      field: 'groupId',
      headerName: 'شناسه',
      type: "link",
      maxWidth: 80,
      getHref: (value: number) => `/management/groups/edit/${value}`
    },
    {
      field: 'name',
      headerName: 'نام',
      type: "string"
    },
    {
      field: 'companyId',
      headerName: 'واحد سازمانی',
      type: 'singleSelect',
      maxWidth: 200,
      valueOptions: companies.map(m => ({ value: m.companyId, label: m.name })),
    },
    {
      field: 'priority',
      headerName: 'اولویت',
      maxWidth: 80,
    },
    {
      field: 'isActive',
      headerName: 'فعال',
      type: 'boolean',
      maxWidth: 80,
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

const GroupsPage = () => {
  const [pagination, setPagination] = useState<GridPaginationModel>({ page: 0, pageSize: 10 });
  const [sort, setSort] = useState<GridSortModel | undefined>([{ field: "priority", sort: "asc" }]);
  const [filter, setFilter] = useState<GridFilterModel | undefined>();

  const companies = useAllCompanies();
  const columns = useMemo(() =>
    getTableColumns(companies.items.data),
    [companies.items.data]
  );

  const groups = useGroups(pagination, sort, filter);
  const getComponent = (rowId: number, handleBack: () => void, handleBackAndReload: () => void) => (<GroupsEdit groupId={rowId} isNew={!rowId} handleBack={handleBack} handleBackAndReload={handleBackAndReload} />);

  return (
    <Grid container spacing={0} key="groups" sx={{ height: "100%" }}>
      <Grid item xs={12} sx={{ position: "relative" }}>
        <DataGrid
          primaryKey='groupId'
          columns={columns}
          headerPrintLogo={<RismunLogo height={64} themeBasedColor="lighten" />}
          sx={{
            height: "calc(100vh - 184px)",
          }}
          data={groups}
          onChangePagination={(newPagination) => setPagination(newPagination)}
          onChangeFilter={(newFilter) => setFilter(newFilter)}
          onChangeSort={(newSort) => setSort(newSort)}
          fastSearchColumns={["name", "groupId"]}
          searchPlaceHolder="جستجوی سریع در نام و شناسه"
          title="کورتیک - گروه‌های تیکت"
          newRecordButton={{
            url: "/management/groups/new",
            label: "ایجاد گروه تیکت"
          }}
          actionsColumn={[
            {
              title: "ویرایش",
              icon: "mdi:edit",
              getComponent,
              getHref: (key: string | number) => `/management/groups/edit/${key}`
            }
          ]}
          insideView={{
            getComponent,
            getURL: (rowId: number) => rowId === 0 ? `/management/groups/new` : `/management/groups/edit/${rowId}`
          }}
        />
      </Grid>
    </Grid>
  )
}
export default GroupsPage;
