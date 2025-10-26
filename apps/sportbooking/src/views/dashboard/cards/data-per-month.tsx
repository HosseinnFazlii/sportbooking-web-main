import { FC, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Card, Typography, CardHeader, CardContent, Grid, GridProps, styled, useTheme, Icon, ApexOptions, ThemeColorType, CustomAvatar, ReactApexcharts } from '@mf-core/core-ui'
import { TFunction } from 'i18next';

interface DataType {
    title: string
    icon: ReactNode
    subtitle: string
    avatarColor: ThemeColorType
}

const getStatisticData = (doneCount: number, unDoneCount: number, canceledCount: number, t: TFunction): DataType[] => [
    {
        title: doneCount.toString(),
        avatarColor: 'success',
        subtitle: t('dashboard.doneBookingsSubtitle'),
        icon: <Icon icon='mdi:calendar-check' fontSize='1.875rem' />
    },
    {
        title: unDoneCount.toString(),
        avatarColor: 'primary',
        subtitle: t('dashboard.futureBookingsSubtitle'),
        icon: <Icon icon='mdi:calendar-clock' fontSize='1.875rem' />
    },
    {
        title: canceledCount.toString(),
        avatarColor: 'secondary',
        subtitle: t('dashboard.cancelledBookingsSubtitle'),
        icon: <Icon icon='mdi:calendar-remove' fontSize='1.875rem' />
    }
]

const getSeriesData = (doneCountPerMonth: number[], unDoneCountPerMonth: number[], canceledCountPerMonth: number[], t: TFunction) => [
    {
        name: t('dashboard.doneBookingsSubtitle'),
        data: doneCountPerMonth
    },
    {
        name: t('dashboard.futureBookingsSubtitle'),
        data: unDoneCountPerMonth
    },
    {
        name: t('dashboard.cancelledBookingsSubtitle'),
        data: canceledCountPerMonth
    }
]

// Styled Grid component
const StyledGrid = styled(Grid)<GridProps>(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        borderBottom: `1px solid ${theme.palette.divider}`
    },
    [theme.breakpoints.up('sm')]: {
        borderRight: `1px solid ${theme.palette.divider}`
    }
}))

interface IDataPerMonth {
    allCount: number;
    currentMonthCount: number;
    doneCount: number;
    unDoneCount: number;
    canceledCount: number;
    doneCountPerMonth: number[];
    unDoneCountPerMonth: number[];
    canceledCountPerMonth: number[];
}

export const DataPerMonth: FC<IDataPerMonth> = ({ allCount, currentMonthCount, doneCount, unDoneCount, canceledCount, doneCountPerMonth, unDoneCountPerMonth, canceledCountPerMonth }) => {
    // ** Hook
    const theme = useTheme()
    const { t } = useTranslation();

    const options: ApexOptions = {
        chart: {
            stacked: true,
            parentHeightOffset: 0,
            toolbar: { show: false }
        },
        plotOptions: {
            bar: {
                borderRadius: 10,
                columnWidth: '35%',
                // endingShape: 'rounded',
                // startingShape: 'rounded'
            }
        },
        colors: [theme.palette.success.main, theme.palette.error.main, theme.palette.info.main],
        grid: {
            strokeDashArray: 7,
            borderColor: theme.palette.divider,
            padding: {
                left: 0,
                bottom: -10
            }
        },
        legend: { show: false },
        dataLabels: { enabled: false },
        stroke: {
            width: 6,
            curve: 'smooth',
            lineCap: 'round',
            colors: [theme.palette.background.paper]
        },
        states: {
            hover: {
                filter: { type: 'none' }
            },
            active: {
                filter: { type: 'none' }
            }
        },
        xaxis: {
            axisTicks: { show: false },
            axisBorder: { show: false },
            categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            labels: {
                style: { colors: theme.palette.text.disabled }
            }
        },
        yaxis: {
            labels: {
                offsetY: 2,
                offsetX: -10,
                formatter: (value: number) => (value > 999 ? `${(value / 1000).toFixed(0)}k` : `${value}`),
                style: { colors: theme.palette.text.disabled }
            }
        },
        responsive: [
            {
                breakpoint: theme.breakpoints.values.xl,
                options: {
                    plotOptions: {
                        bar: {
                            columnWidth: '45%'
                        }
                    }
                }
            },
            {
                breakpoint: theme.breakpoints.values.lg,
                options: {
                    plotOptions: {
                        bar: {
                            columnWidth: '50%'
                        }
                    }
                }
            },
            {
                breakpoint: theme.breakpoints.values.sm,
                options: {
                    plotOptions: {
                        bar: {
                            columnWidth: '45%'
                        }
                    }
                }
            },
            {
                breakpoint: 430,
                options: {
                    plotOptions: {
                        bar: {
                            columnWidth: '55%'
                        }
                    }
                }
            }
        ]
    }

    return (
        <Card>
            <Grid container>
                <StyledGrid item xs={12} sm={7}>
                    <CardContent sx={{ height: '100%', '& .apexcharts-xcrosshairs.apexcharts-active': { opacity: 0 } }}>
                        <Typography variant='h6'>{t('dashboard.bookingsByMonthTitle')}</Typography>
                        <ReactApexcharts type='bar' height={282} series={getSeriesData(doneCountPerMonth, unDoneCountPerMonth, canceledCountPerMonth, t)} options={options} />
                    </CardContent>
                </StyledGrid>
                <Grid item xs={12} sm={5}>
                    <CardHeader
                        title={t('dashboard.yearlyBookingsTitle', { count: allCount })}
                        subheader={t('dashboard.currentMonthBookings', { count: currentMonthCount })}
                        subheaderTypographyProps={{ sx: { lineHeight: '1.25rem', fontSize: '0.875rem !important' } }}
                        titleTypographyProps={{
                            sx: {
                                fontSize: '1.5rem !important',
                                lineHeight: '2rem !important',
                                letterSpacing: '0.43px !important'
                            }
                        }}
                    />
                    <CardContent
                        sx={{ pt: theme => `${theme.spacing(4)} !important`, pb: theme => `${theme.spacing(5.5)} !important` }}
                    >
                        {getStatisticData(doneCount, unDoneCount, canceledCount, t).map((item: DataType, index: number) => {
                            return (
                                <Box key={index} sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
                                    <CustomAvatar
                                        skin='light'
                                        variant='rounded'
                                        color={item.avatarColor}
                                        sx={{ mr: 3.5, '& svg': { color: `${item.avatarColor}.main` } }}
                                    >
                                        {item.icon}
                                    </CustomAvatar>
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <Typography sx={{ fontWeight: 600 }}>{item.title}</Typography>
                                        <Typography variant='body2'>{item.subtitle}</Typography>
                                    </Box>
                                </Box>
                            )
                        })}
                        {/* <Button fullWidth variant='contained'>
                            مشاهده گزارش
                        </Button> */}
                    </CardContent>
                </Grid>
            </Grid>
        </Card>
    )
}
