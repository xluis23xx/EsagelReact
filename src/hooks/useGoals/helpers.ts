import ENVIROMENTS from "../../enviroments/env";
import { BodyParams, PaginateParams, PaginateResponse } from "../types";

import { GetGoal } from "./types";

const { GENERAL_API } = ENVIROMENTS;

export const getGoals = (
  token: string,
  { startDate, endDate, status=null }: BodyParams,
  { limit = 5, pageSize = 1 }: PaginateParams
): Promise<PaginateResponse> => 
     fetch(`${GENERAL_API}/goals/consult/?limit=${limit}&pageSize=${pageSize}`, {
      method: "POST",
      cache: "no-cache",
      body: JSON.stringify({
        startDate: startDate,
        endDate:endDate,
        status
      }),
      headers: {
        "Content-Type": "application/json",
        "x-access-token": `${token}`,
      },
    }).then((res) => res.json()).catch((res) => res.json());
  
  

export const getGoalById = (token: string, id: string): Promise<GetGoal> =>
  fetch(`${GENERAL_API}/goals/${id}`, {
    method: "GET",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  }).then((res) => res.json());

export const postGoal = (token: string, goal: any) =>
  fetch(`${GENERAL_API}/goals`, {
    method: "POST",
    cache: "no-cache",
    body: JSON.stringify({
      ...goal,
    }),
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  }).then((res) => res.json());

export const putGoal = (token: string, id: string, goal: any) =>
  fetch(`${GENERAL_API}/goals/${id}`, {
    method: "PUT",
    cache: "no-cache",
    body: JSON.stringify({
      ...goal,
    }),
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  }).then((res) => res.json());
