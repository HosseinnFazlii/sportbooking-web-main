import { FC } from "react";
import { ButtonDialog, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography, toast } from "@mf-core/core-ui"
import { useAllGroups, ITicket, IDataHookById } from "@mf-core/sportbooking-core";

export interface IChangeGroup {
    ticket: IDataHookById<ITicket>;
}

export const ChangeGroup: FC<IChangeGroup> = ({ ticket }) => {
    const groups = useAllGroups();
    if (!groups || !ticket) {
        return null;
    }

    const optionsKeyValue = groups.items.data.reduce((a, c) => { a[c.groupId] = c.name; return a; }, {} as { [key: string]: string });
    const couldNotChange = groups.items.data.filter(f => f.groupId !== ticket.item.groupId).length === 0;

    if (couldNotChange) {
        return (
            <Typography component="span" variant="caption" color="error">امکان تغییر گروه تیکت برای شما وجود ندارد.</Typography>
        );
    }

    const handleSelectChange = (event: SelectChangeEvent<number>) => {
        if (event.target.value) {
            ticket.updateLocalData({ groupId: event.target.value as number });
        }
    }

    const updateTicket = async () => {
        const toastId = toast.loading(`در حال تغییر گروه ...`);
        await ticket.updateServerData({ groupId: ticket.item.groupId });
        toast.dismiss(toastId);
        toast.success("گروه تیکت تغییر پیدا کرد.");
        ticket.reload();

        return true;
    };

    return (
        <ButtonDialog
            key="ticket-change-button-dialog"
            mainButtonLabel="تغییر گروه"
            mainButtonProps={{
                fullWidth: true,
                variant: 'outlined',
                sx: { marginTop: "1rem" }
            }}
            disabled={ticket.isLoading}
            submit={updateTicket}
            submitLabel="تغییر گروه"
            dialogTitle={`تغییر گروه تیکت شماره ${ticket.item.ticketId}`}
            dialogText={
                <>
                    <Typography component="span" variant="caption">لطفا گروه جدید را انتخاب کنید. گروه جاری این تیکت </Typography>
                    <Typography component="span" variant="body1">&quot;{optionsKeyValue[ticket.originalItem.groupId]}&quot;</Typography>
                    <Typography component="span" variant="caption"> می باشد.</Typography>
                </>
            }
        >
            <FormControl fullWidth sx={{ mt: "1rem" }} disabled={ticket.isLoading}>
                <InputLabel id='ticket-change-select'>انتخاب گروه</InputLabel>
                <Select
                    fullWidth
                    value={ticket.item.groupId === ticket.originalItem.groupId ? "" : ticket.item.groupId}
                    label="انتخاب گروه"
                    labelId='ticket-change-select'
                    sx={{ mb: 4 }}
                    onChange={handleSelectChange}
                >
                    {
                        groups.items.data.filter(f => f.groupId !== ticket.originalItem.groupId).map(m => (<MenuItem key={m.groupId} value={m.groupId}>{m.name}</MenuItem>))
                    }
                </Select>
            </FormControl>
        </ButtonDialog>
    )
}