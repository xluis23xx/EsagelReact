/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Link, useHistory } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { formatDescription, formatNames, minNumber } from "../../utils/errors";

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
import { cilCheckCircle, cilHamburgerMenu, cilSearch } from "@coreui/icons";

import { AuthContext } from "../../context/AuthContext";
import { InputForm } from "../global-components/inputForm";
import { TextAreaForm } from "../global-components/textareaForm";

const NewPurchaseComponent = () => {
  const { user } = React.useContext(AuthContext);

  const { registerPurchase, status } = usePurchases();

  const {
    searchProvidersByFilter,
    providers,
    providerInfo,
    setProviderById,
    cleanProviderInfo,
  } = useProviders();

  const [visibleProviderModal, setVisibleProviderModal] = React.useState(false);

  const [selectedProvider, setSelectedProvider] =
    React.useState<Provider>(null);

  const [showProviderError, setShowProviderError] =
    React.useState<boolean>(false);

  const history = useHistory();

  React.useEffect(() => {
    setSelectedProvider(providerInfo);
  }, [providerInfo]);

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
      name: data?.name || null,
      reason: data?.reason || null,
      buyer: user?._id || null,
      provider: providerInfo?._id || null,
      price: data?.price ? Number(data?.price) : 0,
      quantity: data?.quantity ? Math.round(data?.quantity) : 0,
      total: data?.price && data?.quantity ? data?.price * data?.quantity : 0,
      status: 1,
    };
    console.log(purchase);
    registerPurchase(purchase).then((response) => {
      if (response?.status === 200 || response?.status === 201) {
        history.push("/compras");
      }
    });
  };

  const validators = {
    required: false,
    validator: formatNames(),
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
    searchProvidersByFilter(data.search);
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
                    Nombres (*):
                  </label>
                  <InputForm
                    type="text"
                    required
                    placeholder="Nombres"
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
                cleanProviderInfo();
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
                                    <CButton
                                      type="button"
                                      color="success"
                                      onClick={() => {
                                        setProviderById(_id);
                                        setShowProviderError(false);
                                        setVisibleProviderModal(false);
                                      }}
                                    >
                                      <CIcon icon={cilCheckCircle}></CIcon>
                                    </CButton>
                                  </td>
                                  <td>{businessName}</td>
                                  <td>{providerDocNumber}</td>
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
                  onClick={() => {
                    cleanProviderInfo();
                    setShowProviderError(true);
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