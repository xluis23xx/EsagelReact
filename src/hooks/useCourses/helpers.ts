import ENVIROMENTS from "../../enviroments/env";
import { BodyParams, PaginateParams, PaginateResponse } from "../types";

import { CourseResponse } from "./types";

const { GENERAL_API } = ENVIROMENTS;

export const getCourses = (
  token: string,
  {filter = "", status = null}: BodyParams,
  { limit = 5, pageSize = 1 }: PaginateParams
): Promise<PaginateResponse> =>
  fetch(`${GENERAL_API}/courses/consult/?limit=${limit}&pageSize=${pageSize}`, {
    method: "POST",
    cache: "no-cache",
    body: JSON.stringify({
      filter,
      status
    }),
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  }).then((res) => res.json())
  .catch((res) => res.json());

export const getCourseById = (token: string, id: string): Promise<CourseResponse> =>
  fetch(`${GENERAL_API}/courses/${id}`, {
    method: "GET",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  }).then((res) => res.json())
  .catch((res) => res.json());

export const postCourse = (token: string, course: any): Promise<CourseResponse> =>
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
  }).then((res) => res.json())
  .catch((res) => res.json());

export const putCourse = (token: string, id: string, course: any): Promise<CourseResponse> =>
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
  }).then((res) => res.json())
  .catch((res) => res.json());
