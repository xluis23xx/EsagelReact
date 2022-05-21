/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Link } from "react-router-dom";

import { SaleDetail, Status, useSales } from "../../hooks/useSales";
import { InputForm } from "../global-components/inputForm";
import { useParams, useHistory } from "react-router-dom";
import { setFormatDate } from "../../utils/formats";
import CIcon from "@coreui/icons-react";
import { cilHamburgerMenu } from "@coreui/icons";

const DetailOrderComponent = () => {
  const { setSaleById, saleInfo, status } = useSales();

  const history = useHistory();
  const { id } = useParams<any>();

  React.useEffect(() => {
    if (!id) {
      history.push("/ventas");
    }
    setSaleById(id);
  }, []);

  let fullNameOfClient = "";
  let statusOfSale = "";
  let sellerOfSale = "";
  let itemsOfSale = [];

  React.useEffect(() => {
    if (saleInfo) {
      const {
        client = null,
        status = null,
        seller = null,
        items = [],
      } = saleInfo;
      if (client) {
        fullNameOfClient = `${client?.name} ${client?.lastname} ${client?.secondLastname}`;
      }
      if (status) {
        switch (status) {
          case 0:
            statusOfSale = "Anulado";
            break;
          case 1:
            statusOfSale = "Pendiente";
            break;
          case 2:
            statusOfSale = "Confirmado";
            break;
          default:
            break;
        }
      }
      if (seller) {
        if (seller?.employee) {
          const { employee = null } = seller;
          sellerOfSale = `${employee?.name} ${employee?.lastname} ${employee?.secondLastname}`;
        } else {
          sellerOfSale = `${seller?.username || ""}`;
        }
      }
      if (items) {
        if (items.length > 0) {
          itemsOfSale = items;
        }
      }
    }
  }, [saleInfo]);

  return (
    <div className="row my-3">
      <div className="col-lg-12">
        <div className="card">
          <div className="card-header">
            <div className="row">
              <div className="col-12 col-sm-6 col-md-10 my-auto">
                <CIcon icon={cilHamburgerMenu} />
                &nbsp;DETALLE VENTA
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="col-12">
              <div className="form-group">
                <label className="fw-bold">Resumen de la venta</label>
                <br />
              </div>

              <form className="row">
                <div className="form-group mt-1 col-sm-6 col-xl-4">
                  <label className="form-label" htmlFor="saleNumber">
                    Nro. Venta:
                  </label>
                  <InputForm
                    placeholder="-"
                    name="saleNumber"
                    value={saleInfo?.saleNumber ? saleInfo?.saleNumber : ""}
                    disabled={status === Status.Loading}
                    readonly={true}
                  />
                </div>
                <div className="form-group mt-1 col-sm-6 col-xl-4">
                  <label className="form-label" htmlFor="order">
                    Nro. Pedido:
                  </label>
                  <InputForm
                    placeholder="-"
                    name="order"
                    value={
                      saleInfo?.order?.orderNumber
                        ? saleInfo?.order?.orderNumber
                        : ""
                    }
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
                      saleInfo?.order?.documentType
                        ? saleInfo?.order?.documentType?.name
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
                      saleInfo?.order?.documentNumber
                        ? saleInfo?.order?.documentNumber
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
                    value={sellerOfSale}
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
                    value={statusOfSale}
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
                      saleInfo?.createdAt
                        ? setFormatDate({
                            date: saleInfo?.createdAt,
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
                      {itemsOfSale.length > 0
                        ? itemsOfSale.map((item: SaleDetail, index: number) => {
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
                          })
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
                                saleInfo?.subtotal
                                  ? saleInfo?.subtotal.toFixed(2)
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
                                saleInfo?.percentIva
                                  ? `${saleInfo?.percentIva * 100}%`
                                  : ""
                              }`}
                              disabled={true}
                            />
                            <input
                              type={"number"}
                              className="form-control text-center d-flex"
                              value={
                                saleInfo?.amountInIva
                                  ? saleInfo?.amountInIva.toFixed(2)
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
                                saleInfo?.total
                                  ? saleInfo?.total.toFixed(2)
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
                <div className="form-group col-sm-6 col-md-2 mt-3">
                  <Link to="/ventas" className="btn btn-info w-100 text-white">
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
