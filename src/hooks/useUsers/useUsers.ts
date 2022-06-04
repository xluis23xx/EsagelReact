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
import { PaginateResponse } from "../types";

export enum Status {
  Loading,
  Ready,
  Updating,
  Error,
}

export const useUsers = () => {
  const [users, setUsers] = React.useState<User[]>([]);
  const [usersAll, setUsersAll] = React.useState<User[]>([]);
  const [userInfo, setUserInfo] = React.useState<User>(null);
  const [status, setStatus] = React.useState(Status.Loading);

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

  function getAllUsers() {
    const token = getCookie("esagel_token") || "";
    getUsers(token, {})
      .then((response: PaginateResponse) => {
        const { docs = [] } = response || {};
        setUsers(docs);
        setUsersAll(docs);
        setStatus(Status.Ready);
      })
      .catch(() => {
        setStatus(Status.Error);
      });
  }

  function searchUsersByFilter(filter: string) {
    if (filter.length === 0) {
      setUsers(usersAll);
    } else {
      const usersFilter = usersAll.filter((user: User) => {
        const { username = "", employee = null } = user || {};
        const regex = new RegExp(filter.toLowerCase());
        if (employee) {
          return regex.test(
            `${username} ${employee?.name} ${employee?.lastname}`.toLowerCase()
          );
        } else {
          return regex.test(`${username}`.toLowerCase());
        }
      });
      setUsers(usersFilter);
    }
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
          setUsersAll(
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

  return {
    users,
    disableUser,
    searchUsersByFilter,
    registerUser,
    updateUser,
    setUserById,
    userInfo,
    getAllUsers,
    status,
  };
};
