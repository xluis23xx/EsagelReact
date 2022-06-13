import * as React from "react";
import { getCookie } from "../../utils/cookies";
import Swal from "sweetalert2";

import {
  getUserById,
  getUsers,
  postUser,
  putUser,
} from "./helpers";
import { User } from "./index";
import { BodyParams, PaginateParams, PaginateResponse } from "../types";

export enum Status {
  Loading,
  Ready,
  Updating,
  Error,
}

export const useUsers = () => {
  const [users, setUsers] = React.useState<User[]>([]);
  const [userInfo, setUserInfo] = React.useState<User | null>(null);
  const [status, setStatus] = React.useState(Status.Loading);
  const [paginateData, setPaginateData] = React.useState<PaginateResponse| null>(null)
  const [searchFilter, setSearchFilter] = React.useState<BodyParams>({
    filter: "",
    status: null
  })

  function setUserById(id: string) {
    setStatus(Status.Loading);

    const token = getCookie("esagel_token") || "";
    getUserById(token, id).then((response) => {
      if (response?._id) {
        setUserInfo(response);
        setStatus(Status.Ready);
      }
    });
  }

  function getUsersByFilter(
    { filter, status }: BodyParams,
    {limit, pageSize}: PaginateParams
    ) {
    const token = getCookie("esagel_token") || "";
    getUsers(token,{filter, status}, {limit, pageSize})
      .then((response: PaginateResponse) => {
        const { docs: usersObtained = [] } = response || {};
        setUsers(usersObtained);
        setPaginateData(response);
        setStatus(Status.Ready);
      })
      .catch(() => {
        setStatus(Status.Error);
      });
  }

  async function updateUser(id: string, user: any) {
    setStatus(Status.Updating);
    const token = getCookie("esagel_token") || "";
    return putUser(token, id, user)
      .then((response) => {
        if (response?.status === 200 || response?.status === 201) {
          Swal.fire({
            icon: "success",
            title: "¡Actualización Exitosa!",
            text: "Usuario actualizado éxitosamente",
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
        return undefined;
      });
  }

  async function disableUser(id: string) {
    setStatus(Status.Updating);
    const token = getCookie("esagel_token") || "";
    putUser(token, id, { status: 0, isDelete: true })
      .then((response) => {
        if (response?.status === 201 || response?.status === 200) {
          setUsers(
            users.map((user: User) =>
              user._id === id ? { ...user, status: 0 } : user
            )
          );
          const username = response?.updatedUser?.username || "";
          Swal.fire({
            title: "¡Todo salió bien!",
            icon: "success",
            text: `Usuario ${username} deshabilitado con éxito`,
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

  async function registerUser(user: any) {
    const token = getCookie("esagel_token") || "";
    setStatus(Status.Updating);
    return postUser(token, user)
      .then((response) => {
        if (response?.status === 200 || response?.status === 201) {
          Swal.fire({
            icon: "success",
            title: "¡Registro Exitoso!",
            text: `Contraseña generada éxitosamente: ${response.message}`,
            showConfirmButton: true,
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
    getUsersByFilter(searchFilter, {limit: 20, pageSize:index})
  }

  return {
    users,
    disableUser,
    registerUser,
    updateUser,
    setUserById,
    userInfo,
    getUsersByFilter,
    paginateData,
    setSearchFilter,
    changePage,
    status,
  };
};
