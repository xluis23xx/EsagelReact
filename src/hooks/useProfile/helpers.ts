import ENVIROMENTS from "../../enviroments/env";

import { GetUser } from "../useUsers/types";

const { GENERAL_API } = ENVIROMENTS;

export const getProfile = (token: string, id: string): Promise<GetUser> =>
  fetch(`${GENERAL_API}/profiles/${id}`, {
    method: "GET",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  }).then((res) => res.json());

export const putProfile = (token: string, id: string, user: any) =>
  fetch(`${GENERAL_API}/profiles/${id}`, {
    method: "PUT",
    cache: "no-cache",
    body: JSON.stringify({
      ...user,
    }),
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  }).then((res) => res.json());

export const putPassword = (
  id: string,
  token: string,
  { newPassword, oldPassword }: { newPassword: string; oldPassword: string }
) =>
  fetch(`${GENERAL_API}/profiles/password/${id}`, {
    method: "PUT",
    cache: "no-cache",
    body: JSON.stringify({
      newPassword,
      oldPassword,
    }),
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  }).then((res) => res.json());
