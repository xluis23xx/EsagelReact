import ENVIROMENTS from "../../enviroments/env";
import { BodyParams, PaginateParams, PaginateResponse } from "../types";

import { OrderResponse } from "./types";

const { GENERAL_API } = ENVIROMENTS;

export const getOrders = (
  token: string,
  { startDate, endDate, status=null }: BodyParams,
  { limit = 5, pageSize = 1 }: PaginateParams
): Promise<PaginateResponse> =>
  fetch(`${GENERAL_API}/orders/consult/?limit=${limit}&pageSize=${pageSize}`, {
    method: "POST",
    cache: "no-cache",
    body: JSON.stringify({
      startDate,
      endDate,
      status
    }),
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  }).then((res) => res.json())
  .catch((res) => res.json());

export const getOrderById = (token: string, id: string): Promise<OrderResponse> =>
  fetch(`${GENERAL_API}/orders/${id}`, {
    method: "GET",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  }).then((res) => res.json())
  .catch((res) => res.json());

export const postOrder = (token: string, order: any): Promise<OrderResponse> =>
  fetch(`${GENERAL_API}/orders`, {
    method: "POST",
    cache: "no-cache",
    body: JSON.stringify({
      ...order,
    }),
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  }).then((res) => res.json())
  .catch((res) => res.json());

export const putOrder = (token: string, id: string, order: any): Promise<OrderResponse> =>
  fetch(`${GENERAL_API}/orders/${id}`, {
    method: "PUT",
    cache: "no-cache",
    body: JSON.stringify({
      ...order,
    }),
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  }).then((res) => res.json())
  .catch((res) => res.json());
