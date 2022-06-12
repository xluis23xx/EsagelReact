import * as React from "react";
import { getCookie } from "../../utils/cookies";
import Swal from "sweetalert2";

import { getSaleById, getSales, postSale, putSale } from "./helpers";
import { Sale } from "./index";
import { PaginateResponse } from "../types";
import { setFormatDate } from "../../utils/formats";

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
  const [paginateData, setPaginateDate] = React.useState<PaginateResponse| null>(null)
  const [intervalFilter, setIntervalFilter] = React.useState({
    startDate: "",
    endDate:""
  })

  function setSaleById(id: string) {
    setStatus(Status.Loading);
    const token = getCookie("esagel_token") || "";
    getSaleById(token, id).then((response) => {
      if (response?._id) {
        setSaleInfo(response);
        setStatus(Status.Ready);
      }
    });
  }

  function getAllSales( { startDate, endDate }: {startDate: string, endDate:string},
    {limit=3, pageSize=1}: {limit:number, pageSize:number}) {
    const token = getCookie("esagel_token") || "";
    getSales(token, {startDate, endDate}, {limit, pageSize})
      .then((response: PaginateResponse) => {
        const { docs: salesObtained = [] } = response || {};
        setSales(salesObtained);
        setPaginateDate(response)
        setStatus(Status.Ready);
      })
      .catch(() => {
        setStatus(Status.Error);
      });
  }

  async function updateSale(id: string, sale: any) {
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
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Algo ocurrió!",
          text: "Ocurrió un error inesperado",
          timer: 2000,
          confirmButtonColor: "#ff0000",
        });
        setStatus(Status.Ready);
        return undefined;
      });
  }

  async function confirmSale(id: string) {
    setStatus(Status.Updating);
    const token = getCookie("esagel_token") || "";
    putSale(token, id, { status: 2, isCorfirm: true })
      .then((response) => {
        if (response?.status === 201 || response?.status === 200) {
          setSales(
            sales.map((sale: Sale) =>
              sale?._id === id ? { ...sale, status: 2 } : sale
            )
          );
          const saleNumber = response?.updatedSale?.saleNumber || "";
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
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Algo ocurrió!",
          text: "Ocurrió un error inesperado",
          timer: 2000,
          confirmButtonColor: "#ff0000",
        });
        setStatus(Status.Ready);
      });
  }

  async function cancelSale(id: string) {
    setStatus(Status.Updating);
    const token = getCookie("esagel_token") || "";
    putSale(token, id, { status: 0, isCancel: true })
      .then((response) => {
        if (response?.status === 201 || response?.status === 200) {
          setSales(
            sales.map((sale: Sale) =>
              sale?._id === id ? { ...sale, status: 0 } : sale
            )
          );
          const saleNumber = response?.updatedSale?.saleNumber || "";
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
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Algo ocurrió!",
          text: "Ocurrió un error inesperado",
          timer: 2000,
          confirmButtonColor: "#ff0000",
        });
        setStatus(Status.Ready);
      });
  }

  async function registerSale(sale: any) {
    const token = getCookie("esagel_token") || "";
    setStatus(Status.Updating);
    return postSale(token, sale)
      .then((response) => {
        if (response?.status === 200 || response?.status === 201) {
          const saleNumber = response?.savedSale?.saleNumber || "";
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
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Algo ocurrió!",
          text: "Ocurrió un error inesperado",
          timer: 2000,
          confirmButtonColor: "#ff0000",
        });
        setStatus(Status.Ready);
        return undefined;
      });
  }

  function changePage (index: number) {
    getAllSales(intervalFilter, {limit: 3, pageSize:index})
  }

  return {
    sales,
    confirmSale,
    cancelSale,
    registerSale,
    updateSale,
    setSaleById,
    saleInfo,
    getAllSales,
    paginateData,
    setIntervalFilter,
    changePage,
    status,
  };
};
