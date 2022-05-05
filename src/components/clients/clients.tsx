/* eslint-disable react-hooks/exhaustive-deps */
import { cilHamburgerMenu } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import * as React from "react";
import { Link } from "react-router-dom";
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
import useForm from "../../hooks/useForm";
import { InputForm } from "../global-components/inputForm";

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

  const stateSchema = {
    search: { value: "", error: "" },
  };

  const stateValidatorSchema = {
    search: {
      required: false,
      validator: formatNames(),
      invalidtext: true,
    },
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

  const {
    values: { search },
    errors: { search: searchError },
    handleOnChange,
    handleOnSubmit,
    disable,
  } = useForm(stateSchema, stateValidatorSchema, handleSearch);

  return (
    <>
      <div className="row mb-3">
        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
          <Link
            className="btn btn-block btn-success w-100 h-auto text-white"
            to="/clientes/nuevo"
          >
            Nuevo
          </Link>
        </div>
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
                <div className="mx-auto mx-ms-0 me-ms-auto col-12 col-md-6 text-center text-md-start">
                  <button
                    type="button"
                    className="btn btn-default btn-secondary"
                  >
                    COPIA
                  </button>

                  <button
                    type="button"
                    className="btn btn-default btn-secondary"
                  >
                    EXCEL
                  </button>

                  <button
                    type="button"
                    className="btn btn-default btn-secondary"
                  >
                    CSV
                  </button>

                  <button
                    type="button"
                    className="btn btn-default btn-secondary"
                  >
                    PDF
                  </button>
                </div>

                <form
                  className="align-items-end my-1 col-12 col-md-6 flex-md-row d-sm-flex"
                  onSubmit={handleOnSubmit}
                >
                  <div className="col-12 col-sm-8">
                    <InputForm
                      type="search"
                      name="search"
                      className="form-control"
                      placeholder="Buscar"
                      aria-label="Search"
                      value={search}
                      error={searchError}
                      showError={false}
                      onChange={handleOnChange}
                    />
                  </div>
                  <button
                    className="btn btn-success text-white col-12 col-sm-4 my-1 my-sm-0"
                    type="submit"
                    disabled={disable}
                  >
                    Buscar
                  </button>
                </form>
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
