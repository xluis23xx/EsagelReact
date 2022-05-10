/* eslint-disable react-hooks/exhaustive-deps */
import { cilHamburgerMenu } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import * as React from "react";
import { ClientItem } from "./_children/client";
import { Client, Status, useClients } from "../../hooks/useClients";
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import { formatNames } from "../../utils/errors";
import { SharedButtons } from "../global-components/sharedButtons";
import {
  RedirectionButton,
  SearchButton,
} from "../global-components/globalButtons";

const EmployeesComponent = () => {
  const {
    clients,
    deleteClient,
    getAllClients,
    searchClientsByFilter,
    status,
  } = useClients();
  const [visible, setVisible] = React.useState(false);
  const [clientId, setClientId] = React.useState("");

  React.useEffect(() => {
    getAllClients();
  }, []);

  const validators = {
    required: false,
    validator: formatNames(),
    invalidtext: true,
  };

  const removeClient = (id: string) => {
    setVisible(!visible);
    if (!visible) {
      setClientId(id);
    } else if (visible && clientId) {
      deleteClient(id);
      setClientId("");
    }
  };

  const handleSearch = (data) => {
    console.log(data);
    searchClientsByFilter(data.search);
  };

  return (
    <>
      <div className="row mb-3">
        <RedirectionButton redirection="/clientes/nuevo" />
      </div>
      <div className="row mt-3">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <CIcon icon={cilHamburgerMenu} />
              &nbsp;CLIENTES
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
                clients.length > 0 ? (
                  <table className="table">
                    <thead>
                      <tr>
                        <th>N°</th>
                        <th>Nombre Completo</th>
                        <th>Tipo de Documento</th>
                        <th>N° Documento</th>
                        <th>Teléfono</th>
                        <th>Fecha de Nacimiento</th>
                        <th>Opciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clients.map((client: Client, index: number) => {
                        const {
                          _id,
                          name,
                          lastname,
                          secondLastname,
                          birthdate,
                          documentNumber,
                          documentType,
                          phoneNumber,
                          status,
                        } = client;
                        return (
                          <ClientItem
                            key={index}
                            code={_id}
                            fullName={`${name ? name : ""} ${
                              lastname ? lastname : ""
                            } ${secondLastname ? secondLastname : ""}`}
                            birthdate={birthdate}
                            documentNumber={documentNumber}
                            documentType={documentType}
                            phoneNumber={phoneNumber}
                            status={status}
                            orderNumber={index + 1}
                            handleRemove={removeClient}
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
                  setClientId("");
                  setVisible(false);
                }}
              >
                <CModalHeader closeButton={true}>
                  <CModalTitle>Eliminar Cliente</CModalTitle>
                </CModalHeader>
                <CModalBody>
                  ¿Estás seguro que quieres eliminar este cliente?
                </CModalBody>
                <CModalFooter>
                  <CButton
                    color="secondary"
                    onClick={() => {
                      setClientId("");
                      setVisible(false);
                    }}
                  >
                    Cerrar
                  </CButton>
                  <CButton
                    color="danger"
                    onClick={() => removeClient(clientId)}
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

export default EmployeesComponent;
