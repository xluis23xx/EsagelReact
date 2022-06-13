import * as React from "react";
import { getCookie } from "../../utils/cookies";
import Swal from "sweetalert2";

import { getDashboard } from "./helpers";
import { DashboardParams, DashboardResult } from "./index";

export enum Status {
  Loading,
  Ready,
  Updating,
  Error,
}

export const useDashboard = () => {
  const [dashboardInfo, setDashboardInfo] = React.useState<DashboardResult | null>(null);
  const [status, setStatus] = React.useState(Status.Loading);

  function obtainDashboard (
    dashboardParams: DashboardParams,
    ) {
    const token = getCookie("esagel_token") || "";
    getDashboard(token, dashboardParams)
      .then((response: DashboardResult) => {
        if(response?.status===200){
          setDashboardInfo(response)
        }
        setStatus(Status.Ready);
      })
      .catch(() => {
        Swal.fire({
          title:"Sucedió algo cargar su dashboard",
          timer: 1000
        })
        setStatus(Status.Error);
      });
  }

  return {
    obtainDashboard,
    dashboardInfo,
    status,
  };
};