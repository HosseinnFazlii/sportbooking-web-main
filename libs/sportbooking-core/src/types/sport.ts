import { IsoDate } from "./base-types";

export interface ISport {
  id: number;
  code: string;
  name: string;
  isActive: boolean;
  createdAt?: IsoDate;
  updatedAt?: IsoDate;
  deletedAt?: IsoDate | null;
}