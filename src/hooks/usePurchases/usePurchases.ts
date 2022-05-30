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
import { PaginateResponse } from "../types";
import { setFormatDate } from "../../utils/formats";

export enum Status {
  Loading,
  Ready,
  Updating,
  Error,
}

export const usePurchases = () => {
  const [purchases, setPurchases] = React.useState<Purchase[]>([]);
  const [purchasesAll, setPurchasesAll] = React.useState<Purchase[]>([]);
  const [purchaseInfo, setPurchaseInfo] = React.useState<Purchase>(null);
  const [status, setStatus] = React.useState(Status.Loading);

  function setPurchaseById(id: string) {
    setStatus(Status.Loading);
    const token = getCookie("esagel_token") || "";
    getPurchaseById(token, id).then((response) => {
      if (response?._id) {
        setPurchaseInfo(response);
        setStatus(Status.Ready);
      }
    });
  }

  function getAllPurchases(
    // { startDate, endDate } 
    ) {
    const token = getCookie("esagel_token") || "";
    getPurchases(token,
      //  { startDate, endDate }
      {}
       )
      .then((response: PaginateResponse) => {
        const {docs: purchasesObtained= []}= response || {}
        setPurchases(purchasesObtained);
        setPurchasesAll(purchasesObtained)
        setStatus(Status.Ready);
      })
      .catch(() => {
        setStatus(Status.Error);
      });
  }

  function searchPurchasesByInterval(startDate:string= "", endDate:string ="") {
    if (purchasesAll.length === 0) {
      getAllPurchases();
    }else if(startDate==="" && endDate===""){
      setPurchases(purchasesAll)
    }
    else {
      const purchasesFilter = purchasesAll.filter((purchase: Purchase) => {
        const {
          createdAt
        } = purchase || {};
        let dateStrA = startDate.replace( /(\d{4})\/(\d{2})\/(\d{2})/, "$2/$1/$3")
        let dateStrB = endDate.replace( /(\d{4})\/(\d{2})\/(\d{2})/, "$2/$1/$3");
        let emitedDate =  setFormatDate({order:1, date: createdAt})
        emitedDate =  emitedDate.replace( /(\d{4})\/(\d{2})\/(\d{2})/, "$2/$1/$3");
        return new Date(emitedDate) >= new Date(dateStrA) && new Date(emitedDate) <= new Date(dateStrB)
      });
      setPurchases(purchasesFilter);
    }
  }

  async function updatePurchase(id: string, purchase: any) {
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

  async function cancelPurchase(id: string) {
    setStatus(Status.Updating);
    const token = getCookie("esagel_token") || "";
    putPurchase(token, id, { status: 0, isCancel: true })
      .then((response) => {
        if (response?.status === 201 || response?.status === 200) {
          setPurchases(
            purchases.map((purchase: Purchase) =>
              purchase?._id === id ? { ...purchase, status: 0 } : purchase
            )
          );
          const purchaseNumber =
            response?.updatedPurchase?.purchaseNumber || "";
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

  async function registerPurchase(purchase: any) {
    const token = getCookie("esagel_token") || "";
    setStatus(Status.Updating);
    return postPurchase(token, purchase)
      .then((response) => {
        if (response?.status === 200 || response?.status === 201) {
          const purchaseNumber = response?.savedPurchase?.purchaseNumber || "";
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

  return {
    purchases,
    cancelPurchase,
    registerPurchase,
    updatePurchase,
    setPurchaseById,
    purchaseInfo,
    getAllPurchases,
    searchPurchasesByInterval,
    status,
  };
};
