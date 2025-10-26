import { ChangeEvent, FC, useState } from "react";
import { ButtonDialog, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography, toast } from "@mf-core/core-ui"
import { useAllServiceTypes, ITicket, ITicketServiceType, IDataHookById } from "@mf-core/sportbooking-core";

export interface IChangeServices {
    ticket: IDataHookById<ITicket>;
}

const compareServiceTypesArrays = (arr1: ITicketServiceType[], arr2: ITicketServiceType[]) => {
    if (arr1.length !== arr2.length) return true;

    return arr1.some(item1 => {
        const matchingItem = arr2.find(item2 =>
            item1.serviceTypeId === item2.serviceTypeId && item1.duration === item2.duration
        );
        return !matchingItem; // If no match is found, then return true indicating arrays are different
    });
}

export const ChangeServices: FC<IChangeServices> = ({ ticket }) => {
    const serviceTypes = useAllServiceTypes();
    const [messageText, setMessageText] = useState("");
    if (!serviceTypes || !ticket) {
        return null;
    }

    const handleSelectChange = (serviceTypeId: number) => (event: ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(event.target.value);
        if (value >= 0) {
            ticket.updateLocalData(
                {
                    serviceTypes:
                        [
                            ...(ticket.item.serviceTypes || []).filter(f => f.serviceTypeId !== serviceTypeId),
                            ...(value === 0 ? [] : [{
                                serviceTypeId,
                                duration: value,
                                ticketId: ticket.item.ticketId
                            } as ITicketServiceType
                            ])
                        ]
                }
            );
        }
    }

    const handleMessageTextChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setMessageText(event.target.value);
    }

    const updateTicket = async () => {
        if (compareServiceTypesArrays(ticket.originalItem.serviceTypes || [], ticket.item.serviceTypes || [])) {
            const toastId = toast.loading(`در حال ثبت زمان کارکرد ...`);
            await ticket.updateCustomServerData({ ticketServiceTypes: ticket.item.serviceTypes, messageText: messageText.trim() }, "ticket/ticketServiceTypes");
            toast.dismiss(toastId);
            toast.success("زمان کارکرد ثبت شد.");
            ticket.reload();

            return true;
        } else {
            return false;
        }
    };

    return (
        <ButtonDialog
            key="ticket-change-button-dialog"
            mainButtonLabel="ثبت زمان کارکرد"
            mainButtonProps={{
                fullWidth: true,
                variant: 'outlined',
                sx: { marginTop: "1rem" }
            }}
            disabled={ticket.isLoading}
            submit={updateTicket}
            submitLabel="ثبت زمان کارکرد"
            dialogTitle={`ثبت زمان کارکرد تیکت شماره ${ticket.item.ticketId}`}
            onClose={ticket.resetToOriginal}
        >
            <TextField
                label="توضیحات"
                multiline={true}
                minRows={3}
                value={messageText}
                sx={{ mt: "1rem" }}
                onChange={handleMessageTextChange}
                helperText="به صورت خودکار زمان‌های کارکرد با پیامی اعلام می شود و نیازی به ورود زمان‌های کارکرد در اینجا نمی باشد. فقط در صورت وجود توضیحات بیشتر اینجا متن خود را درج کنید. این متن در پایین پیام زمان‌های کارکرد ثبت می شود."
            />
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell><Typography variant="caption">نوع خدمات</Typography></TableCell>
                        <TableCell><Typography variant="caption">مدت زمان (ساعت)</Typography></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {serviceTypes.items.data.sort((a, b) => a.serviceTypeId - b.serviceTypeId).map((st) => {
                        const ticketService = ticket.item.serviceTypes?.filter(f => f.serviceTypeId === st.serviceTypeId).pop();

                        return (
                            <TableRow key={st.serviceTypeId}>
                                <TableCell sx={{ pt: "0.25rem !important", pb: "0.25rem !important" }}>
                                    <Typography variant="caption">{st.name}</Typography>
                                </TableCell>
                                <TableCell sx={{ pt: "0.25rem !important", pb: "0.25rem !important" }}>
                                    <TextField
                                        size="small"
                                        type="number"
                                        value={ticketService && ticketService.duration ? ticketService.duration : 0}
                                        onChange={handleSelectChange(st.serviceTypeId)}
                                        disabled={ticket.isLoading}
                                    />
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </ButtonDialog>
    )
}