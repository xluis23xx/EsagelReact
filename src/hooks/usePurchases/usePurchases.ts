import * as React from "react";
import { getCookie } from "../../utils/cookies";
import Swal from "sweetalert2";

import {
  getPurchaseById,
  getPurchases,
  postPurchase,
  putPurchase,
} from "./helpers";
import { Purchase } from "./index";
import { BodyParams, PaginateParams, PaginateResponse } from "../types";
import { PurchaseResponse } from "./types";

export enum Status {
  Loading,
  Ready,
  Updating,
  Error,
}

export const usePurchases = () => {
  const [purchases, setPurchases] = React.useState<Purchase[]>([]);
  const [purchaseInfo, setPurchaseInfo] = React.useState<Purchase | null>(null);

  const [status, setStatus] = React.useState(Status.Loading);
  const [paginateData, setPaginateData] = React.useState<PaginateResponse| null>(null)
  const [searchFilter, setSearchFilter] = React.useState<BodyParams>({
    startDate: "",
    endDate:"",
    status: null
  })

  function setPurchaseById(id: string) {
    setStatus(Status.Loading);
    const token = getCookie("esagel_token") || "";
    getPurchaseById(token, id).then((response) => {
      if (response?.status === 200) {
        setPurchaseInfo(response?.doc || null);
        setStatus(Status.Ready);
      }
    });
  }

  async function getPurchasesByFilter(
    { startDate, endDate, status }: BodyParams,
    {limit, pageSize}: PaginateParams
  ): Promise<PaginateResponse> {
    const token = getCookie("esagel_token") || "";
    return getPurchases(token, {startDate, endDate, status}, {limit, pageSize})
    .then((response: PaginateResponse) => {
      if(response?.status===200){
        const { docs: purchasesObtained = [] } = response || {};
        setPurchases(purchasesObtained);
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

  async function updatePurchase(id: string, purchase: any): Promise<PurchaseResponse> {
    setStatus(Status.Updating);
    const token = getCookie("esagel_token") || "";
    return putPurchase(token, id, purchase)
      .then((response) => {
        if (response?.status === 200 || response?.status === 201) {
          Swal.fire({
            icon: "success",
            title: "¡Actualización Exitosa!",
            text: "Compra actualizada éxitosamente",
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

  async function cancelPurchase(id: string): Promise<PurchaseResponse> {
    setStatus(Status.Updating);
    const token = getCookie("esagel_token") || "";
    return putPurchase(token, id, { status: 0, isCancel: true })
      .then((response) => {
        if (response?.status === 201 || response?.status === 200) {
          setPurchases(
            purchases.map((purchase: Purchase) =>
              purchase?._id === id ? { ...purchase, status: 0 } : purchase
            )
          );
          const purchaseNumber =
            response?.doc?.purchaseNumber || "";
          Swal.fire({
            title: "¡Todo salió bien!",
            icon: "success",
            text: `La Compra Nro. ${purchaseNumber} fue anulada con éxito`,
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

  async function registerPurchase(purchase: any): Promise<PurchaseResponse> {
    const token = getCookie("esagel_token") || "";
    setStatus(Status.Updating);
    return postPurchase(token, purchase)
      .then((response) => {
        if (response?.status === 200 || response?.status === 201) {
          const purchaseNumber = response?.doc?.purchaseNumber || "";
          Swal.fire({
            icon: "success",
            title: "¡Registro Exitoso!",
            text: `La Compra Nro. ${purchaseNumber} fue registrada éxitosamente`,
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
    getPurchasesByFilter(searchFilter, {limit: 20, pageSize:index})
  }

  return {
    purchases,
    cancelPurchase,
    registerPurchase,
    updatePurchase,
    setPurchaseById,
    purchaseInfo,
    getPurchasesByFilter,
    paginateData,
    setSearchFilter,
    changePage,
    status,
  };
};
