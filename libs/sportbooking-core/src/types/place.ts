import { IsoDate } from "./base-types";
import { IFacility } from "./facility";
import { ISport } from "./sport";

export interface IPlace {
  id: number;
  facilityId: number;
  name: string;
  sportId: number;
  surface?: string | null;
  indoor: boolean;
  minCapacity: number;
  maxCapacity: number;
  attributes: Record<string, unknown>;
  createdAt?: IsoDate;
  updatedAt?: IsoDate;
  deletedAt?: IsoDate | null;
  facility?: IFacility;
  sport?: ISport;
}

export interface IPlaceWorkingHour {
  id: number;
  placeId: number;
  weekday: number;
  segmentNo: number;
  openTime: string;
  closeTime: string;
  isClosed: boolean;
  createdAt?: IsoDate;
  updatedAt?: IsoDate;
}
