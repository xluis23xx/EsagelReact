import ENVIROMENTS from "../../enviroments/env";
import { BodyParams, PaginateParams, PaginateResponse } from "../types";
import { ResetPassordResponse, UserResponse } from "./types";
const { GENERAL_API } = ENVIROMENTS;

export const getUsers = (
  token: string,
  {filter = "", status = null}: BodyParams,
  { limit = 5, pageSize = 1 }: PaginateParams
): Promise<PaginateResponse> =>
  fetch(`${GENERAL_API}/users/consult/?limit=${limit}&pageSize=${pageSize}`, {
    method: "POST",
    cache: "no-cache",
    body: JSON.stringify({
      filter,
      status
    }),
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  }).then((res) => res.json())
  .catch((res) => res.json());

export const getUserById = (token: string, id: string): Promise<UserResponse> =>
  fetch(`${GENERAL_API}/users/${id}`, {
    method: "GET",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  }).then((res) => res.json())
  .catch((res) => res.json());

export const postUser = (token: string, user: any): Promise<UserResponse> =>
  fetch(`${GENERAL_API}/users`, {
    method: "POST",
    cache: "no-cache",
    body: JSON.stringify({
      ...user,
    }),
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  }).then((res) => res.json())
  .catch((res) => res.json());

export const putUser = (token: string, id: string, user: any): Promise<UserResponse> =>
  fetch(`${GENERAL_API}/users/${id}`, {
    method: "PUT",
    cache: "no-cache",
    body: JSON.stringify({
      ...user,
    }),
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  }).then((res) => res.json())
  .catch((res) => res.json());

  export const resetPassword = (token:string, id:string): Promise<ResetPassordResponse> =>
  fetch(`${GENERAL_API}/users/newPassword`, {
    method: "POST",
    cache: "no-cache",
    body: JSON.stringify({
      _id: id,
    }),
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  }).then((res) => res.json())
  .catch((res) => res.json());