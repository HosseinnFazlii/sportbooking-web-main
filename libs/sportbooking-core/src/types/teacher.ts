import { IsoDate, NumericString } from "./base-types";

export interface ITeacherProfile {
  userId: number;
  bio?: string | null;
  hourlyRate?: NumericString | null;
  ratingAvg?: NumericString | null;
  ratingCount: number;
  createdAt?: IsoDate;
  updatedAt?: IsoDate;
}

export interface ITeacherSummary {
  id: number;
  name: string;
  picture?: string | null;
  hourlyRate?: NumericString | null;
  ratingAvg?: NumericString | null;
  ratingCount: number;
}

export interface ITeacherSport {
  teacherId: number;
  sportId: number;
}

export interface ITeacherCity {
  teacherId: number;
  cityId: number;
}

export interface ITeacherWorkingHour {
  id: number;
  teacherId: number;
  weekday: number;
  segmentNo: number;
  openTime: string;
  closeTime: string;
  isClosed: boolean;
  createdAt?: IsoDate;
  updatedAt?: IsoDate;
}
