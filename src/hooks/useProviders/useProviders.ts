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

export enum Status {
  Loading,
  Ready,
  Updating,
  Error,
}

export const useProviders = () => {
  const [providers, setProviders] = React.useState<Provider[]>([]);
  const [providersAll, setproviderssAll] = React.useState<Provider[]>([]);
  const [providerInfo, setProviderInfo] = React.useState<Provider>(null);
  const [status, setStatus] = React.useState(Status.Loading);

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

  function getAllProviders() {
    const token = getCookie("esagel_token") || "";
    getProviders(token)
      .then((allProviders) => {
        const enableProviders =
          allProviders.filter((provider: Provider) => provider.status === 1) ||
          [];
        setProviders(enableProviders);
        setproviderssAll(enableProviders);
        setStatus(Status.Ready);
      })
      .catch(() => {
        setStatus(Status.Error);
      });
  }

  function getProvider(id: string) {
    const token = getCookie("esagel_token") || "";
    return getProviderById(token, id);
  }

  function searchProvidersByFilter(filter: string) {
    if (filter.length === 0) {
      setProviders(providersAll);
    } else {
      const providersFilter = providersAll.filter((provider: Provider) => {
        const { businessName = "", documentNumber = "" } = provider || {};
        const regex = new RegExp(filter.toLowerCase());
        return regex.test(`${businessName} ${documentNumber}`.toLowerCase());
      });
      setProviders(providersFilter);
    }
  }

  async function updateProvider(id: string, provider: any) {
    const token = getCookie("esagel_token") || "";
    return putProvider(token, id, provider)
      .then((response) => {
        if (response?.status === 200 || response?.status === 201) {
          Swal.fire({
            icon: "success",
            title: "¡Actualización Exitosa!",
            text: "Proveedor actualizado éxitosamente",
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
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "¡Algo ocurrió!",
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
    providers,
    deleteProvider,
    getProvider,
    searchProvidersByFilter,
    registerProvider,
    updateProvider,
    setProviderById,
    providerInfo,
    getAllProviders,
    status,
  };
};
