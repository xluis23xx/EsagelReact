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
import { PaginateResponse } from "../types";

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
  const [searchFilter, setSearchFilter] = React.useState({
    filter: "",
  })

  function setProviderById(id: string) {
    setStatus(Status.Loading);

    const token = getCookie("esagel_token") || "";
    getProviderById(token, id).then((response) => {
      if (response?._id) {
        setProviderInfo(response);
        setStatus(Status.Ready);
      }
    });
  }

  function cleanProviderInfo() {
    setProviderInfo(null);
  }

  function getAllProviders(
    { filter }: {filter:string},
    {limit=3, pageSize=1}: {limit:number, pageSize:number}
    ) {
    const token = getCookie("esagel_token") || "";
    getProviders(token,{filter}, {limit, pageSize})
      .then((response: PaginateResponse) => {
        const { docs: providersObtained = [] } = response || {};
        const enableProviders =
          providersObtained.filter(
            (provider: Provider) => provider.status === 1
          ) || [];
        setProviders(enableProviders);
        setPaginateData(response);
        setStatus(Status.Ready);
      })
      .catch(() => {
        setStatus(Status.Error);
      });
  }

  async function updateProvider(id: string, provider: any) {
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

  async function deleteProvider(id: string) {
    setStatus(Status.Updating);
    const token = getCookie("esagel_token") || "";
    putProvider(token, id, { status: 0, isDelete: true })
      .then((response) => {
        if (response?.status === 201 || response?.status === 200) {
          setProviders(
            providers.filter((provider: Provider) => provider._id !== id)
          );
          const businessName = response?.updatedProvider?.businessName || "";
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

  async function registerProvider(provider: any) {
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

  function changePage (index: number) {
    getAllProviders(searchFilter, {limit: 20, pageSize:index})
  }

  return {
    providers,
    deleteProvider,
    registerProvider,
    updateProvider,
    setProviderById,
    cleanProviderInfo,
    providerInfo,
    getAllProviders,
    paginateData,
    setSearchFilter,
    changePage,
    status,
  };
};
