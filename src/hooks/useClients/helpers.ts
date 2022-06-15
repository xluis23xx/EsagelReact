import ENVIROMENTS from "../../enviroments/env";
import { BodyParams, PaginateParams, PaginateResponse } from "../types";
import { ClientResponse } from "./types";

const { GENERAL_API } = ENVIROMENTS;

export const getClients = (
  token: string,
  {filter="", status= null}: BodyParams,
  { limit = 5, pageSize = 1 }: PaginateParams
): Promise<PaginateResponse> =>
  fetch(`${GENERAL_API}/clients/consult/?limit=${limit}&pageSize=${pageSize}`, {
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
  })
    .then((res) => res.json())
    .catch((res) => res.json());

export const getClientById = (token: string, id: string): Promise<ClientResponse> =>
  fetch(`${GENERAL_API}/clients/${id}`, {
    method: "GET",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  }).then((res) => res.json())
    .catch((res)=>res.json())

export const postClient = (token: string, client: any): Promise<ClientResponse> =>
  fetch(`${GENERAL_API}/clients`, {
    method: "POST",
    cache: "no-cache",
    body: JSON.stringify({
      ...client,
    }),
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  }).then((res) => res.json())
  .catch((res)=>res.json())
  

export const putClient = (token: string, id: string, client: any) :Promise<ClientResponse>=>
  fetch(`${GENERAL_API}/clients/${id}`, {
    method: "PUT",
    cache: "no-cache",
    body: JSON.stringify({
      ...client,
    }),
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  }).then((res) => res.json())
  .catch((res)=>res.json())
