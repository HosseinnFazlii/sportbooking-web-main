import { ChangeEvent, useCallback, useMemo, useRef, useState } from "react";
import { Box, Button, Card, CardContent, DatePicker, Divider, FormControl, Grid, Icon, InputLabel, LoadingButton, MenuItem, RadioIcon, RismunLogo, Select, SelectChangeEvent, Table, TableBody, TableFooter, TableHead, TableRow, Typography, axiosInstance, getURLWithVersion, toast, useDateUtils } from "@mf-core/core-ui"
import { ITicketReport, useAllCompanies, useAllGroups, useAllTicketTypes } from "@mf-core/sportbooking-core";
import { useReactToPrint } from "react-to-print";
import { IDoneTicketsFilters } from "../../../views/reports/done-tickets/types";
import { getSum, groupBySumHours, groupByToArray } from "../../../views/reports/done-tickets/helpder-function";
import { FirstPageContent, PageContent, StyledTableCell } from "../../../views/reports/done-tickets/styles";
import { getPageHeader, renderPages } from "../../../views/reports/done-tickets/render-pages";

const DoneTicketsPage = () => {
    const { format, getYear, getMonth } = useDateUtils();
    const defaultReportsFilters = useMemo(() => ({
        companyId: 0,
        ticketTypeId: 1,
        filterDate: new Date(),
    }), []);

    const ticketTypes = useAllTicketTypes();
    const companies = useAllCompanies();
    const groups = useAllGroups();
    const [loading, setLoading] = useState<boolean>(false);
    const [filters, setFilters] = useState<IDoneTicketsFilters>(defaultReportsFilters);
    const [data, setData] = useState<ITicketReport[]>();
    const componentRef = useRef<HTMLDivElement>(null);

    const groupsKeyValue = useMemo(() => {
        return groups.items.data.reduce((a, c) => { a[c.groupId] = c.name; return a; }, {} as { [key: number]: string });
    }, [groups.items.data]);

    const handleRadioChange = useCallback((newValue: number | ChangeEvent<HTMLInputElement>) => {
        if (typeof newValue === 'number') {
            setFilters(oldFilters => ({ ...oldFilters, ticketTypeId: newValue }));
        } else {
            setFilters(oldFilters => ({ ...oldFilters, ticketTypeId: parseInt((newValue.target as HTMLInputElement).value) }));
        }
    }, []);

    const handleChangeDate = useCallback((newValue: Date | undefined | null) => {
        setFilters(oldFilters => ({ ...oldFilters, filterDate: newValue || defaultReportsFilters.filterDate }));
    }, [defaultReportsFilters.filterDate]);

    const handleSelectChange = useCallback((event: SelectChangeEvent<number>) => {
        setFilters(oldFilters => ({ ...oldFilters, companyId: parseInt(String(event.target.value)) || defaultReportsFilters.companyId }));
    }, [defaultReportsFilters.companyId]);

    const generateReport = useCallback(async () => {
        const toastId = toast.loading("در حال تولید گزارش ...");
        setLoading(true);
        const activeDate = filters.filterDate ?? new Date();
        const url = getURLWithVersion(`reports/doneTickets/${filters.companyId}/${filters.ticketTypeId}/${getYear(activeDate)}/${getMonth(activeDate) + 1}`);
        const { data } = await axiosInstance.get(url);
        setData(data);
        setLoading(false);
        toast.dismiss(toastId);

        console.log(data);

    }, [filters.companyId, filters.filterDate, filters.ticketTypeId, getMonth, getYear]);

    const ticketTypeName = useMemo(() => {
        return ticketTypes.items.data.filter(f => f.ticketTypeId === filters.ticketTypeId).pop()?.name;
    }, [filters.ticketTypeId, ticketTypes.items.data]);

    const ticketsByGroups = useMemo(() => {
        if (data) {
            return groupByToArray(data, "groupId");
        }
    }, [data]);

    const ticketsByGroupsSumHours = useMemo(() => {
        if (data) {
            return groupBySumHours(data, "groupId");
        }
    }, [data]);

    const withTime = useMemo(() => {
        return filters.ticketTypeId !== 1;
    }, [filters.ticketTypeId]);


    const reactToPrintContent = useCallback(() => {
        return componentRef.current;
    }, []);

    const handlePrint = useReactToPrint({
        content: reactToPrintContent,
        documentTitle: "گزارش تیکت‌ها",
        removeAfterPrint: true
    });

    return (
        <>
            <Card>
                <CardContent>
                    <Grid container spacing={5}>
                        {ticketTypes.items.data.map((item, index) => (
                            <Grid key={index} item xs={12} md={4}>
                                <RadioIcon
                                    data={{
                                        icon: item.icon,
                                        value: item.ticketTypeId,
                                        title: item.name,
                                        content: item.description
                                    }}
                                    name='ticket-type'
                                    selected={filters.ticketTypeId}
                                    gridProps={{ width: "100%" }}
                                    handleChange={handleRadioChange}
                                    disabled={loading || ticketTypes.isLoading}
                                />
                            </Grid>
                        ))}

                        <Grid item xs={12} md={4}>
                            <FormControl fullWidth disabled={loading || ticketTypes.isLoading}>
                                <InputLabel id='company-select'>انتخاب واحد سازمانی</InputLabel>
                                <Select
                                    fullWidth
                                    value={(companies.items.data.length > 0 && filters.companyId ? filters.companyId : "") || ""}
                                    label="واحد سازمانی"
                                    labelId='company-select'
                                    sx={{ mb: 4 }}
                                    onChange={handleSelectChange}
                                >
                                    {
                                        companies.items.data.map(m => (<MenuItem key={m.companyId} value={m.companyId}>{m.name}</MenuItem>))
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <FormControl fullWidth>
                                <DatePicker
                                    label={'انتخاب سال'}
                                    views={['year']}
                                    value={filters.filterDate}
                                    onChange={handleChangeDate}
                                    disabled={loading || ticketTypes.isLoading}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <FormControl fullWidth>
                                <DatePicker
                                    label={'انتخاب ماه'}
                                    views={['month']}
                                    value={filters.filterDate}
                                    onChange={handleChangeDate}
                                    disabled={loading || ticketTypes.isLoading}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                </CardContent>
                <Divider />
                <CardContent sx={{ textAlign: "right" }}>
                    {data && (
                        <Button sx={{ mr: 4 }} variant="outlined" onClick={handlePrint} startIcon={<Icon icon="mdi:printer-outline" />}>‌چاپ گزارش</Button>
                    )}
                    <LoadingButton
                        onClick={generateReport}
                        variant="contained"
                        loading={loading}
                        disabled={loading || ticketTypes.isLoading}
                    >تولید گزارش</LoadingButton>
                </CardContent>
            </Card>
            {data && (
                <Card
                    className="report-holder"
                    ref={componentRef}
                >
                    <FirstPageContent className="print-page-break first-page-style">
                        <Box sx={{ width: "50%" }}>
                            <RismunLogo themeBasedColor="lighten" />
                        </Box>
                        <Typography variant="h4" sx={{ pt: "1rem" }} color="#666">گزارش تیکت‌های {ticketTypeName}</Typography>
                        <Typography variant="h6" sx={{ pt: "1rem" }} color="#999">سال {getYear(filters.filterDate ?? new Date())} ماه {format(filters.filterDate ?? new Date(), "MMMM")}</Typography>
                    </FirstPageContent>
                    <PageContent className="print-page-break page-style">
                        {getPageHeader(ticketTypeName, 1)}
                        <Typography variant="h5" sx={{ padding: "1rem", color: "#666" }}>تیکت‌ها بر اساس گروه‌ها</Typography>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: "#EEE" }}>
                                    <StyledTableCell>نام گروه</StyledTableCell>
                                    <StyledTableCell>تعداد تیکت‌ها</StyledTableCell>
                                    {withTime && (<StyledTableCell>مجموع ساعت برنامه‌نویس</StyledTableCell>)}
                                    {withTime && (<StyledTableCell>مجموع ساعت مدیریت پروژه</StyledTableCell>)}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {ticketsByGroupsSumHours?.map((item, index) => (
                                    <TableRow key={index}>
                                        <StyledTableCell>{groupsKeyValue[item.fieldId]}</StyledTableCell>
                                        <StyledTableCell>{item.count.toLocaleString()}</StyledTableCell>
                                        {withTime && (<StyledTableCell>{item.sumServiceType1}</StyledTableCell>)}
                                        {withTime && (<StyledTableCell>{item.sumServiceType8}</StyledTableCell>)}
                                    </TableRow>
                                ))}
                            </TableBody>
                            <TableFooter>
                                <TableRow sx={{ backgroundColor: "#EEE", fontWeight: "bold" }}>
                                    <StyledTableCell sx={{ fontWeight: "bold" }}>مجموع</StyledTableCell>
                                    <StyledTableCell sx={{ fontWeight: "bold" }}>{data.length}</StyledTableCell>
                                    {withTime && (<StyledTableCell sx={{ fontWeight: "bold" }}>{getSum(data, "serviceType1")}</StyledTableCell>)}
                                    {withTime && (<StyledTableCell sx={{ fontWeight: "bold" }}>{getSum(data, "serviceType8")}</StyledTableCell>)}
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </PageContent>
                    {renderPages(ticketsByGroups, withTime, ticketTypeName || "", groupsKeyValue)}
                </Card >
            )}
        </>
    );
};
export default DoneTicketsPage;
