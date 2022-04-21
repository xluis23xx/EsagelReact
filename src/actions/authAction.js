import ENVIROMENTS from "../enviroments/env";
import { types } from "../types/types";

const { GENERAL_API } = ENVIROMENTS;

// metodos que se deben ejecutar de manera asincrona
export const LoginAction = (data) => {
  return async () => {
    try {
      const LOGIN_USER_API = `${GENERAL_API}/auth/signin`;
      const response = await fetch(LOGIN_USER_API, {
        method: "POST",
        body: JSON.stringify({
          username: data.lemail,
          password: data.lpassword,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseJSON = await response.json();
      if (responseJSON.token) {
        console.log("token obtenido:", responseJSON);
      } else {
        console.log(responseJSON);
      }
    } catch {
      console.log("Se cayó todo");
    }
  };
};

// METODOS QUE ACTUALIZAN LOS ESTADOS DEL REDUCER
const verifyingUser = () => ({
  type: types.auth.verify,
  payload: true,
});

const loginSuccess = (token, user) => ({
  type: types.auth.success,
  payload: { token, user },
});

const loginFailed = (error) => ({
  type: types.auth.fail,
  payload: error,
});
