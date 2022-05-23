import ENVIROMENTS from "../../enviroments/env";
import { PaginateParams, PaginateResponse } from "../types";

import { GetUser } from "./types";

const { GENERAL_API } = ENVIROMENTS;

export const getUsers = (
  token: string,
  { limit = 50, pageSize = 1 }: PaginateParams
): Promise<PaginateResponse> =>
  fetch(`${GENERAL_API}/users/?limit=${limit}&pageSize=${pageSize}`, {
    method: "GET",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  })
    .then((res) => res.json())
    .catch((res) => res.json());

export const getUserById = (token: string, id: string): Promise<GetUser> =>
  fetch(`${GENERAL_API}/users/${id}`, {
    method: "GET",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  }).then((res) => res.json());

export const postUser = (token: string, user: any) =>
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
  }).then((res) => res.json());

export const putUser = (token: string, id: string, user: any) =>
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
  }).then((res) => res.json());

export const putPassword = (
  id: string,
  token: string,
  { newPassword, oldPassword }: { newPassword: string; oldPassword: string }
) =>
  fetch(`${GENERAL_API}/users/password/${id}`, {
    method: "PUT",
    cache: "no-cache",
    body: JSON.stringify({
      newPassword,
      oldPassword,
    }),
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  }).then((res) => res.json());
