import ENVIROMENTS from "../../enviroments/env";

import { DashboardParams, DashboardResult } from "./types";

const { GENERAL_API } = ENVIROMENTS;

export const getDashboard = (
  token: string,
   dashboardParams : DashboardParams
): Promise<DashboardResult> =>
  fetch(`${GENERAL_API}/dashboard`, {
    method: "POST",
    cache: "no-cache",
    body: JSON.stringify(
      dashboardParams
    ),
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  }).then((res) => res.json())
  .catch((res) => res.json());