import { Box, Card, useTheme, Typography, CardContent, ApexOptions, ReactApexcharts } from '@mf-core/core-ui';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface IBookingsByStats {
    bookingsCount: number;
    bookingsCountByStates: number[];
    bookingsStatesLabels: string[];
}

export const BookingsByStats: FC<IBookingsByStats> = ({ bookingsCount, bookingsCountByStates, bookingsStatesLabels }) => {
    const theme = useTheme()
    const { t } = useTranslation();

    const options: ApexOptions = {
        chart: {
            sparkline: { enabled: true },
            animations: { enabled: true }
        },
        stroke: {
            width: 5,
            colors: [theme.palette.background.paper]
        },
        labels: bookingsStatesLabels,
        legend: { show: false },
        tooltip: { enabled: false },
        dataLabels: { enabled: false },
        colors: [theme.palette.primary.main, theme.palette.info.main, theme.palette.warning.main, theme.palette.error.main],
        grid: {
            padding: {
                top: -7,
                bottom: 5
            }
        },
        states: {
            active: {
                filter: { type: 'none' }
            }
        },
        plotOptions: {
            pie: {
                expandOnClick: false,
                donut: {
                    size: '75%',
                    labels: {
                        show: true,
                        name: {
                            offsetY: -2,
                            fontSize: '0.75rem',
                            formatter: (val: string) => val.substring(0, 15),
                            color: theme.palette.text.primary
                        },
                        value: {
                            offsetY: 2,
                            fontSize: '0.75rem',
                            formatter: (val: string) => val,
                            color: theme.palette.text.secondary
                        },
                        total: {
                            show: true,
                            label: t('dashboard.totalLabel'),
                            fontWeight: 500,
                            fontSize: '0.75rem',
                            formatter: (val) => val.config.series.reduce((c: number, a: number) => c + a, 0),
                            color: theme.palette.text.primary
                        }
                    }
                }
            }
        }
    }

    return (
        <Card>
            <CardContent sx={{ py: `${theme.spacing(3.75)} !important` }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ my: 1.25 }}>
                        <Typography variant='h6' sx={{ mb: 5 }}>
                            {t('dashboard.bookingsStatusCardTitle')}
                        </Typography>
                        <Typography component='p' variant='caption' sx={{ lineHeight: '1.25rem' }}>
                            {t('dashboard.bookingsStatusCardSubtitle')}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { color: 'success.main' } }}>
                            <Typography variant='h6'>{bookingsCount}</Typography>
                        </Box>
                    </Box>
                    <ReactApexcharts type='donut' width={110} height={125} options={options} series={bookingsCountByStates} />
                </Box>
            </CardContent>
        </Card>
    )
};
