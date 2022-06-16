import * as React from "react";
import { getCookie } from "../../utils/cookies";
import Swal from "sweetalert2";

import {
  getUserById,
  getUsers,
  postUser,
  putUser,
  resetPassword,
} from "./helpers";
import { User } from "./index";
import { BodyParams, PaginateParams, PaginateResponse } from "../types";
import { ResetPassordResponse, UserResponse } from "./types";

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
      if (response?.status === 200) {
        setUserInfo(response?.doc || null);
        setStatus(Status.Ready);
      }
    });
  }

  async function getUsersByFilter(
    { filter, status }: BodyParams,
    {limit, pageSize}: PaginateParams
    ): Promise<PaginateResponse> {
    const token = getCookie("esagel_token") || "";
    return getUsers(token,{filter, status}, {limit, pageSize})
    .then((response: PaginateResponse) => {
      if(response?.status===200){
        const { docs: usersObtained = [] } = response || {};
        setUsers(usersObtained);
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


  async function updateUser(id: string, user: any): Promise<UserResponse> {
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
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Algo ocurrió!",
          text: "Ocurrió un error inesperado",
          timer: 2000,
          confirmButtonColor: "#ff0000",
        });
        return error;
      });
  }

  async function disableUser(id: string): Promise<UserResponse> {
    setStatus(Status.Updating);
    const token = getCookie("esagel_token") || "";
    return putUser(token, id, { status: 0, isDelete: true })
      .then((response) => {
        if (response?.status === 201 || response?.status === 200) {
          setUsers(
            users.map((user: User) =>
              user._id === id ? { ...user, status: 0 } : user
            )
          );
          const username = response?.doc?.username || "";
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

  async function registerUser(user: any): Promise<UserResponse> {
    const token = getCookie("esagel_token") || "";
    setStatus(Status.Updating);
    return postUser(token, user)
      .then((response) => {
        if (response?.status === 200 || response?.status === 201) {
          Swal.fire({
            icon: "success",
            title: "¡Registro Exitoso!",
            text: `Contraseña generada éxitosamente: ${response?.message}`,
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

  async function changePassword(id: string): Promise<ResetPassordResponse> {
    setStatus(Status.Updating);
    const token = getCookie("esagel_token") || "";
    return resetPassword(token, id)
      .then((response) => {
        if (response?.status === 201 || response?.status === 200) {
          Swal.fire({
            title: "¡Todo salió bien!",
            icon: "success",
            text: `Se generó la nueva contraseña: ${response?.message}`,
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
    changePassword,
    paginateData,
    setSearchFilter,
    changePage,
    status,
  };
};
