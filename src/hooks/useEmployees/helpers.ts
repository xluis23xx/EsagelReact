import ENVIROMENTS from "../../enviroments/env";
import { PaginateParams, PaginateResponse } from "../types";

import { GetEmployee } from "./types";

const { GENERAL_API } = ENVIROMENTS;

export const getEmployees = (
  token: string,
  { limit = 50, pageSize = 1 }: PaginateParams
): Promise<PaginateResponse> =>
  fetch(`${GENERAL_API}/employees/?limit=${limit}&pageSize=${pageSize}`, {
    method: "GET",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  })
    .then((res) => res.json())
    .catch((res) => res.json());

export const getEmployeeById = (
  token: string,
  id: string
): Promise<GetEmployee> =>
  fetch(`${GENERAL_API}/employees/${id}`, {
    method: "GET",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  }).then((res) => res.json());

export const postEmployee = (token: string, employee: any) =>
  fetch(`${GENERAL_API}/employees`, {
    method: "POST",
    cache: "no-cache",
    body: JSON.stringify({
      ...employee,
    }),
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  }).then((res) => res.json());

export const putEmployee = (token: string, id: string, employee: any) =>
  fetch(`${GENERAL_API}/employees/${id}`, {
    method: "PUT",
    cache: "no-cache",
    body: JSON.stringify({
      ...employee,
    }),
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  }).then((res) => res.json());
