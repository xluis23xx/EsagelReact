/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Link, useHistory } from "react-router-dom";
import useForm from "../../hooks/useForm";
import {
  formatDescription,
  formatExtendNames,
  formatNames,
  minNumber,
} from "../../utils/errors";

import { Purchase, Status, usePurchases } from "../../hooks/usePurchases";
import CIcon from "@coreui/icons-react";

import { SearchButton, SubmitButton } from "../global-components/globalButtons";
import { Provider, useProviders } from "../../hooks/useProviders";

import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import { cilHamburgerMenu, cilSearch } from "@coreui/icons";

import { AuthContext } from "../../context/AuthContext";
import { InputForm } from "../global-components/inputForm";
import { TextAreaForm } from "../global-components/textareaForm";

const NewPurchaseComponent = () => {
  const { user } = React.useContext<any>(AuthContext);

  const { registerPurchase, status } = usePurchases();

  const { getProvidersByFilter, setSearchFilter, providers } = useProviders();

  const [visibleProviderModal, setVisibleProviderModal] = React.useState(false);

  const [selectedProvider, setSelectedProvider] =
    React.useState<Provider | null>(null);

  const [showProviderError, setShowProviderError] =
    React.useState<boolean>(false);

  const history = useHistory();

  React.useEffect(() => {
    setSearchFilter({
      filter: "",
      status: 1,
    });
    getProvidersByFilter({ filter: "", status: 1 }, { limit: 5, pageSize: 1 });
  }, []);

  const stateSchema = {
    name: { value: "", error: "" },
    reason: { value: "", error: "" },
    quantity: { value: "", error: "" },
    price: { value: "", error: "" },
  };

  const stateValidatorSchema = {
    name: { required: true, validator: formatNames(), min2caracts: true },
    reason: {
      required: true,
      validator: formatDescription(),
      min2caracts: true,
    },
    quantity: { required: true, validator: minNumber() },
    price: { required: true, validator: minNumber() },
  };

  const onSubmitForm = (data: Purchase) => {
    const purchase = {
      purchaseNumber: 100,
      name: data?.name || null,
      reason: data?.reason || null,
      buyer: user?._id || null,
      provider: selectedProvider?._id || null,
      price: data?.price ? Number(data?.price) : 0,
      quantity: data?.quantity ? Math.round(data?.quantity) : 0,
      total: data?.price && data?.quantity ? data?.price * data?.quantity : 0,
      status: 1,
    };
    registerPurchase(purchase).then((response) => {
      if (response?.status === 200 || response?.status === 201) {
        history.push("/compras");
      }
    });
  };

  const validators = {
    required: false,
    validator: formatExtendNames(),
    invalidtext: true,
  };

  const {
    values: { name, reason, quantity, price },
    errors: {
      name: nameError,
      reason: reasonError,
      quantity: quantityError,
      price: priceError,
    },
    disable,
    handleOnChange,
    handleOnSubmit,
  } = useForm(stateSchema, stateValidatorSchema, onSubmitForm);

  const handleSearchProviders = (data) => {
    let filter = "";
    if (data?.search) {
      filter = data?.search;
    }
    getProvidersByFilter(
      { filter: filter, status: 1 },
      { limit: 5, pageSize: 1 }
    );
  };

  return (
    <div className="row my-3">
      <div className="col-lg-12">
        <div className="card">
          <div className="card-header">
            <div className="row">
              <div className="col-12 col-sm-6 col-md-10 my-auto">
                <CIcon icon={cilHamburgerMenu} />
                &nbsp;NUEVA COMPRA
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="col-sm-12">
              <div className="form-group">
                <label className="fw-bold">
                  Los campos con (*) son obligatorios
                </label>
                <br />
              </div>

              <form className="row" onSubmit={handleOnSubmit}>
                <div className="form-group mt-1 col-sm-6 col-xl-4">
                  <label className="form-label" htmlFor="name">
                    Nombre (*):
                  </label>
                  <InputForm
                    type="text"
                    required
                    placeholder="Nombre"
                    name="name"
                    maxLength={25}
                    value={name}
                    onChange={handleOnChange}
                    disabled={status === Status.Updating}
                    error={nameError}
                  />
                </div>
                <div className="form-group mt-1 col-sm-6 col-xl-4">
                  <label className="form-label" htmlFor="reason">
                    Motivo (*):
                  </label>
                  <TextAreaForm
                    required
                    placeholder="Motivo"
                    name="reason"
                    value={reason}
                    maxLength={100}
                    rows={2}
                    onChange={handleOnChange}
                    disabled={status === Status.Updating}
                    error={reasonError}
                  />
                </div>
                <div className="form-group mt-1 col-sm-6 col-xl-4">
                  <label className="form-label" htmlFor="provider">
                    Proveedor (*):
                  </label>
                  <div className="d-flex">
                    <input
                      required
                      className={`w-100 ${
                        showProviderError ? "border border-danger" : ""
                      }`}
                      placeholder="Seleccione..."
                      name="provider"
                      value={
                        `${
                          selectedProvider?.businessName
                            ? selectedProvider?.businessName
                            : ""
                        }` || ""
                      }
                      onChange={(e) => {
                        if (e.target.value) {
                          setShowProviderError(true);
                        } else {
                          setShowProviderError(false);
                        }
                      }}
                      onBlur={(e) => {
                        if (e.target.value) {
                          setShowProviderError(true);
                        } else {
                          setShowProviderError(false);
                        }
                      }}
                      disabled={true}
                    />
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => setVisibleProviderModal(true)}
                    >
                      <CIcon icon={cilSearch}></CIcon>
                    </button>
                  </div>
                  {showProviderError ? (
                    <p
                      className="w-100 pb-0 mb-0 text-danger"
                      style={{ fontSize: 15 }}
                    >
                      Este campo es requerido.
                    </p>
                  ) : null}
                </div>

                <div className="form-group mt-1 col-sm-6 col-xl-4">
                  <label className="form-label" htmlFor="price">
                    Precio Unitario:
                  </label>
                  <InputForm
                    type="number"
                    maxLength={6}
                    step={"0.01"}
                    placeholder="Precio Unitario"
                    name="price"
                    value={price ? price?.toString() : "0"}
                    onChange={handleOnChange}
                    disabled={status === Status.Updating}
                    error={priceError}
                  />
                </div>
                <div className="form-group mt-1 col-sm-6 col-xl-4">
                  <label className="form-label" htmlFor="quantity">
                    Cantidad:
                  </label>
                  <InputForm
                    type="number"
                    maxLength={4}
                    step={"1"}
                    placeholder="Cantidad"
                    name="quantity"
                    value={quantity ? quantity.toString() : "0"}
                    onChange={handleOnChange}
                    disabled={status === Status.Updating}
                    error={quantityError}
                  />
                </div>

                <div className="form-group mt-1 col-sm-6 col-xl-4">
                  <label className="form-label" htmlFor="total">
                    Total:
                  </label>
                  <InputForm
                    type="number"
                    maxLength={4}
                    step={"1"}
                    placeholder="Total"
                    name="total"
                    value={
                      quantity && price
                        ? (Number(quantity) * Number(price)).toString()
                        : "0"
                    }
                    onChange={handleOnChange}
                    disabled={true}
                    error={
                      quantity && price
                        ? Number(quantity) * Number(price) > 0
                          ? ""
                          : "No cumple con la condición."
                        : ""
                    }
                  />
                </div>

                <div className="form-group mt-1 col-sm-6 col-xl-4">
                  <label className="form-label" htmlFor="buyer">
                    Comprador:
                  </label>
                  <InputForm
                    type="text"
                    required
                    maxLength={50}
                    placeholder="Comprador"
                    name="buyer"
                    value={`${
                      user?.employee?.name ? user?.employee?.name : ""
                    }${
                      user?.employee?.lastname
                        ? ` ${user?.employee?.lastname}`
                        : ""
                    }`}
                    onChange={handleOnChange}
                    disabled={true}
                  />
                </div>

                <div className="col-12" />
                <div className="form-group col-sm-6 col-xl-3 mt-3">
                  <SubmitButton
                    disabled={
                      disable || !selectedProvider || status === Status.Updating
                    }
                  >
                    {status === Status.Updating ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        &nbsp;Cargando...
                      </>
                    ) : (
                      "Registrar"
                    )}
                  </SubmitButton>
                </div>
                <div className="form-group col-sm-6 col-xl-3 mt-3">
                  <Link
                    to="/compras"
                    className="btn btn-secondary text-white w-100"
                  >
                    Cancelar
                  </Link>
                </div>
              </form>
              <br />
            </div>
            <CModal
              visible={visibleProviderModal}
              onClose={() => {
                setVisibleProviderModal(false);
              }}
            >
              <CModalHeader closeButton={true}>
                <CModalTitle>Selecciona un Proveedor</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <SearchButton
                  validators={validators}
                  textButton={"Buscar"}
                  handleSearch={handleSearchProviders}
                  className="align-items-end my-1 col-12 flex-md-row d-sm-flex"
                />
                <div className="w-100 overflow-auto" style={{ height: 300 }}>
                  <table className="table">
                    <thead>
                      <tr>
                        <th style={{ width: 20 }}></th>
                        <th>Proveedor</th>
                        <th>RUC</th>
                      </tr>
                    </thead>
                    <tbody>
                      {providers?.length > 0
                        ? providers.map((pro: Provider, index) => {
                            const {
                              _id,
                              businessName = "",
                              documentNumber: providerDocNumber,
                            } = pro;
                            if (index > 4) {
                              return null;
                            } else {
                              return (
                                <tr key={_id}>
                                  <td>
                                    <input
                                      type="checkbox"
                                      className="form-check-input form-check-success p-2"
                                      onClick={() => {
                                        setSelectedProvider({
                                          _id,
                                          businessName,
                                          documentNumber: providerDocNumber,
                                        });
                                        setShowProviderError(false);
                                        setVisibleProviderModal(false);
                                      }}
                                      checked={selectedProvider?._id === _id}
                                    />
                                  </td>
                                  <td>{businessName || ""}</td>
                                  <td>{providerDocNumber || ""}</td>
                                </tr>
                              );
                            }
                          })
                        : null}
                    </tbody>
                  </table>
                </div>
              </CModalBody>
              <CModalFooter>
                <CButton
                  color="secondary"
                  className="text-white"
                  onClick={() => {
                    setSelectedProvider(null);
                    setShowProviderError(true);
                    setVisibleProviderModal(false);
                  }}
                >
                  Limpiar
                </CButton>
                <CButton
                  color="dark"
                  onClick={() => {
                    if (!selectedProvider) {
                      setShowProviderError(true);
                    }
                    setVisibleProviderModal(false);
                  }}
                >
                  Cerrar
                </CButton>
              </CModalFooter>
            </CModal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPurchaseComponent;
