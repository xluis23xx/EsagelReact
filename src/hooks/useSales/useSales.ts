import * as React from "react";
import { getCookie } from "../../utils/cookies";
import Swal from "sweetalert2";

import { getSaleById, getSales, postSale, putSale } from "./helpers";
import { Sale } from "./index";
import { BodyParams, PaginateParams, PaginateResponse } from "../types";
import { SaleResponse } from "./types";

export enum Status {
  Loading,
  Ready,
  Updating,
  Error,
}

export const useSales = () => {
  const [sales, setSales] = React.useState<Sale[]>([]);
  const [saleInfo, setSaleInfo] = React.useState<Sale | null>(null);
  const [status, setStatus] = React.useState(Status.Loading);
  const [paginateData, setPaginateData] = React.useState<PaginateResponse| null>(null)
  const [searchFilter, setSearchFilter] = React.useState<BodyParams>({
    startDate: "",
    endDate:"",
    status: null
  })

  async function setSaleById(id: string) {
    setStatus(Status.Loading);
    const token = getCookie("esagel_token") || "";
    return getSaleById(token, id).then((response) => {
      if (response?.status === 200) {
        setSaleInfo(response?.doc || null);
        setStatus(Status.Ready);
      }
      return response;
    }).then(error=> {
      return error;
    });
  }

  async function getSalesByFilter( { startDate, endDate, status }: BodyParams,
    {limit, pageSize}: PaginateParams): Promise<PaginateResponse> {
    const token = getCookie("esagel_token") || "";
    return getSales(token, {startDate, endDate, status}, {limit, pageSize})
    .then((response: PaginateResponse) => {
      if(response?.status===200){
        const { docs: salesObtained = [] } = response || {};
        setSales(salesObtained);
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

  async function updateSale(id: string, sale: any): Promise<SaleResponse> {
    setStatus(Status.Updating);
    const token = getCookie("esagel_token") || "";
    return putSale(token, id, sale)
      .then((response) => {
        if (response?.status === 200 || response?.status === 201) {
          Swal.fire({
            icon: "success",
            title: "¡Actualización Exitosa!",
            text: "Venta Actualizada éxitosamente",
            timer: 2000,
            confirmButtonColor: "#ff0000",
          });
        } else {
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
        Swal.fire({
          icon: "error",
          title: "Algo ocurrió!",
          text: "Ocurrió un error inesperado",
          timer: 2000,
          confirmButtonColor: "#ff0000",
        });
        setStatus(Status.Ready);
        return error;
      });
  }

  async function confirmSale(id: string): Promise<SaleResponse> {
    setStatus(Status.Updating);
    const token = getCookie("esagel_token") || "";
    return putSale(token, id, { status: 2, isCorfirm: true })
      .then((response) => {
        if (response?.status === 201 || response?.status === 200) {
          setSales(
            sales.map((sale: Sale) =>
              sale?._id === id ? { ...sale, status: 2 } : sale
            )
          );
          const saleNumber = response?.doc?.saleNumber || "";
          Swal.fire({
            title: "¡Todo salió bien!",
            icon: "success",
            text: `La Venta Nro. ${saleNumber} fue confirmada con éxito`,
            timer: 2000,
            confirmButtonColor: "#ff0000",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "¡Algo ocurrió!",
            text: response?.message || "",
            timer: 2000,
            confirmButtonColor: "#ff0000",
          });
        }
        setStatus(Status.Ready);
        return response;
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Algo ocurrió!",
          text: "Ocurrió un error inesperado",
          timer: 2000,
          confirmButtonColor: "#ff0000",
        });
        setStatus(Status.Ready);
        return error;
      });
  }

  async function cancelSale(id: string): Promise<SaleResponse> {
    setStatus(Status.Updating);
    const token = getCookie("esagel_token") || "";
    return putSale(token, id, { status: 0, isCancel: true })
      .then((response) => {
        if (response?.status === 201 || response?.status === 200) {
          setSales(
            sales.map((sale: Sale) =>
              sale?._id === id ? { ...sale, status: 0 } : sale
            )
          );
          const saleNumber = response?.doc?.saleNumber || "";
          Swal.fire({
            title: "¡Todo salió bien!",
            icon: "success",
            text: `La Venta Nro. ${saleNumber} fue anulada con éxito`,
            timer: 2000,
            confirmButtonColor: "#ff0000",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "¡Algo ocurrió!",
            text: response?.message || "",
            timer: 2000,
            confirmButtonColor: "#ff0000",
          });
        }
        setStatus(Status.Ready);
        return response;
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Algo ocurrió!",
          text: "Ocurrió un error inesperado",
          timer: 2000,
          confirmButtonColor: "#ff0000",
        });
        setStatus(Status.Ready);
        return error;
      });
  }

  async function registerSale(sale: any): Promise<SaleResponse> {
    const token = getCookie("esagel_token") || "";
    setStatus(Status.Updating);
    return postSale(token, sale)
      .then((response) => {
        if (response?.status === 200 || response?.status === 201) {
          const saleNumber = response?.doc?.saleNumber || "";
          Swal.fire({
            icon: "success",
            title: "¡Registro Exitoso!",
            text: `La Venta Nro. ${saleNumber} fue registrada éxitosamente`,
            timer: 2000,
            confirmButtonColor: "#ff0000",
          });
        } else {
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
        Swal.fire({
          icon: "error",
          title: "Algo ocurrió!",
          text: "Ocurrió un error inesperado",
          timer: 2000,
          confirmButtonColor: "#ff0000",
        });
        setStatus(Status.Ready);
        return error;
      });
  }

  function changePage (index: number) {
    getSalesByFilter(searchFilter, {limit: 20, pageSize:index})
  }

  return {
    sales,
    confirmSale,
    cancelSale,
    registerSale,
    updateSale,
    setSaleById,
    saleInfo,
    getSalesByFilter,
    paginateData,
    setSearchFilter,
    changePage,
    status,
  };
};
