/* eslint-disable react-hooks/exhaustive-deps */
import { cilHamburgerMenu } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import * as React from "react";
import { OrderItem } from "./_children/order";
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import { Order, useOrders, Status } from "../../hooks/useOrders";
import { ExportButtons } from "../global-components/exportButtons";
import {
  IntervalButton,
  PaginateButtons,
  RedirectionButton,
} from "../global-components/globalButtons";
import { formatExceedDate } from "../../utils/errors";
import { savePathname } from "../../utils/location";
import { setFormatDate } from "../../utils/formats";

const OrdersComponent = () => {
  const {
    orders,
    cancelOrder,
    confirmOrder,
    getOrdersByFilter,
    setSearchFilter,
    changePage,
    paginateData,
    status,
  } = useOrders();
  const [visibleAbortModal, setVisibleAbortModal] = React.useState(false);
  const [visibleConfirmModal, setVisibleConfirmModal] = React.useState(false);
  const [orderId, setOrderId] = React.useState("");

  React.useEffect(() => {
    savePathname();

    const currentDate = new Date();
    const startDate = `${setFormatDate({
      order: 1,
      date: currentDate,
      separator: "-",
    })}T00:00:00.0+00:00`;
    const endDate = `${setFormatDate({
      order: 1,
      date: currentDate,
      separator: "-",
    })}T23:59:59.999+00:00`;
    setSearchFilter({
      startDate: startDate,
      endDate: endDate,
    });
    getOrdersByFilter({ startDate, endDate }, { limit: 20, pageSize: 1 });
  }, []);

  const abortOrder = (id: string) => {
    setVisibleAbortModal(!visibleAbortModal);
    if (!visibleAbortModal) {
      setOrderId(id);
    } else if (visibleAbortModal && orderId) {
      cancelOrder(id);
      setOrderId("");
    }
  };

  const acceptOrder = (id: string) => {
    setVisibleConfirmModal(!visibleConfirmModal);
    if (!visibleConfirmModal) {
      setOrderId(id);
    } else if (visibleConfirmModal && orderId) {
      confirmOrder(id);
      setOrderId("");
    }
  };

  const handlePrint = (id: string) => {
    console.log("imprimiendo...", id);
  };

  const validators = {
    required: true,
    validator: formatExceedDate(),
    invalidtext: true,
  };

  const handleSearchByInterval = (data) => {
    let startDate = "";
    let endDate = "";
    if (data?.startDate) {
      startDate = `${data?.startDate.replace("/", "-")}T00:00:00.0+00:00`;
    }
    if (data?.endDate) {
      endDate = `${data?.endDate.replace("/", "-")}T23:59:59.999+00:00`;
    }
    setSearchFilter({ startDate: startDate, endDate: endDate });
    getOrdersByFilter({ startDate, endDate }, { limit: 20, pageSize: 1 });
  };

  const tableExportId = "orders-table";

  const headers = [
    { label: "Nro. Pedido", key: "orderNumber" },
    { label: "Cliente", key: "clientName" },
    { label: "Fecha de Emisión", key: "createdAt" },
    { label: "Total", key: "total" },
    { label: "Estado", key: "status" },
  ];

  return (
    <>
      <div className="row mb-3">
        <RedirectionButton redirection="/pedidos/nuevo" />
      </div>
      <div className="row my-3">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <CIcon icon={cilHamburgerMenu} />
              &nbsp;PEDIDOS
            </div>
            <div className="card-body">
              <nav className="navbar navbar-expand-lg navbar-light bg-light px-3 my-2 row">
                <ExportButtons
                  dataReport={orders.map((order: Order) => {
                    const { client = null } = order || {};
                    let clientName = "Desconocido";
                    if (client) {
                      client?.name ? (clientName = client?.name) : "";
                      client?.lastname
                        ? (clientName = `${clientName} ${client?.lastname}`)
                        : "";
                    }
                    return {
                      ...order,
                      clientName: clientName,
                      total: order?.total || "",
                    };
                  })}
                  headers={headers}
                  tableId={tableExportId}
                  documentName={"orders"}
                />
                <IntervalButton
                  handleSearch={handleSearchByInterval}
                  validators={validators}
                  required={true}
                />
              </nav>
              <br />
              <div className="w-100 overflow-auto" style={{ height: 300 }}>
                {status === Status.Loading ? (
                  <h4 className="text-center">Espere un momento...</h4>
                ) : null}
                {(status === Status.Ready || status === Status.Updating) &&
                orders.length > 0 ? (
                  <table className="table" id={tableExportId}>
                    <thead>
                      <tr>
                        <th>N°</th>
                        {headers
                          ? headers.map((header) => (
                              <th key={header.label}>{header.label}</th>
                            ))
                          : null}
                        <th>Opciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order: Order, index: number) => {
                        const {
                          _id = "",
                          orderNumber,
                          client,
                          createdAt,
                          status,
                          total,
                        } = order;
                        return (
                          <OrderItem
                            key={index}
                            code={_id}
                            client={client}
                            index={index + 1}
                            status={status}
                            createdAt={createdAt}
                            orderNumber={orderNumber}
                            total={total}
                            handlePrint={handlePrint}
                            handleConfirm={acceptOrder}
                            handleCancel={abortOrder}
                          />
                        );
                      })}
                    </tbody>
                  </table>
                ) : null}
              </div>
              {orders.length > 0 ? (
                <div className="w-100 text-center mt-2">
                  <PaginateButtons
                    handleChange={changePage}
                    paginate={paginateData}
                  ></PaginateButtons>
                </div>
              ) : null}
              <CModal
                visible={visibleConfirmModal}
                onClose={() => {
                  setOrderId("");
                  setVisibleConfirmModal(false);
                }}
              >
                <CModalHeader closeButton={true}>
                  <CModalTitle>Confirmar Pedido</CModalTitle>
                </CModalHeader>
                <CModalBody>
                  ¿Estás seguro que quieres confirmar este pedido?
                </CModalBody>
                <CModalFooter>
                  <CButton
                    color="secondary"
                    className="text-white"
                    onClick={() => {
                      setOrderId("");
                      setVisibleConfirmModal(false);
                    }}
                  >
                    Cerrar
                  </CButton>
                  <CButton color="success" onClick={() => acceptOrder(orderId)}>
                    Confirmar
                  </CButton>
                </CModalFooter>
              </CModal>
              <CModal
                visible={visibleAbortModal}
                onClose={() => {
                  setOrderId("");
                  setVisibleAbortModal(false);
                }}
              >
                <CModalHeader closeButton={true}>
                  <CModalTitle>Anular Pedido</CModalTitle>
                </CModalHeader>
                <CModalBody>
                  ¿Estás seguro que quieres anular este pedido?
                </CModalBody>
                <CModalFooter>
                  <CButton
                    color="secondary"
                    className="text-white"
                    onClick={() => {
                      setOrderId("");
                      setVisibleAbortModal(false);
                    }}
                  >
                    Cerrar
                  </CButton>
                  <CButton
                    color="danger"
                    className="text-white"
                    onClick={() => abortOrder(orderId)}
                  >
                    Anular
                  </CButton>
                </CModalFooter>
              </CModal>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrdersComponent;
