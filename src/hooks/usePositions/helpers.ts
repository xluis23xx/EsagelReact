import ENVIROMENTS from "../../enviroments/env";
import { GetPositions } from "./types";

const { GENERAL_API } = ENVIROMENTS;

export const getPositions = (token: string): Promise<GetPositions> =>
  fetch(`${GENERAL_API}/positions`, {
    method: "GET",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  }).then((res) => res.json());
