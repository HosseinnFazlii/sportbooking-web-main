import { IsoDate } from "./base-types";

export interface IKpis {
  bookingsToday: number;
  bookingsThisMonth: number;
  bookingsThisYear: number;
  revenueThisMonth: number;
  totalBookings: number;
  upcomingBookings: number;
  pastDoneBookings: number;
  cancelledBookings: number;
  currentCourses: number;
  currentTournaments: number;
  totalCourses: number;
  totalTournaments: number;
}

export interface ILabelCount {
  label: string;
  count: number;
}

export interface IActivityRecord {
  title: string;
  subtitle?: string | null;
  date: IsoDate;
}

export interface IDashboardData {
  kpis: IKpis;
  byStatus: ILabelCount[];
  byFacility: ILabelCount[];
  bySport: ILabelCount[];
  monthlyCountsGregorian: number[];
  monthlyCountsPersian?: number[];
  topTeachersThisMonth: ILabelCount[];
  lastActivities: IActivityRecord[];
}