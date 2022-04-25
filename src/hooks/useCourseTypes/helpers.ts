import ENVIROMENTS from "../../enviroments/env";
import { GetCourseType, GetCourseTypes } from "./types";

const { GENERAL_API } = ENVIROMENTS;

export const getCourseTypes = (token: string): Promise<GetCourseTypes> =>
  fetch(`${GENERAL_API}/courseTypes`, {
    method: "GET",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  }).then((res) => res.json());

export const getCourseTypeById = (
  token: string,
  id: string
): Promise<GetCourseType> =>
  fetch(`${GENERAL_API}/courseTypes/${id}`, {
    method: "GET",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  }).then((res) => res.json());

export const postCourseType = (token: string, document: any) =>
  fetch(`${GENERAL_API}/courseTypes`, {
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

export const putCourseType = (token: string, id: string, document: any) =>
  fetch(`${GENERAL_API}/courseTypes/${id}`, {
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
