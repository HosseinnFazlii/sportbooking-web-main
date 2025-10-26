import { ChangeEvent, FC, useEffect } from 'react';
import { ActionForm, Card, CardContent, Divider, FormControl, Grid, InputLabel, MenuItem, RismunLogo, Select, SelectChangeEvent, TextField, toast } from '@mf-core/core-ui';
import { useAllCompanies, useCompany, ICompany } from '@mf-core/sportbooking-core';

interface ICompaniesEdit {
    companyId: number;
    isNew: boolean;
    handleBack?: () => void
    handleBackAndReload?: () => void
}

export const CompaniesEdit: FC<ICompaniesEdit> = ({ companyId, isNew, handleBack, handleBackAndReload }) => {
    const companies = useAllCompanies();
    const company = useCompany(isNew ? undefined : companyId);

    useEffect(() => {
        if (isNew) {
            company.clearData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isNew]);

    const handleSelectChange = (columnName: keyof ICompany) => (event: SelectChangeEvent<number>) => {
        company.updateLocalData({ [columnName]: event.target.value });
    }

    const handleTextChange = (columnName: keyof ICompany) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        company.updateLocalData({ [columnName]: event.target.value });
    }

    const handleSubmit = async (): Promise<{ success: boolean, rowId?: number }> => {
        const { createdByUser, companyId, createdBy, createdAt, ...serverData } = company.item;

        if (!serverData.name || serverData.name.trim().length === 0) {
            toast.error("لطفا عنوان واحد سازمان را مشخص کنید");
            return { success: false };
        }

        const toastId = toast.loading(isNew ? "در حال ثبت واحد سازمان جدید ..." : "در حال ثبت تغییرات واحد سازمان ...");

        const response = await company.updateServerData(serverData);// {"data":null}

        toast.dismiss(toastId);
        if (response.error) {
            toast.error(response.error);
            return { success: false };
        } else {
            if (isNew) {
                company.updateLocalData(response.data);
                toast.success("واحد سازمان با موفقیت ثبت شد");
                return { success: true, rowId: response.data.companyId };
            } else {
                if (!response || !response.data) {
                    toast.error("خطا در هنگام ذخیره واحد سازمان. لطفا مجددا تلاش کنید");
                    return { success: false };
                } else {
                    company.updateLocalData(response.data);
                    toast.success("واحد سازمان با موفقیت تغییر پیدا کرد.");
                    return { success: true, rowId: response.data.companyId };
                }
            }
        }
    }

    const companyHandleBackAndReload = () => {
        if (handleBackAndReload) {
            handleBackAndReload();
        }
        company.reload();
    }

    return (
        <ActionForm
            headerPrintLogo={<RismunLogo height={64} themeBasedColor="lighten" />}
            title={`کورتیک - ${isNew ? "" : "ویرایش"} واحد سازمان ${isNew ? "جدید" : ""}`}
            submitButton={{
                label: isNew ? "ثبت واحد سازمان" : "ویرایش واحد سازمان",
                onClick: handleSubmit
            }}
            backButton={{
                onClick: handleBack,
                url: handleBack ? undefined : "/management/companies"
            }}
            disable={company.isLoading}
            afterSubmit={{
                viewRecord: {
                    getUrl: (rowId?: number) => `/management/companies/edit/${rowId}`
                },
                clearRecord: {
                    clear: company.clearData
                },
                backToURL: {
                    onClick: handleBackAndReload ? companyHandleBackAndReload : undefined,
                }
            }}
            hidePrintButton={true}
        >
            <Card>
                <CardContent>
                    <Grid container spacing={4}>
                        <Grid item xl={12} xs={12}>
                            <Grid container direction="row" spacing={4}>
                                <Grid item xl={12} xs={12}>
                                    <FormControl fullWidth disabled={company.isLoading}>
                                        <InputLabel id='company-select'>انتخاب واحد سازمانی اصلی</InputLabel>
                                        <Select
                                            fullWidth
                                            value={(companies.items.data.length > 0 ? company.item.parentId : "") || ""}
                                            label="واحد سازمانی اصلی"
                                            labelId='company-select'
                                            sx={{ mb: 4 }}
                                            onChange={handleSelectChange("parentId")}
                                        >
                                            {
                                                companies.items.data.filter(f => f.companyId !== company.item.companyId).map(m => (<MenuItem key={m.companyId} value={m.companyId}>{m.name}</MenuItem>))
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
                <Divider />

                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12} xl={12}>
                            <TextField
                                fullWidth
                                label="نام"
                                InputProps={{ inputProps: { min: 0 } }}
                                value={company.item.name}
                                onChange={handleTextChange("name")}
                                disabled={company.isLoading}
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </ActionForm>
    );
}