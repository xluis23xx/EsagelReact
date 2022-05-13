import * as React from "react";
import { getCookie } from "../../utils/cookies";
import Swal from "sweetalert2";

import {
  getProspectusStatusById,
  getProspectusStatuses,
  postProspectStatus,
  putProspectStatus,
} from "./helpers";
import { ProspectusStatus } from "./index";

export enum Status {
  Loading,
  Ready,
  Updating,
  Error,
}

export const useProspectStatuses = () => {
  const [prospectStatuses, setProspectStatuses] = React.useState<
    ProspectusStatus[]
  >([]);
  const [prospectInfo, setProspectInfo] =
    React.useState<ProspectusStatus>(null);
  const [status, setStatus] = React.useState(Status.Loading);

  function setProspectStatusById(id: string) {
    setStatus(Status.Loading);

    const token = getCookie("esagel_token") || "";
    getProspectusStatusById(token, id).then((response) => {
      if (response?._id) {
        setStatus(Status.Ready);
        setProspectInfo(response);
      }
    });
  }

  function getAllProspectStatuses() {
    const token = getCookie("esagel_token") || "";
    getProspectusStatuses(token)
      .then((prospectsObtained: ProspectusStatus[]) => {
        const enableProspects =
          prospectsObtained.filter(
            (prospect: ProspectusStatus) => prospect.status === 1
          ) || [];
        setProspectStatuses(enableProspects);
        setStatus(Status.Ready);
      })
      .catch(() => {
        setStatus(Status.Error);
      });
  }

  async function updateProspectStatus(id: string, prospect: any) {
    setStatus(Status.Updating);
    const token = getCookie("esagel_token") || "";
    return putProspectStatus(token, id, prospect)
      .then((response) => {
        if (response?.status === 201 || response?.status === 200) {
          Swal.fire({
            icon: "success",
            title: "¡Actualización Exitosa!",
            text: "Estado de Prospecto actualizado éxitosamente",
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

  function deleteProspectStatus(id: string) {
    setStatus(Status.Updating);
    const token = getCookie("esagel_token") || "";
    putProspectStatus(token, id, { status: 0, isDelete: true })
      .then((response) => {
        if (response?.status === 200 || response?.status === 201) {
          setProspectStatuses(
            prospectStatuses.filter(
              (prospect: ProspectusStatus) => prospect._id !== id
            )
          );
          const prospectName = response?.updateLeadSource?.name || "";
          Swal.fire({
            title: "¡Todo salió bien!",
            icon: "success",
            text: `Estado de Prospecto ${prospectName} eliminado con éxito`,
            timer: 2000,
            confirmButtonColor: "#ff0000",
          });
        } else {
          Swal.fire({
            title: "¡Algo ocurrió!",
            icon: "error",
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

  async function registerProspectStatus(prospect: any) {
    const token = getCookie("esagel_token") || "";
    setStatus(Status.Updating);
    return postProspectStatus(token, prospect)
      .then((response) => {
        if (response?.status === 200 || response?.status === 201) {
          Swal.fire({
            icon: "success",
            title: "¡Registro Exitoso!",
            text: "Estado de Prospecto registrado éxitosamente",
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
    prospectStatuses,
    getAllProspectStatuses,
    registerProspectStatus,
    updateProspectStatus,
    deleteProspectStatus,
    setProspectStatusById,
    prospectInfo,
    status,
  };
};
