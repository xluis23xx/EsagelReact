import ENVIROMENTS from "../../enviroments/env";
import { GetProspectusOrigins, GetProspectusOrigin } from "./types";

const { GENERAL_API } = ENVIROMENTS;

export const getProspectusOrigins = (
  token: string
): Promise<GetProspectusOrigins> =>
  fetch(`${GENERAL_API}/prospectOrigins`, {
    method: "GET",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  }).then((res) => res.json());

export const getProspectusOriginById = (
  token: string,
  id: string
): Promise<GetProspectusOrigin> =>
  fetch(`${GENERAL_API}/prospectOrigins/${id}`, {
    method: "GET",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  }).then((res) => res.json());

export const postProspectOrigin = (token: string, prospect: any) =>
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
  }).then((res) => res.json());

export const putProspectOrigin = (token: string, id: string, prospect: any) =>
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
  }).then((res) => res.json());
