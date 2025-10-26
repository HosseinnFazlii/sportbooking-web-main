import { ChangeEvent, FC, useEffect } from 'react';
import { ActionForm, Card, CardContent, Divider, FormControl, Grid, InputLabel, MenuItem, RismunLogo, Select, SelectChangeEvent, TextField, toast } from '@mf-core/core-ui';
import { useAllCompanies, IGroup, useGroup } from '@mf-core/sportbooking-core';

interface IGroupsEdit {
    groupId: number;
    isNew: boolean;
    handleBack?: () => void
    handleBackAndReload?: () => void
}

export const GroupsEdit: FC<IGroupsEdit> = ({ groupId, isNew, handleBack, handleBackAndReload }) => {
    const companies = useAllCompanies();
    const group = useGroup(isNew ? undefined : groupId);

    useEffect(() => {
        if (isNew) {
            group.clearData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isNew]);

    const handleSelectChange = (columnName: keyof IGroup) => (event: SelectChangeEvent<number>) => {
        group.updateLocalData({ [columnName]: event.target.value });
    }

    const handleTextChange = (columnName: keyof IGroup) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        group.updateLocalData({ [columnName]: event.target.value });
    }

    const handleSubmit = async (): Promise<{ success: boolean, rowId?: number }> => {
        const { createdByUser, groupId, createdBy, createdAt, ...serverData } = group.item;

        if (!serverData.name || serverData.name.trim().length === 0) {
            toast.error("لطفا عنوان گروه را مشخص کنید");
            return { success: false };
        }

        const toastId = toast.loading(isNew ? "در حال ثبت گروه جدید ..." : "در حال ثبت تغییرات گروه ...");

        const response = await group.updateServerData(serverData);// {"data":null}

        toast.dismiss(toastId);
        if (response.error) {
            toast.error(response.error);
            return { success: false };
        } else {
            if (isNew) {
                group.updateLocalData(response.data);
                toast.success("گروه با موفقیت ثبت شد");
                return { success: true, rowId: response.data.groupId };
            } else {
                if (!response || !response.data) {
                    toast.error("خطا در هنگام ذخیره گروه. لطفا مجددا تلاش کنید");
                    return { success: false };
                } else {
                    group.updateLocalData(response.data);
                    toast.success("گروه با موفقیت تغییر پیدا کرد.");
                    return { success: true, rowId: response.data.groupId };
                }
            }
        }
    }

    const groupHandleBackAndReload = () => {
        if (handleBackAndReload) {
            handleBackAndReload();
        }
        group.reload();
    }

    return (
        <ActionForm
            headerPrintLogo={<RismunLogo height={64} themeBasedColor="lighten" />}
            title={`کورتیک - ${isNew ? "" : "ویرایش"} گروه ${isNew ? "جدید" : ""}`}
            submitButton={{
                label: isNew ? "ثبت گروه" : "ویرایش گروه",
                onClick: handleSubmit
            }}
            backButton={{
                onClick: handleBack,
                url: handleBack ? undefined : "/management/groups"
            }}
            disable={group.isLoading}
            afterSubmit={{
                viewRecord: {
                    getUrl: (rowId?: number) => `/management/groups/edit/${rowId}`
                },
                clearRecord: {
                    clear: group.clearData
                },
                backToURL: {
                    onClick: handleBackAndReload ? groupHandleBackAndReload : undefined,
                }
            }}
            hidePrintButton={true}
        >
            <Card>
                <CardContent>
                    <Grid container spacing={4}>
                        <Grid item xl={12} xs={12}>
                            <Grid container direction="row" spacing={4}>
                                <Grid item xl={4} xs={12}>
                                    <FormControl fullWidth disabled={group.isLoading}>
                                        <InputLabel id='company-select'>انتخاب واحد سازمانی</InputLabel>
                                        <Select
                                            fullWidth
                                            value={(companies.items.data.length > 0 ? group.item.companyId : "") || ""}
                                            label="انتخاب واحد سازمانی"
                                            labelId='company-select'
                                            sx={{ mb: 4 }}
                                            onChange={handleSelectChange("companyId")}
                                        >
                                            {
                                                companies.items.data.map(m => (<MenuItem key={m.companyId} value={m.companyId}>{m.name}</MenuItem>))
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xl={4} xs={12}>
                                    <FormControl fullWidth disabled={group.isLoading}>
                                        <InputLabel id='type-select'>وضعیت فعال بودن گروه</InputLabel>
                                        <Select
                                            fullWidth
                                            value={group.item.isActive ? 1 : 0}
                                            label="وضعیت فعال بودن گروه"
                                            labelId='type-select'
                                            sx={{ mb: 4 }}
                                            onChange={handleSelectChange("isActive")}
                                        >
                                            <MenuItem key={0} value={0}>غیرفعال</MenuItem>
                                            <MenuItem key={1} value={1}>فعال</MenuItem>
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
                        <Grid item xs={12} xl={6}>
                            <TextField
                                fullWidth
                                label="نام گروه تیکت"
                                InputProps={{ inputProps: { min: 0 } }}
                                value={group.item.name}
                                onChange={handleTextChange("name")}
                                disabled={group.isLoading}
                            />
                        </Grid>
                        <Grid item xs={12} xl={6}>
                            <TextField
                                fullWidth
                                label="اولویت"
                                InputProps={{ inputProps: { min: 0 } }}
                                value={group.item.priority || ""}
                                onChange={handleTextChange("priority")}
                                disabled={group.isLoading}
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </ActionForm>
    );
}
