import { FC, Fragment, useState } from "react";
import { useRouter } from "next/router";
import { Card, Grid, Select, Button, MenuItem, InputLabel, FormControl, CardContent, Typography, keyframes, SelectChangeEvent, Divider } from "../../../foundations";
import { useSettings } from "../../../hooks";
import { IActionButton, IActionOption, IActions } from "./types";
import { Icon, Link } from "../../atoms";

const blinkKeyFrames = keyframes`50% { border:3px solid #FF000099; }`;

const renderActionButton = (button: IActionButton, index: number, disable?: boolean) => {
    const key = `action-button_${index}`;
    if (button.hidden)
        return null;

    switch (button.type) {
        case "divider":
            return index > 0 ? (<Divider key={key} sx={{ pt: "1rem" }} />) : null;
        case "component":
            return (<Fragment key={key}>{button.component}</Fragment>);
        case "button":
        default:
            return (
                <Button
                    key={key}
                    fullWidth={true}
                    variant={button.variant ? button.variant : 'outlined'}
                    startIcon={button.startIcon ? (<Icon icon={button.startIcon} hFlip={button.iconHFlip} />) : undefined}
                    endIcon={button.endIcon ? (<Icon icon={button.endIcon} hFlip={button.iconHFlip} />) : undefined}
                    onClick={button.onClick}
                    disabled={disable || button.disable}
                    sx={{ marginTop: index === 0 ? "" : "1rem" }}
                    {...(button.url ? { component: Link, href: button.url } : {})}
                >
                    {button.label}
                </Button>
            );
    }


}
const renderOptionActions = (option: IActionOption, index: number, disable?: boolean) => {
    const key = `action-select_${index}_${option.defaultValue}`;
    return (
        <FormControl
            key={key}
            fullWidth
            sx={{
                marginTop: index === 0 ? "" : "1rem",
                "fieldset": { animation: option.blink ? `${blinkKeyFrames} 500ms linear infinite` : "" }
            }}
        >
            <InputLabel id={`${key}_label`}>{option.label}</InputLabel>
            <Select
                fullWidth
                defaultValue={option.defaultValue}
                label={option.label}
                labelId={`${key}_label`}
                sx={{ mb: 4 }}
                onChange={option.onChange}
            >
                {option.valueOptions.map(op =>
                    <MenuItem key={op.value} value={op.value}>{op.label}</MenuItem>
                )}
            </Select>
        </FormControl>
    )
}

export const Actions: FC<IActions> = ({ submitButton, backButton, hidePrintButton, disable, helperText, actionButtons, optionActions, handlePrint, afterSubmit }) => {
    const router = useRouter();
    const { settings } = useSettings();
    const [afterSubmitValue, setAfterSubmitValue] = useState(1);

    const handleChange = (event: SelectChangeEvent<number>) => {
        setAfterSubmitValue(event.target.value as number || 0);
    }

    const handleSubmit = async () => {
        if (submitButton && submitButton.onClick) {
            const submitValue = await submitButton.onClick();
            if (submitValue && submitValue.success && afterSubmit && afterSubmitValue) {
                switch (afterSubmitValue) {
                    case 1:
                        if (afterSubmit.backToURL?.onClick) {
                            afterSubmit.backToURL.onClick();
                        } else {
                            if (backButton) {
                                if (backButton.url) {
                                    router.push(backButton.url);
                                } else if (backButton.onClick) {
                                    backButton.onClick();
                                }
                            }
                        }
                        break;
                    case 2:
                        if (afterSubmit.viewRecord) {
                            router.push(afterSubmit.viewRecord.getUrl(submitValue.rowId));
                        }
                        break;
                    case 3:
                        if (afterSubmit.clearRecord) {
                            afterSubmit.clearRecord.clear();
                        }
                        break;
                }
            }
        }
    }

    const allActionButtons: IActionButton[] = [
        ...(submitButton ? [{
            endIcon: !(submitButton.endIcon || submitButton.startIcon) ? 'mdi:send-outline' : submitButton.endIcon,
            label: "ارسال",
            variant: "contained",
            iconHFlip: !(submitButton.endIcon || submitButton.startIcon) || submitButton.iconHFlip,
            ...submitButton,
            onClick: handleSubmit
        } as IActionButton] : []),
        ...(!hidePrintButton ? [{
            startIcon: 'mdi:printer-outline',
            label: "چاپ",
            onClick: handlePrint
        } as IActionButton] : []),
        ...(actionButtons || []),
        ...(backButton ? [{
            endIcon: !(backButton.endIcon || backButton.startIcon) ? "mdi:arrow-left" : backButton.endIcon,
            label: "بازگشت",
            ...backButton
        }] : [])
    ];

    const alloptionActions = [
        ...(afterSubmit ? [{
            label: afterSubmit.title || "عملیات پس از ثبت",
            valueOptions: [
                ...(backButton && (backButton.url || backButton.onClick || afterSubmit.backToURL?.onClick) ? [{ label: afterSubmit.backToURL?.label || "بازگشت به لیست", value: 1 }] : []),
                ...(afterSubmit.viewRecord ? [{ label: afterSubmit.viewRecord.label || "مشاهده رکورد ثبت شده", value: 2 }] : []),
                ...(afterSubmit.clearRecord ? [{ label: afterSubmit.clearRecord.label || "ثبت رکورد جدید", value: 3 }] : []),
            ],
            defaultValue: 1,
            onChange: handleChange
        }] : []),
        ...(optionActions || []),
    ];
    const stickeyTop = settings.appBar === 'fixed' ? "4rem" : "0.1rem";// | 'static' | 'hidden'
    return (
        <Grid container spacing={6} className="action-form-actions" sx={{ position: "sticky", top: stickeyTop }}>
            <Grid item xs={12}>
                <Card>
                    <CardContent>
                        {allActionButtons.map((btn, index) => renderActionButton(btn, index, disable))}
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12}>
                {alloptionActions?.map((opt, index) => renderOptionActions(opt, index, disable))}
            </Grid>
            {helperText && (
                <Grid>
                    <Typography variant="caption">
                        {helperText.length === 1 ? helperText[0] : (
                            <ul>
                                {helperText.map((line, index) => (<li key={index}>{line}</li>))}
                            </ul>
                        )}
                    </Typography>
                </Grid>
            )}
        </Grid>
    )
}