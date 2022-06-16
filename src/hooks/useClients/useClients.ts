import * as React from "react";
import { getCookie } from "../../utils/cookies";
import Swal from "sweetalert2";

import { getClientById, getClients, postClient, putClient } from "./helpers";
import { Client } from "./index";
import { BodyParams, PaginateParams, PaginateResponse } from "../types";
import { ClientResponse } from "./types";

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
  const [searchFilter, setSearchFilter] = React.useState<BodyParams>({
    filter: "",
    status: null
  })

  function setClientById(id: string) {
    setStatus(Status.Loading);
    const token = getCookie("esagel_token") || "";
    getClientById(token, id).then((response) => {
      if (response?.status === 200) {
        setClientInfo(response?.doc || null);
        setStatus(Status.Ready);
      }
    });
  }

  async function getClientsByFilter(
    { filter="", status=null }: BodyParams,
    {limit, pageSize}: PaginateParams
    ): Promise<PaginateResponse> {
    const token = getCookie("esagel_token") || "";
    return getClients(token,{filter, status}, {limit, pageSize})
      .then((response: PaginateResponse) => {
        if(response?.status===200){
          const { docs: clientsObtained = [] } = response || {};
          setClients(clientsObtained);
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
        return response
      })
      .catch((error) => {
        setStatus(Status.Error);
        return error
      });
  }

  async function updateClient(id: string, client: any):Promise<ClientResponse> {
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

  async function deleteClient(id: string):Promise<ClientResponse> {
    setStatus(Status.Updating);
    const token = getCookie("esagel_token") || "";
    return putClient(token, id, { status: 0, isDelete: true })
      .then((response) => {
        if (response?.status === 201 || response?.status === 200) {
          setClients(clients.filter((client: Client) => client._id !== id));
          const clientName = response?.doc?.name || "";
          const clientLastname = response?.doc?.lastname || "";
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

  async function registerClient(client: any):Promise<ClientResponse> {
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
    getClientsByFilter(searchFilter, {limit: 20, pageSize:index})
  }

  return {
    clients,
    deleteClient,
    registerClient,
    updateClient,
    setClientById,
    clientInfo,
    getClientsByFilter,
    paginateData,
    setSearchFilter,
    changePage,
    status,
  };
};
