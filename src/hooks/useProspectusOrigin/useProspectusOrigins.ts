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
import { BodyParams, PaginateParams, PaginateResponse } from "../types";
import { ProspectusOriginResponse } from "./types";

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
    React.useState<ProspectusOrigin | null>(null);
  const [status, setStatus] = React.useState(Status.Loading);
  const [paginateData, setPaginateData] = React.useState<PaginateResponse| null>(null)
  const [searchFilter, setSearchFilter] = React.useState<BodyParams>({
    filter: "",
    status: null
  })

  function setProspectOriginById(id: string) {
    setStatus(Status.Loading);
    const token = getCookie("esagel_token") || "";
    getProspectusOriginById(token, id).then((response) => {
      if (response?.status === 200) {
        setProspectInfo(response?.doc || null);
        setStatus(Status.Ready);
      }
    });
  }

  async function getProspectOriginsByFilter(
    { filter="", status=null }: BodyParams,
    {limit, pageSize}: PaginateParams
  ): Promise<PaginateResponse> {
    const token = getCookie("esagel_token") || "";
    return getProspectusOrigins(token,{filter, status}, {limit, pageSize})
    .then((response: PaginateResponse) => {
      if(response?.status===200){
        const { docs: prospectsObtained = [] } = response || {};
        setProspectOrigins(prospectsObtained);
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

  async function updateProspectOrigin(id: string, prospect: any): Promise<ProspectusOriginResponse> {
    setStatus(Status.Updating);
    const token = getCookie("esagel_token") || "";
    return putProspectOrigin(token, id, prospect)
      .then((response) => {
        if (response?.status === 201 || response?.status === 200) {
          Swal.fire({
            icon: "success",
            title: "¡Actualización Exitosa!",
            text: "Origen de Prospecto actualizado éxitosamente",
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

  async function deleteProspectOrigin(id: string): Promise<ProspectusOriginResponse> {
    setStatus(Status.Updating);
    const token = getCookie("esagel_token") || "";
    return putProspectOrigin(token, id, { status: 0, isDelete: true })
      .then((response) => {
        if (response?.status === 200 || response?.status === 201) {
          setProspectOrigins(
            prospectOrigins.filter(
              (prospect: ProspectusOrigin) => prospect._id !== id
            )
          );
          const prospectName = response?.doc?.name || "";
          Swal.fire({
            title: "¡Todo salió bien!",
            icon: "success",
            text: `Origen de Prospecto ${prospectName} eliminado con éxito`,
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

  async function registerProspectOrigin(prospect: any): Promise<ProspectusOriginResponse> {
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
    getProspectOriginsByFilter(searchFilter, {limit: 20, pageSize:index})
  }

  return {
    prospectOrigins,
    getProspectOriginsByFilter,
    registerProspectOrigin,
    updateProspectOrigin,
    deleteProspectOrigin,
    setProspectOriginById,
    prospectInfo,
    paginateData,
    setSearchFilter,
    changePage,
    status,
  };
};
