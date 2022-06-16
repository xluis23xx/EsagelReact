import * as React from "react";
import { getCookie } from "../../utils/cookies";
import Swal from "sweetalert2";

import { getGoalById, getGoals, postGoal, putGoal } from "./helpers";
import { Goal } from "./index";
import { BodyParams, PaginateParams, PaginateResponse } from "../types";
import { GoalResponse } from "./types";

export enum Status {
  Loading,
  Ready,
  Updating,
  Error,
}

export const useGoals = () => {
  const [goals, setGoals] = React.useState<Goal[]>([]);
  const [goalInfo, setGoalInfo] = React.useState<Goal | null>(null);
  const [status, setStatus] = React.useState(Status.Loading);
  const [paginateData, setPaginateData] = React.useState<PaginateResponse| null>(null)
  const [searchFilter, setSearchFilter] = React.useState<BodyParams>({
    startDate: "",
    endDate:"",
    status: null
  })

  function setGoalById(id: string) {
    setStatus(Status.Loading);
    const token = getCookie("esagel_token") || "";
    getGoalById(token, id).then((response) => {
      if (response?.status===200) {
        setGoalInfo(response?.doc || null);
        setStatus(Status.Ready);
      }
    });
  }

  async function getGoalsByFilter(
    { startDate, endDate, status=null }: BodyParams,
    {limit, pageSize}: PaginateParams
    ): Promise<PaginateResponse>{
    const token = getCookie("esagel_token") || "";
    return getGoals(token,{startDate, endDate, status}, {limit, pageSize})
      .then((response: PaginateResponse) => {
        if(response?.status===200){
          const { docs: goalsObtained = [] } = response || {};
          setGoals(goalsObtained);
          setPaginateData(response);
        }else{
          Swal.fire({
            icon: "error",
            title: "Algo ocurrió!",
            text: response?.message || "",
            timer: 2000,
            confirmButtonColor: "#ff0000",
          });
        }
        setStatus(Status.Ready);
        return response;
      })
      .catch((error) => {
        setStatus(Status.Error);
        return error;
      });
  }

  async function updateGoal(id: string, goal: any): Promise<GoalResponse> {
    setStatus(Status.Updating);
    const token = getCookie("esagel_token") || "";
    return putGoal(token, id, goal)
      .then((response) => {
        if (response?.status === 200 || response?.status === 201) {
          Swal.fire({
            icon: "success",
            title: "¡Actualización Exitosa!",
            text: "Meta actualizada éxitosamente",
            timer: 2000,
            confirmButtonColor: "#ff0000",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Algo ocurrió!",
            text: response?.message || "",
            timer: 2000,
            confirmButtonColor: "#ff0000",
          });
        }
        setStatus(Status.Ready);
        return response;
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Algo ocurrió!",
          text: "Ocurrió un error inesperado",
          timer: 2000,
          confirmButtonColor: "#ff0000",
        });
        setStatus(Status.Ready);
        return error;
      });
  }

  async function deleteGoal(id: string): Promise<GoalResponse> {
    setStatus(Status.Updating);
    const token = getCookie("esagel_token") || "";
    return putGoal(token, id, { status: 0, isCancel: true })
      .then((response) => {
        if (response?.status === 201 || response?.status === 200) {
          setGoals(goals.filter((goal: Goal) => goal?._id !== id));

          Swal.fire({
            title: "¡Todo salió bien!",
            icon: "success",
            text: `La Meta fue eliminada con éxito`,
            timer: 2000,
            confirmButtonColor: "#ff0000",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "¡Algo ocurrió!",
            text: response?.message || "",
            timer: 2000,
            confirmButtonColor: "#ff0000",
          });
        }
        setStatus(Status.Ready);
        return response;
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Algo ocurrió!",
          text: "Ocurrió un error inesperado",
          timer: 2000,
          confirmButtonColor: "#ff0000",
        });
        setStatus(Status.Ready);
        return error;
      });
  }

  async function registerGoal(goal: any): Promise<GoalResponse> {
    const token = getCookie("esagel_token") || "";
    setStatus(Status.Updating);
    return postGoal(token, goal)
      .then((response) => {
        if (response?.status === 200 || response?.status === 201) {
          Swal.fire({
            icon: "success",
            title: "¡Registro Exitoso!",
            text: `La Meta fue registrada éxitosamente`,
            timer: 2000,
            confirmButtonColor: "#ff0000",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Algo ocurrió!",
            text: response?.message || "",
            timer: 2000,
            confirmButtonColor: "#ff0000",
          });
        }
        setStatus(Status.Ready);
        return response;
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Algo ocurrió!",
          text: "Ocurrió un error inesperado",
          timer: 2000,
          confirmButtonColor: "#ff0000",
        });
        setStatus(Status.Ready);
        return error;
      });
  }

  function changePage (index: number) {
     getGoalsByFilter(searchFilter, {limit: 20, pageSize:index})
  }

  return {
    goals,
    deleteGoal,
    registerGoal,
    updateGoal,
    setGoalById,
    goalInfo,
    getGoalsByFilter,
    paginateData,
    setSearchFilter,
    changePage,
    status,
  };
};
