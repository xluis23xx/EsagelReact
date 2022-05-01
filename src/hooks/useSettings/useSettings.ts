/* eslint-disable react-hooks/rules-of-hooks */
import * as React from "react";
import Swal from "sweetalert2";
import { getCookie } from "../../utils/cookies";
import { getSetting, putSetting } from "./helpers";
import { Setting } from "./index";

export enum Status {
  Loading,
  Ready,
  Updating,
  Error,
}

export const useSettings = () => {
  const [settingInfo, setSettingInfo] = React.useState<Setting>(null);
  const [status, setStatus] = React.useState(Status.Loading);

  async function getSettingsConfig() {
    const token = getCookie("esagel_token") || "";
    await getSetting(token).then((response) => {
      if (response?._id) {
        setSettingInfo(response);
        setStatus(Status.Ready);
        localStorage.setItem("esagel_config", JSON.stringify(response));
      }
    });
  }

  async function updateSetting(id: string, setting: any) {
    setStatus(Status.Updating);
    const token = getCookie("esagel_token") || "";
    return putSetting(token, id, setting)
      .then((response) => {
        if (response?.status === 200 || response?.status === 201) {
          localStorage.setItem(
            "esagel_config",
            JSON.stringify(response.updateSetting)
          );
          Swal.fire({
            icon: "success",
            title: "¡Actualización Exitosa!",
            text: "Configuración actualizada éxitosamente",
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
    settingInfo,
    getSettingsConfig,
    updateSetting,
    status,
  };
};
