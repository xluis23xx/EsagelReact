import ENVIROMENTS from "../../enviroments/env";
import { PaginateParams, PaginateResponse } from "../types";

import { GetCourse } from "./types";

const { GENERAL_API } = ENVIROMENTS;

export const getCourses = (
  token: string,
  { limit = 50, pageSize = 1 }: PaginateParams
): Promise<PaginateResponse> =>
  fetch(`${GENERAL_API}/courses/?limit=${limit}&pageSize=${pageSize}`, {
    method: "GET",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  })
    .then((res) => res.json())
    .catch((res) => res.json());

export const getCourseById = (token: string, id: string): Promise<GetCourse> =>
  fetch(`${GENERAL_API}/courses/${id}`, {
    method: "GET",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  }).then((res) => res.json());

export const postCourse = (token: string, course: any) =>
  fetch(`${GENERAL_API}/courses`, {
    method: "POST",
    cache: "no-cache",
    body: JSON.stringify({
      ...course,
    }),
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  }).then((res) => res.json());

export const putCourse = (token: string, id: string, course: any) =>
  fetch(`${GENERAL_API}/courses/${id}`, {
    method: "PUT",
    cache: "no-cache",
    body: JSON.stringify({
      ...course,
    }),
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  }).then((res) => res.json());

// FALTA CREAR METODO QUE REGISTRE TEMAS DENTRO DE UN CURSO
