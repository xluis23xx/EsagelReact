import ENVIROMENTS from "../../enviroments/env";
import { PaginateParams, PaginateResponse } from "../types";

import { GetClient } from "./types";

const { GENERAL_API } = ENVIROMENTS;

export const getClients = (
  token: string,
  { limit = 50, pageSize = 1 }: PaginateParams
): Promise<PaginateResponse> =>
  fetch(`${GENERAL_API}/clients/?limit=${limit}&pageSize=${pageSize}`, {
    method: "GET",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  })
    .then((res) => res.json())
    .catch((res) => res.json());

export const getClientById = (token: string, id: string): Promise<GetClient> =>
  fetch(`${GENERAL_API}/clients/${id}`, {
    method: "GET",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  }).then((res) => res.json());

export const postClient = (token: string, client: any) =>
  fetch(`${GENERAL_API}/clients`, {
    method: "POST",
    cache: "no-cache",
    body: JSON.stringify({
      ...client,
    }),
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  }).then((res) => res.json());

export const putClient = (token: string, id: string, client: any) =>
  fetch(`${GENERAL_API}/clients/${id}`, {
    method: "PUT",
    cache: "no-cache",
    body: JSON.stringify({
      ...client,
    }),
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  }).then((res) => res.json());
