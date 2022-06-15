import { Employee } from "../useEmployees";

export type Role = {
  _id?: string;
  name?: string;
  priority?: number;
};

export type User = {
  _id?: string;
  username?: string;
  firstname?: string | null;
  lastname?: string | null;
  secondLastname?: string | null;
  password?: string | null;
  status?: number | null;
  roles?: Role[];
  employee?: Employee | null;
  image?: string | null;
};

export type GetUser = User;
export type GetUsers = User[];
