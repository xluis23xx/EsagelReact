import ENVIROMENTS from "../../enviroments/env";
import { BodyParams, PaginateParams, PaginateResponse } from "../types";
import { CenterResponse } from "./types";

const { GENERAL_API } = ENVIROMENTS;

export const getCenters = (token: string,
  {filter="", status= null}: BodyParams,
  { limit = 5, pageSize = 1 }: PaginateParams): Promise<PaginateResponse> =>
  fetch(`${GENERAL_API}/centers/consult/?limit=${limit}&pageSize=${pageSize}`, {
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

export const getCenterById = (
  token: string,
  id: string
): Promise<CenterResponse> =>
  fetch(`${GENERAL_API}/centers/${id}`, {
    method: "GET",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  }).then((res) => res.json())
  .catch((res) => res.json());

export const postCenter = (token: string, center: any): Promise<CenterResponse> =>
  fetch(`${GENERAL_API}/centers`, {
    method: "POST",
    cache: "no-cache",
    body: JSON.stringify({
      ...center,
    }),
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  }).then((res) => res.json())
  .catch((res) => res.json());

export const putCenter = (token: string, id: string, center: any): Promise<CenterResponse> =>
  fetch(`${GENERAL_API}/centers/${id}`, {
    method: "PUT",
    cache: "no-cache",
    body: JSON.stringify({
      ...center,
    }),
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  }).then((res) => res.json())
  .catch((res) => res.json());
