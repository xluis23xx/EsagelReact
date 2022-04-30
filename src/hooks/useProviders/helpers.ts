import ENVIROMENTS from "../../enviroments/env";

import { GetProvider, GetProviders } from "./types";

const { GENERAL_API } = ENVIROMENTS;

export const getProviders = (token: string): Promise<GetProviders> =>
  fetch(`${GENERAL_API}/providers`, {
    method: "GET",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  })
    .then((res) => res.json())
    .catch((res) => res.json());

export const getProviderById = (
  token: string,
  id: string
): Promise<GetProvider> =>
  fetch(`${GENERAL_API}/providers/${id}`, {
    method: "GET",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  }).then((res) => res.json());

export const postProvider = (token: string, provider: any) =>
  fetch(`${GENERAL_API}/providers`, {
    method: "POST",
    cache: "no-cache",
    body: JSON.stringify({
      ...provider,
    }),
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  }).then((res) => res.json());

export const putProvider = (token: string, id: string, provider: any) =>
  fetch(`${GENERAL_API}/providers/${id}`, {
    method: "PUT",
    cache: "no-cache",
    body: JSON.stringify({
      ...provider,
    }),
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  }).then((res) => res.json());
