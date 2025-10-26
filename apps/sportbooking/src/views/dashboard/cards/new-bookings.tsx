// ** MUI Imports
import { Box, Card, useTheme, Typography, CardContent, Icon, ApexOptions, ReactApexcharts, hexToRGBA } from '@mf-core/core-ui'

export const NewBookings = () => {
  // ** Hook
  const theme = useTheme()

  const options: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    grid: {
      show: true,
      padding: {
        top: -5,
        left: -10,
        right: -7,
        bottom: -12
      }
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        distributed: true,
        columnWidth: '60%',
        // endingShape: 'rounded',
        // startingShape: 'rounded'
      }
    },
    legend: { show: false },
    dataLabels: { enabled: false },
    tooltip: { enabled: true },
    colors: [
      hexToRGBA(theme.palette.primary.main, 0.1),
      hexToRGBA(theme.palette.primary.main, 0.1),
      hexToRGBA(theme.palette.primary.main, 0.1),
      hexToRGBA(theme.palette.primary.main, 0.1),
      hexToRGBA(theme.palette.primary.main, 0.1),
      hexToRGBA(theme.palette.primary.main, 0.1),
      theme.palette.primary.main,
    ],
    states: {
      // hover: {
      //   filter: { type: 'none' }
      // },
      active: {
        filter: { type: 'none' }
      }
    },
    xaxis: {
      tickPlacement: 'on',
      labels: { show: false },
      axisTicks: { show: false },
      axisBorder: { show: false },
      categories: ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"].map(m => `ماه ${m}`)
    },
    yaxis: { show: false }
  }

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ mr: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography variant='h6' sx={{ mb: 7.5 }}>
              رزروهای ایجاد شده براساس ماه
            </Typography>
            <Typography component='p' variant='caption'>
              48% رزرو جدید
            </Typography>
            <Typography component='p' variant='caption' sx={{ mb: 2.5 }}>
              این ماه.
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { color: 'success.main' } }}>
              <Typography variant='h6'>180</Typography>
              <Icon icon='mdi:chevron-up' />
              <Typography variant='caption' sx={{ color: 'success.main' }}>
                28%
              </Typography>
            </Box>
          </Box>
          <ReactApexcharts
            type='bar'
            width={144}
            height={144}
            options={options}
            series={[{ data: [40, 60, 50, 60, 90, 40, 50] }]}
          />
        </Box>
      </CardContent>
    </Card>
  )
}
