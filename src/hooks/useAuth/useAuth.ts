/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react'
import { deleteCookie, getCookie } from 'src/utils/cookies';
import { authentication } from "./helpers";
import {  Auth } from "./types";

export enum Status {
  Loading,
  Ready,
  Updating,
  Error,
}

export const useAuth = () => {

  const [status, setStatus] = React.useState(Status.Ready)
  const [message, setMessage] = React.useState("")

  async function verifyAuthentication({
    username,
    password,
  }: Auth) {

      setStatus(Status.Loading);
      return await authentication(
        {username, password}
      ).then((response) => {
        if (response.message){
          setMessage(response.message)
          setStatus(Status.Error)
          setTimeout(()=> {
            setMessage('')
            setStatus(Status.Ready)
          }, 2000)
        } else {
          setStatus(Status.Ready);
        }
        return response
      }).catch(()=> {
        setStatus(Status.Error);
        setMessage("Ocurrió un error inesperado")
        setTimeout(()=> {
          setMessage('')
          setStatus(Status.Ready)
        }, 3000)
      });
    }

  function logoutUser () {
    const ESAGEL_TOKEN = getCookie('esagel_token') 
    const USER_PROFILE = localStorage.getItem('esagel_profile')
    if(ESAGEL_TOKEN) {
      deleteCookie('esagel_token')
    }
    if(USER_PROFILE){
      localStorage.removeItem('esagel_profile')
    }
  }
  return {
    verifyAuthentication,
    logoutUser,
    status,
    message,
  }
};
