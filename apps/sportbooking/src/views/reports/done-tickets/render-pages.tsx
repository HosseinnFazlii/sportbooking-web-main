import { Grid, RismunLogo, Table, TableBody, TableFooter, TableHead, TableRow, Typography } from "@mf-core/core-ui";
import { ITicketReport } from "@mf-core/sportbooking-core";
import { CreatorCell, DateCell, IdCell, PageContent, RowNumberCell, StyledTableCell, TimeCell, TimeCellHead, TitleCell } from "./styles";
import { formatDate, getSum } from "./helpder-function";
import { ReactNode } from "react";

export const ticketsCountInReportPage = 16;

export const getPageHeader = (ticketTypeName: string | undefined, pageNumber: number, subTitle?: string) => (
    <Grid container justifyContent="space-between" alignItems="center" spacing={4} sx={{ pt: "1rem" }}>
        <Grid item>
            <RismunLogo width={130} themeBasedColor="lighten" />
        </Grid>
        <Grid item>
            <Grid container direction="column" spacing={3}>
                <Typography variant="caption" color="#666">گزارش تیکت‌های {ticketTypeName}</Typography>
                {subTitle && (<Typography variant="caption" color="#666">{subTitle}</Typography>)}
                <Typography variant="caption" color="#666">صفحه {pageNumber}</Typography>
            </Grid>
        </Grid>
    </Grid>
)

export const generateTablePage = (data: ITicketReport[], pageNumber: number, ticketTypeName: string, groupName: string, withTime: boolean, subPageNumber?: number, totalPages?: number): ReactNode => {
    const isLastPage = subPageNumber !== undefined && totalPages ? subPageNumber === totalPages - 1 : true;
    return (
        <PageContent className="print-page-break page-style">
            {getPageHeader(ticketTypeName, pageNumber + (subPageNumber || 0), `گروه ${groupName}`)}
            {!subPageNumber && (<Typography variant="h5" sx={{ padding: "1rem", color: "#666" }}>{`تیکت‌های گروه ${groupName}`}</Typography>)}
            <Table>
                <TableHead>
                    <TableRow sx={{ backgroundColor: "#EEE" }}>
                        <StyledTableCell><RowNumberCell>#</RowNumberCell></StyledTableCell>
                        <StyledTableCell><IdCell>شماره</IdCell></StyledTableCell>
                        <StyledTableCell><TitleCell>موضوع</TitleCell></StyledTableCell>
                        <StyledTableCell><CreatorCell>سازنده</CreatorCell></StyledTableCell>
                        <StyledTableCell><DateCell>آخرین اقدام</DateCell></StyledTableCell>
                        {withTime && (<StyledTableCell><TimeCellHead>برنامه‌ نویس</TimeCellHead></StyledTableCell>)}
                        {withTime && (<StyledTableCell><TimeCellHead>مدیر پروژه</TimeCellHead></StyledTableCell>)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((item, index) => (
                        <TableRow key={index}>
                            <StyledTableCell><RowNumberCell>{((subPageNumber || 0) * ticketsCountInReportPage) + (index + 1)}</RowNumberCell></StyledTableCell>
                            <StyledTableCell><IdCell>{item.ticketId}</IdCell></StyledTableCell>
                            <StyledTableCell><TitleCell>{item.title}</TitleCell></StyledTableCell>
                            <StyledTableCell><CreatorCell>{item.createdByUser.name}</CreatorCell></StyledTableCell>
                            <StyledTableCell><DateCell>{formatDate(item.editedAt || item.createdAt)}</DateCell></StyledTableCell>
                            {withTime && (<StyledTableCell><TimeCell>{item.serviceType1}</TimeCell></StyledTableCell>)}
                            {withTime && (<StyledTableCell><TimeCell>{item.serviceType8}</TimeCell></StyledTableCell>)}
                        </TableRow>
                    ))}
                </TableBody>
                {isLastPage && (
                    <TableFooter>
                        <TableRow sx={{ backgroundColor: "#EEE", fontWeight: "bold" }}>
                            <StyledTableCell sx={{ fontWeight: "bold" }} colSpan={5}>{withTime ? "مجموع (" : ""}{`تعداد ${((subPageNumber || 0) * ticketsCountInReportPage) + data.length} تیکت`}{withTime ? ")" : ""}</StyledTableCell>
                            {withTime && (<StyledTableCell sx={{ fontWeight: "bold" }}>{getSum(data, "serviceType1")}</StyledTableCell>)}
                            {withTime && (<StyledTableCell sx={{ fontWeight: "bold" }}>{getSum(data, "serviceType8")}</StyledTableCell>)}
                        </TableRow>
                    </TableFooter>
                )}
            </Table>
        </PageContent>
    );
}

export const generateTable = (data: ITicketReport[], pageNumber: number, ticketTypeName: string, groupName: string, withTime: boolean, subPageNumber?: number, totalPages?: number): ReactNode[] => {
    if (data.length > ticketsCountInReportPage) {
        const pages = [];
        const numberOfPages = Math.ceil(data.length / ticketsCountInReportPage);
        for (let i = 0; i < numberOfPages; i++) {
            pages.push(generateTablePage(data.slice(i * ticketsCountInReportPage, (i + 1) * ticketsCountInReportPage), pageNumber + (subPageNumber || 0), ticketTypeName, groupName, withTime, i, numberOfPages));
        }
        return pages;
    }

    return [
        generateTablePage(data, pageNumber, ticketTypeName, groupName, withTime, subPageNumber, totalPages)
    ];
}

export const renderPages = (ticketsByGroups: Array<{ fieldId: number; items: ITicketReport[]; }> | undefined, withTime: boolean, ticketTypeName: string, groupsKeyValue: { [key: number]: string; }) => {
    if (!ticketsByGroups) {
        return null;
    }
    const initPageNumber = 2;
    let pageNumber = initPageNumber;
    const pages = [];
    for (let i = 0; i < ticketsByGroups.length; i++) {
        const group = ticketsByGroups[i];
        pages.push(
            ...generateTable(group.items, pageNumber, ticketTypeName || "", groupsKeyValue[group.fieldId], withTime)
        );
        pageNumber = initPageNumber + pages.length;
    }

    return pages;
}
