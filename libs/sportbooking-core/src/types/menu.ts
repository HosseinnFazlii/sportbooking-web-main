import { IsoDate } from "./base-types";

export interface IMenu {
  id: number;
  name: string;
  url?: string | null;
  icon?: string | null;
  parentId?: number | null;
  sortOrder: number;
  isActive: boolean;
  createdBy?: number | null;
  createdAt?: IsoDate;
}

export interface IMenuNode {
  id: number;
  name: string;
  url?: string | null;
  icon?: string | null;
  parentId?: number | null;
  sortOrder: number;
  isActive: boolean;
  children: IMenuNode[];
}