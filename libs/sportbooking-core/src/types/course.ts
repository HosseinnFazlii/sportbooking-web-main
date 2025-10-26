import { IsoDate, NumericString } from "./base-types";
import { IPlace } from "./place";
import { ISport } from "./sport";
import { IUserSummary } from "./user";

export interface ICourse {
  id: number;
  title: string;
  description?: string | null;
  sportId: number;
  minCapacity: number;
  maxCapacity: number;
  bookingDeadline: IsoDate;
  isActive: boolean;
  createdBy?: number | null;
  createdAt?: IsoDate;
  updatedAt?: IsoDate;
  deletedAt?: IsoDate | null;
  sport?: ISport;
  createdByUser?: IUserSummary | null;
  images?: ICourseImage[];
  sessions?: ICourseSession[];
}

export interface ICourseImage {
  id: number;
  courseId: number;
  url: string;
  sortOrder: number;
  createdAt?: IsoDate;
}

export interface ICourseSession {
  id: number;
  courseId: number;
  teacherId: number;
  placeId: number;
  slot: string;
  price: NumericString;
  maxCapacity: number;
  createdAt?: IsoDate;
  updatedAt?: IsoDate;
  teacher?: IUserSummary;
  place?: IPlace;
}

export interface IVCourse {
  id: number;
  title: string;
  sportId: number;
  sportName: string;
  isActive: boolean;
  bookingDeadline: IsoDate;
  minCapacity: number;
  maxCapacity: number;
  createdBy?: number | null;
  createdByName?: string | null;
  sessionCount: number;
  upcomingSessionCount: number;
  minSessionPrice?: NumericString | null;
  maxSessionPrice?: NumericString | null;
  firstSessionStart?: IsoDate | null;
  lastSessionEnd?: IsoDate | null;
}
