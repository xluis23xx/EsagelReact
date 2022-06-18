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

  async function obtainDashboard (
    dashboardParams: DashboardParams,
    ): Promise<DashboardResult>{
    setStatus(Status.Loading)
    const token = getCookie("esagel_token") || "";
    return getDashboard(token, dashboardParams)
      .then((response: DashboardResult) => {
        if(response?.status===200){
          setDashboardInfo(response)
        }else{
          Swal.fire({
            title:"Sucedió un error inesperado!",
            text:response?.message || '',
            timer: 1500
          })
        }
        setStatus(Status.Ready);
      })
      .catch((error) => {
        Swal.fire({
          title:"Sucedió algo cargar su dashboard",
          timer: 1500
        })
        setStatus(Status.Error);
        return error;
      });
  }

  return {
    obtainDashboard,
    dashboardInfo,
    status,
  };
};