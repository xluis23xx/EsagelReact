import * as React from "react";
import { getCookie } from "../../utils/cookies";
import Swal from "sweetalert2";

import {
  getCenterById,
  getCenters,
  postCenter,
  putCenter,
} from "./helpers";
import { Center } from "./index";
import { BodyParams, PaginateParams, PaginateResponse } from "../types";
import { CenterResponse } from "./types";

export enum Status {
  Loading,
  Ready,
  Updating,
  Error,
}

export const useCenters = () => {
  const [centers, setCenters] = React.useState<Center[]>([]);
  const [centerInfo, setCenterInfo] = React.useState<Center | null>(null);
  const [status, setStatus] = React.useState(Status.Loading);
  const [paginateData, setPaginateData] = React.useState<PaginateResponse| null>(null)
  const [searchFilter, setSearchFilter] = React.useState<BodyParams>({
    filter: "",
    status: null
  })

  function setCenterById(id: string) {
    setStatus(Status.Loading);
    const token = getCookie("esagel_token") || "";
    getCenterById(token, id).then((response) => {
      if (response?.status===200) {
        setCenterInfo(response?.doc || null);
        setStatus(Status.Ready);
      }
    });
  }

  async function getCentersByFilter(
    { filter="", status=null }: BodyParams,
    {limit, pageSize}: PaginateParams
  ): Promise<PaginateResponse> {
    const token = getCookie("esagel_token") || "";
    return getCenters(token,{filter, status}, {limit, pageSize})
      .then((response: PaginateResponse) => {
        if(response?.status===200){
          const { docs: centersObtained = [] } = response || {};
          setCenters(centersObtained);
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

  async function updateCenter(id: string, center: any): Promise<CenterResponse>{
    setStatus(Status.Updating);
    const token = getCookie("esagel_token") || "";
    return putCenter(token, id, center)
      .then((response) => {
        if (response?.status === 201 || response?.status === 200) {
          Swal.fire({
            icon: "success",
            title: "¡Actualización Exitosa!",
            text: "Centro actualizado éxitosamente",
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

  async function deleteCenter(id: string): Promise<CenterResponse> {
    setStatus(Status.Updating);
    const token = getCookie("esagel_token") || "";
    return putCenter(token, id, { status: 0, isDelete: true })
      .then((response) => {
        if (response?.status === 200 || response?.status === 201) {
          setCenters(
            centers.map(
              (center: Center) => center._id === id ? { ...center, status: 0 } : center
            )
          );
          const centerName = response?.doc?.branchName || "";
          Swal.fire({
            title: "¡Todo salió bien!",
            icon: "success",
            text: `Centro ${centerName} inhabilitado para su uso con éxito`,
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

  async function registerCenter(center: any): Promise<CenterResponse>  {
    const token = getCookie("esagel_token") || "";
    setStatus(Status.Updating);
    return postCenter(token, center)
      .then((response) => {
        if (response?.status === 200 || response?.status === 201) {
          Swal.fire({
            icon: "success",
            title: "¡Registro Exitoso!",
            text: "Centro registrado éxitosamente",
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
    getCentersByFilter(searchFilter, {limit: 20, pageSize:index})
  }

  return {
    centers,
    getCentersByFilter,
    registerCenter,
    updateCenter,
    deleteCenter,
    setCenterById,
    centerInfo,
    paginateData,
    setSearchFilter,
    changePage,
    status,
  };
};
