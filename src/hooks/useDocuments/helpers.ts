import ENVIROMENTS from "../../enviroments/env";
import { BodyParams, PaginateParams, PaginateResponse } from "../types";
import { DocumentTypeResponse } from "./types";

const { GENERAL_API } = ENVIROMENTS;

export const getDocumentTypes =(
  token: string,
  {filter = "", status = null}: BodyParams,
  { limit = 5, pageSize = 1 }: PaginateParams
): Promise<PaginateResponse> =>
  fetch(`${GENERAL_API}/documents/consult/?limit=${limit}&pageSize=${pageSize}`, {
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

export const getDocumentTypeById = (
  token: string,
  id: string
): Promise<DocumentTypeResponse> =>
  fetch(`${GENERAL_API}/documents/${id}`, {
    method: "GET",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  }).then((res) => res.json())
  .catch((res) => res.json());

export const postDocumentType = (token: string, document: any): Promise<DocumentTypeResponse> =>
  fetch(`${GENERAL_API}/documents`, {
    method: "POST",
    cache: "no-cache",
    body: JSON.stringify({
      ...document,
    }),
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  }).then((res) => res.json())
  .catch((res) => res.json());

export const putDocumentType = (token: string, id: string, document: any): Promise<DocumentTypeResponse> =>
  fetch(`${GENERAL_API}/documents/${id}`, {
    method: "PUT",
    cache: "no-cache",
    body: JSON.stringify({
      ...document,
    }),
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  }).then((res) => res.json())
  .catch((res) => res.json());
