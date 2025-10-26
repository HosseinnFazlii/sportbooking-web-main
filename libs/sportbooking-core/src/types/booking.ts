import { IsoDate, NumericString } from "./base-types";
import { ICourseSession } from "./course";
import { IPlace } from "./place";
import { IUserSummary } from "./user";

export interface IBookingStatus {
  id: number;
  code: string;
  label: string;
}

export interface IBookingLine {
  id: number;
  bookingId: number;
  placeId: number;
  teacherId?: number | null;
  slot: string;
  qty: number;
  price: NumericString;
  currency: string;
  courseSessionId?: number | null;
  pricingProfileId?: number | null;
  appliedRuleIds?: number[] | null;
  pricingDetails: Record<string, unknown>;
  createdAt?: IsoDate;
  updatedAt?: IsoDate;
  deletedAt?: IsoDate | null;
  place?: IPlace;
  teacher?: IUserSummary;
  courseSession?: ICourseSession;
}

export interface IBooking {
  id: number;
  userId: number;
  statusId: number;
  total: NumericString;
  currency: string;
  idempotencyKey?: string | null;
  holdExpiresAt?: IsoDate | null;
  paymentReference?: string | null;
  paymentFailureReason?: string | null;
  paidAt?: IsoDate | null;
  createdAt?: IsoDate;
  updatedAt?: IsoDate;
  deletedAt?: IsoDate | null;
  lines?: IBookingLine[];
  user?: IUserSummary;
  status?: IBookingStatus;
}

export interface IVBooking {
  id: number;
  userId: number;
  userFullName: string;
  mobile: string;
  email?: string | null;
  statusCode: string;
  total: NumericString;
  currency: string;
  holdExpiresAt?: IsoDate | null;
  createdAt: IsoDate;
  updatedAt: IsoDate;
  isActive: boolean;
  lineCount: number;
  totalQty: number;
  firstStartAt?: IsoDate | null;
  lastEndAt?: IsoDate | null;
}
