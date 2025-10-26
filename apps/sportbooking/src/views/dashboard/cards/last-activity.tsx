import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Card, Typography, CardHeader, CardContent, useDateUtils } from '@mf-core/core-ui';

interface DataType {
    title: string;
    date: Date;
    subtitle: string;
}

interface ILastActivity {
    data: DataType[];
}
export const LastActivity: FC<ILastActivity> = ({ data }) => {
    const { t } = useTranslation();
    const { format } = useDateUtils();
    return (
        <Card>
            <CardHeader
                title={t('dashboard.latestActivityTitle')}
                titleTypographyProps={{ sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important' } }}
            />
            <CardContent sx={{ height: "20rem", overflow: "auto" }}>
                {data.map((item: DataType, index: number) => {
                    const isFailedLogin = item.title === t('dashboard.failedLoginTitle') || item.title === 'ورود ناموفق';
                    return (
                        <Box
                            key={index}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                ...(index !== data.length - 1 ? { mb: 6 } : {})
                            }}
                        >
                            <Box
                                sx={{
                                    width: '100%',
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <Box sx={{ mr: 2, display: 'flex', flexDirection: 'column' }}>
                                    <Typography sx={{ mb: 0.25, fontWeight: 600, fontSize: '0.875rem' }} color={isFailedLogin ? "error" : undefined}>{item.title}</Typography>
                                    <Typography variant='caption'>{item.subtitle}</Typography>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Typography sx={{ mr: 1, fontWeight: 600, direction: "rtl" }}>{format(new Date(item.date), 'yyyy-MM-dd HH:mm:ss')}</Typography>
                                </Box>
                            </Box>
                        </Box>
                    )
                })}
            </CardContent>
        </Card>
    )
}
