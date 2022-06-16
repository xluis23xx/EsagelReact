/* eslint-disable react-hooks/rules-of-hooks */
import * as React from "react";
import Swal from "sweetalert2";
import { getCookie } from "../../utils/cookies";
import { getSetting, putSetting } from "./helpers";
import { Setting } from "./index";
import { SettingResponse } from "./types";

export enum Status {
  Loading,
  Ready,
  Updating,
  Error,
}

export const useSettings = () => {
  const [settingInfo, setSettingInfo] = React.useState<Setting | null>(null);
  const [status, setStatus] = React.useState(Status.Loading);

  async function getSettingsConfig() {
    const token = getCookie("esagel_token") || "";
    await getSetting(token).then((response) => {
      if (response?.status === 200) {
        setSettingInfo(response?.doc || null);
        localStorage.setItem("esagel_config", JSON.stringify(response?.doc));
        setStatus(Status.Ready);
      }
      setStatus(Status.Ready);
    });
  }

  async function updateSetting(id: string, setting: any): Promise<SettingResponse> {
    setStatus(Status.Updating);
    const token = getCookie("esagel_token") || "";
    return putSetting(token, id, setting)
      .then((response) => {
        if (response?.status === 200 || response?.status === 201) {
          localStorage.setItem(
            "esagel_config",
            JSON.stringify(response?.doc)
          );
          Swal.fire({
            icon: "success",
            title: "¡Actualización Exitosa!",
            text: "Configuración actualizada éxitosamente",
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

  return {
    settingInfo,
    getSettingsConfig,
    updateSetting,
    status,
  };
};
