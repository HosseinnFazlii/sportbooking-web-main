import { FC } from "react";
import { ButtonDialog, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography, toast } from "@mf-core/core-ui"
import { useAllTicketPriorities, ITicket, IDataHookById } from "@mf-core/sportbooking-core";

export interface IChangePriority {
    ticket: IDataHookById<ITicket>;
}

export const ChangePriority: FC<IChangePriority> = ({ ticket }) => {
    const priorities = useAllTicketPriorities();
    if (!priorities || !ticket) {
        return null;
    }

    const optionsKeyValue = priorities.items.data.reduce((a, c) => { a[c.ticketPriorityId] = c.name; return a; }, {} as { [key: string]: string });
    const couldNotChange = priorities.items.data.filter(f => f.ticketPriorityId !== ticket.item.ticketPriorityId).length === 0;

    if (couldNotChange) {
        return (
            <Typography component="span" variant="caption" color="error">امکان تغییر اولویت تیکت برای شما وجود ندارد.</Typography>
        )
    }

    const handleSelectChange = (event: SelectChangeEvent<number>) => {
        if (event.target.value) {
            ticket.updateLocalData({ ticketPriorityId: event.target.value as number });
        }
    }

    const updateTicket = async () => {
        const toastId = toast.loading(`در حال تغییر اولویت ...`);
        await ticket.updateServerData({ ticketPriorityId: ticket.item.ticketPriorityId });
        toast.dismiss(toastId);
        toast.success("اولویت تیکت تغییر پیدا کرد.");
        ticket.reload();

        return true;
    };

    return (
        <ButtonDialog
            key="ticket-change-button-dialog"
            mainButtonLabel="تغییر اولویت"
            mainButtonProps={{
                fullWidth: true,
                variant: 'outlined',
                sx: { marginTop: "1rem" }
            }}
            disabled={ticket.isLoading}
            submit={updateTicket}
            submitLabel="تغییر اولویت"
            dialogTitle={`تغییر اولویت تیکت شماره ${ticket.item.ticketId}`}
            dialogText={
                <>
                    <Typography component="span" variant="caption">لطفا اولویت جدید را انتخاب کنید. اولویت جاری این تیکت </Typography>
                    <Typography component="span" variant="body1">&quot;{optionsKeyValue[ticket.originalItem.ticketPriorityId]}&quot;</Typography>
                    <Typography component="span" variant="caption"> می باشد.</Typography>
                </>
            }
        >
            <FormControl fullWidth sx={{ mt: "1rem" }} disabled={ticket.isLoading}>
                <InputLabel id='ticket-change-select'>انتخاب اولویت</InputLabel>
                <Select
                    fullWidth
                    value={ticket.item.ticketPriorityId === ticket.originalItem.ticketPriorityId ? "" : ticket.item.ticketPriorityId}
                    label="انتخاب اولویت"
                    labelId='ticket-change-select'
                    sx={{ mb: 4 }}
                    onChange={handleSelectChange}
                >
                    {
                        priorities.items.data.filter(f => f.ticketPriorityId !== ticket.originalItem.ticketPriorityId).map(m => (<MenuItem key={m.ticketPriorityId} value={m.ticketPriorityId}>{m.name}</MenuItem>))
                    }
                </Select>
            </FormControl>
        </ButtonDialog>
    )
}