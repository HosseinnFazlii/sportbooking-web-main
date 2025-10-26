import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, useTheme, Typography, CardContent, ApexOptions, ReactApexcharts } from '@mf-core/core-ui';

interface IBookingsDoneUndone {
    bookingsCount: number;
    totalCompletedBookings: number;
}
export const BookingsDoneUndone: FC<IBookingsDoneUndone> = ({ bookingsCount, totalCompletedBookings }) => {
    const theme = useTheme()
    const { t } = useTranslation();

    const options: ApexOptions = {
        chart: {
            sparkline: { enabled: true }
        },
        tooltip: { enabled: false },
        stroke: { lineCap: 'round' },
        colors: [theme.palette.info.main],
        plotOptions: {
            radialBar: {
                endAngle: 90,
                startAngle: -90,
                hollow: { size: '60%' },
                track: { background: theme.palette.customColors && theme.palette.customColors.trackBg ? theme.palette.customColors.trackBg : (theme.palette.mode === 'light' ? '#F0F2F8' : '#474360') },
                dataLabels: {
                    name: { show: false },
                    value: {
                        offsetY: 0,
                        fontWeight: 500,
                        fontSize: '1.25rem',
                        color: theme.palette.text.secondary
                    }
                }
            }
        }
    }

    return (
        <Card>
            <CardContent>
                <Typography variant='body2' sx={{ mt: 2.5, fontWeight: 600, textAlign: 'center', color: 'text.primary' }}>
                    {t('dashboard.totalCompletedFromAll')}
                </Typography>
                <ReactApexcharts type='radialBar' height={103} options={options} series={[!bookingsCount ? 0 : parseFloat(((totalCompletedBookings / bookingsCount) * 100).toFixed(2))]} />
                <Typography variant="subtitle1" sx={{ mt: 7.5, fontWeight: 600, textAlign: 'center', color: 'text.primary' }}>
                    {t('dashboard.totalBookingsLabel', { count: bookingsCount })}
                </Typography>
            </CardContent>
        </Card>
    )
}
