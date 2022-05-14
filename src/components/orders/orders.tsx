/* eslint-disable react-hooks/exhaustive-deps */
import { cilHamburgerMenu, cilSearch } from "@coreui/icons";
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
import { SharedButtons } from "../global-components/sharedButtons";
import {
  IntervalButton,
  RedirectionButton,
} from "../global-components/globalButtons";
import { InputForm } from "../global-components/inputForm";
import { formatExceedDate } from "../../utils/errors";

const ProspectOriginsComponent = () => {
  const { orders, cancelOrder, confirmOrder, getOrdersByInterval, status } =
    useOrders();
  const [visibleAbortModal, setVisibleAbortModal] = React.useState(false);
  const [visibleConfirmModal, setVisibleConfirmModal] = React.useState(false);
  const [orderId, setOrderId] = React.useState("");

  React.useEffect(() => {
    // getAllProspectOrigins();
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
    required: false,
    validator: formatExceedDate(),
    invalidtext: true,
  };

  const handleSearchByInterval = (data) => {
    console.log(data?.startDate);
    console.log("convirtiendo a fecha real", data?.startDate);
    console.log(data?.endDate);
    console.log("convirtiendo a fecha real", data?.endDate);
    // getOrdersByInterval({ startDate: data?.startDate, endDate: data?.endDate });
  };

  return (
    <>
      <div className="row mb-3">
        <RedirectionButton redirection="/pedidos/nuevo" />
      </div>
      <div className="row mt-3">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <CIcon icon={cilHamburgerMenu} />
              &nbsp;Pedidos
            </div>
            <div className="card-body">
              <nav className="navbar navbar-expand-lg navbar-light bg-light px-3 my-2 row">
                <SharedButtons />
                <IntervalButton
                  handleSearch={handleSearchByInterval}
                  validators={validators}
                />
              </nav>
              <br />
              <div className="w-100 overflow-auto" style={{ height: 300 }}>
                {/* {status === Status.Loading ? (
                  <h4 className="text-center">Espere un momento...</h4>
                ) : null} */}
                {/* {(status === Status.Ready || status === Status.Updating) &&
                prospectOrigins.length > 0 ? ( */}
                <table className="table">
                  <thead>
                    <tr>
                      <th>N°</th>
                      <th>Nro. Pedido</th>
                      <th>Cliente</th>
                      <th>Fecha de Emisión</th>
                      <th>Total</th>
                      <th>Estado</th>
                      <th>Opciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* {prospectOrigins.map(
                        (prospect: ProspectusOrigin, index: number) => {
                          const { _id, name, description, status } = prospect;
                          return ( */}
                    <OrderItem
                      key={10}
                      code={"perro"}
                      client={{ name: "perro", lastname: "aguayo" }}
                      index={1}
                      status={1}
                      createdAt={"02-10-2020"}
                      orderNumber={"0000000001"}
                      total={500.0}
                      handlePrint={handlePrint}
                      handleConfirm={acceptOrder}
                      handleCancel={abortOrder}
                    />
                    {/* );
                        }
                      )} */}
                  </tbody>
                </table>
                {/* ) : null} */}
              </div>
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
                    onClick={() => {
                      setOrderId("");
                      setVisibleAbortModal(false);
                    }}
                  >
                    Cerrar
                  </CButton>
                  <CButton color="danger" onClick={() => abortOrder(orderId)}>
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

export default ProspectOriginsComponent;
