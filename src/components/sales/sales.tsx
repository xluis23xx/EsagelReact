/* eslint-disable react-hooks/exhaustive-deps */
import { cilHamburgerMenu } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import * as React from "react";
import { SaleItem } from "./_children/sale";
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import { Sale, useSales, Status } from "../../hooks/useSales";
import { SharedButtons } from "../global-components/sharedButtons";
import { IntervalButton } from "../global-components/globalButtons";
import { formatExceedDate } from "../../utils/errors";

const OrdersComponent = () => {
  const { sales, cancelSale, getSalesByInterval, status } = useSales();
  const [visibleAbortModal, setVisibleAbortModal] = React.useState(false);
  const [saleId, setSaleId] = React.useState("");

  React.useEffect(() => {
    // getAllProspectOrigins();
  }, []);

  const abortSale = (id: string) => {
    setVisibleAbortModal(!visibleAbortModal);
    if (!visibleAbortModal) {
      setSaleId(id);
    } else if (visibleAbortModal && saleId) {
      cancelSale(id);
      setSaleId("");
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
      <div className="row mb-3" />
      <div className="row my-3">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <CIcon icon={cilHamburgerMenu} />
              &nbsp;VENTAS GENERALES
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
                      <th>Nro. Venta</th>
                      <th>Fecha de Emisión</th>
                      <th>Cliente</th>
                      <th>Vendedor</th>
                      <th>Subtotal</th>
                      <th>Total</th>
                      <th>Estado</th>
                      <th>Opciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* {sales.map(
                        (sale: Sale, index: number) => {
                          const { _id, name, description, status } = sale;
                          return ( */}
                    <SaleItem
                      key={1}
                      index={1}
                      code={"243242343243434343"}
                      client={{ name: "Pablo", lastname: "Urbano" }}
                      seller={{
                        employee: {
                          name: "Pedro",
                          lastname: "Tineo",
                          secondLastname: "Te Vi",
                        },
                      }}
                      status={2}
                      createdAt={"02-10-2020"}
                      saleNumber={"0000000001"}
                      subtotal={400}
                      total={500.0}
                      handlePrint={handlePrint}
                      handleCancel={abortSale}
                    />
                    {/* );
                        }
                      )} */}
                  </tbody>
                </table>
                {/* ) : null} */}
              </div>
              <CModal
                visible={visibleAbortModal}
                onClose={() => {
                  setSaleId("");
                  setVisibleAbortModal(false);
                }}
              >
                <CModalHeader closeButton={true}>
                  <CModalTitle>Anular Venta</CModalTitle>
                </CModalHeader>
                <CModalBody>
                  ¿Estás seguro que quieres anular esta venta?
                </CModalBody>
                <CModalFooter>
                  <CButton
                    color="secondary"
                    onClick={() => {
                      setSaleId("");
                      setVisibleAbortModal(false);
                    }}
                  >
                    Cerrar
                  </CButton>
                  <CButton color="danger" onClick={() => abortSale(saleId)}>
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
