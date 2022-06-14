/* eslint-disable react-hooks/rules-of-hooks */
import * as React from "react";
import { deleteCookie, getCookie, setCookie } from "../../utils/cookies";
import { authentication, refreshToken } from "./helpers";
import { Auth } from "./types";

export enum Status {
  Loading,
  Ready,
  Updating,
  Error,
}

export const useAuth = () => {
  const [status, setStatus] = React.useState(Status.Ready);
  const [message, setMessage] = React.useState("");

  async function verifyAuthentication({ username, password }: Auth) {
    setStatus(Status.Loading);
    return await authentication({ username, password })
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          setStatus(Status.Ready);
        } else {
          setMessage(response.message);
          setStatus(Status.Error);
          setTimeout(() => {
            setMessage("");
            setStatus(Status.Ready);
          }, 3000);
        }
        return response;
      })
      .catch(() => {
        setStatus(Status.Error);
        setMessage("Ocurrió un error inesperado");
        setTimeout(() => {
          setMessage("");
          setStatus(Status.Ready);
        }, 3000);
      });
  }

  async function updateToken(){ 
    const token = getCookie("esagel_refreshtoken") || ''
   return refreshToken(token)
    .then(res =>{
      if(res?.status===200){
        setCookie("esagel_token", res?.accessToken || '', 1)
        setCookie("esagel_refreshtoken", res?.refreshToken ||'', 1)
      }
      return res
    }).catch(res=> res)
  }

  function logoutUser() {
    const ESAGEL_TOKEN = getCookie("esagel_token");
    const ESAGEL_RFTOKEN = getCookie("esagel_refreshtoken");
    const USER_PROFILE = localStorage.getItem("esagel_profile");
    const USER_CONFIG = localStorage.getItem("esagel_config");
    const ESAGEL_LAST_PATH = localStorage.getItem("esagel_lastpath");
    const ESAGEL_DB_QUERY = localStorage.getItem("esagel_db_query");

    if (ESAGEL_TOKEN) {
      deleteCookie("esagel_token");
    }
    if (ESAGEL_RFTOKEN) {
      deleteCookie("esagel_refreshtoken");
    }
    if (USER_PROFILE) {
      localStorage.removeItem("esagel_profile");
    }
    if (USER_CONFIG) {
      localStorage.removeItem("esagel_config");
    }
    if(ESAGEL_LAST_PATH){
      localStorage.removeItem("esagel_lastpath");
    }
    if(ESAGEL_DB_QUERY){
      localStorage.removeItem("esagel_db_query");
    }

  }
  return {
    verifyAuthentication,
    updateToken,
    logoutUser,
    status,
    message,
  };
};
