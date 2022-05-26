/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Link } from "react-router-dom";

import { OrderDetail, Status, useOrders } from "../../hooks/useOrders";
import { InputForm } from "../global-components/inputForm";
import { useParams, useHistory } from "react-router-dom";
import { setFormatDate } from "../../utils/formats";
import CIcon from "@coreui/icons-react";
import { cilHamburgerMenu } from "@coreui/icons";

const DetailOrderComponent = () => {
  const { setOrderById, orderInfo, status } = useOrders();

  const history = useHistory();
  const { id } = useParams<any>();

  React.useEffect(() => {
    if (!id) {
      history.push("/pedidos");
    }
    setOrderById(id);
  }, []);

  let fullNameOfClient = "";
  let statusOfOrder = "";
  let sellerOfOrder = "";
  let itemsOfOrder = [];

  React.useEffect(() => {
    if (orderInfo) {
      const {
        client = null,
        status = null,
        seller = null,
        orderLines = [],
      } = orderInfo;
      if (client) {
        fullNameOfClient = `${client?.name} ${client?.lastname} ${client?.secondLastname}`;
      }
      if (status) {
        switch (status) {
          case 0:
            statusOfOrder = "Anulado";
            break;
          case 1:
            statusOfOrder = "Pendiente";
            break;
          case 2:
            statusOfOrder = "Aceptado";
            break;
          default:
            break;
        }
      }
      if (seller) {
        if (seller?.employee) {
          const { employee = null } = seller;
          sellerOfOrder = `${employee?.name} ${employee?.lastname} ${employee?.secondLastname}`;
        } else {
          sellerOfOrder = `${seller?.username || ""}`;
        }
      }
      if (orderLines) {
        if (orderLines.length > 0) {
          itemsOfOrder = orderLines;
        }
      }
    }
  }, [orderInfo]);

  return (
    <div className="row my-3">
      <div className="col-lg-12">
        <div className="card">
          <div className="card-header">
            <div className="row">
              <div className="col-12 col-sm-6 col-md-10 my-auto">
                <CIcon icon={cilHamburgerMenu} />
                &nbsp;DETALLE PEDIDO
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="col-12">
              <div className="form-group">
                <label className="fw-bold">Resumen del pedido</label>
                <br />
              </div>

              <form className="row">
                <div className="form-group mt-1 col-sm-6 col-xl-4">
                  <label className="form-label" htmlFor="orderNumber">
                    Nro. Pedido:
                  </label>
                  <InputForm
                    placeholder="-"
                    name="orderNumber"
                    value={orderInfo?.orderNumber ? orderInfo?.orderNumber : ""}
                    disabled={status === Status.Loading}
                    readonly={true}
                  />
                </div>
                <div className="form-group mt-1 col-sm-6 col-xl-4">
                  <label className="form-label" htmlFor="client">
                    Cliente:
                  </label>
                  <InputForm
                    placeholder="-"
                    name="client"
                    value={fullNameOfClient}
                    disabled={status === Status.Loading}
                    readonly={true}
                  />
                </div>
                <div className="form-group mt-1 col-sm-6 col-xl-4">
                  <label className="form-label" htmlFor="documentType">
                    Tipo de Comprobante:
                  </label>
                  <InputForm
                    placeholder="-"
                    name="documentType"
                    value={
                      orderInfo?.documentType
                        ? orderInfo?.documentType?.name
                        : ""
                    }
                    disabled={status === Status.Loading}
                    readonly={true}
                  />
                </div>
                <div className="form-group mt-1 col-sm-6 col-xl-4">
                  <label className="form-label" htmlFor="documentNumber">
                    Número de Documento:
                  </label>
                  <InputForm
                    placeholder="-"
                    name="documentNumber"
                    value={
                      orderInfo?.documentNumber
                        ? orderInfo?.documentNumber
                        : "-"
                    }
                    disabled={status === Status.Loading}
                    readonly={true}
                  />
                </div>
                <div className="form-group mt-1 col-sm-6 col-xl-4">
                  <label className="form-label" htmlFor="seller">
                    Vendedor:
                  </label>
                  <InputForm
                    placeholder="-"
                    name="seller"
                    value={sellerOfOrder}
                    disabled={status === Status.Loading}
                    readonly={true}
                  />
                </div>
                <div className="form-group mt-1 col-sm-6 col-xl-4">
                  <label className="form-label" htmlFor="status">
                    Estado:
                  </label>
                  <InputForm
                    placeholder="-"
                    name="status"
                    value={statusOfOrder}
                    disabled={status === Status.Loading}
                    readonly={true}
                  />
                </div>
                <div className="form-group mt-1 col-sm-6 col-xl-4">
                  <label className="form-label" htmlFor="createdAt">
                    Fecha de Emisión:
                  </label>
                  <InputForm
                    type="date"
                    placeholder="-"
                    name="status"
                    value={
                      orderInfo?.createdAt
                        ? setFormatDate({
                            date: orderInfo?.createdAt,
                            order: 1,
                          })
                        : ""
                    }
                    disabled={status === Status.Loading}
                    readonly={true}
                  />
                </div>
                <div
                  className="w-100 overflow-auto mt-3"
                  style={{ minHeight: 200 }}
                >
                  <table className="table">
                    <thead>
                      <tr>
                        <th style={{ minWidth: 60 }}>N°</th>
                        <th style={{ minWidth: 60 }}>Curso</th>
                        <th style={{ minWidth: 60 }}>Precio Venta</th>
                        <th style={{ minWidth: 60 }}>Cantidad</th>
                        <th style={{ minWidth: 60 }}>Descuento</th>
                        <th style={{ minWidth: 60 }}>Importe</th>
                      </tr>
                    </thead>
                    <tbody>
                      {itemsOfOrder.length > 0
                        ? itemsOfOrder.map(
                            (item: OrderDetail, index: number) => {
                              const {
                                course,
                                price,
                                quantity,
                                discount,
                                amount,
                              } = item;
                              return (
                                <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td>
                                    {course?.name ? course?.name : "" || ""}
                                  </td>
                                  <td>{price.toFixed(2) || ""}</td>
                                  <td>{quantity || ""}</td>
                                  <td>{discount.toFixed(2) || ""}</td>
                                  <td>{amount.toFixed(2) || ""}</td>
                                </tr>
                              );
                            }
                          )
                        : null}
                      <tr className="mt-3">
                        <td colSpan={2}>
                          <div className="d-block d-md-flex">
                            <input
                              className="form-control bg-warning text-center fw-bold"
                              value="Subtotal"
                              disabled={true}
                            />
                            <input
                              type={"number"}
                              className="form-control text-center"
                              value={
                                orderInfo?.subtotal
                                  ? orderInfo?.subtotal.toFixed(2)
                                  : ""
                              }
                              disabled={true}
                            />
                          </div>
                        </td>
                        <td colSpan={2}>
                          <div className="d-block d-md-flex">
                            <input
                              className="form-control bg-warning text-center fw-bold d-flex"
                              value={`IGV ${
                                orderInfo?.percentIva
                                  ? `${orderInfo?.percentIva * 100}%`
                                  : ""
                              }`}
                              disabled={true}
                            />
                            <input
                              type={"number"}
                              className="form-control text-center d-flex"
                              value={
                                orderInfo?.amountInIva
                                  ? orderInfo?.amountInIva.toFixed(2)
                                  : ""
                              }
                              disabled={true}
                            />
                          </div>
                        </td>
                        <td colSpan={2}>
                          <div className="d-block d-md-flex">
                            <input
                              className="form-control bg-warning text-center fw-bold"
                              value="Total"
                              disabled={true}
                            />
                            <input
                              type={"number"}
                              className="form-control text-center fw-bold"
                              value={
                                orderInfo?.total
                                  ? orderInfo?.total.toFixed(2)
                                  : ""
                              }
                              disabled={true}
                            />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="col-12" />
                <div className="form-group col-sm-6 col-xl-2 mt-3">
                  <Link to="/pedidos" className="btn btn-info w-100 text-white">
                    Regresar
                  </Link>
                </div>
              </form>
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailOrderComponent;
