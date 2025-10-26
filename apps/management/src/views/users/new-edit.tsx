import { ChangeEvent, FC, useEffect } from 'react';
import { ActionForm, Card, CardContent, Divider, FormControl, Grid, InputLabel, MenuItem, PasswordBox, RismunLogo, Select, SelectChangeEvent, TextField, toast } from '@mf-core/core-ui';
import { useAllRoles, useUser, IUser, IRole } from '@mf-core/sportbooking-core';

interface IUsersEdit {
    userId: number;
    isNew: boolean;
    handleBack?: () => void
    handleBackAndReload?: () => void
}

export const UsersEdit: FC<IUsersEdit> = ({ userId, isNew, handleBack, handleBackAndReload }) => {
    const roles = useAllRoles();

    const user = useUser(isNew ? undefined : userId);

    useEffect(() => {
        if (isNew) {
            user.clearData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isNew]);

    const handleSelectChange = (columnName: keyof IUser) => (event: SelectChangeEvent<number | string>) => {
        const { value } = event.target;
        if (columnName === 'isActive') {
            user.updateLocalData({ isActive: Number(value) === 1 } as Partial<IUser>);
            return;
        }
        user.updateLocalData({ [columnName]: Number.isNaN(Number(value)) ? value : Number(value) } as Partial<IUser>);
    }

    const handleTextChange = (columnName: keyof IUser) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        user.updateLocalData({ [columnName]: event.target.value });
    }

    const handleStringChange = (columnName: keyof IUser) => (newValue: string) => {
        user.updateLocalData({ [columnName]: newValue });
    }

    const handleSubmit = async (): Promise<{ success: boolean, rowId?: number }> => {
        const { id: userId, createdAt, picture, teacherProfile, role, ...serverData } = user.item;

        if (!serverData.name || serverData.name.trim().length === 0) {
            toast.error("لطفا عنوان کاربر را مشخص کنید");
            return { success: false };
        }

        const toastId = toast.loading(isNew ? "در حال ثبت کاربر جدید ..." : "در حال ثبت تغییرات کاربر ...");

        const response = await user.updateServerData(serverData);// {"data":null}

        toast.dismiss(toastId);
        if (response.error) {
            toast.error(response.error);
            return { success: false };
        } else {
            if (isNew) {
                user.updateLocalData(response.data);
                toast.success("کاربر با موفقیت ثبت شد");
                return { success: true, rowId: response.data.id };
            } else {
                if (!response || !response.data) {
                    toast.error("خطا در هنگام ذخیره کاربر. لطفا مجددا تلاش کنید");
                    return { success: false };
                } else {
                    user.updateLocalData(response.data);
                    toast.success("کاربر با موفقیت تغییر پیدا کرد.");
                    return { success: true, rowId: response.data.id };
                }
            }
        }
    }

    const userHandleBackAndReload = () => {
        if (handleBackAndReload) {
            handleBackAndReload();
        }
        user.reload();
    }

    return (
        <ActionForm
            headerPrintLogo={<RismunLogo height={64} themeBasedColor="lighten" />}
            title={`کورتیک - ${isNew ? "" : "ویرایش"} کاربر ${isNew ? "جدید" : ""}`}
            submitButton={{
                label: isNew ? "ثبت کاربر" : "ویرایش کاربر",
                onClick: handleSubmit
            }}
            backButton={{
                onClick: handleBack,
                url: handleBack ? undefined : "/management/users"
            }}
            disable={user.isLoading}
            afterSubmit={{
                viewRecord: {
                    getUrl: (rowId?: number) => `/management/users/edit/${rowId}`
                },
                clearRecord: {
                    clear: user.clearData
                },
                backToURL: {
                    onClick: handleBackAndReload ? userHandleBackAndReload : undefined,
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
                                    <FormControl fullWidth disabled={user.isLoading}>
                                        <InputLabel id='company-select'>انتخاب واحد سازمانی</InputLabel>

                                    </FormControl>
                                </Grid>
                                <Grid item xl={4} xs={12}>
                                    <FormControl fullWidth disabled={user.isLoading}>
                                        <InputLabel id='type-select'>نقش</InputLabel>
                                        <Select
                                            fullWidth
                                            value={(roles.items.data.length > 0 ? user.item.roleId ?? '' : '')}
                                            label="نقش"
                                            labelId='type-select'
                                            sx={{ mb: 4 }}
                                            onChange={handleSelectChange("roleId")}
                                        >
                                            {
                                                roles.items.data.map((m: IRole) => (<MenuItem key={m.id} value={m.id}>{m.name}</MenuItem>))
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xl={4} xs={12}>
                                    <FormControl fullWidth disabled={user.isLoading}>
                                        <InputLabel id='type-select'>وضعیت فعال بودن کاربر</InputLabel>
                                        <Select
                                            fullWidth
                                            value={user.item.isActive ? 1 : 0}
                                            label="وضعیت فعال بودن کاربر"
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
                        <Grid item xs={12} xl={12}>
                            <TextField
                                fullWidth
                                label="نام و نام خانوادگی"
                                InputProps={{ inputProps: { min: 0 } }}
                                value={user.item.name}
                                onChange={handleTextChange("name" as keyof IUser)}
                                disabled={user.isLoading}
                            />
                        </Grid>
                        <Grid item xs={12} xl={6}>
                            <TextField
                                fullWidth
                                label="موبایل"
                                InputProps={{ inputProps: { min: 0 } }}
                                value={user.item.mobile ?? ""}
                                onChange={handleTextChange("mobile")}
                                disabled={user.isLoading}
                            />
                        </Grid>
                        <Grid item xs={12} xl={6}>
                            <TextField
                                fullWidth
                                label="ایمیل"
                                type="email"
                                InputProps={{ inputProps: { min: 0 } }}
                                value={user.item.email}
                                onChange={handleTextChange("email")}
                                disabled={user.isLoading}
                            />
                        </Grid>
                        <Grid item xs={12} xl={6}>
                            <PasswordBox sx={{ p: 2 }} label="رمزعبور" value={user.item.password || ""} onChange={handleStringChange("password")} />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </ActionForm>
    );
}
