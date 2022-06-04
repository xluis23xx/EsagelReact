/* eslint-disable react-hooks/exhaustive-deps */
import { cilHamburgerMenu } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import * as React from "react";
import { ProviderItem } from "./_children/provider";
import { Provider, Status, useProviders } from "../../hooks/useProviders";
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import { formatNames, formatRuc } from "../../utils/errors";
import { SharedButtons } from "../global-components/sharedButtons";
import {
  RedirectionButton,
  SearchButton,
} from "../global-components/globalButtons";

const ProvidersComponent = () => {
  const {
    providers,
    deleteProvider,
    getAllProviders,
    searchProvidersByFilter,
    status,
  } = useProviders();
  const [visible, setVisible] = React.useState(false);
  const [providerId, setProviderId] = React.useState("");

  React.useEffect(() => {
    getAllProviders();
  }, []);

  const validators = {
    required: false,
    validator: formatNames() || formatRuc(),
    invalidtext: true,
  };

  const removeProvider = (id: string) => {
    setVisible(!visible);
    if (!visible) {
      setProviderId(id);
    } else if (visible && providerId) {
      deleteProvider(id);
      setProviderId("");
    }
  };

  const handleSearch = (data) => {
    searchProvidersByFilter(data.search);
  };

  return (
    <>
      <div className="row mb-3">
        <RedirectionButton redirection="/proveedores/nuevo" />
      </div>
      <div className="row my-3">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <CIcon icon={cilHamburgerMenu} />
              &nbsp;PROVEEDORES
            </div>
            <div className="card-body">
              <nav className="navbar navbar-expand-lg navbar-light bg-light px-3 my-2 row">
                <SharedButtons />
                <SearchButton
                  validators={validators}
                  handleSearch={handleSearch}
                />
              </nav>
              <br />
              <div className="w-100 overflow-auto" style={{ height: 300 }}>
                {status === Status.Loading ? (
                  <h4 className="text-center">Espere un momento...</h4>
                ) : null}
                {(status === Status.Ready || status === Status.Updating) &&
                providers.length > 0 ? (
                  <table className="table">
                    <thead>
                      <tr>
                        <th>N°</th>
                        <th>Fecha de Registro</th>
                        <th>Nombre de la Empresa</th>
                        <th>RUC</th>
                        <th>Nombre del Contacto</th>
                        <th>Teléfono</th>
                        {/* <th>Estado</th> */}
                        <th>Opciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {providers.map((provider: Provider, index: number) => {
                        const {
                          _id,
                          businessName,
                          createdAt,
                          contactName,
                          documentNumber,
                          phoneNumber,
                          // status,
                        } = provider;
                        return (
                          <ProviderItem
                            key={index}
                            code={_id}
                            businessName={businessName}
                            createdAt={createdAt}
                            contactName={contactName}
                            documentNumber={documentNumber}
                            phoneNumber={phoneNumber}
                            // status={status}
                            orderNumber={index + 1}
                            handleRemove={removeProvider}
                          />
                        );
                      })}
                    </tbody>
                  </table>
                ) : null}
              </div>
              <CModal
                visible={visible}
                onClose={() => {
                  setProviderId("");
                  setVisible(false);
                }}
              >
                <CModalHeader closeButton={true}>
                  <CModalTitle>Eliminar Proveedor</CModalTitle>
                </CModalHeader>
                <CModalBody>
                  ¿Estás seguro que quieres eliminar este proveedor?
                </CModalBody>
                <CModalFooter>
                  <CButton
                    color="secondary"
                    className="text-white"
                    onClick={() => {
                      setProviderId("");
                      setVisible(false);
                    }}
                  >
                    Cerrar
                  </CButton>
                  <CButton
                    color="danger"
                    className="text-white"
                    onClick={() => removeProvider(providerId)}
                  >
                    Eliminar
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

export default ProvidersComponent;
