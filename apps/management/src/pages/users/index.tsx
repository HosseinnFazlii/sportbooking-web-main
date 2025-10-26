import { useMemo, useState, } from 'react';
import { Grid, GridFilterModel, GridPaginationModel, GridSortModel, DataGrid, RismunLogo } from '@mf-core/core-ui';
import { useAllRoles, IRole, useUsers } from '@mf-core/sportbooking-core';
import { useTranslation } from 'react-i18next';
import { UsersEdit } from '../../views/users/new-edit';

const getTableColumns = (roles: IRole[], t: (key: string) => string) => {
  return [
    {
      field: 'id',
      headerName: t('users.columns.id'),
      type: "link",
      maxWidth: 80,
      getHref: (value: number) => `/management/users/edit/${value}`
    },
    {
      field: 'name',
      headerName: t('users.columns.firstName'),
      type: "string"
    },
    {
      field: 'mobile',
      headerName: t('users.columns.mobile'),
      type: "string"
    },
    {
      field: 'email',
      headerName: t('users.columns.email'),
      type: "string"
    },
    {
      field: 'roleId',
      headerName: t('users.columns.role'),
      type: 'singleSelect',
      maxWidth: 150,
      valueOptions: roles.map(m => ({ value: m.id, label: m.name })),
    },
    {
      field: 'isActive',
      headerName: t('users.columns.isActive'),
      type: 'boolean',
      maxWidth: 80,
    },
    {
      field: 'createdAt',
      headerName: t('users.columns.createdAt'),
      minWidth: 100,
      maxWidth: 100,
      type: "date",
    },
  ]
}

const UsersPage = () => {
  const { t } = useTranslation();
  const [pagination, setPagination] = useState<GridPaginationModel>({ page: 0, pageSize: 10 });
  const [sort, setSort] = useState<GridSortModel | undefined>([{ field: "id", sort: "desc" }]);
  const [filter, setFilter] = useState<GridFilterModel | undefined>();

  const roles = useAllRoles();
  const columns = useMemo(() =>
    getTableColumns(roles.items.data, t),
    [roles.items.data, t]
  );

  const users = useUsers(pagination, sort, filter);
  const getComponent = (rowId: number, handleBack: () => void, handleBackAndReload: () => void) => (<UsersEdit userId={rowId} isNew={!rowId} handleBack={handleBack} handleBackAndReload={handleBackAndReload} />);

  return (
    <Grid container spacing={0} key="users" sx={{ height: "100%" }}>
      <Grid item xs={12} sx={{ position: "relative" }}>
        <DataGrid
          primaryKey='id'
          columns={columns}
          headerPrintLogo={<RismunLogo height={64} themeBasedColor="lighten" />}
          sx={{
            height: "calc(100vh - 184px)",
          }}
          data={users}
          onChangePagination={(newPagination) => setPagination(newPagination)}
          onChangeFilter={(newFilter) => setFilter(newFilter)}
          onChangeSort={(newSort) => setSort(newSort)}
          fastSearchColumns={["name", "mobile"]}
          searchPlaceHolder={t('users.searchPlaceholder')}
          title={t('users.title')}
          newRecordButton={{
            url: "/management/users/new",
            label: t('users.newRecordLabel')
          }}
          actionsColumn={[
            {
              title: t('users.actions.edit'),
              icon: "mdi:edit",
              getComponent,
              getHref: (key: string | number) => `/management/users/edit/${key}`
            }
          ]}
          insideView={{
            getComponent,
            getURL: (rowId: number) => rowId === 0 ? `/management/users/new` : `/management/users/edit/${rowId}`
          }}
        />
      </Grid>
    </Grid>
  )
}
export default UsersPage;
