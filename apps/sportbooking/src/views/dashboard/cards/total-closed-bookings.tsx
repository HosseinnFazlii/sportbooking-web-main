import { Card, useTheme, Typography, CardContent, ApexOptions, ReactApexcharts } from '@mf-core/core-ui';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';

const getDataSeries = (closedBookingsByMonths: number[], t: TFunction) => [
  {
    name: t('dashboard.monthlyCompletedSeriesName'),
    data: closedBookingsByMonths
  }
]

interface ITotalClosedBookings {
  totalClosedBookings: number;
  closedBookingsByMonths: number[];
}
export const TotalClosedBookings: FC<ITotalClosedBookings> = ({ totalClosedBookings, closedBookingsByMonths }) => {
  // ** Hook
  const theme = useTheme()
  const { t } = useTranslation();

  const options: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false },
      dropShadow: {
        top: 12,
        blur: 3,
        left: 3,
        enabled: true,
        opacity: 0.14,
        color: theme.palette.primary.main
      }
    },
    grid: {
      show: true,
      padding: {
        left: -5,
        top: -10
      }
    },
    tooltip: { enabled: true },
    colors: [theme.palette.primary.main],
    markers: {
      size: 6,
      offsetX: -2,
      offsetY: -1,
      strokeWidth: 5,
      colors: ['transparent'],
      strokeColors: 'transparent',
      discrete: [
        {
          size: 7,
          seriesIndex: 0,
          strokeColor: theme.palette.primary.main,
          fillColor: theme.palette.background.paper,
          dataPointIndex: closedBookingsByMonths.length - 1
        }
      ]
    },
    stroke: {
      width: 5,
      curve: 'smooth',
      lineCap: 'round'
    },
    xaxis: {
      labels: { show: false },
      axisTicks: { show: false },
      axisBorder: { show: false }
    },
    yaxis: {
      labels: { show: true }
    }
  }

  return (
    <Card>
      <CardContent>
        <Typography variant='subtitle1' sx={{ fontWeight: 600, textAlign: 'center', color: 'text.primary' }}>
          {t('dashboard.monthlyCompletedBookingsTitle')}
        </Typography>
        <ReactApexcharts type='line' height={94} options={options} series={getDataSeries(closedBookingsByMonths, t)} />
        <Typography variant="body2" sx={{ fontWeight: 600, textAlign: 'center', color: 'text.primary' }}>{t('dashboard.totalCompletedLabel', { count: totalClosedBookings })}</Typography>
      </CardContent>
    </Card>
  )
}
