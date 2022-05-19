/* eslint-disable react-hooks/exhaustive-deps */
import { cilHamburgerMenu } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import * as React from "react";
import { PurchaseItem } from "./_children/purchase";
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import { Purchase, usePurchases, Status } from "../../hooks/usePurchases";
import { SharedButtons } from "../global-components/sharedButtons";
import {
  IntervalButton,
  RedirectionButton,
} from "../global-components/globalButtons";
import { formatExceedDate } from "../../utils/errors";

const PurchasesComponent = () => {
  const { purchases, cancelPurchase, getPurchasesByInterval, status } =
    usePurchases();
  const [visibleAbortModal, setVisibleAbortModal] = React.useState(false);
  const [purchaseId, setPurchaseId] = React.useState("");

  React.useEffect(() => {
    // getAllProspectOrigins();
  }, []);

  const abortPurchase = (id: string) => {
    setVisibleAbortModal(!visibleAbortModal);
    if (!visibleAbortModal) {
      setPurchaseId(id);
    } else if (visibleAbortModal && purchaseId) {
      cancelPurchase(id);
      setPurchaseId("");
    }
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
        <RedirectionButton redirection="/compras/nuevo" />
      </div>
      <div className="row mt-3">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <CIcon icon={cilHamburgerMenu} />
              &nbsp;Compras
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
                purchases.length > 0 ? ( */}
                <table className="table">
                  <thead>
                    <tr>
                      <th>N°</th>
                      <th>Nro. Compra</th>
                      <th>Nombre</th>
                      <th>Fecha de solicitud</th>
                      <th>Proveedor</th>
                      <th>Precio</th>
                      <th>Cantidad</th>
                      <th>Precio Total</th>
                      <th>Opciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* {purchases.map(
                        (purchase: Purchase, index: number) => {
                          const { _id, name, description, status } = purchase;
                          return ( */}
                    <PurchaseItem
                      key={10}
                      code={"compra0001"}
                      provider={{ businessName: "perro SAC" }}
                      index={1}
                      status={1}
                      createdAt={"02-11-2022"}
                      purchaseNumber={"0000000001"}
                      quantity={24}
                      price={10}
                      name={"Lapíz Faber Castell"}
                      total={240.0}
                      handleCancel={abortPurchase}
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
                  setPurchaseId("");
                  setVisibleAbortModal(false);
                }}
              >
                <CModalHeader closeButton={true}>
                  <CModalTitle>Anular Compra</CModalTitle>
                </CModalHeader>
                <CModalBody>
                  ¿Estás seguro que quieres anular esta compra?
                </CModalBody>
                <CModalFooter>
                  <CButton
                    color="secondary"
                    onClick={() => {
                      setPurchaseId("");
                      setVisibleAbortModal(false);
                    }}
                  >
                    Cerrar
                  </CButton>
                  <CButton
                    color="danger"
                    onClick={() => abortPurchase(purchaseId)}
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

export default PurchasesComponent;
