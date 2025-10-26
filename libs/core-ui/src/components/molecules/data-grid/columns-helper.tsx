/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";
import { Box, DatePicker, GridColDef, GridColType, GridFilterInputValueProps, IconButton, Tooltip, Typography, getGridDateOperators, styled } from "../../../foundations";
import { Link, ConfirmationIconButton, Icon } from "../../atoms";
import { OptionsMenu } from "../option-menu";
import { silentChangeURL, getDescendantProp } from "../../../utils";
import { IActionButton, IActionsColumn } from "./types";

const StyledLink = styled(Link)(({ theme }) => ({
    textDecoration: 'none',
    color: theme.palette.primary.main,
    width: "100%",
    display: "flex",
    height: "50px",
    justifyContent: "start",
    alignItems: "center",
    "&:hover": {
        backgroundColor: theme.palette.mode === "light" ? "#CCCCCC99" : "#66666699",
    }
}));

const DateFilterComponent = (t: (key: string) => string, props: GridFilterInputValueProps) => {
    const { item, applyValue } = props;

    const handleFilterChange = (value: Date | null) => {
        applyValue({ ...item, value: value ? value.toISOString().split("T")[0] : undefined });
    };

    return (
        <DatePicker
            label={t("datepicker.label")}
            value={new Date(item.value)}
            onChange={handleFilterChange}
            slotProps={{
                textField: {
                    variant: "standard"
                    // helperText: 'MM/DD/YYYY',
                },
            }}
        />
    );
}

const ActionButton = ({ actionColumn, primaryKeyValue, row, displayInsideView, getComponent, showInsideView, showInsideViewComponent, closeInsideView, closeInsideViewAndReloadData }: IActionButton) => (
    <>
        {displayInsideView && (
            <Tooltip title={actionColumn.title}>
                <IconButton size='small' onClick={() => {
                    if (getComponent && showInsideViewComponent && closeInsideView && closeInsideViewAndReloadData && showInsideView) {
                        showInsideViewComponent(getComponent(primaryKeyValue as number, closeInsideView, closeInsideViewAndReloadData, showInsideView));
                        if (actionColumn.getHref) {
                            silentChangeURL(actionColumn.getHref(primaryKeyValue));
                        }
                    }

                }}>
                    <Icon icon={actionColumn.icon} fontSize={20} />
                </IconButton>
            </Tooltip>
        )}
        {actionColumn.getHref && !displayInsideView && (
            <Tooltip title={actionColumn.title}>
                <IconButton size='small' component={Link} href={actionColumn.getHref(primaryKeyValue)}>
                    <Icon icon={actionColumn.icon} fontSize={20} />
                </IconButton>
            </Tooltip>
        )}
        {actionColumn.onClick && !displayInsideView && (
            actionColumn.confirmationDialog ?
                <ConfirmationIconButton
                    title={actionColumn.title}
                    icon={actionColumn.icon}
                    onClick={actionColumn.onClick(primaryKeyValue)}
                    dialogText={actionColumn.confirmationDialog.getDialogText ? actionColumn.confirmationDialog.getDialogText(primaryKeyValue, row) : ""}
                    agreeButtonLabel={actionColumn.confirmationDialog.agreeButtonLabel}
                    disagreeButtonLabel={actionColumn.confirmationDialog.disagreeButtonLabel}
                /> :
                <Tooltip title={actionColumn.title}>
                    <IconButton size='small' onClick={actionColumn.onClick(primaryKeyValue)}>
                        <Icon icon={actionColumn.icon} fontSize={20} />
                    </IconButton>
                </Tooltip>
        )}
    </>
)

export const getFormattedValue = (
    t: (key: string) => string,
    formatDate: (date: Date | number, formatString: string) => string,
    type?: GridColType,
    value?: number | string | Date,
    valueOptions?: Array<{ label: string | number, value: string | number }>
): string | number => {
    // 'string' | 'number' | 'date' | 'dateTime' | 'boolean' | 'singleSelect' | 'actions';
    const emptyCell = " ";

    switch (type) {
        case "boolean":
            return value ? t("boolean.yes") : t("boolean.no");
        case "time":
            return value ? formatDate(new Date(value), 'HH:mm:ss') : emptyCell;
        case "date":
            return value ? formatDate(new Date(value), 'yyyy-MM-dd') : emptyCell;
        case "dateTime":
            return value ? formatDate(new Date(value), 'yyyy-MM-dd HH:mm:ss') : emptyCell;
        case "formated-number":
            return value ? value.toLocaleString('en-US', { maximumFractionDigits: 2 }) : emptyCell;
        case "singleSelect":
            if (valueOptions) {
                return valueOptions.filter(f => f.value === value).pop()?.label || emptyCell;
            } else {
                return emptyCell;
            }
    }

    if (value instanceof Date) {
        return formatDate(new Date(value), 'yyyy-MM-dd');
    } else {
        return value || emptyCell;
    }
}

export const getRenderCell = (
    t: (key: string) => string,
    formatDate: (date: Date | number, formatString: string) => string,
    column: GridColDef<any>,
    primaryKey: string,
    displayInsideView?: boolean,
    showInsideView?: (rowId: number) => void
) => {
    if (column.type === "link") {
        return ({ row }: any) => (
            <StyledLink
                onClick={(event) => {
                    if (displayInsideView && showInsideView) {
                        showInsideView(row[primaryKey] as number);
                        event.preventDefault();
                        event.stopPropagation();
                    }
                }}
                href={(column as any).getHref ? (column as any).getHref(row[primaryKey]) : ""}
            >
                {getFormattedValue(t, formatDate, column.type, getDescendantProp(row, column.field), (column as any).valueOptions)}
            </StyledLink>
        )
    }
    return ({ row }: any) => (
        <Typography
            variant='body2'
            {...(displayInsideView && column.type === "link" ? { color: "primary" } : {})}
        >
            {getFormattedValue(t, formatDate, column.type, getDescendantProp(row, column.field), (column as any).valueOptions)}
        </Typography>
    )

}
export const getColumns = (
    t: (key: string) => string,
    formatDate: (date: Date | number, formatString: string) => string,
    columns: GridColDef<any>[],
    primaryKey: string,
    disableRowColumn?: boolean,
    actionsColumn?: IActionsColumn[],
    displayInsideView?: boolean,
    showInsideView?: (rowId: number) => void,
    showInsideViewComponent?: (component: ReactNode) => void,
    closeInsideView?: () => void,
    closeInsideViewAndReloadData?: () => void,
): GridColDef<any>[] => {
    return [
        ...(disableRowColumn ?
            [] : [{
                field: "row_number",
                headerName: "#",
                type: "number",
                filterable: false,
                sortable: false,
                pinnable: false,
                resizable: false,
                maxWidth: 40,
                hideable: true,
                renderCell: (index: any) => {
                    const rowId = index.api.getRowIndexRelativeToVisibleRows(index.row[primaryKey]);
                    return (<Typography variant="caption">{!rowId || isNaN(rowId) ? 1 : rowId + 1}</Typography>)
                },
            }]),
        ...columns.map(c => ({
            flex: 0.1,
            minWidth: 40,
            ...(c.type === "date" || c.type === "dateTime" ? {
                valueGetter: ({ row }: any) => new Date(row[c.field]),
                filterOperators: getGridDateOperators()
                    .map((operator) => ({
                        ...operator,
                        InputComponent: operator.InputComponent
                            ? DateFilterComponent
                            : undefined,
                    }))
            } : {}),
            renderCell: getRenderCell(t, formatDate, c, primaryKey, displayInsideView, showInsideView),
            ...c
        })),
        ...((actionsColumn && actionsColumn.length) ? ([
            {
                flex: 0.1,
                minWidth: 140,
                maxWidth: 140,
                sortable: false,
                field: 'actions',
                // type: 'actions',
                headerName: t('grid.columns.actions'),
                headerClassName: "header-grid-actions",
                cellClassName: "cell-grid-actions",
                renderCell: ({ row }: any) => (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {actionsColumn.filter(f => !f.renderInsideOptionMenu).map(ac => (
                            <ActionButton
                                key={`action_${ac.title}_${row[primaryKey]}`}
                                actionColumn={ac}
                                primaryKeyValue={row[primaryKey]}
                                row={row}
                                displayInsideView={displayInsideView && !!ac.getComponent}
                                getComponent={ac.getComponent}
                                showInsideView={showInsideView}
                                showInsideViewComponent={showInsideViewComponent}
                                closeInsideView={closeInsideView}
                                closeInsideViewAndReloadData={closeInsideViewAndReloadData}
                            />
                        ))}
                        {(actionsColumn.filter(f => f.renderInsideOptionMenu).length > 0) && (
                            <OptionsMenu
                                iconProps={{ fontSize: 20 }}
                                iconButtonProps={{ size: 'small' }}
                                menuProps={{ sx: { '& .MuiMenuItem-root svg': { mr: 2 } } }}
                                options={actionsColumn.filter(f => f.renderInsideOptionMenu).map(ac => ({
                                    text: ac.title,
                                    icon: <Icon icon={ac.icon} fontSize={20} />,
                                    href: ac.getHref ? ac.getHref(row[primaryKey]) : undefined,
                                    onClick: ac.onClick ? ac.onClick(row[primaryKey]) : undefined,
                                }))}
                            />
                        )}
                    </Box>
                )
            }
        ]) : [])

    ];
}
