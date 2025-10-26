import { Button, ButtonProps, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "../../../foundations";
import { FC, ReactNode, useState } from "react";

export interface IButtonDialog {
    mainButtonLabel: string;
    mainButtonProps?: ButtonProps;
    disabled?: boolean;
    dialogTitle?: string;
    dialogText?: ReactNode;
    children?: ReactNode;
    submit?: () => Promise<boolean>;
    submitLabel?: string;
    onClose?: () => void;
}

export const ButtonDialog: FC<IButtonDialog> = ({ mainButtonLabel, mainButtonProps, disabled, dialogTitle, dialogText, children, submit, submitLabel, onClose }) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        if (onClose) {
            onClose();
        }
        setOpen(false);
    };

    const handleSubmit = async () => {
        if (submit) {
            const ret = await submit();
            if (!ret) {
                return;
            }
        }
        handleClose();
    };

    return (
        <>
            <Button fullWidth variant='outlined' sx={{ mt: "1rem" }} onClick={handleClickOpen} disabled={disabled} {...mainButtonProps}>
                {mainButtonLabel}
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{dialogTitle}</DialogTitle>
                <DialogContent>
                    {dialogText && (
                        <DialogContentText>
                            {dialogText}
                        </DialogContentText>
                    )}
                    {children}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>لغو</Button>
                    <Button variant="contained" onClick={handleSubmit} disabled={disabled}>{submitLabel || "ارسال"}</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}