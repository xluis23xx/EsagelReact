import { Employee } from "../useEmployees";

export type Role = {
  _id?: string;
  name?: string;
};

export type User = {
  _id?: string;
  username?: string;
  password?: string;
  status?: number | null;
  roles?: Role[];
  employee?: Employee | null;
  image?: string | null;
};

export type GetUser = User;
export type GetUsers = User[];
