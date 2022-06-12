import ENVIROMENTS from "../../enviroments/env";
import { PaginateParams, PaginateResponse } from "../types";

import { GetSale } from "./types";

const { GENERAL_API } = ENVIROMENTS;

export const getSales = (
  token: string,
  { startDate, endDate }: { startDate: string; endDate: string },
  { limit = 5, pageSize = 1 }: PaginateParams
): Promise<PaginateResponse> =>
  fetch(`${GENERAL_API}/sales/consult/?limit=${limit}&pageSize=${pageSize}`, {
    method: "POST",
    cache: "no-cache",
    body: JSON.stringify({
      startDate,
      endDate,
    }),
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  })
    .then((res) => res.json())
    .catch((res) => res.json());

export const getSaleById = (token: string, id: string): Promise<GetSale> =>
  fetch(`${GENERAL_API}/sales/${id}`, {
    method: "GET",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  }).then((res) => res.json());

export const postSale = (token: string, sale: any) =>
  fetch(`${GENERAL_API}/sales`, {
    method: "POST",
    cache: "no-cache",
    body: JSON.stringify({
      ...sale,
    }),
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  }).then((res) => res.json());

export const putSale = (token: string, id: string, sale: any) =>
  fetch(`${GENERAL_API}/sales/${id}`, {
    method: "PUT",
    cache: "no-cache",
    body: JSON.stringify({
      ...sale,
    }),
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  }).then((res) => res.json());
