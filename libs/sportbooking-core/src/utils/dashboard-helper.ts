import { IDashboardData } from "../types/dashboard";

export const createDefaultDashboard = (): IDashboardData => ({
    kpis: {
        bookingsToday: 0,
        bookingsThisMonth: 0,
        bookingsThisYear: 0,
        revenueThisMonth: 0,
        totalBookings:0,
        upcomingBookings:0,
        pastDoneBookings:0,
        cancelledBookings:0,
        currentCourses:0,
        currentTournaments:0,
        totalCourses:0,
        totalTournaments:0,
    },
    byStatus: [{ label: "", count: 0 }],
    byFacility: [{ label: "", count: 0 }],
    bySport: [{ label: "", count: 0 }],
    monthlyCountsGregorian: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    monthlyCountsPersian: undefined,
    topTeachersThisMonth: [{ label: "", count: 0 }],
    lastActivities: []
})
