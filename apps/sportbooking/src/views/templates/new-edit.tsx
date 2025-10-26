import { ChangeEvent, FC } from 'react';
import { ActionForm, Card, CardContent, Divider, FormControl, Grid, InputLabel, MenuItem, RismunLogo, Select, SelectChangeEvent, TextField, toast } from '@mf-core/core-ui';
import { useAllTicketTypes, useAllTicketPriorities, useAllGroups, useTicketTemplate, ITicketTemplate } from '@mf-core/sportbooking-core';

interface ITicketTemplatesEdit {
    templateId: number;
    isNew: boolean;
    handleBack?: () => void
    handleBackAndReload?: () => void
}

export const TicketTemplatesEdit: FC<ITicketTemplatesEdit> = ({ templateId, isNew, handleBack, handleBackAndReload }) => {
    const ticketTypes = useAllTicketTypes();
    const ticketPriorities = useAllTicketPriorities();
    const groups = useAllGroups();

    const ticketTemplate = useTicketTemplate(isNew ? undefined : templateId);

    const handleSelectChange = (columnName: keyof ITicketTemplate) => (event: SelectChangeEvent<number>) => {
        ticketTemplate.updateLocalData({ [columnName]: event.target.value });
    }

    const handleTextChange = (columnName: keyof ITicketTemplate) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        ticketTemplate.updateLocalData({ [columnName]: event.target.value });
    }

    const handleSubmit = async (): Promise<{ success: boolean, rowId?: number }> => {
        const { createdByUser, ticketPriority, ticketTemplateId, group, ticketType, createdBy, createdAt, ...serverData } = ticketTemplate.item;
        if (!serverData.title || serverData.title.trim().length === 0) {
            toast.error("لطفا عنوان قالب را مشخص کنید");
            return { success: false };
        }

        const toastId = toast.loading(isNew ? "در حال ثبت قالب جدید ..." : "در حال ثبت تغییرات قالب ...");
        if (!serverData.ticketTypeId)
            delete serverData.ticketTypeId;
        if (!serverData.ticketPriorityId)
            delete serverData.ticketPriorityId;
        if (!serverData.ticketTypeId)
            delete serverData.ticketTypeId;
        if (!serverData.groupId)
            delete serverData.groupId;

        const response = await ticketTemplate.updateServerData(serverData);// {"data":null}

        toast.dismiss(toastId);
        if (response.error) {
            toast.error(response.error);
            return { success: false };
        } else {
            if (isNew) {
                ticketTemplate.updateLocalData(response.data);
                toast.success("قالب با موفقیت ثبت شد");
                return { success: true, rowId: response.data.ticketTemplateId };
            } else {
                if (!response || !response.data) {
                    toast.error("خطا در هنگام ذخیره قالب. لطفا مجددا تلاش کنید");
                    return { success: false };
                } else {
                    ticketTemplate.updateLocalData(response.data);
                    toast.success("قالب با موفقیت تغییر پیدا کرد.");
                    return { success: true, rowId: response.data.ticketTemplateId };
                }
            }
        }
    }

    return (
        <ActionForm
            headerPrintLogo={<RismunLogo height={64} themeBasedColor="lighten" />}
            title={`کورتیک - ${isNew ? "" : "ویرایش"} قالب ${isNew ? "جدید" : ""}`}
            submitButton={{
                label: isNew ? "ثبت قالب" : "ویرایش قالب",
                onClick: handleSubmit
            }}
            backButton={{
                onClick: handleBack,
                url: handleBack ? undefined : "/sportbooking/templates"
            }}
            disable={ticketTemplate.isLoading}
            afterSubmit={{
                viewRecord: {
                    getUrl: (rowId?: number) => `/sportbooking/templates/edit/${rowId}`
                },
                clearRecord: {
                    clear: ticketTemplate.clearData
                },
                backToURL: {
                    onClick: handleBackAndReload
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
                                    <FormControl fullWidth disabled={ticketTemplate.isLoading}>
                                        <InputLabel id='group-select'>انتخاب گروه</InputLabel>
                                        <Select
                                            fullWidth
                                            value={(groups.items.data.length > 0 ? ticketTemplate.item.groupId : "") || ""}
                                            label="انتخاب گروه"
                                            labelId='group-select'
                                            sx={{ mb: 4 }}
                                            onChange={handleSelectChange("groupId")}
                                        >
                                            {
                                                groups.items.data.map(m => (<MenuItem key={m.groupId} value={m.groupId}>{m.name}</MenuItem>))
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xl={4} xs={12}>
                                    <FormControl fullWidth disabled={ticketTemplate.isLoading}>
                                        <InputLabel id='type-select'>نوع</InputLabel>
                                        <Select
                                            fullWidth
                                            value={(ticketTypes.items.data.length > 0 ? ticketTemplate.item.ticketTypeId : "") || ""}
                                            label="نوع"
                                            labelId='type-select'
                                            sx={{ mb: 4 }}
                                            onChange={handleSelectChange("ticketTypeId")}
                                        >
                                            {
                                                ticketTypes.items.data.map(m => (<MenuItem key={m.ticketTypeId} value={m.ticketTypeId}>{m.name}</MenuItem>))
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xl={4} xs={12}>
                                    <FormControl fullWidth disabled={ticketTemplate.isLoading}>
                                        <InputLabel id='priority-select'>اولویت</InputLabel>
                                        <Select
                                            fullWidth
                                            value={(ticketPriorities.items.data.length > 0 ? ticketTemplate.item.ticketPriorityId : "") || ""}
                                            label="اولویت"
                                            labelId='priority-select'
                                            sx={{ mb: 4 }}
                                            onChange={handleSelectChange("ticketPriorityId")}
                                        >
                                            {
                                                ticketPriorities.items.data.map(m => (<MenuItem key={m.ticketPriorityId} value={m.ticketPriorityId}>{m.name}</MenuItem>))
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xl={12} xs={12}>
                            <TextField
                                fullWidth
                                label="عنوان"
                                InputProps={{ inputProps: { min: 0 } }}
                                value={ticketTemplate.item.title}
                                onChange={handleTextChange("title")}
                                disabled={ticketTemplate.isLoading}
                            />
                        </Grid>
                    </Grid>
                </CardContent>
                <Divider />

                <CardContent>
                    <Grid container>
                        <Grid item xs={12} xl={12}>
                            <TextField
                                fullWidth
                                label="متن"
                                size='small'
                                multiline={true}
                                minRows={10}
                                value={ticketTemplate.item.firstMessage || ""}
                                onChange={handleTextChange("firstMessage")}
                                disabled={ticketTemplate.isLoading}
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </ActionForm>
    );
}