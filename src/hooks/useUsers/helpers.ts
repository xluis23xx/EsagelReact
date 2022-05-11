import ENVIROMENTS from "../../enviroments/env";

import { GetUser, GetUsers } from "./types";

const { GENERAL_API } = ENVIROMENTS;

export const getUsers = (token: string): Promise<GetUsers> =>
  fetch(`${GENERAL_API}/users`, {
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
