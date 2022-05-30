import * as React from "react";
import { getCookie } from "../../utils/cookies";
import Swal from "sweetalert2";

import { getOrderById, getOrders, postOrder, putOrder } from "./helpers";
import { Order } from "./index";
import { PaginateResponse } from "../types";
import { setFormatDate } from "../../utils/formats";

export enum Status {
  Loading,
  Ready,
  Updating,
  Error,
}

export const useOrders = () => {
  const [orders, setOrders] = React.useState<Order[]>([]);
  const [ordersAll, setOrdersAll] = React.useState<Order[]>([]);
  const [orderInfo, setOrderInfo] = React.useState<Order>(null);
  const [status, setStatus] = React.useState(Status.Loading);

  function setOrderById(id: string) {
    setStatus(Status.Loading);
    const token = getCookie("esagel_token") || "";
    getOrderById(token, id).then((response) => {
      if (response?._id) {
        setOrderInfo(response);
        setStatus(Status.Ready);
      }
    });
  }

  function getAllOrders() {
    //  startDate, endDate }
    const token = getCookie("esagel_token") || "";
    getOrders(
      token,
      // , { startDate, endDate }
      {}
    )
      .then((response: PaginateResponse) => {
        const { docs: ordersObtained = [] } = response || {};
        setOrders(ordersObtained);
        setOrdersAll(ordersObtained)
        setStatus(Status.Ready);
      })
      .catch(() => {
        setStatus(Status.Error);
      });
  }

  
  function searchOrdersByInterval(startDate:string= "", endDate:string ="") {
    if (ordersAll.length === 0) {
      getAllOrders();
    }else if(startDate==="" && endDate===""){
      setOrders(ordersAll)
    }

    else {
      const ordersFilter = ordersAll.filter((order: Order) => {
        const {
          createdAt
        } = order || {};
        let dateStrA = startDate.replace( /(\d{4})\/(\d{2})\/(\d{2})/, "$2/$1/$3")
        let dateStrB = endDate.replace( /(\d{4})\/(\d{2})\/(\d{2})/, "$2/$1/$3");
        let emitedDate =  setFormatDate({order:1,date: createdAt})
        emitedDate =  emitedDate.replace( /(\d{4})\/(\d{2})\/(\d{2})/, "$2/$1/$3");
        return new Date(emitedDate) >= new Date(dateStrA) && new Date(emitedDate) <= new Date(dateStrB)
      });
      setOrders(ordersFilter);
    }
  }


  async function updateOrder(id: string, order: any) {
    setStatus(Status.Updating);
    const token = getCookie("esagel_token") || "";
    return putOrder(token, id, order)
      .then((response) => {
        if (response?.status === 200 || response?.status === 201) {
          Swal.fire({
            icon: "success",
            title: "¡Actualización Exitosa!",
            text: "Pedido actualizado éxitosamente",
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

  async function confirmOrder(id: string) {
    setStatus(Status.Updating);
    const token = getCookie("esagel_token") || "";
    putOrder(token, id, { status: 2, isConfirm: true })
      .then((response) => {
        if (response?.status === 201 || response?.status === 200) {
          setOrders(
            orders.map((order: Order) =>
              order?._id === id ? { ...order, status: 2 } : order
            )
          );
          // const orderNumber = response?.updatedOrder?.orderNumber || "";
          Swal.fire({
            title: "¡Todo salió bien!",
            icon: "success",
            text: response.message || '',
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

  async function cancelOrder(id: string) {
    setStatus(Status.Updating);
    const token = getCookie("esagel_token") || "";
    putOrder(token, id, { status: 0, isCancel: true })
      .then((response) => {
        if (response?.status === 201 || response?.status === 200) {
          setOrders(
            orders.map((order: Order) =>
              order?._id === id ? { ...order, status: 0 } : order
            )
          );
          const orderNumber = response?.updatedOrder?.orderNumber || "";
          Swal.fire({
            title: "¡Todo salió bien!",
            icon: "success",
            text: `El Pedido Nro. ${orderNumber} fue anulado con éxito`,
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

  async function registerOrder(order: any) {
    const token = getCookie("esagel_token") || "";
    setStatus(Status.Updating);
    return postOrder(token, order)
      .then((response) => {
        if (response?.status === 200 || response?.status === 201) {
          const orderNumber = response?.savedOrder?.orderNumber || "";
          Swal.fire({
            icon: "success",
            title: "¡Registro Exitoso!",
            text: `El Pedido Nro. ${orderNumber} fue registrado éxitosamente`,
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
    orders,
    confirmOrder,
    cancelOrder,
    registerOrder,
    updateOrder,
    setOrderById,
    orderInfo,
    getAllOrders,
    searchOrdersByInterval,
    status,
  };
};
