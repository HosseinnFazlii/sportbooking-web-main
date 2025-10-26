import { Box, Card, styled, Typography, CardContent, Grid, GridProps, useAuth } from '@mf-core/core-ui'
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

const StyledGrid = styled(Grid)<GridProps>(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        order: -1,
        display: 'flex',
        justifyContent: 'center'
    }
}))

const Img = styled('img')(({ theme }) => ({
    right: 13,
    bottom: 0,
    height: 185,
    position: 'absolute',
    [theme.breakpoints.down('sm')]: {
        height: 165,
        position: 'static'
    }
}))

interface IUserWelcome {
    totalBookings: number;
    upcomingBookings: number;
}

export const UserWelcome: FC<IUserWelcome> = ({ totalBookings, upcomingBookings }) => {
    const { user } = useAuth();
    const { t } = useTranslation();
    const fullName = (user?.fullName || user?.name || '').trim();
    return (
        <Card sx={{ position: 'relative', overflow: 'visible', mt: { xs: 0, sm: 7.5, md: 0 } }}>
            <CardContent sx={{ p: theme => `${theme.spacing(8.25, 7.5, 6.25, 7.5)} !important` }}>
                <Grid container spacing={6}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant='h5' sx={{ mb: 6.5 }}>
                            <Box component='span' sx={{ fontWeight: 'bold' }}>
                                {fullName}
                            </Box>
                            {fullName ? ' ' : ''}
                            {t('dashboard.userWelcomeGreeting')}
                        </Typography>
                        <Typography variant='body2'>
                            {t('dashboard.userWelcomeTotalBookingsLabel')}{' '}
                            <Box component='span' sx={{ fontWeight: 'bold' }}>{totalBookings}</Box>
                        </Typography>
                        <Typography variant='body2'>
                            {t('dashboard.userWelcomeUpcomingBookingsLabel')}{' '}
                            <Box component='span' sx={{ fontWeight: 'bold' }}>{upcomingBookings}</Box>
                        </Typography>
                    </Grid>
                    <StyledGrid item xs={12} sm={6}>
                        <Img alt={t('dashboard.userWelcomeIllustrationAlt')} src='/images/cards/illustration-john-2.png' />
                    </StyledGrid>
                </Grid>
            </CardContent>
        </Card>
    )
}
