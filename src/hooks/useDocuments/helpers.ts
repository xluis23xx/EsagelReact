import ENVIROMENTS from "../../enviroments/env";
import { GetDocumentType, GetDocumentTypes } from "./types";

const { GENERAL_API } = ENVIROMENTS;

export const getDocumentTypes = (token: string): Promise<GetDocumentTypes> =>
  fetch(`${GENERAL_API}/documents`, {
    method: "GET",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  }).then((res) => res.json());

export const getDocumentTypeById = (
  token: string,
  id: string
): Promise<GetDocumentType> =>
  fetch(`${GENERAL_API}/documents/${id}`, {
    method: "GET",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  }).then((res) => res.json());

export const postDocumentType = (token: string, document: any) =>
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
  }).then((res) => res.json());

export const putDocumentType = (token: string, id: string, document: any) =>
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
  }).then((res) => res.json());
