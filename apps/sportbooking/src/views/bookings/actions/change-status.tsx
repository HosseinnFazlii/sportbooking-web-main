import { FC } from "react";
import { ButtonDialog, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography, toast } from "@mf-core/core-ui"
import { useAllStatuses, ITicket, IDataHookById } from "@mf-core/sportbooking-core";

export interface IChangeStatus {
    ticket: IDataHookById<ITicket>;
}

export const ChangeStatus: FC<IChangeStatus> = ({ ticket }) => {
    const statuses = useAllStatuses();
    if (!statuses || !ticket) {
        return null;
    }

    const optionsKeyValue = statuses.items.data.reduce((a, c) => { a[c.statusId] = c.name; return a; }, {} as { [key: string]: string });
    const couldNotChange = statuses.items.data.filter(f => f.statusId !== ticket.item.statusId).length === 0;

    if (couldNotChange) {
        return (
            <Typography component="span" variant="caption" color="error">امکان تغییر وضعیت تیکت برای شما وجود ندارد.</Typography>
        )
    }

    const handleSelectChange = (event: SelectChangeEvent<number>) => {
        if (event.target.value) {
            ticket.updateLocalData({ statusId: event.target.value as number });
        }
    }

    const updateTicket = async () => {
        const toastId = toast.loading(`در حال تغییر وضعیت ...`);
        await ticket.updateServerData({ statusId: ticket.item.statusId });
        toast.dismiss(toastId);
        toast.success("وضعیت تیکت تغییر پیدا کرد.");
        ticket.reload();

        return true;
    };

    return (
        <ButtonDialog
            key="ticket-change-button-dialog"
            mainButtonLabel="تغییر وضعیت"
            mainButtonProps={{
                fullWidth: true,
                variant: 'outlined',
                sx: { marginTop: "1rem" }
            }}
            disabled={ticket.isLoading}
            submit={updateTicket}
            submitLabel="تغییر وضعیت"
            dialogTitle={`تغییر وضعیت تیکت شماره ${ticket.item.ticketId}`}
            dialogText={
                <>
                    <Typography component="span" variant="caption">لطفا وضعیت جدید را انتخاب کنید. وضعیت جاری این تیکت </Typography>
                    <Typography component="span" variant="body1">&quot;{optionsKeyValue[ticket.originalItem.statusId]}&quot;</Typography>
                    <Typography component="span" variant="caption"> می باشد.</Typography>
                </>
            }
            onClose={ticket.resetToOriginal}
        >
            <FormControl fullWidth sx={{ mt: "1rem" }} disabled={ticket.isLoading}>
                <InputLabel id='ticket-change-select'>انتخاب وضعیت</InputLabel>
                <Select
                    fullWidth
                    value={ticket.item.statusId === ticket.originalItem.statusId ? "" : ticket.item.statusId}
                    label="انتخاب وضعیت"
                    labelId='ticket-change-select'
                    sx={{ mb: 4 }}
                    onChange={handleSelectChange}
                >
                    {
                        statuses.items.data.filter(f => f.statusId !== ticket.originalItem.statusId).map(m => (<MenuItem key={m.statusId} value={m.statusId}>{m.name}</MenuItem>))
                    }
                </Select>
            </FormControl>
        </ButtonDialog>
    )
}