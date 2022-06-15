import ENVIROMENTS from "../../enviroments/env";
import { Auth, AuthResponse, JWTResponse } from "./types";
const { GENERAL_API } = ENVIROMENTS;

export const authentication = (
    {
      username,
      password
    }: Auth
  ): Promise<AuthResponse> =>
    fetch(
      `${GENERAL_API}/auth/signin`,
      {
        method: 'POST',
        cache: 'no-cache',
        body: JSON.stringify({
          username: username,
          password: password,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ).then((res) => res.json())
    .catch((res) => res.json())

export const refreshToken = (token: string) :Promise<JWTResponse> =>
fetch(
  `${GENERAL_API}/auth/token`,
  {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  }
).then((res) => res.json())
.catch((res) => res.json())