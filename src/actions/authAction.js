import React from "react";
import ENVIROMENTS from "../enviroments/env";
import { types } from "../types/types";
import { useHistory } from "react-router";

const { GENERAL_API } = ENVIROMENTS;
console.log(GENERAL_API);
// metodos que se deben ejecutar de manera asincrona
export const LoginAction = (data) => {
  return async (dispatch) => {
    dispatch(verifyingUser());
    try {
      const LOGIN_USER_API = `${GENERAL_API}/auth/signin`;
      console.log(data);
      const response = await fetch(LOGIN_USER_API, {
        method: "POST",
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseJSON = await response.json();
      if (responseJSON.token) {
        console.log("token obtenido:", responseJSON);
        dispatch(loginSuccess(responseJSON.token));
      } else {
        dispatch(loginFailed(responseJSON.message));
        setTimeout(() => dispatch(loginFailed(null)), 4000);
      }
    } catch {
      dispatch(loginFailed("Ocurrió un error inesperado"));
      setTimeout(() => dispatch(loginFailed(null)), 4000);
    }
  };
};

// METODOS QUE ACTUALIZAN LOS ESTADOS DEL REDUCER
export const verifyingUser = () => ({
  type: types.auth.verify,
  payload: true,
});

export const loginSuccess = (token, user) => ({
  type: types.auth.success,
  payload: { token, user },
});

export const loginFailed = (error) => ({
  type: types.auth.fail,
  payload: error,
});
