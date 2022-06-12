import * as React from "react";
import { getCookie } from "../../utils/cookies";
import Swal from "sweetalert2";

import {
  getProfile,
  putProfile,
  putPassword,
} from "./helpers";
import { User } from "../useUsers";

export enum Status {
  Loading,
  Ready,
  Updating,
  Error,
}

export const useProfile = () => {
  const [profileInfo, setProfileInfo] = React.useState<User | null>(null);
  const [status, setStatus] = React.useState(Status.Loading);

  function setProfileById(id: string) {
    setStatus(Status.Loading);

    const token = getCookie("esagel_token") || "";
    getProfile(token, id).then((response) => {
      if (response?._id) {
        setProfileInfo(response);
        setStatus(Status.Ready);
      }
    });
  }

  function updatedpassword(
    id: string,
    { newPassword, oldPassword }: { newPassword: string; oldPassword: string }
  ) {
    const token = getCookie("esagel_token") || "";
    return putPassword(id, token, { newPassword, oldPassword })
      .then((response) => {
        if (response?.status === 200 || response?.status === 201) {
          Swal.fire({
            icon: "success",
            title: "¡Actualización Exitosa!",
            text: "Contraseña actualizada, por favor vuelva a iniciar sesión",
            timer: 4000,
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

  async function updateProfile(id: string, profile: any) {
    setStatus(Status.Updating);
    const token = getCookie("esagel_token") || "";
    return putProfile(token, id, profile)
      .then((response) => {
        if (response?.status === 200 || response?.status === 201) {
          Swal.fire({
            icon: "success",
            title: "¡Actualización Exitosa!",
            text: "Perfil actualizado éxitosamente",
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

  async function disableProfile(id: string) {
    setStatus(Status.Updating);
    const token = getCookie("esagel_token") || "";
    return putProfile(token, id, { status: 0, isDelete: true })
      .then((response) => {
        if (response?.status === 201 || response?.status === 200) {
          Swal.fire({
            title: "¡Todo salió bien!",
            icon: "success",
            text: `Su cuenta fue deshabilitada éxitosamente.`,
            timer: 3000,
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
        return response
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
        return undefined
      });
  }

  return {
    disableProfile,
    updateProfile,
    setProfileById,
    profileInfo,
    updatedpassword,
    status,
  };
};
