import * as React from "react";
import { getCookie } from "../../utils/cookies";
import Swal from "sweetalert2";

import { getClientById, getClients, postClient, putClient } from "./helpers";
import { Client } from "./index";
import { PaginateResponse } from "../types";

export enum Status {
  Loading,
  Ready,
  Updating,
  Error,
}

export const useClients = () => {
  const [clients, setClients] = React.useState<Client[]>([]);
  const [clientInfo, setClientInfo] = React.useState<Client | null>(null);
  const [status, setStatus] = React.useState(Status.Loading);
  const [paginateData, setPaginateData] = React.useState<PaginateResponse| null>(null)
  const [searchFilter, setSearchFilter] = React.useState({
    filter: "",
  })

  function setClientById(id: string) {
    setStatus(Status.Loading);

    const token = getCookie("esagel_token") || "";
    getClientById(token, id).then((response) => {
      if (response?._id) {
        setClientInfo(response);
        setStatus(Status.Ready);
      }
    });
  }

  function cleanClientInfo() {
    setClientInfo(null);
  }

  function getAllClients(
    { filter }: {filter:string},
    {limit=3, pageSize=1}: {limit:number, pageSize:number}
    ) {
    const token = getCookie("esagel_token") || "";
    getClients(token,{filter}, {limit, pageSize})
      .then((response: PaginateResponse) => {
        const { docs: clientsObtained = [] } = response || {};
        const enableClients =
          clientsObtained.filter((client: Client) => client.status === 1) || [];
        setClients(enableClients);
        setPaginateData(response);
        setStatus(Status.Ready);
      })
      .catch(() => {
        setStatus(Status.Error);
      });
  }

  async function updateClient(id: string, client: any) {
    setStatus(Status.Updating);
    const token = getCookie("esagel_token") || "";
    return putClient(token, id, client)
      .then((response) => {
        if (response?.status === 200 || response?.status === 201) {
          Swal.fire({
            icon: "success",
            title: "¡Actualización Exitosa!",
            text: "Cliente actualizado éxitosamente",
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

  async function deleteClient(id: string) {
    setStatus(Status.Updating);
    const token = getCookie("esagel_token") || "";
    putClient(token, id, { status: 0, isDelete: true })
      .then((response) => {
        if (response?.status === 201 || response?.status === 200) {
          setClients(clients.filter((client: Client) => client._id !== id));
          const clientName = response?.updatedClient?.name || "";
          const clientLastname = response?.updatedClient?.lastname || "";
          Swal.fire({
            title: "¡Todo salió bien!",
            icon: "success",
            text: `Cliente ${clientName} ${clientLastname} eliminado con éxito`,
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

  async function registerClient(client: any) {
    const token = getCookie("esagel_token") || "";
    setStatus(Status.Updating);
    return postClient(token, client)
      .then((response) => {
        if (response?.status === 200 || response?.status === 201) {
          Swal.fire({
            icon: "success",
            title: "¡Registro Exitoso!",
            text: "Cliente registrado éxitosamente",
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
    getAllClients(searchFilter, {limit: 20, pageSize:index})
  }

  return {
    clients,
    deleteClient,
    cleanClientInfo,
    registerClient,
    updateClient,
    setClientById,
    clientInfo,
    getAllClients,
    paginateData,
    setSearchFilter,
    changePage,
    status,
  };
};
