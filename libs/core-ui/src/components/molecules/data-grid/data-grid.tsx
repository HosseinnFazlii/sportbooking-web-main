import { useState, useRef, useCallback, FC, useMemo, ReactNode } from 'react';
import { utils as xlsxUtils, writeFileXLSX } from 'xlsx';
import Head from 'next/head';
import { useReactToPrint } from "react-to-print";
import { GridFilterModel, GridPaginationModel, GridSortModel, GridLogicOperator, Card, Typography, Box } from '../../../foundations';
import { DataGridPremium, Sidebar } from "../../atoms";
import { silentChangeURL, sleep } from "../../../utils";
import { GridHeader } from './grid-header';
import { IDataGrid } from './types';
import { getColumns, getFormattedValue } from './columns-helper';
import { useDateUtils } from '../../../hooks';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';


export const DataGrid: FC<IDataGrid> = ({
    // sort,
    onChangeSort,
    // filter,
    onChangeFilter,
    // pagination,
    onChangePagination,
    hidePrintButton,
    hideExportExcelButton,
    hideReloadButton,
    hideFastSearch,
    disableRowColumn,
    checkboxSelection,
    columns,
    fastSearchColumns,
    data,
    primaryKey,
    actionsComponent,
    actionsColumn,
    sx,
    className,
    headerPrintLogo,
    searchPlaceHolder,
    title,
    newRecordButton,
    insideView
}) => {
    const router = useRouter();
    const componentRef = useRef<HTMLDivElement>(null);
    const { t } = useTranslation();
    const dateUtils = useDateUtils();
    const [printing, setPrinting] = useState<boolean>(false);
    const [exporting, setExporting] = useState<boolean>(false);
    const [insideViewComponent, setInsideViewComponent] = useState<ReactNode | undefined>();
    const [displayInsideView, setDisplayInsideView] = useState<boolean>(false);

    const closeInsideView = useCallback(() => {
        setDisplayInsideView(false);
    }, []);

    const closeInsideViewAndReloadData = useCallback(() => {
        closeInsideView();
        data.reload();
    }, [closeInsideView, data]);

    const showInsideViewComponent = useCallback((component: ReactNode) => {
        if (insideView) {
            setInsideViewComponent(component);
            setDisplayInsideView(true);
        }
    }, [insideView]);

    const showInsideView = useCallback((rowId: number) => {
        if (insideView) {
            showInsideViewComponent(insideView.getComponent(rowId, closeInsideView, closeInsideViewAndReloadData, showInsideView));
            // eslint-disable-next-line no-restricted-globals
            silentChangeURL(insideView.getURL(rowId as number));
        }
    }, [closeInsideView, closeInsideViewAndReloadData, insideView, showInsideViewComponent]);

    const gridColumns = useMemo(
        () => getColumns(
            t,
            dateUtils.format,
            columns,
            primaryKey,
            disableRowColumn,
            actionsColumn,
            !!insideView,
            showInsideView,
            showInsideViewComponent,
            closeInsideView,
            closeInsideViewAndReloadData
        ),
        [actionsColumn, closeInsideView, closeInsideViewAndReloadData, columns, dateUtils.format, disableRowColumn, insideView, primaryKey, showInsideView, showInsideViewComponent, t]
    );

    const handleSearch = (val: string) => {
        if (!onChangeFilter || !fastSearchColumns || hideFastSearch)
            return;

        onChangeFilter({
            "items": [
                ...fastSearchColumns.map(c => ({
                    field: c,
                    operator: "contains",
                    value: val
                }))
            ],
            "logicOperator": GridLogicOperator.Or
        });
    }

    const handlePagination = (model: GridPaginationModel) => {
        if (onChangePagination) {
            onChangePagination(model);
        }
    };

    const handleSort = (model: GridSortModel) => {
        if (onChangeSort) {
            onChangeSort(model && model.length ? model : undefined);
        }
    }

    const handleFilter = (model: GridFilterModel) => {
        if (onChangeFilter) {
            onChangeFilter(model && model.items && model.items.length ? model : undefined);
        }
    }

    const reactToPrintContent = useCallback(() => {
        return componentRef.current;
    }, []);

    const handleExportExcel = useCallback(async () => {
        setExporting(true);

        try {
            const response = await data?.fetchAllData();

            if (!response?.length) {
                return;
            }

            const header = columns.reduce((prev: string[], curr: any) => {
                if (curr.headerName) {
                    prev.push(curr.headerName);
                }

                return prev;
            }, [] as string[]);

            const alteredResponse = response.map((r: any) =>
                columns.reduce(
                    (prev: { [key: string]: string }, curr: any) => {
                        try {
                            const nestedFields = curr.field.split(".");

                            let value = r;

                            for (let i = 0; i < nestedFields.length; i++) {
                                value = value[nestedFields[i]];
                            }

                            prev[String(curr.field)] = String(getFormattedValue(t, dateUtils.format, curr.type, value, curr.valueOptions));
                        } catch { }

                        return prev;
                    },
                    {} as { [key: string]: string }
                )
            );

            const workBook = xlsxUtils.book_new();

            const workSheet = xlsxUtils.json_to_sheet([]);

            xlsxUtils.sheet_add_aoa(workSheet, [header]);

            xlsxUtils.sheet_add_json(workSheet, alteredResponse, {
                origin: 'A2',
                skipHeader: true,
            });

            xlsxUtils.book_append_sheet(workBook, workSheet, 'Sheet1');

            writeFileXLSX(workBook, `${title}.xlsx`);
        } catch { }

        setExporting(false);
    }, [columns, data, dateUtils.format, t, title]);

    const handlePrint = useReactToPrint({
        content: reactToPrintContent,
        documentTitle: title,
        onBeforeGetContent: async () => {
            await setPrinting(true);
            await sleep(300);
        },
        onAfterPrint: async () => await setPrinting(false),
        removeAfterPrint: false
    });

    const handleReload = () => {
        if (data && data.reload) {
            data.reload();
        }
    }

    return (
        <Box sx={{
            position: "relative",
        }}>
            {displayInsideView && (
                <Sidebar
                    hideBackdrop
                    direction='left'
                    show={displayInsideView}
                    sx={{ zIndex: 3, width: '100%', position: displayInsideView ? "inherit" : "absolute" }}
                    onClose={() => silentChangeURL(router.asPath)}
                >
                    {insideViewComponent}
                </Sidebar>
            )}
            <Card
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    ...(sx ? sx : {}),
                    opacity: displayInsideView ? 0 : 1,
                    position: displayInsideView ? "absolute" : "inherit",
                    top: displayInsideView ? "0" : "unset",
                }}
                className={`data-grid-holder ${className || ""}`}
                ref={componentRef}
            >
                {title && title.length > 0 && (
                    <Head>
                        <title>{title}</title>
                    </Head>
                )}
                {headerPrintLogo && (
                    <div className='print-logo'>
                        <div style={{ display: "flex", flexDirection: "row", width: "210mm", justifyContent: "space-between", alignItems: "center", padding: "1rem" }}>
                            {headerPrintLogo}
                            <Typography variant="h6">{title?.split("-").slice(1).join("-").trim()}</Typography>
                        </div>
                    </div>
                )}
                <GridHeader
                    key="grid-toolbar"
                    hidePrintButton={hidePrintButton}
                    hideExportExcelButton={hideExportExcelButton}
                    hideFastSearch={hideFastSearch}
                    hideReloadButton={hideReloadButton}
                    exporting={exporting}
                    handleSearch={handleSearch}
                    handlePrint={handlePrint}
                    handleExportExcel={handleExportExcel}
                    handleReload={handleReload}
                    actionsComponent={actionsComponent}
                    searchPlaceHolder={searchPlaceHolder}
                    newRecordButton={newRecordButton}
                    displayInsideView={!!insideView}
                    showInsideView={() => showInsideView(0)}
                    t={t}
                />
                <DataGridPremium
                    paginationMode="server"
                    filterMode="server"
                    filterDebounceMs={300}
                    // filterModel={filter}
                    // sortModel={sort}
                    // paginationModel={pagination}
                    autoHeight={false}
                    rows={data.items.data}
                    columns={gridColumns}
                    getRowId={(row) => row[primaryKey]}
                    checkboxSelection={checkboxSelection}
                    // {...(insideView ? { onRowClick: handleRowClick } : {})}
                    // onRowSelectionModelChange={(newRowSelectionModel) => {
                    //     setSelectedRows(newRowSelectionModel);
                    // }}
                    // rowSelectionModel={selectedRows}
                    // disableRowSelectionOnClick={true}
                    onPaginationModelChange={handlePagination}
                    onSortModelChange={handleSort}
                    onFilterModelChange={handleFilter}
                    rowCount={data.items.count}
                    loading={data.isLoading}
                    disableAggregation={true}
                    disableRowGrouping={true}
                    disableVirtualization={printing}
                    slotProps={{
                        pagination: {
                            showFirstButton: true,
                            showLastButton: true
                        }
                    }}
                    
                />
            </Card>
        </Box>
    )
}
