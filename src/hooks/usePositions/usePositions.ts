import * as React from "react";
import { getCookie } from "../../utils/cookies";

import { getPositions } from "./helpers";
import { Position } from "./index";

export enum Status {
  Loading,
  Ready,
  Updating,
  Error,
}

export const usePositions = () => {
  const [positions, setPositions] = React.useState<Position[]>([]);
  const [status, setStatus] = React.useState(Status.Loading);

  function getAllPositions() {
    const token = getCookie("esagel_token") || "";
    getPositions(token)
      .then((response) => {
        const enablePositions =
          response.filter((position: Position) => position.status === 1) || [];
        setPositions(enablePositions);
        setStatus(Status.Ready);
      })
      .catch(() => {
        setStatus(Status.Error);
      });
  }

  return {
    positions,
    getAllPositions,
    status,
  };
};
