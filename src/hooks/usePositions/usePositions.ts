import * as React from "react";
import Swal from "sweetalert2";
import { getCookie } from "../../utils/cookies";
import { BodyParams, PaginateParams, PaginateResponse } from "../types";

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
  const [paginateData, setPaginateData] = React.useState<PaginateResponse| null>(null)
  const [searchFilter, setSearchFilter] = React.useState<BodyParams>({
    filter: "",
    status: null
  })


  async function getPositionsByFilter(
    { filter="", status=null }: BodyParams,
    {limit, pageSize}: PaginateParams
  ): Promise<PaginateResponse> {
    const token = getCookie("esagel_token") || "";
    return getPositions(token,{filter, status}, {limit, pageSize})
    .then((response: PaginateResponse) => {
      if(response?.status===200){
        const { docs: positionsObtained = [] } = response || {};
        setPositions(positionsObtained);
        setPaginateData(response);
      }else{
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
      setStatus(Status.Error);
      return error;
    });
  }

  function changePage (index: number) {
    getPositionsByFilter(searchFilter, {limit: 20, pageSize:index})
  }

  return {
    positions,
    getPositionsByFilter,
    paginateData,
    setSearchFilter,
    changePage,
    status,
  };
};
