import ENVIROMENTS from "../../enviroments/env";
import { GetContactForms, GetContactForm } from "./types";

const { GENERAL_API } = ENVIROMENTS;

export const getContactForms = (token: string): Promise<GetContactForms> =>
  fetch(`${GENERAL_API}/contactForms`, {
    method: "GET",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  }).then((res) => res.json());

export const getContactFormById = (
  token: string,
  id: string
): Promise<GetContactForm> =>
  fetch(`${GENERAL_API}/contactForms/${id}`, {
    method: "GET",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  }).then((res) => res.json());

export const postContactForm = (token: string, contactForm: any) =>
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
  }).then((res) => res.json());

export const putContactForm = (token: string, id: string, contactForm: any) =>
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
  }).then((res) => res.json());
