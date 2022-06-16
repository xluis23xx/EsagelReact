import ENVIROMENTS from "../../enviroments/env";
import { BodyParams, PaginateParams, PaginateResponse } from "../types";
import { ProspectusOriginResponse } from "./types";

const { GENERAL_API } = ENVIROMENTS;

export const getProspectusOrigins = (
  token: string,
  {filter = "", status = null}: BodyParams,
  { limit = 5, pageSize = 1 }: PaginateParams
): Promise<PaginateResponse> =>
  fetch(`${GENERAL_API}/prospectOrigins/consult/?limit=${limit}&pageSize=${pageSize}`, {
    method: "POST",
    cache: "no-cache",
    body: JSON.stringify({
      filter,
      status,
    }),
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  }).then((res) => res.json())
  .catch((res) => res.json());

export const getProspectusOriginById = (
  token: string,
  id: string
): Promise<ProspectusOriginResponse> =>
  fetch(`${GENERAL_API}/prospectOrigins/${id}`, {
    method: "GET",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  }).then((res) => res.json())
  .catch((res) => res.json());

export const postProspectOrigin = (token: string, prospect: any): Promise<ProspectusOriginResponse> =>
  fetch(`${GENERAL_API}/prospectOrigins`, {
    method: "POST",
    cache: "no-cache",
    body: JSON.stringify({
      ...prospect,
    }),
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  }).then((res) => res.json())
  .catch((res) => res.json());

export const putProspectOrigin = (token: string, id: string, prospect: any): Promise<ProspectusOriginResponse> =>
  fetch(`${GENERAL_API}/prospectOrigins/${id}`, {
    method: "PUT",
    cache: "no-cache",
    body: JSON.stringify({
      ...prospect,
    }),
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  }).then((res) => res.json())
  .catch((res) => res.json());
