import { CSSProperties, FC, createElement } from 'react';
import { IconifyIcon, Icon as IconifyIconComponent, IconProps } from '@iconify/react'

// import taskListSquarePersonFilled from '@iconify/icons-fluent/task-list-square-person-20-filled';
// import clipboardTaskListRtlFilled from '@iconify/icons-fluent/clipboard-task-list-rtl-20-filled';
// import clipboardTaskFilled from '@iconify/icons-fluent/clipboard-task-20-filled';
// import calendarCancelFilled from '@iconify/icons-fluent/calendar-cancel-20-filled';

import viewDashboard from '@iconify/icons-mdi/view-dashboard';
import pinOutline from '@iconify/icons-mdi/pin-outline';
import pinIcon from '@iconify/icons-mdi/pin';
import weatherNight from '@iconify/icons-mdi/weather-night';
import weatherSunny from '@iconify/icons-mdi/weather-sunny';
import checkIcon from '@iconify/icons-mdi/check';
import closeIcon from '@iconify/icons-mdi/close';
import cogIcon from '@iconify/icons-mdi/cog';
import menuIcon from '@iconify/icons-mdi/menu';
import translateIcon from '@iconify/icons-mdi/translate';
import bellOutline from '@iconify/icons-mdi/bell-outline';
import dotsVertical from '@iconify/icons-mdi/dots-vertical';
import accountOutline from '@iconify/icons-mdi/account-outline';
import emailOutline from '@iconify/icons-mdi/email-outline';
import messageOutline from '@iconify/icons-mdi/message-outline';
import cogOutline from '@iconify/icons-mdi/cog-outline';
import currencyUsd from '@iconify/icons-mdi/currency-usd';
import helpCircleOutline from '@iconify/icons-mdi/help-circle-outline';
import logoutVariant from '@iconify/icons-mdi/logout-variant';
import fileRemoveOutline from '@iconify/icons-mdi/file-remove-outline';
import cartOutline from '@iconify/icons-mdi/cart-outline';
import accountCogOutline from '@iconify/icons-mdi/account-cog-outline';
import ticketAccount from '@iconify/icons-mdi/ticket-account';
import trayFull from '@iconify/icons-mdi/tray-full';
import ticketConfirmation from '@iconify/icons-mdi/ticket-confirmation';
import ticketIcon from '@iconify/icons-mdi/ticket';
import ticketPercent from '@iconify/icons-mdi/ticket-percent';
import ticketPercentOutline from '@iconify/icons-mdi/ticket-percent-outline';
import ticketOutline from '@iconify/icons-mdi/ticket-outline';
import cancelIcon from '@iconify/icons-mdi/cancel';
import timerCheck from '@iconify/icons-mdi/timer-check';
import archiveCancel from '@iconify/icons-mdi/archive-cancel';
import accountQuestion from '@iconify/icons-mdi/account-question';
import bugIcon from '@iconify/icons-mdi/bug';
import chartMultiple from '@iconify/icons-mdi/chart-multiple';
import chartTimeline from '@iconify/icons-mdi/chart-timeline';
import chartDonut from '@iconify/icons-mdi/chart-donut';
import accountTie from '@iconify/icons-mdi/account-tie';
import accountIcon from '@iconify/icons-mdi/account';
import accountGroup from '@iconify/icons-mdi/account-group';
import accountLock from '@iconify/icons-mdi/account-lock';
import accountReactivate from '@iconify/icons-mdi/account-reactivate';
import fileDocument from '@iconify/icons-mdi/file-document';
import progressUpload from '@iconify/icons-mdi/progress-upload';
import stopIcon from '@iconify/icons-mdi/stop';
import editIcon from '@iconify/icons-mdi/edit';
import deleteIcon from '@iconify/icons-mdi/delete';
import chevronLeft from '@iconify/icons-mdi/chevron-left';
import chevronRight from '@iconify/icons-mdi/chevron-right';
import fileDocumentMultiple from '@iconify/icons-mdi/file-document-multiple';
import arrowUp from '@iconify/icons-mdi/arrow-up';
import reloadIcon from '@iconify/icons-mdi/reload';
import printerOutline from '@iconify/icons-mdi/printer-outline';
import plusIcon from '@iconify/icons-mdi/plus';
import sendOutline from '@iconify/icons-mdi/send-outline';
import arrowLeft from '@iconify/icons-mdi/arrow-left';
import eyeOutline from '@iconify/icons-mdi/eye-outline';
import archiveCheck from '@iconify/icons-mdi/archive-check';
import fileDocumentRemoveOutline from '@iconify/icons-mdi/file-document-remove-outline';
import fileDocumentCheck from '@iconify/icons-mdi/file-document-check';
import trendingDown from '@iconify/icons-mdi/trending-down';
import trendingUp from '@iconify/icons-mdi/trending-up';
import downloadIcon from '@iconify/icons-mdi/download';
import accountCancel from '@iconify/icons-mdi/account-cancel';
import eyeOffOutline from '@iconify/icons-mdi/eye-off-outline';
import officeBuildingCog from '@iconify/icons-mdi/office-building-cog';
import formatListGroup from '@iconify/icons-mdi/format-list-group';
import accountHardHat from '@iconify/icons-mdi/account-hard-hat';
import accountHardHatOutline from '@iconify/icons-mdi/account-hard-hat-outline';
import calendarBlank from '@iconify/icons-mdi/calendar-blank';
import accountCheckOutline from '@iconify/icons-mdi/account-check-outline';
import phoneOutline from '@iconify/icons-mdi/phone-outline';
import chartTimelineVariant from '@iconify/icons-mdi/chart-timeline-variant';
import officeBuilding from '@iconify/icons-mdi/office-building';
import calendarEdit from '@iconify/icons-mdi/calendar-edit';
import calendarCheck from '@iconify/icons-mdi/calendar-check';
import formatListBulleted from '@iconify/icons-mdi/format-list-bulleted';
import calendarClock from '@iconify/icons-mdi/calendar-clock';
import refresh from '@iconify/icons-mdi/refresh';
import history from '@iconify/icons-mdi/history';
import calendarRemove from '@iconify/icons-mdi/calendar-remove';
import school from '@iconify/icons-mdi/school';
import trophy from '@iconify/icons-mdi/trophy';
import whistle from '@iconify/icons-mdi/whistle';
import mapMarker from '@iconify/icons-mdi/map-marker';
import chartBar from '@iconify/icons-mdi/chart-bar';
import cashMultiple from '@iconify/icons-mdi/cash-multiple';
import fileExcelOutline from "@iconify/icons-mdi/file-excel-outline";

const icons: { [key: string]: IconifyIcon } = {
    "mdi:cog": cogIcon,
    "mdi:close": closeIcon,
    "mdi:check": checkIcon,
    "mdi:weather-sunny": weatherSunny,
    "mdi:weather-night": weatherNight,
    "mdi:pin": pinIcon,
    "mdi:pin-outline": pinOutline,
    "mdi:menu": menuIcon,
    "mdi:translate": translateIcon,
    "mdi:bell-outline": bellOutline,
    "mdi:dots-vertical": dotsVertical,
    "mdi:account-outline": accountOutline,
    "mdi:email-outline": emailOutline,
    "mdi:message-outline": messageOutline,
    "mdi:cog-outline": cogOutline,
    "mdi:currency-usd": currencyUsd,
    "mdi:help-circle-outline": helpCircleOutline,
    "mdi:logout-variant": logoutVariant,
    "mdi:file-remove-outline": fileRemoveOutline,
    "mdi:cart-outline": cartOutline,
    "mdi:account-cog-outline": accountCogOutline,
    "mdi:view-dashboard": viewDashboard,
    "mdi:ticket-account": ticketAccount,
    "mdi:tray-full": trayFull,
    "mdi:ticket-confirmation": ticketConfirmation,
    "mdi:ticket": ticketIcon,
    "mdi:ticket-percent-outline": ticketPercentOutline,
    "mdi:ticket-percent": ticketPercent,
    "mdi:ticket-outline": ticketOutline,
    "mdi:cancel": cancelIcon,
    "mdi:timer-check": timerCheck,
    "mdi:archive-cancel": archiveCancel,
    "mdi:account-question": accountQuestion,
    "mdi:bug": bugIcon,
    "mdi:chart-multiple": chartMultiple,
    "mdi:chart-timeline": chartTimeline,
    "mdi:chart-donut": chartDonut,
    "mdi:account-tie": accountTie,
    "mdi:account": accountIcon,
    "mdi:account-group": accountGroup,
    "mdi:account-lock": accountLock,
    "mdi:account-reactivate": accountReactivate,
    "mdi:file-document": fileDocument,
    "mdi:progress-upload": progressUpload,
    "mdi:stop": stopIcon,
    "mdi:delete": deleteIcon,
    "mdi:edit": editIcon,
    "mdi:chevron-left": chevronLeft,
    "mdi:chevron-right": chevronRight,
    "mdi:file-document-multiple": fileDocumentMultiple,
    "mdi:arrow-up": arrowUp,
    "mdi:reload": reloadIcon,
    "mdi:printer-outline": printerOutline,
    "mdi:plus": plusIcon,
    "mdi:send-outline": sendOutline,
    "mdi:arrow-left": arrowLeft,
    "mdi:eye-outline": eyeOutline,
    "mdi:archive-check": archiveCheck,
    "mdi:file-document-check": fileDocumentCheck,
    "mdi:file-document-remove-outline": fileDocumentRemoveOutline,
    "mdi:trending-down": trendingDown,
    "mdi:trending-up": trendingUp,
    "mdi:download": downloadIcon,
    "mdi:eye-off-outline": eyeOffOutline,
    "mdi:account-cancel": accountCancel,
    "mdi:office-building": officeBuilding,
    "mdi:office-building-cog": officeBuildingCog,
    "mdi:format-list-group": formatListGroup,
    "mdi:account-hard-hat": accountHardHat,
    "mdi:account-hard-hat-outline": accountHardHatOutline,
    "mdi:calendar-blank": calendarBlank,
    "mdi:account-check-outline": accountCheckOutline,
    "mdi:phone-outline": phoneOutline,
    "mdi:chart-timeline-variant": chartTimelineVariant,
    "mdi:calendar-edit": calendarEdit,
    "mdi:calendar-check": calendarCheck,
    "mdi:format-list-bulleted": formatListBulleted,
    "mdi:calendar-clock": calendarClock,
    "mdi:refresh": refresh,
    "mdi:history": history,
    "mdi:calendar-remove": calendarRemove,
    "mdi:school": school,
    "mdi:trophy": trophy,
    "mdi:whistle": whistle,
    "mdi:map-marker": mapMarker,
    "mdi:chart-bar": chartBar,
    "mdi:cash-multiple": cashMultiple,
    "mdi:file-excel-outline":fileExcelOutline,
};

export interface IIcon extends IconProps {
    autoFontSize?: boolean;
}

export const Icon: FC<IIcon> = ({ icon, autoFontSize, ...rest }) => {
    if (typeof icon === "string" && icons[icon]) {
        const iconComponent = icons[icon];

        const style: CSSProperties = {
            // transform: 'rotate(360deg)',
            fontSize: autoFontSize ? undefined : '1.5rem',
            ...(rest.style || {})
        };

        if (rest.hFlip) {
            style.transform = 'rotate(180deg)';
        }

        if (rest.rotate) {
            style.transform = `rotate(${rest.rotate * 90}deg)`;
        }

        if (rest.style?.verticalAlign !== undefined) {
            style.verticalAlign = rest.style.verticalAlign;
        }

        const attributes = {
            xmlns: 'http://www.w3.org/2000/svg',
            focusable: false,
            style: style,
            width: "1em",
            height: "1em",
            viewBox: "0 0 24 24",
            dangerouslySetInnerHTML: { __html: iconComponent.body }
        };

        return createElement('svg', attributes, null);
    } else {
        if (icon) {
            console.log(icon);
        }
    }

    if (!icon) {
        return null;
    }

    return <IconifyIconComponent icon={icon} fontSize={autoFontSize ? undefined : '1.5rem'} {...rest} />
}


export const UserIcon: FC<IIcon> = ({ autoFontSize, ...rest }) => {
    return <Icon autoFontSize={autoFontSize !== undefined ? autoFontSize : true} {...rest} />
}

export type { IconifyIcon, IconProps } from "@iconify/react";