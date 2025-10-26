import { IsoDate } from "./base-types";
import { IRole } from "./role";
import { IUserSummary } from "./user";

export interface IFacility {
  id: number;
  code?: string | null;
  name: string;
  slug?: string | null;
  timezone: string;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  postalCode?: string | null;
  countryId?: number | null;
  stateId?: number | null;
  cityId?: number | null;
  phone?: string | null;
  email?: string | null;
  postalCodeInt?: number | null;
  createdAt?: IsoDate;
  updatedAt?: IsoDate;
  deletedAt?: IsoDate | null;
}

export interface IFacilityStaff {
  userId: number;
  facilityId: number;
  roleId: number;
  user?: IUserSummary;
  role?: IRole;
  facility?: IFacility;
}

export interface IVFacility {
  id: number;
  name: string;
  slug?: string | null;
  timezone: string;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  createdAt: IsoDate;
  placeCount: number;
  sportsCount: number;
  tournamentsCount: number;
  upcomingBookingLines: number;
  nextBookingStart?: IsoDate | null;
}
