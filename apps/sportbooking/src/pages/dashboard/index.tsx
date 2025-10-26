import Head from 'next/head';
import { Grid, ApexChartWrapper, CircularProgress, styled } from '@mf-core/core-ui'
import { useTranslation } from 'react-i18next';
import { useDashboardData } from '@mf-core/sportbooking-core';
import { CourseBookings, TournamentBookings } from '../../views/dashboard/cards/bookings-by-types';
import { UserWelcome } from '../../views/dashboard/cards/user-welcome';
import { DataPerMonth } from '../../views/dashboard/cards/data-per-month';
import { BookingsByStats } from '../../views/dashboard/cards/bookings-by-stats';
import { TotalClosedBookings } from '../../views/dashboard/cards/total-closed-bookings';
import { BookingsDoneUndone } from '../../views/dashboard/cards/bookings-done-undone';
import { LastActivity } from '../../views/dashboard/cards/last-activity';
import { BookingsByStatus } from '../../views/dashboard/cards/bookings-by-status';
import { BookingsByGroups } from '../../views/dashboard/cards/bookings-by-groups';
// import { NewBookings } from '../../views/dashboard/cards/new-bookings'
const LoadingContainer = styled("div")(({ theme }) => ({
  position: "absolute",
  left: "0px",
  top: "0px",
  right: "0px",
  bottom: "0px",
  width: "100%",
  height: "100%",
  textAlign: "center",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: theme.palette.mode === "light" ? "#FFFFFF22" : "#00000022",
  borderRadius: "20px"
}));

const DashboardPage = () => {
  const { t } = useTranslation();
  const { item, isLoading } = useDashboardData();

  const {
    kpis,
    byStatus,
    byFacility,
    monthlyCountsGregorian,
    monthlyCountsPersian,
    lastActivities
  } = item;

  const facilityData = byFacility?.filter(({ count }) => count > 0) ?? [];
  const statusData = byStatus?.filter(({ count }) => count > 0) ?? [];
  const monthlyCompleted = monthlyCountsGregorian ?? [];
  const monthlyUpcoming = monthlyCountsPersian ?? [];
  const normalizedLength = Math.max(monthlyCompleted.length, monthlyUpcoming.length, 12);
  const ensureLength = (source: number[]) => {
    if (source.length === normalizedLength) {
      return source;
    }

    const padded = new Array(normalizedLength).fill(0);
    source.forEach((value, index) => {
      padded[index] = value;
    });

    return padded;
  };

  const completedSeries = ensureLength(monthlyCompleted);
  const upcomingSeries = ensureLength(monthlyUpcoming);
  const cancelledSeries = new Array(normalizedLength).fill(Math.floor(kpis.cancelledBookings / Math.max(normalizedLength, 1)));

  const clampTrend = (value: number) => Math.max(-100, Math.min(100, value));
  const courseTrendPercentage = kpis.totalCourses
    ? clampTrend(Math.round(((kpis.currentCourses - kpis.totalCourses) / kpis.totalCourses) * 100))
    : 0;
  const tournamentTrendPercentage = kpis.totalTournaments
    ? clampTrend(Math.round(((kpis.currentTournaments - kpis.totalTournaments) / kpis.totalTournaments) * 100))
    : 0;

  const bookingsToday = kpis.bookingsToday ?? 0;
  const statusCounts = statusData.map(({ count }) => count);
  const statusLabels = statusData.map(({ label }) => label);
  const bookingsStatesLabels = statusLabels.length ? statusLabels : [t('dashboard.fallbackStatusLabel')];
  const bookingsStatesCounts = statusCounts.length ? statusCounts : [bookingsToday];
  const totalCompletedBookings = kpis.pastDoneBookings ?? 0;
  const totalBookings = kpis.totalBookings ?? 0;
  const upcomingBookings = kpis.upcomingBookings ?? 0;
  return (
    <ApexChartWrapper>
      <Head>
        <title>{t('dashboard.metaTitle')}</title>
      </Head>
      <Grid container spacing={6} sx={{ position: "relative", paddingRight: "1.5rem", paddingBottom: "1.5rem", opacity: isLoading ? 0.5 : 1 }}>
        <Grid item xs={12} md={8} sx={{ order: 0, alignSelf: 'flex-end' }}>
          <UserWelcome totalBookings={totalBookings} upcomingBookings={upcomingBookings} />
        </Grid>
        <Grid item xs={12} sm={6} md={2} sx={{ order: 0 }}>
          <CourseBookings value={kpis.currentCourses} trendPrecentage={courseTrendPercentage} />
        </Grid>
        <Grid item xs={12} sm={6} md={2} sx={{ order: 0 }}>
          <TournamentBookings value={kpis.currentTournaments} trendPrecentage={tournamentTrendPercentage} />
        </Grid>
        <Grid item xs={12} md={8} sx={{ order: 0 }}>
          <DataPerMonth
            allCount={kpis.bookingsThisYear}
            currentMonthCount={kpis.bookingsThisMonth}
            doneCount={totalCompletedBookings}
            unDoneCount={upcomingBookings}
            canceledCount={kpis.cancelledBookings}
            doneCountPerMonth={completedSeries}
            unDoneCountPerMonth={upcomingSeries}
            canceledCountPerMonth={cancelledSeries}
          />
        </Grid>
        <Grid item xs={12} md={4} sx={{ order: 0 }}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <BookingsByStats
                bookingsCount={bookingsToday}
                bookingsCountByStates={bookingsStatesCounts}
                bookingsStatesLabels={bookingsStatesLabels}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TotalClosedBookings closedBookingsByMonths={completedSeries} totalClosedBookings={totalCompletedBookings} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <BookingsDoneUndone bookingsCount={totalBookings} totalCompletedBookings={totalCompletedBookings} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} lg={4} sx={{ order: 0 }}>
          <LastActivity data={lastActivities} />
        </Grid>
        <Grid item xs={12} md={6} lg={4} sx={{ order: 0 }}>
          <BookingsByStatus data={statusData} />
        </Grid>
        <Grid item xs={12} md={6} lg={4} sx={{ order: 0 }}>
          <BookingsByGroups data={facilityData} title={t('dashboard.bookingsByFacilityTitle')} />
        </Grid>
        {isLoading && (
          <LoadingContainer>
            <CircularProgress variant="indeterminate" />
          </LoadingContainer>
        )}
      </Grid>
    </ApexChartWrapper>
  )
}

export default DashboardPage;
