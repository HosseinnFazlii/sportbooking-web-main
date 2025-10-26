import { FC } from "react";
import { useTranslation } from 'react-i18next';
import { CardStatsVertical, Icon } from "@mf-core/core-ui"

interface IBookingByType {
    value: number;
    trendPrecentage: number;
}

export const CourseBookings: FC<IBookingByType> = ({ value, trendPrecentage }) => {
    const { t } = useTranslation();
    return <CardStatsVertical
        stats={value.toString()}
        color='info'
        trend={trendPrecentage > 0 ? "positive" : "negative"}
        trendNumber={`${trendPrecentage > 0 ? "+" : ""}${trendPrecentage}%`}
        title={t('dashboard.courseBookingsTitle')}
        subtitle={t('dashboard.currentMonth')}
        icon={<Icon icon={trendPrecentage > 0 ? 'mdi:trending-up' : 'mdi:trending-down'} />}
    />
};

export const TournamentBookings: FC<IBookingByType> = ({ value, trendPrecentage }) => {
    const { t } = useTranslation();
    return <CardStatsVertical
        stats={value.toString()}
        color='info'
        trend={trendPrecentage > 0 ? "positive" : "negative"}
        trendNumber={`${trendPrecentage > 0 ? "+" : ""}${trendPrecentage}%`}
        title={t('dashboard.tournamentBookingsTitle')}
        subtitle={t('dashboard.currentMonth')}
        icon={<Icon icon={trendPrecentage > 0 ? 'mdi:trending-up' : 'mdi:trending-down'} />}
    />
};
