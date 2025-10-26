import { FC } from "react";
import { ButtonDialog, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography, toast } from "@mf-core/core-ui"
import { useAllTicketTypes, ITicket, IDataHookById } from "@mf-core/sportbooking-core";

export interface IChangeType {
    ticket: IDataHookById<ITicket>;
}

export const ChangeType: FC<IChangeType> = ({ ticket }) => {
    const ticketTypes = useAllTicketTypes();
    if (!ticketTypes || !ticket) {
        return null;
    }

    const optionsKeyValue = ticketTypes.items.data.reduce((a, c) => { a[c.ticketTypeId] = c.name; return a; }, {} as { [key: string]: string });
    const couldNotChange = ticketTypes.items.data.filter(f => f.ticketTypeId !== ticket.item.ticketTypeId).length === 0;

    if (couldNotChange) {
        return (
            <Typography component="span" variant="caption" color="error">امکان تغییر نوع تیکت برای شما وجود ندارد.</Typography>
        )
    }

    const handleSelectChange = (event: SelectChangeEvent<number>) => {
        if (event.target.value) {
            ticket.updateLocalData({ ticketTypeId: event.target.value as number });
        }
    }

    const updateTicket = async () => {
        const toastId = toast.loading(`در حال تغییر نوع ...`);
        await ticket.updateServerData({ ticketTypeId: ticket.item.ticketTypeId });
        toast.dismiss(toastId);
        toast.success("نوع تیکت تغییر پیدا کرد.");
        ticket.reload();

        return true;
    };

    return (
        <ButtonDialog
            key="ticket-change-button-dialog"
            mainButtonLabel="تغییر نوع"
            mainButtonProps={{
                fullWidth: true,
                variant: 'outlined',
                sx: { marginTop: "1rem" }
            }}
            disabled={ticket.isLoading}
            submit={updateTicket}
            submitLabel="تغییر نوع"
            dialogTitle={`تغییر نوع تیکت شماره ${ticket.item.ticketId}`}
            dialogText={
                <>
                    <Typography component="span" variant="caption">لطفا نوع جدید را انتخاب کنید. نوع جاری این تیکت </Typography>
                    <Typography component="span" variant="body1">&quot;{optionsKeyValue[ticket.originalItem.ticketTypeId]}&quot;</Typography>
                    <Typography component="span" variant="caption"> می باشد.</Typography>
                </>
            }
        >
            <FormControl fullWidth sx={{ mt: "1rem" }} disabled={ticket.isLoading}>
                <InputLabel id='ticket-change-select'>انتخاب نوع</InputLabel>
                <Select
                    fullWidth
                    value={ticket.item.ticketTypeId === ticket.originalItem.ticketTypeId ? "" : ticket.item.ticketTypeId}
                    label="انتخاب نوع"
                    labelId='ticket-change-select'
                    sx={{ mb: 4 }}
                    onChange={handleSelectChange}
                >
                    {
                        ticketTypes.items.data.filter(f => f.ticketTypeId !== ticket.originalItem.ticketTypeId).map(m => (<MenuItem key={m.ticketTypeId} value={m.ticketTypeId}>{m.name}</MenuItem>))
                    }
                </Select>
            </FormControl>
        </ButtonDialog>
    )
}