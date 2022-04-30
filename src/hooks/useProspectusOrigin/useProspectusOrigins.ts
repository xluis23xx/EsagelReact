import * as React from "react";
import { getCookie } from "../../utils/cookies";
import Swal from "sweetalert2";

import {
  getProspectusOriginById,
  getProspectusOrigins,
  postProspectOrigin,
  putProspectOrigin,
} from "./helpers";
import { ProspectusOrigin } from "./index";

export enum Status {
  Loading,
  Ready,
  Updating,
  Error,
}

export const useProspectOrigins = () => {
  const [prospectOrigins, setProspectOrigins] = React.useState<
    ProspectusOrigin[]
  >([]);
  const [prospectInfo, setProspectInfo] =
    React.useState<ProspectusOrigin>(null);
  const [status, setStatus] = React.useState(Status.Loading);

  function setProspectOriginById(id: string) {
    setStatus(Status.Loading);

    const token = getCookie("esagel_token") || "";
    getProspectusOriginById(token, id).then((response) => {
      if (response?._id) {
        setStatus(Status.Ready);
        setProspectInfo(response);
      }
    });
  }

  function getAllProspectOrigins() {
    const token = getCookie("esagel_token") || "";
    getProspectusOrigins(token)
      .then((response) => {
        const enableProspects =
          response.filter(
            (prospect: ProspectusOrigin) => prospect.status === 1
          ) || [];
        setProspectOrigins(enableProspects);
        setStatus(Status.Ready);
      })
      .catch(() => {
        setStatus(Status.Error);
      });
  }

  async function updateProspectOrigin(id: string, prospect: any) {
    const token = getCookie("esagel_token") || "";
    return putProspectOrigin(token, id, prospect)
      .then((response) => {
        if (response?.status === 201 || response?.status === 200) {
          Swal.fire({
            icon: "success",
            title: "¡Actualización Exitosa!",
            text: "Origen de Prospecto actualizado éxitosamente",
            timer: 2000,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Algo ocurrió!",
            text: response?.message || "",
            timer: 2000,
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
        });
        return undefined;
      });
  }

  function deleteProspectOrigin(id: string) {
    setStatus(Status.Updating);
    const token = getCookie("esagel_token") || "";
    putProspectOrigin(token, id, { status: 0, isDelete: true })
      .then((response) => {
        if (response?.status === 200 || response?.status === 201) {
          setProspectOrigins(
            prospectOrigins.filter(
              (prospect: ProspectusOrigin) => prospect._id !== id
            )
          );
          const prospectName = response?.name || "";
          Swal.fire({
            title: "¡Todo salió bien!",
            icon: "success",
            text: `Origen de Prospecto ${prospectName} eliminado con éxito`,
            timer: 2000,
          });
        } else {
          Swal.fire({
            title: "¡Algo ocurrió!",
            icon: "error",
            text: response?.message || "",
            timer: 2000,
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
        });
      });
  }

  async function registerProspectOrigin(prospect: any) {
    const token = getCookie("esagel_token") || "";
    setStatus(Status.Updating);
    return postProspectOrigin(token, prospect)
      .then((response) => {
        if (response?.status === 200 || response?.status === 201) {
          Swal.fire({
            icon: "success",
            title: "¡Registro Exitoso!",
            text: "Origen de Prospecto registrado éxitosamente",
            timer: 2000,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Algo ocurrió!",
            text: response?.message || "",
            timer: 2000,
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
        });
        return undefined;
      });
  }

  return {
    prospectOrigins,
    getAllProspectOrigins,
    registerProspectOrigin,
    updateProspectOrigin,
    deleteProspectOrigin,
    setProspectOriginById,
    prospectInfo,
    status,
  };
};
