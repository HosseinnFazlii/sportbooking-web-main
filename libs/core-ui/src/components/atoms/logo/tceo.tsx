import { FC } from "react";
import { ILogo } from "./types";
import { Box, Typography, TypographyProps, styled, useTheme } from "../../../foundations";
import { useSettings } from "../../../hooks";

const defaults = { primaryColor: "#FFFFFF", textColor: "#db1c49", width: 178, height: 48, isMini: false };

const HeaderTitle = styled(Typography)<TypographyProps>(({ theme }) => ({
    fontWeight: 600,
    lineHeight: 'normal',
    textTransform: 'uppercase',
    color: theme.palette.text.primary,
    transition: 'opacity .25s ease-in-out, margin .25s ease-in-out'
}));

export const TceoLogo: FC<ILogo> = ({ primaryColor, textColor: textColorProp, width, height, isMini, themeBasedColor }) => {
    const theme = useTheme();
    const { settings } = useSettings();

    let logoColor = primaryColor || defaults.primaryColor;
    let textColor = textColorProp || defaults.textColor;
    switch (themeBasedColor) {
        default:
        case "auto":
            logoColor = theme.palette.primary.main || logoColor;
            textColor = (settings.mode === "semi-dark" ? theme.palette.common.white : theme.palette.text.primary) || textColor;
            break;
        case "darken":
            logoColor = theme.palette.primary.main || logoColor;
            textColor = theme.palette.customColors?.dark ? `rgb(${theme.palette.customColors?.dark})` : textColor;
            break;
        case "lighten":
            logoColor = theme.palette.primary.main || logoColor;
            textColor = theme.palette.customColors?.light ? `rgb(${theme.palette.customColors?.light})` : textColor;
            break;
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: { width } }}>
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 512 512" style={{ width: `${height}px`, height: `${height}px`, display: "block" }}>
                <g>
                    <path fill={logoColor} d="M21.43,353.8h42.52l0-255.12h382.68V353.8h42.52V98.68c0,0,0-42.52-42.52-42.52s-382.68,0-382.68,0s-42.52,0-42.52,42.52S21.43,353.8,21.43,353.8z" />
                    <path fill={logoColor} d="M217.02,302.77v-34.02c0,0,17.01-25.51,34.02-25.51S446.62,353.8,446.62,353.8v34.02c0,0-178.58-110.55-195.59-110.55S217.02,302.77,217.02,302.77z" />
                    <path fill={logoColor} d="M63.94,370.8v-34.02c0,0,17.01-25.51,34.02-25.51s195.59,110.55,195.59,110.55v34.02c0,0-178.58-110.55-195.59-110.55S63.94,370.8,63.94,370.8z" />
                    <path fill={logoColor} d="M140.48,336.79v-34.02c0,0,17.01-25.51,34.02-25.51s195.59,110.55,195.59,110.55v34.02c0,0-178.58-110.55-195.59-110.55S140.48,336.79,140.48,336.79z" />
                </g>
            </svg>
            <HeaderTitle variant="caption" sx={{ opacity: isMini ? 0 : 1, color: textColor, lineHeight: 1.3, display: "flex", flexDirection: "column", height: `${height ? height - 8 : 36}px`, ...(isMini ? {} : { ml: 3 }) }}>
                <span>سازمان نظام مهندسی</span>
                <span>ساختمان استان تهران</span>
            </HeaderTitle>
        </Box>
    );
};