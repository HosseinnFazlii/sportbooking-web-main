import { IsoDate } from "./base-types";

export interface ILogType {
  id: number;
  code: string;
  description?: string | null;
  createdBy?: number | null;
  createdAt?: IsoDate;
}

export interface ILog {
  id: number;
  typeId?: number | null;
  type?: ILogType | null;
  text1?: string | null;
  text2?: string | null;
  text3?: string | null;
  text4?: string | null;
  createdBy?: number | null;
  createdAt?: IsoDate;
}

export interface IVLog {
  id: number;
  typeId?: number | null;
  typeCode?: string | null;
  typeName?: string | null;
  typeDescription?: string | null;
  text1?: string | null;
  text2?: string | null;
  text3?: string | null;
  text4?: string | null;
  createdAt: IsoDate;
  createdBy?: number | null;
  createdByName?: string | null;
}
