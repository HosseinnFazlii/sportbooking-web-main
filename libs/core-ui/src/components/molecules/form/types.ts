import { ReactNode } from "react";
import { SelectChangeEvent } from "../../../foundations";
import { IconifyIcon } from "../../atoms";

export interface IActionButton {
    label?: string;
    startIcon?: string | IconifyIcon;
    endIcon?: string | IconifyIcon;
    iconHFlip?: boolean;
    hidden?: boolean;
    onClick?: () => void;
    disable?: boolean;
    url?: string;
    variant?: "text" | "outlined" | "contained";
    type?: "button" | "component" | "divider"; // default: button
    component?: ReactNode;
}
export interface ISubmitActionButton extends IActionButton {
    onClick?: () => Promise<{ success: boolean, rowId?: number }>;
}
export interface IActionOption {
    label: string;
    valueOptions: Array<{ label: string, value: number }>;
    defaultValue?: number;
    onChange: (event: SelectChangeEvent<number>) => void;
    blink?: boolean;
}

export interface IAfterSubmit {
    title?: string;
    viewRecord?: {
        label?: string;
        getUrl: (rowId?: number) => string;
    }
    backToURL?: {
        label?: string;
        onClick?: () => void;
    }
    clearRecord?: {
        label?: string;
        clear: () => void
    }
}
export interface IActions {
    submitButton?: ISubmitActionButton;
    backButton?: IActionButton;
    hidePrintButton?: boolean;
    disable?: boolean;
    helperText?: string[];
    actionButtons?: IActionButton[];
    optionActions?: IActionOption[];
    handlePrint?: () => void;
    afterSubmit?: IAfterSubmit;
}

export interface IActionForm {
    title?: string;
    children?: ReactNode;
    submitButton?: ISubmitActionButton;
    backButton?: IActionButton;
    hidePrintButton?: boolean;
    disable?: boolean;
    loading?: boolean;
    helperText?: string[];
    actionButtons?: IActionButton[];
    optionActions?: IActionOption[];
    headerPrintLogo?: ReactNode;
    afterSubmit?: IAfterSubmit;
}