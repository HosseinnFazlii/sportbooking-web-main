import { ReactNode } from "react";
import { GridColDef, GridFilterModel, GridPaginationModel, GridSortModel, SxProps } from "../../../foundations";
import { IconifyIcon } from "../../atoms";

export interface IServerResponse<T> {
    data: T[];
    count: number;
}

export type GetComponentType = (rowId: number, handleBack: () => void, handleBackAndReload: () => void, showInsideViewByRowId: (rowId: number) => void) => ReactNode;

export interface IActionButton {
    actionColumn: IActionsColumn;
    primaryKeyValue: number | string;
    row: any;
    displayInsideView?: boolean;
    getComponent?: GetComponentType;
    showInsideView?: (rowId: number) => void;
    showInsideViewComponent?: (component: ReactNode) => void;
    closeInsideView?: () => void;
    closeInsideViewAndReloadData?: () => void;
}

export interface IActionsColumn {
    title: string;
    getComponent?: GetComponentType;
    getHref?: (rowId: number | string) => string;
    onClick?: (rowId: number | string) => () => void;
    icon: string | IconifyIcon;
    renderInsideOptionMenu?: boolean;
    confirmationDialog?: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getDialogText?: (id: number | string, row: any) => string;
        agreeButtonLabel?: string;
        disagreeButtonLabel?: string;
    },
}

export interface IDataGrid {
    // sort?: GridSortModel,
    onChangeSort?: (newSort: GridSortModel | undefined) => void;
    // filter?: GridFilterModel;
    onChangeFilter?: (newFilter: GridFilterModel | undefined) => void;
    // pagination?: GridPaginationModel;
    onChangePagination?: (newPagination: GridPaginationModel) => void;
    hidePrintButton?: boolean;
    hideExportExcelButton?: boolean;
    hideReloadButton?: boolean;
    hideFastSearch?: boolean;
    disableRowColumn?: boolean;
    checkboxSelection?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    columns: GridColDef<any>[];
    fastSearchColumns?: string[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // getData: (pagination?: GridPaginationModel, sort?: GridSortModel, filter?: GridFilterModel) => { isLoading: boolean; reload?: () => void; data: any[]; count: number; };
    data: {
        isLoading: boolean;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        items: IServerResponse<any>;
        reload: () => Promise<void>;
        fetchAllData: () => Promise<any[] | undefined>;
    };
    // reload?: () => void;
    primaryKey: string;
    actionsComponent?: ReactNode;
    actionsColumn?: IActionsColumn[];
    sx?: SxProps;
    className?: string;
    headerPrintLogo?: ReactNode;
    searchPlaceHolder?: string;
    title?: string;
    newRecordButton?: {
        url: string,
        label: string,
        icon?: string | IconifyIcon
    }
    insideView?: {
        getComponent: GetComponentType;
        getURL: (rowId: number) => string
    }
}
