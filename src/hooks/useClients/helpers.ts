import ENVIROMENTS from "../../enviroments/env";

import { GetClient, GetClients } from "./types";

const { GENERAL_API } = ENVIROMENTS;

export const getClients = (token: string): Promise<GetClients> =>
  fetch(`${GENERAL_API}/clients`, {
    method: "GET",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  })
    .then((res) => res.json())
    .catch((res) => res.json());

export const getClientById = (
  token: string,
  id: string
): Promise<GetClient> =>
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
