import * as React from "react";
import { getCookie } from "../../utils/cookies";
import Swal from "sweetalert2";

import {
  getProspectusStatusById,
  getProspectusStatuses,
  postProspectStatus,
  putProspectStatus,
} from "./helpers";
import { ProspectStatus } from "./index";
import { BodyParams, PaginateParams, PaginateResponse } from "../types";
import { ProspectStatusResponse } from "./types";

export enum Status {
  Loading,
  Ready,
  Updating,
  Error,
}

export const useProspectStatuses = () => {
  const [prospectStatuses, setProspectStatuses] = React.useState<
    ProspectStatus[]
  >([]);
  const [prospectInfo, setProspectInfo] = React.useState<ProspectStatus | null>(null);
  const [status, setStatus] = React.useState(Status.Loading);
  const [paginateData, setPaginateData] = React.useState<PaginateResponse| null>(null)
  const [searchFilter, setSearchFilter] = React.useState<BodyParams>({
    filter: "",
    status: null
  })

  function setProspectStatusById(id: string) {
    setStatus(Status.Loading);
    const token = getCookie("esagel_token") || "";
    getProspectusStatusById(token, id).then((response) => {
      if (response?.status === 200) {
        setProspectInfo(response?.doc || null);
        setStatus(Status.Ready);
      }
    });
  }

  async function getProspectStatusesByFilter(
    { filter="", status=null }: BodyParams,
    {limit, pageSize}: PaginateParams
  ): Promise<PaginateResponse> {
    const token = getCookie("esagel_token") || "";
    return getProspectusStatuses(token,{filter, status}, {limit, pageSize})
    .then((response: PaginateResponse) => {
      if(response?.status===200){
        const { docs: prospectsObtained = [] } = response || {};
        setProspectStatuses(prospectsObtained);
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

  async function updateProspectStatus(id: string, prospect: any): Promise<ProspectStatusResponse> {
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

  async function deleteProspectStatus(id: string): Promise<ProspectStatusResponse> {
    setStatus(Status.Updating);
    const token = getCookie("esagel_token") || "";
    return putProspectStatus(token, id, { status: 0, isDelete: true })
      .then((response) => {
        if (response?.status === 200 || response?.status === 201) {
          setProspectStatuses(
            prospectStatuses.filter(
              (prospect: ProspectStatus) => prospect._id !== id
            )
          );
          const prospectName = response?.doc?.name || "";
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

  async function registerProspectStatus(prospect: any): Promise<ProspectStatusResponse> {
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
    getProspectStatusesByFilter(searchFilter, {limit: 20, pageSize:index})
  }

  return {
    prospectStatuses,
    getProspectStatusesByFilter,
    registerProspectStatus,
    updateProspectStatus,
    deleteProspectStatus,
    setProspectStatusById,
    prospectInfo,
    paginateData,
    setSearchFilter,
    changePage,
    status,
  };
};
