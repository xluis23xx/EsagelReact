import ENVIROMENTS from "../../enviroments/env";
import { BodyParams, PaginateParams, PaginateResponse } from "../types";
import { ProviderResponse } from "./types";
const { GENERAL_API } = ENVIROMENTS;

export const getProviders = (
  token: string,
  {filter = "", status = null}: BodyParams,
  { limit = 5, pageSize = 1 }: PaginateParams
): Promise<PaginateResponse> =>
  fetch(`${GENERAL_API}/providers/consult/?limit=${limit}&pageSize=${pageSize}`, {
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

export const getProviderById = (
  token: string,
  id: string
): Promise<ProviderResponse> =>
  fetch(`${GENERAL_API}/providers/${id}`, {
    method: "GET",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  }).then((res) => res.json())
  .catch((res) => res.json());

export const postProvider = (token: string, provider: any): Promise<ProviderResponse> =>
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
  }).then((res) => res.json())
  .catch((res) => res.json());

export const putProvider = (token: string, id: string, provider: any): Promise<ProviderResponse> =>
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
  }).then((res) => res.json())
  .catch((res) => res.json());
