import { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Icon, PasswordBox, axiosInstance, getURLWithVersion, toast } from "@mf-core/core-ui";

export const ChangePassword = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [passwords, setPasswords] = useState<{
        currentPassword: string,
        newPassword: string,
        retypeNewPassword: string
    }>({
        currentPassword: "",
        newPassword: "",
        retypeNewPassword: ""
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const updatePassword = async () => {
        if (passwords.currentPassword.length > 0
            && passwords.newPassword.length > 0
            && passwords.retypeNewPassword.length > 0
            && passwords.newPassword === passwords.retypeNewPassword) {
            setLoading(true);
            const toastId = toast.loading(`در حال تغییر رمزعبور ...`);
            await axiosInstance.put(getURLWithVersion(`auth/changePassword`), { password: passwords.currentPassword, newPassword: passwords.newPassword });
            toast.dismiss(toastId);
            toast.success("رمزعبور تغییر پیدا کرد.");
            setOpen(false);
            setLoading(false);
        }
    }

    const handleChange = (key: string) => (value: string) => {
        setPasswords(prevPass => ({
            ...prevPass,
            [key]: value
        }))
    }

    return (
        <>
            <Button variant='contained' onClick={handleClickOpen} startIcon={<Icon icon='mdi:account-check-outline' fontSize={20} />}>
                تغییر رمز عبور
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>تغییر رمز عبور</DialogTitle>
                <DialogContent>
                    <PasswordBox sx={{ p: 2 }} label="رمزعبور جاری" value={passwords.currentPassword} onChange={handleChange("currentPassword")} />
                    <PasswordBox sx={{ p: 2 }} label="رمزعبور جدید" value={passwords.newPassword} onChange={handleChange("newPassword")} error={passwords.newPassword.length > 0 && passwords.newPassword.length < 6} helper="حداقل ۶ کاراکتر می بایست باشد" />
                    <PasswordBox sx={{ p: 2 }} label="تکرار رمزعبور جدید" value={passwords.retypeNewPassword} onChange={handleChange("retypeNewPassword")} error={passwords.newPassword !== passwords.retypeNewPassword} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>لغو</Button>
                    <Button variant="contained" onClick={updatePassword} disabled={loading}>تغییر رمزعبور</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}