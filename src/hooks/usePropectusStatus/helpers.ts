import ENVIROMENTS from "../../enviroments/env";
import { GetProspectusStatuses, GetProspectusStatus } from "./types";

const { GENERAL_API } = ENVIROMENTS;

export const getProspectusStatuses = (
  token: string
): Promise<GetProspectusStatuses> =>
  fetch(`${GENERAL_API}/prospectStatuses`, {
    method: "GET",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  }).then((res) => res.json());

export const getProspectusStatusById = (
  token: string,
  id: string
): Promise<GetProspectusStatus> =>
  fetch(`${GENERAL_API}/prospectStatuses/${id}`, {
    method: "GET",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  }).then((res) => res.json());

export const postProspectStatus = (token: string, prospect: any) =>
  fetch(`${GENERAL_API}/prospectStatuses`, {
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

export const putProspectStatus = (token: string, id: string, prospect: any) =>
  fetch(`${GENERAL_API}/prospectStatuses/${id}`, {
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
