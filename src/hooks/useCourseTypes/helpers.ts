import ENVIROMENTS from "../../enviroments/env";
import { BodyParams, PaginateParams, PaginateResponse } from "../types";
import { CourseTypeResponse } from "./types";

const { GENERAL_API } = ENVIROMENTS;

export const getCourseTypes = (token: string,
  {filter="", status= null}: BodyParams,
  { limit = 5, pageSize = 1 }: PaginateParams): Promise<PaginateResponse> =>
  fetch(`${GENERAL_API}/courseTypes/consult/?limit=${limit}&pageSize=${pageSize}`, {
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

export const getCourseTypeById = (
  token: string,
  id: string
): Promise<CourseTypeResponse> =>
  fetch(`${GENERAL_API}/courseTypes/${id}`, {
    method: "GET",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  }).then((res) => res.json())
  .catch((res) => res.json());

export const postCourseType = (token: string, document: any): Promise<CourseTypeResponse> =>
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
  }).then((res) => res.json())
  .catch((res) => res.json());

export const putCourseType = (token: string, id: string, document: any): Promise<CourseTypeResponse> =>
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
  }).then((res) => res.json())
  .catch((res) => res.json());
