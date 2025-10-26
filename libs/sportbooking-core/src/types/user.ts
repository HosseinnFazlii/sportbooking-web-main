import { IsoDate, NumericString } from "./base-types";
import { IRole } from "./role";
import { ITeacherProfile } from "./teacher";

export interface IUserSummary {
  id: number;
  name: string;
  email?: string | null;
  mobile?: string | null;
  mobileVerified?: boolean;
  fullName?: string | null;
  roleId?: number | null;
}

export interface IUser extends IUserSummary {
  mobileVerified: boolean;
  picture?: string | null;
  genderId?: number | null;
  birthdate?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  postalCode?: string | null;
  countryId?: number | null;
  stateId?: number | null;
  cityId?: number | null;
  marketingOptIn: boolean;
  passwordMustChange: boolean;
  isActive: boolean;
  roleId?: number | null;
  role?: IRole | null;
  password?: string | null;
  passwordSetAt?: IsoDate | null;
  createdAt?: IsoDate;
  updatedAt?: IsoDate;
  deletedAt?: IsoDate | null;
  teacherProfile?: ITeacherProfile | null;
}

export interface IVUser {
  id: number;
  name: string;
  fullName: string;
  email?: string | null;
  mobile: string;
  mobileVerified: boolean;
  isActive: boolean;
  createdAt: IsoDate;
  updatedAt: IsoDate;
  gender?: string | null;
  countryName?: string | null;
  stateName?: string | null;
  cityName?: string | null;
  ratingAvg?: NumericString | null;
  ratingCount: number;
  isTeacher: boolean;
  roles?: string | null;
}
