import ENVIROMENTS from "../../enviroments/env";
import { SettingResponse } from "./types";
const { GENERAL_API } = ENVIROMENTS;

export const getSetting = (token: string): Promise<SettingResponse> =>
  fetch(`${GENERAL_API}/settings`, {
    method: "GET",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  }).then((res) => res.json())
  .catch((res) => res.json());

export const putSetting = (token: string, id: string, setting: any): Promise<SettingResponse> =>
  fetch(`${GENERAL_API}/settings/${id}`, {
    method: "PUT",
    cache: "no-cache",
    body: JSON.stringify({
      ...setting,
    }),
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  }).then((res) => res.json())
  .catch((res) => res.json());
