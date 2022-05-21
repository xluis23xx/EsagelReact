import ENVIROMENTS from "../../enviroments/env";

import { GetPurchase, GetPurchases } from "./types";

const { GENERAL_API } = ENVIROMENTS;

export const getPurchases = (
  token: string,
  { startDate, endDate }: { startDate: string; endDate: string }
): Promise<GetPurchases> =>
  fetch(`${GENERAL_API}/purchases`, {
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

export const getPurchaseById = (token: string, id: string): Promise<GetPurchase> =>
  fetch(`${GENERAL_API}/purchases/${id}`, {
    method: "GET",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  }).then((res) => res.json());

export const postPurchase = (token: string, purchase: any) =>
  fetch(`${GENERAL_API}/purchases`, {
    method: "POST",
    cache: "no-cache",
    body: JSON.stringify({
      ...purchase,
    }),
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  }).then((res) => res.json());

export const putPurchase = (token: string, id: string, purchase: any) =>
  fetch(`${GENERAL_API}/purchases/${id}`, {
    method: "PUT",
    cache: "no-cache",
    body: JSON.stringify({
      ...purchase,
    }),
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  }).then((res) => res.json());