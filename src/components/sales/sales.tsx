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
  const { sales, cancelSale, getAllSales, searchSalesByInterval, status } =
    useSales();
  const [visibleAbortModal, setVisibleAbortModal] = React.useState(false);
  const [saleId, setSaleId] = React.useState("");

  React.useEffect(() => {
    getAllSales();
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
    required: true,
    validator: formatExceedDate(),
    invalidtext: true,
  };

  const handleSearchByInterval = (data) => {
    let startDate = "";
    let endDate = "";
    if (data?.startDate) {
      startDate = data?.startDate;
    }
    if (data?.endDate) {
      endDate = data?.endDate;
    }
    searchSalesByInterval(startDate, endDate);
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
                {status === Status.Loading ? (
                  <h4 className="text-center">Espere un momento...</h4>
                ) : null}
                {(status === Status.Ready || status === Status.Updating) &&
                sales.length > 0 ? (
                  <table className="table">
                    <thead>
                      <tr>
                        <th>N°</th>
                        <th>Nro. Venta</th>
                        <th>Fecha de Emisión</th>
                        <th>Cliente</th>
                        <th>Vendedor</th>
                        {/* <th>Subtotal</th> */}
                        <th>Total</th>
                        <th>Estado</th>
                        <th>Opciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sales.map((sale: Sale, index: number) => {
                        const {
                          _id,
                          seller = null,
                          client = null,
                          status,
                          createdAt,
                          saleNumber,
                          subtotal,
                          total,
                        } = sale;
                        return (
                          <SaleItem
                            key={index}
                            index={index + 1}
                            code={_id}
                            client={client}
                            seller={seller}
                            status={status}
                            createdAt={createdAt}
                            saleNumber={saleNumber}
                            subtotal={subtotal}
                            total={total}
                            handlePrint={handlePrint}
                            handleCancel={abortSale}
                          />
                        );
                      })}
                    </tbody>
                  </table>
                ) : null}
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
                    className="text-white"
                    onClick={() => {
                      setSaleId("");
                      setVisibleAbortModal(false);
                    }}
                  >
                    Cerrar
                  </CButton>
                  <CButton
                    color="danger"
                    className="text-white"
                    onClick={() => abortSale(saleId)}
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
