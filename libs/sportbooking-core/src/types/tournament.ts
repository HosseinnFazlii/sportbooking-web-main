import { IsoDate } from "./base-types";
import { IFacility } from "./facility";
import { IPlace } from "./place";
import { ISport } from "./sport";
import { IUserSummary } from "./user";

export interface ITournamentType {
  id: number;
  code: string;
  label: string;
}

export interface ITournamentRegStatus {
  id: number;
  code: string;
  label: string;
}

export interface ITournament {
  id: number;
  title: string;
  description?: string | null;
  sportId: number;
  typeId: number;
  minCapacity: number;
  maxCapacity: number;
  bookingDeadline: IsoDate;
  startAt: IsoDate;
  endAt: IsoDate;
  facilityId?: number | null;
  eventPlaceId?: number | null;
  eventSlot?: string | null;
  isActive: boolean;
  createdBy?: number | null;
  createdAt?: IsoDate;
  updatedAt?: IsoDate;
  deletedAt?: IsoDate | null;
  sport?: ISport;
  facility?: IFacility | null;
  eventPlace?: IPlace | null;
  type?: ITournamentType | null;
  createdByUser?: IUserSummary | null;
  images?: ITournamentImage[];
  registrations?: ITournamentRegistration[];
  matches?: ITournamentMatch[];
}

export interface ITournamentImage {
  id: number;
  tournamentId: number;
  url: string;
  sortOrder: number;
  createdAt?: IsoDate;
}

export interface ITournamentRegistration {
  id: number;
  tournamentId: number;
  userId: number;
  statusId: number;
  holdExpiresAt?: IsoDate | null;
  createdAt?: IsoDate;
  updatedAt?: IsoDate;
  status?: ITournamentRegStatus;
  user?: IUserSummary;
}

export interface ITournamentMatch {
  id: number;
  tournamentId: number;
  roundNo: number;
  matchNo: number;
  aUserId?: number | null;
  bUserId?: number | null;
  winnerUserId?: number | null;
  aScore?: number | null;
  bScore?: number | null;
  placeId?: number | null;
  slot?: string | null;
  status: "scheduled" | "completed" | "cancelled" | string;
  createdAt?: IsoDate;
  updatedAt?: IsoDate;
  aUser?: IUserSummary | null;
  bUser?: IUserSummary | null;
  winnerUser?: IUserSummary | null;
  place?: IPlace | null;
}

export interface ITournamentStanding {
  userId: number;
  userName: string;
  points: number;
  wins: number;
  losses: number;
  draws: number;
  scoreFor: number;
  scoreAgainst: number;
}

export interface IVTournament {
  id: number;
  title: string;
  sportId: number;
  sportName: string;
  typeId: number;
  typeCode: string;
  typeLabel: string;
  minCapacity: number;
  maxCapacity: number;
  bookingDeadline: IsoDate;
  startAt: IsoDate;
  endAt: IsoDate;
  facilityId?: number | null;
  facilityName?: string | null;
  eventPlaceId?: number | null;
  eventPlaceName?: string | null;
  eventSlot?: string | null;
  isActive: boolean;
  createdBy?: number | null;
  createdByName?: string | null;
  registrationCount: number;
  matchCount: number;
  standingCount: number;
  isOngoing: boolean;
}
