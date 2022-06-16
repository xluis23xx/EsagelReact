import ENVIROMENTS from "../../enviroments/env";
import { BodyParams, PaginateParams, PaginateResponse } from "../types";
import { ContactFormResponse } from "./types";

const { GENERAL_API } = ENVIROMENTS;

export const getContactForms = (token: string,
  {filter="", status= null}: BodyParams,
  { limit = 5, pageSize = 1 }: PaginateParams): Promise<PaginateResponse> =>
  fetch(`${GENERAL_API}/contactForms/consult/?limit=${limit}&pageSize=${pageSize}`, {
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
    .catch(res=> res.json());

export const getContactFormById = (
  token: string,
  id: string
): Promise<ContactFormResponse> =>
  fetch(`${GENERAL_API}/contactForms/${id}`, {
    method: "GET",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  }).then((res) => res.json())
  .catch(res=> res.json());

export const postContactForm = (token: string, contactForm: any): Promise<ContactFormResponse> =>
  fetch(`${GENERAL_API}/contactForms`, {
    method: "POST",
    cache: "no-cache",
    body: JSON.stringify({
      ...contactForm,
    }),
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  }).then((res) => res.json())
  .catch(res=> res.json());

export const putContactForm = (token: string, id: string, contactForm: any) : Promise<ContactFormResponse>=>
  fetch(`${GENERAL_API}/contactForms/${id}`, {
    method: "PUT",
    cache: "no-cache",
    body: JSON.stringify({
      ...contactForm,
    }),
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  }).then((res) => res.json())
  .catch(res=> res.json());
