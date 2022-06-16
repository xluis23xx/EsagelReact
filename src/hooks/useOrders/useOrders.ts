import * as React from "react";
import { getCookie } from "../../utils/cookies";
import Swal from "sweetalert2";

import { getOrderById, getOrders, postOrder, putOrder } from "./helpers";
import { Order } from "./index";
import { BodyParams, PaginateParams, PaginateResponse } from "../types";
import { OrderResponse } from "./types";

export enum Status {
  Loading,
  Ready,
  Updating,
  Error,
}

export const useOrders = () => {
  const [orders, setOrders] = React.useState<Order[]>([]);
  const [orderInfo, setOrderInfo] = React.useState<Order | null>(null);
  const [status, setStatus] = React.useState(Status.Loading);
  const [paginateData, setPaginateData] = React.useState<PaginateResponse| null>(null)
  const [searchFilter, setSearchFilter] = React.useState<BodyParams>({
    startDate: "",
    endDate:"",
    status: null
  })

  function setOrderById(id: string) {
    setStatus(Status.Loading);
    const token = getCookie("esagel_token") || "";
    getOrderById(token, id).then((response) => {
      if (response?.status===200) {
        setOrderInfo(response?.doc || null);
        setStatus(Status.Ready);
      }
    });
  }

  async function getOrdersByFilter( { startDate, endDate, status }: BodyParams,
    {limit, pageSize}: PaginateParams) {
    const token = getCookie("esagel_token") || "";
    return getOrders(token, {startDate, endDate, status}, {limit, pageSize})
      .then((response: PaginateResponse) => {
        if(response?.status===200){
          const { docs: ordersObtained = [] } = response || {};
          setOrders(ordersObtained);
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

  async function updateOrder(id: string, order: any): Promise<OrderResponse> {
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

  async function confirmOrder(id: string): Promise<OrderResponse> {
    setStatus(Status.Updating);
    const token = getCookie("esagel_token") || "";
    return putOrder(token, id, { status: 2, isConfirm: true })
      .then((response) => {
        if (response?.status === 201 || response?.status === 200) {
          setOrders(
            orders.map((order: Order) =>
              order?._id === id ? { ...order, status: 2 } : order
            )
          );
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

  async function cancelOrder(id: string): Promise<OrderResponse> {
    setStatus(Status.Updating);
    const token = getCookie("esagel_token") || "";
    return putOrder(token, id, { status: 0, isCancel: true })
      .then((response) => {
        if (response?.status === 201 || response?.status === 200) {
          setOrders(
            orders.map((order: Order) =>
              order?._id === id ? { ...order, status: 0 } : order
            )
          );
          const orderNumber = response?.doc?.orderNumber || "";
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

  async function registerOrder(order: any): Promise<OrderResponse> {
    const token = getCookie("esagel_token") || "";
    setStatus(Status.Updating);
    return postOrder(token, order)
      .then((response) => {
        if (response?.status === 200 || response?.status === 201) {
          Swal.fire({
            icon: "success",
            title: "¡Registro Exitoso!",
            text: `${response?.message} fue registrado éxitosamente`,
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
    getOrdersByFilter(searchFilter, {limit: 20, pageSize:index})
  }

  return {
    orders,
    confirmOrder,
    cancelOrder,
    registerOrder,
    updateOrder,
    setOrderById,
    orderInfo,
    getOrdersByFilter,
    paginateData,
    setSearchFilter,
    changePage,
    status,
  };
};
