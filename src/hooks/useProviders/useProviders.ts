import * as React from "react";
import { getCookie } from "../../utils/cookies";
import Swal from "sweetalert2";

import {
  getProviderById,
  getProviders,
  postProvider,
  putProvider,
} from "./helpers";
import { Provider } from "./index";
import { BodyParams, PaginateParams, PaginateResponse } from "../types";
import { ProviderResponse } from "./types";

export enum Status {
  Loading,
  Ready,
  Updating,
  Error,
}

export const useProviders = () => {
  const [providers, setProviders] = React.useState<Provider[]>([]);
  const [providerInfo, setProviderInfo] = React.useState<Provider | null>(null);
  const [status, setStatus] = React.useState(Status.Loading);
  const [paginateData, setPaginateData] = React.useState<PaginateResponse| null>(null)
  const [searchFilter, setSearchFilter] = React.useState<BodyParams>({
    filter: "",
    status: null
  })

  function setProviderById(id: string) {
    setStatus(Status.Loading);
    const token = getCookie("esagel_token") || "";
    getProviderById(token, id).then((response) => {
      if (response?.status===200) {
        setProviderInfo(response?.doc || null);
        setStatus(Status.Ready);
      }
    });
  }

  async function getProvidersByFilter(
    { filter, status }: BodyParams,
    {limit, pageSize}: PaginateParams
    ): Promise<PaginateResponse> {
    const token = getCookie("esagel_token") || "";
    return getProviders(token,{filter, status}, {limit, pageSize})
    .then((response: PaginateResponse) => {
      if(response?.status===200){
        const { docs: providersObtained = [] } = response || {};
        setProviders(providersObtained);
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

  async function updateProvider(id: string, provider: any): Promise<ProviderResponse> {
    setStatus(Status.Updating);
    const token = getCookie("esagel_token") || "";
    return putProvider(token, id, provider)
      .then((response) => {
        if (response?.status === 200 || response?.status === 201) {
          Swal.fire({
            icon: "success",
            title: "¡Actualización Exitosa!",
            text: "Proveedor actualizado éxitosamente",
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

  async function deleteProvider(id: string): Promise<ProviderResponse> {
    setStatus(Status.Updating);
    const token = getCookie("esagel_token") || "";
    return putProvider(token, id, { status: 0, isDelete: true })
      .then((response) => {
        if (response?.status === 201 || response?.status === 200) {
          setProviders(
            providers.filter((provider: Provider) => provider._id !== id)
          );
          const businessName = response?.doc?.businessName || "";
          Swal.fire({
            title: "¡Todo salió bien!",
            icon: "success",
            text: `Proveedor ${businessName} eliminado con éxito`,
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

  async function registerProvider(provider: any): Promise<ProviderResponse> {
    const token = getCookie("esagel_token") || "";
    setStatus(Status.Updating);
    return postProvider(token, provider)
      .then((response) => {
        if (response?.status === 200 || response?.status === 201) {
          Swal.fire({
            icon: "success",
            title: "¡Registro Exitoso!",
            text: "Proveedor registrado éxitosamente",
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
    getProvidersByFilter(searchFilter, {limit: 20, pageSize:index})
  }

  return {
    providers,
    deleteProvider,
    registerProvider,
    updateProvider,
    setProviderById,
    providerInfo,
    getProvidersByFilter,
    paginateData,
    setSearchFilter,
    changePage,
    status,
  };
};
