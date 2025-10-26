import { IPermission } from "./permission";

export interface IRole {
  id: number;
  name: string;
  description?: string | null;
  permissions?: IPermission[];
  users?: IRoleUserSummary[];
}

export interface IRoleUserSummary {
  id: number;
  name: string;
}
