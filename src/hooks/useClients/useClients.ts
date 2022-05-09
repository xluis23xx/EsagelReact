import * as React from "react";
import { getCookie } from "../../utils/cookies";
import Swal from "sweetalert2";

import { getClientById, getClients, postClient, putClient } from "./helpers";
import { Client } from "./index";

export enum Status {
  Loading,
  Ready,
  Updating,
  Error,
}

export const useClients = () => {
  const [clients, setClients] = React.useState<Client[]>([]);
  const [clientsAll, setClientsAll] = React.useState<Client[]>([]);
  const [clientInfo, setClientInfo] = React.useState<Client>(null);
  const [status, setStatus] = React.useState(Status.Loading);

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

  function getAllClients() {
    const token = getCookie("esagel_token") || "";
    getClients(token)
      .then((allClients) => {
        const enableClients =
          allClients.filter((client: Client) => client.status === 1) || [];
        setClients(enableClients);
        setClientsAll(enableClients);
        setStatus(Status.Ready);
      })
      .catch(() => {
        setStatus(Status.Error);
      });
  }

  function searchClientsByFilter(filter: string) {
    if (filter.length === 0) {
      setClientsAll(clientsAll);
    } else {
      const clientsFilter = clientsAll.filter((client: Client) => {
        const { name = "", lastname = "", secondLastname = "" } = client || {};
        const regex = new RegExp(filter.toLowerCase());
        return regex.test(
          `${name} ${lastname} ${secondLastname}`.toLowerCase()
        );
      });
      setClients(clientsFilter);
    }
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

  async function deleteClient(id: string) {
    setStatus(Status.Updating);
    const token = getCookie("esagel_token") || "";
    putClient(token, id, { status: 0, isDelete: true })
      .then((response) => {
        if (response?.status === 201 || response?.status === 200) {
          setClients(clients.filter((client: Client) => client._id !== id));
          setClientsAll(clients.filter((client: Client) => client._id !== id));
          const clientName = response?.updatedClient?.name || "";
          const clientLastname = response?.updatedClient?.lastname || "";
          Swal.fire({
            title: "¡Todo salió bien!",
            icon: "success",
            text: `Cliente ${clientName} ${clientLastname} eliminado con éxito`,
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
    clients,
    deleteClient,
    searchClientsByFilter,
    registerClient,
    updateClient,
    setClientById,
    clientInfo,
    getAllClients,
    status,
  };
};
