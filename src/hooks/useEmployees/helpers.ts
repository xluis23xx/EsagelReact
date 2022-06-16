import ENVIROMENTS from "../../enviroments/env";
import { BodyParams, PaginateParams, PaginateResponse } from "../types";

import { EmployeeResponse } from "./types";

const { GENERAL_API } = ENVIROMENTS;

export const getEmployees = (
  token: string,
  {filter = "", status = null}: BodyParams,
  { limit = 5, pageSize = 1 }: PaginateParams
): Promise<PaginateResponse> =>
  fetch(`${GENERAL_API}/employees/consult/?limit=${limit}&pageSize=${pageSize}`, {
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

export const getEmployeeById = (
  token: string,
  id: string
): Promise<EmployeeResponse> =>
  fetch(`${GENERAL_API}/employees/${id}`, {
    method: "GET",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  }).then((res) => res.json())
  .catch((res) => res.json());

export const postEmployee = (token: string, employee: any): Promise<EmployeeResponse> =>
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
  }).then((res) => res.json())
  .catch((res) => res.json());

export const putEmployee = (token: string, id: string, employee: any): Promise<EmployeeResponse> =>
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
  }).then((res) => res.json())
  .catch((res) => res.json());
