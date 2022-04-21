/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react'
import { authentication } from "./helpers";
import { JWT, Auth } from "./types";

export enum Status {
  Loading,
  Ready,
  Updating,
  Error,
}

export const useAuth = () => {

  const [status, setStatus] = React.useState(Status.Ready)
  const [message, setMessage] = React.useState("")
  const [user, setUser] = React.useState<boolean>(false)

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
          console.log(response.token)
          setStatus(Status.Ready);
          setUser(true)
          console.log('cambia de valor el sertUSER')
          
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
  return {
    verifyAuthentication,
    status,
    message,
    user
  }
};
