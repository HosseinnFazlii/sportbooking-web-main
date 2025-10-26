import { useMemo, useState, } from 'react';
import { Grid, GridFilterModel, GridPaginationModel, GridSortModel, DataGrid, RismunLogo } from '@mf-core/core-ui';
import { ICompany, useAllCompanies, useCompanies } from '@mf-core/sportbooking-core';
import { CompaniesEdit } from '../../views/companies/new-edit';

const getTableColumns = (companies: ICompany[]) => {
  return [
    {
      field: 'companyId',
      headerName: 'شناسه',
      type: "link",
      maxWidth: 80,
      getHref: (value: number) => `/management/companies/edit/${value}`
    },
    {
      field: 'name',
      headerName: 'نام',
      type: "string"
    },
    {
      field: 'parentId',
      headerName: 'واحد سازمانی اصلی',
      type: 'singleSelect',
      maxWidth: 200,
      valueOptions: companies.map(m => ({ value: m.companyId, label: m.name })),
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
  const [sort, setSort] = useState<GridSortModel | undefined>([{ field: "companyId", sort: "desc" }]);
  const [filter, setFilter] = useState<GridFilterModel | undefined>();

  const allCompanies = useAllCompanies();
  const columns = useMemo(() =>
    getTableColumns(allCompanies.items.data),
    [allCompanies.items.data]
  );

  const companies = useCompanies(pagination, sort, filter);
  const getComponent = (rowId: number, handleBack: () => void, handleBackAndReload: () => void) => (<CompaniesEdit companyId={rowId} isNew={!rowId} handleBack={handleBack} handleBackAndReload={handleBackAndReload} />);

  return (
    <Grid container spacing={0} key="companies" sx={{ height: "100%" }}>
      <Grid item xs={12} sx={{ position: "relative" }}>
        <DataGrid
          primaryKey='companyId'
          columns={columns}
          headerPrintLogo={<RismunLogo height={64} themeBasedColor="lighten" />}
          sx={{
            height: "calc(100vh - 184px)",
          }}
          data={companies}
          onChangePagination={(newPagination) => setPagination(newPagination)}
          onChangeFilter={(newFilter) => setFilter(newFilter)}
          onChangeSort={(newSort) => setSort(newSort)}
          fastSearchColumns={["name", "companyId"]}
          searchPlaceHolder="جستجوی سریع در نام و شناسه"
          title="کورتیک - واحدهای سازمانی"
          newRecordButton={{
            url: "/management/companies/new",
            label: "ایجاد واحد سازمان"
          }}
          actionsColumn={[
            {
              title: "ویرایش",
              icon: "mdi:edit",
              getComponent,
              getHref: (key: string | number) => `/management/companies/edit/${key}`
            }
          ]}
          insideView={{
            getComponent,
            getURL: (rowId: number) => rowId === 0 ? `/management/companies/new` : `/management/companies/edit/${rowId}`
          }}
        />
      </Grid>
    </Grid>
  )
}
export default CompaniesPage;