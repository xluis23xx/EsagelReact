/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { formatDescription } from "../../utils/errors";

import { Purchase, Status, usePurchases } from "../../hooks/usePurchases";
import { SubmitButton } from "../global-components/globalButtons";

import { InputForm } from "../global-components/inputForm";
import { TextAreaForm } from "../global-components/textareaForm";
import CIcon from "@coreui/icons-react";
import { cilHamburgerMenu } from "@coreui/icons";

const NewPurchaseComponent = () => {
  const { updatePurchase, purchaseInfo, setPurchaseById, status } =
    usePurchases();

  const history = useHistory();
  const { id } = useParams<any>();

  React.useEffect(() => {
    if (!id) {
      history.replace("/compras");
    }
    setPurchaseById(id);
  }, []);

  const stateSchema = {
    reason: { value: null, error: "" },
    status: { value: null, error: "" },
  };

  const stateValidatorSchema = {
    reason: {
      required: true,
      validator: formatDescription(),
      min2caracts: true,
    },
    status: {
      required: true,
    },
  };

  const onSubmitForm = (data: Purchase) => {
    const purchase = {
      reason: (data?.reason ?? purchaseInfo?.reason) || null,
      buyer: purchaseInfo?.buyer?._id,
      provider: purchaseInfo?.provider?._id,
      status: (data?.status ?? purchaseInfo?.status) || 0,
    };
    updatePurchase(id, purchase).then((response) => {
      if (response?.status === 200 || response?.status === 201) {
        history.replace("/compras");
      }
    });
  };

  const {
    values: { reason, status: statusPurchase },
    errors: { reason: reasonError, status: statusError },
    disable,
    handleOnChange,
    handleOnSubmit,
  } = useForm(stateSchema, stateValidatorSchema, onSubmitForm);

  return (
    <div className="row my-3">
      <div className="col-lg-12">
        <div className="card">
          <div className="card-header">
            <div className="row">
              <div className="col-12 col-sm-6 col-md-10 my-auto">
                <CIcon icon={cilHamburgerMenu} />
                &nbsp;EDITAR COMPRA
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
                  <label className="form-label" htmlFor="purchaseNumber">
                    Nro. Compra *
                  </label>
                  <InputForm
                    type="text"
                    required
                    placeholder="Nro. Compra"
                    name="purchaseNumber"
                    maxLength={50}
                    value={purchaseInfo?.purchaseNumber || ""}
                    onChange={handleOnChange}
                    disabled={true}
                    error={false}
                  />
                </div>
                <div className="form-group mt-1 col-sm-6 col-xl-4">
                  <label className="form-label" htmlFor="name">
                    Nombre *
                  </label>
                  <InputForm
                    type="text"
                    required
                    placeholder="Nombre"
                    name="name"
                    maxLength={25}
                    value={purchaseInfo?.name || ""}
                    onChange={handleOnChange}
                    disabled={true}
                    error={false}
                  />
                </div>
                <div className="form-group mt-1 col-sm-6 col-xl-4">
                  <label className="form-label" htmlFor="reason">
                    Motivo *
                  </label>
                  <TextAreaForm
                    required
                    placeholder="Motivo"
                    name="reason"
                    value={(reason ?? purchaseInfo?.reason) || ""}
                    maxLength={100}
                    rows={2}
                    onChange={handleOnChange}
                    disabled={
                      status === Status.Loading || status === Status.Updating
                    }
                    error={reasonError}
                  />
                </div>
                <div className="form-group mt-1 col-sm-6 col-xl-4">
                  <label className="form-label" htmlFor="provider">
                    Proveedor *
                  </label>
                  <InputForm
                    required
                    placeholder="Seleccione..."
                    name="provider"
                    value={
                      purchaseInfo?.provider?.businessName
                        ? purchaseInfo?.provider?.businessName
                        : ""
                    }
                    onChange={handleOnChange}
                    disabled={true}
                  />
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
                    value={
                      purchaseInfo?.price
                        ? purchaseInfo?.price?.toFixed(2)
                        : "0.00"
                    }
                    onChange={handleOnChange}
                    disabled={true}
                    error={false}
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
                    value={
                      purchaseInfo?.quantity
                        ? purchaseInfo?.quantity?.toFixed(2)
                        : "0"
                    }
                    onChange={handleOnChange}
                    disabled={true}
                    error={false}
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
                      purchaseInfo?.total
                        ? purchaseInfo?.total?.toFixed(2)
                        : "0.00"
                    }
                    onChange={handleOnChange}
                    disabled={true}
                    error={false}
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
                      purchaseInfo?.buyer?.employee?.name
                        ? purchaseInfo?.buyer?.employee?.name
                        : ""
                    }${
                      purchaseInfo?.buyer?.employee?.lastname
                        ? ` ${purchaseInfo?.buyer?.employee?.lastname}`
                        : ""
                    }`}
                    onChange={handleOnChange}
                    disabled={true}
                  />
                </div>
                <div className="form-group mt-1 col-sm-6 col-xl-4">
                  <label className="form-label" htmlFor="status">
                    Estado *
                  </label>
                  <select
                    id="status"
                    name="status"
                    required
                    disabled={
                      status === Status.Loading || status === Status.Updating
                    }
                    value={
                      (statusPurchase ?? purchaseInfo?.status?.toString()) || ""
                    }
                    onChange={handleOnChange}
                    onBlur={handleOnChange}
                    className={`btn border-secondary btn-default w-100 ${
                      statusError ? "border border-danger" : ""
                    }`}
                  >
                    <option value="">Seleccione</option>
                    <option value="0">Anulado</option>
                    <option value="1">Aceptado</option>
                  </select>
                </div>
                <div className="col-12" />
                <div className="form-group col-sm-6 col-xl-3 mt-3">
                  <SubmitButton
                    disabled={
                      disable ||
                      !purchaseInfo ||
                      status === Status.Loading ||
                      status === Status.Updating
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
                      "Actualizar"
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPurchaseComponent;
