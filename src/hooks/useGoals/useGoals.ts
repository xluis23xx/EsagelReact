import * as React from "react";
import { getCookie } from "../../utils/cookies";
import Swal from "sweetalert2";

import { getGoalById, getGoals, postGoal, putGoal } from "./helpers";
import { Goal } from "./index";
import { PaginateResponse } from "../types";
import { setFormatDate } from "../../utils/formats";

export enum Status {
  Loading,
  Ready,
  Updating,
  Error,
}

export const useGoals = () => {
  const [goals, setGoals] = React.useState<Goal[]>([]);
  const [goalsAll, setGoalsAll] = React.useState<Goal[]>([]);
  const [goalInfo, setGoalInfo] = React.useState<Goal | null>(null);
  const [status, setStatus] = React.useState(Status.Loading);

  function setGoalById(id: string) {
    setStatus(Status.Loading);
    const token = getCookie("esagel_token") || "";
    getGoalById(token, id).then((response) => {
      if (response?._id) {
        setGoalInfo(response);
        setStatus(Status.Ready);
      }
    });
  }

  function getAllGoals(
    { startDate, endDate }: {startDate: string, endDate:string}
    ) {
    console.log(startDate, endDate)
    const token = getCookie("esagel_token") || "";
    getGoals(token,{startDate, endDate}, {})
      .then((response: PaginateResponse) => {
        console.log(response)
        const {docs: goalsObtained} = response || {}
        setGoals(goalsObtained);
        setGoalsAll(goalsObtained);
        setStatus(Status.Ready);
      })
      .catch((err) => {
        console.log(err)
        setStatus(Status.Error);
      });
  }

  function searchGoalsByInterval(startDate:string= "", endDate:string ="") {
    if (goalsAll.length === 0) {
      getAllGoals({startDate, endDate});
    }else if(startDate==="" && endDate===""){
      setGoals(goalsAll)
    }
    else {
      const goalsFilter = goalsAll.filter((goal: Goal) => {
        const {
          createdAt
        } = goal || {};
        let dateStrA = startDate.replace( /(\d{4})\/(\d{2})\/(\d{2})/, "$2/$1/$3")
        let dateStrB = endDate.replace( /(\d{4})\/(\d{2})\/(\d{2})/, "$2/$1/$3");
        let emitedDate =  setFormatDate({order:1,date: createdAt})
        emitedDate =  emitedDate.replace( /(\d{4})\/(\d{2})\/(\d{2})/, "$2/$1/$3");
        return new Date(emitedDate) >= new Date(dateStrA) && new Date(emitedDate) <= new Date(dateStrB)
      });
      setGoals(goalsFilter);
    }
  }

  async function updateGoal(id: string, goal: any) {
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
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Algo ocurrió!",
          text: "Ocurrió un error inesperado",
          timer: 2000,
          confirmButtonColor: "#ff0000",
        });
        setStatus(Status.Ready);
        return undefined;
      });
  }

  async function deleteGoal(id: string) {
    setStatus(Status.Updating);
    const token = getCookie("esagel_token") || "";
    putGoal(token, id, { status: 0, isDelete: true })
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
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Algo ocurrió!",
          text: "Ocurrió un error inesperado",
          timer: 2000,
          confirmButtonColor: "#ff0000",
        });
        setStatus(Status.Ready);
      });
  }

  async function registerGoal(goal: any) {
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
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Algo ocurrió!",
          text: "Ocurrió un error inesperado",
          timer: 2000,
          confirmButtonColor: "#ff0000",
        });
        setStatus(Status.Ready);
        return undefined;
      });
  }

  return {
    goals,
    deleteGoal,
    registerGoal,
    updateGoal,
    setGoalById,
    goalInfo,
    getAllGoals,
    searchGoalsByInterval,
    status,
  };
};
