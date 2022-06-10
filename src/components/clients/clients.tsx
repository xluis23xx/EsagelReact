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
import { ExportButtons } from "../global-components/exportButtons";
import {
  RedirectionButton,
  SearchButton,
} from "../global-components/globalButtons";
import { savePathname } from "../../utils/location";

const ClientsComponent = () => {
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
    savePathname();
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
    searchClientsByFilter(data.search);
  };

  const tableExportId = "clients-table";

  const headers = [
    { label: "Nombre Completo", key: "clientName" },
    { label: "Tipo de Documento", key: "documentTypeName" },
    { label: "Nro. Documento", key: "documentNumber" },
    { label: "Teléfono", key: "phoneNumber" },
    { label: "Fecha de Nacimiento", key: "birthdate" },
  ];

  return (
    <>
      <div className="row mb-3">
        <RedirectionButton redirection="/clientes/nuevo" />
      </div>
      <div className="row my-3">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <CIcon icon={cilHamburgerMenu} />
              &nbsp;CLIENTES
            </div>
            <div className="card-body">
              <nav className="navbar navbar-expand-lg navbar-light bg-light px-3 my-2 row">
                <ExportButtons
                  dataReport={clients.map((client: Client) => {
                    const {
                      name,
                      lastname,
                      secondLastname,
                      documentType = null,
                    } = client || {};
                    let clientName = "Desconocido";
                    let documentName = "";
                    name ? (clientName = name) : "";
                    lastname ? (clientName = `${clientName} ${lastname}`) : "";
                    secondLastname
                      ? (clientName = `${clientName} ${secondLastname}`)
                      : "";
                    if (documentType) {
                      const { name: documentTypeName } = documentType || {};
                      documentTypeName ? (documentName = documentTypeName) : "";
                    }
                    return {
                      ...client,
                      clientName: clientName,
                      documentTypeName: documentName,
                    };
                  })}
                  documentName={"clients"}
                  headers={headers}
                  tableId={tableExportId}
                />
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
                      {clients.map((client: Client, index: number) => {
                        const {
                          _id="",
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
                    className="text-white"
                    onClick={() => {
                      setClientId("");
                      setVisible(false);
                    }}
                  >
                    Cerrar
                  </CButton>
                  <CButton
                    color="danger"
                    className="text-white"
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

export default ClientsComponent;
