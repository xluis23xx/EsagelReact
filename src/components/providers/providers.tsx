/* eslint-disable react-hooks/exhaustive-deps */
import { cilHamburgerMenu } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import * as React from "react";
import { Link } from "react-router-dom";
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
import useForm from "../../hooks/useForm";
import { InputForm } from "../global-components/inputForm";
import { SharedButtons } from "../global-components/sharedButtons";

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

  const stateSchema = {
    search: { value: "", error: "" },
  };

  const stateValidatorSchema = {
    search: {
      required: false,
      validator: formatNames() || formatRuc(),
      invalidtext: true,
    },
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
            to="/proveedores/nuevo"
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
              &nbsp;PROVEEDORES
            </div>
            <div className="card-body">
              <nav className="navbar navbar-expand-lg navbar-light bg-light px-3 my-2 row">
                <SharedButtons />
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
                        <th>Estado</th>
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
                          status,
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
                            status={status}
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
                    onClick={() => {
                      setProviderId("");
                      setVisible(false);
                    }}
                  >
                    Cerrar
                  </CButton>
                  <CButton
                    color="danger"
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
