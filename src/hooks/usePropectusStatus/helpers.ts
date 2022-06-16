import ENVIROMENTS from "../../enviroments/env";
import { BodyParams, PaginateParams, PaginateResponse } from "../types";
import { ProspectStatusResponse } from "./types";

const { GENERAL_API } = ENVIROMENTS;

export const getProspectusStatuses = (
  token: string,
  {filter = "", status = null}: BodyParams,
  { limit = 5, pageSize = 1 }: PaginateParams
): Promise<PaginateResponse> =>
  fetch(`${GENERAL_API}/statusProspects/consult/?limit=${limit}&pageSize=${pageSize}`, {
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

export const getProspectusStatusById = (
  token: string,
  id: string
): Promise<ProspectStatusResponse> =>
  fetch(`${GENERAL_API}/statusProspects/${id}`, {
    method: "GET",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  }).then((res) => res.json())
  .catch((res) => res.json());

export const postProspectStatus = (token: string, prospect: any): Promise<ProspectStatusResponse> =>
  fetch(`${GENERAL_API}/statusProspects`, {
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

export const putProspectStatus = (token: string, id: string, prospect: any): Promise<ProspectStatusResponse> =>
  fetch(`${GENERAL_API}/statusProspects/${id}`, {
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
