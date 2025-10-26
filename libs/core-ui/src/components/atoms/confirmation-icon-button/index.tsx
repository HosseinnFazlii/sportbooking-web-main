import { FC, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, LoadingButton, Tooltip } from "../../../foundations";
import { Icon, IconifyIcon } from "../icon";

export interface IConfirmationIconButton {
    title: string;
    icon: string | IconifyIcon;
    onClick: () => void;
    dialogText?: string;
    agreeButtonLabel?: string;
    disagreeButtonLabel?: string;
}

export const ConfirmationIconButton: FC<IConfirmationIconButton> = ({ title, icon, onClick, dialogText, agreeButtonLabel, disagreeButtonLabel }) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAgree = async () => {
        setLoading(true);
        await onClick();
        setLoading(false);
        setOpen(false);
    };

    return (
        <>
            <Tooltip title={title}>
                <IconButton size='small' onClick={handleClickOpen}>
                    <Icon icon={icon} fontSize={20} />
                </IconButton>
            </Tooltip>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {dialogText}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} disabled={loading}>{disagreeButtonLabel || "لغو"}</Button>
                    <LoadingButton
                        loading={loading}
                        loadingPosition="start"
                        startIcon={<Icon icon={icon} fontSize={20} />}
                        variant="contained"
                        onClick={handleAgree}
                    >
                        {agreeButtonLabel || "موافقم"}
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </>
    )
}