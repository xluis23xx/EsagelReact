import React from "react";
import { Link, useHistory } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { formatNames, formatPhone, formatRuc } from "../../utils/errors";
import { InputForm } from "../global-components/inputForm";

import { Status, useProviders } from "../../hooks/useProviders";

const NewProviderComponent = () => {
  const { registerProvider, status } = useProviders();
  const history = useHistory();

  const stateSchema = {
    businessName: { value: "", error: "" },
    contactName: { value: "", error: "" },
    documentType: { value: "", error: "" },
    documentNumber: { value: "", error: "" },
    phoneNumber: { value: "", error: "" },
  };

  const stateValidatorSchema = {
    businessName: {
      required: true,
      validator: formatNames(),
      min2caracts: true,
      invalidtext: true,
    },
    contactName: {
      required: true,
      validator: formatNames(),
      min2caracts: true,
      invalidtext: true,
    },
    documentNumber: {
      required: true,
      validator: formatRuc(),
      invalidText: true,
    },
    phoneNumber: { required: true, validator: formatPhone() },
  };

  const onSubmitForm = (data: any) => {
    const provider = {
      businessName: data.businessName || null,
      contactName: data.contactName || null,
      phoneNumber: data.phoneNumber || null,
      documentType: "RUC" || null,
      documentNumber: data.documentNumber || null,
      status: 1,
    };
    registerProvider(provider).then((response) => {
      if (response?.status === 200 || response?.status === 201) {
        history.push("/proveedores");
      }
    });
  };

  const {
    values: { businessName, contactName, phoneNumber, documentNumber },
    errors: {
      businessName: businessNameError,
      contactName: contactNameError,
      documentNumber: documentNumberError,
      phoneNumber: phoneNumberError,
    },
    handleOnChange,
    handleOnSubmit,
    disable,
  } = useForm(stateSchema, stateValidatorSchema, onSubmitForm);

  return (
    <div className="row mt-3">
      <div className="col-lg-12">
        <div className="card">
          <div className="card-header">
            <div className="row">
              <div className="col-12 col-sm-6 col-md-10 my-auto">
                <i className="fa fa-align-justify"></i>NUEVO PROVEEDOR
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
                <div className="form-group col-sm-6 col-md-4">
                  <label htmlFor="businessName">
                    Nombre de la Empresa (*):
                  </label>
                  <InputForm
                    type="text"
                    required
                    placeholder="Nombre"
                    name="businessName"
                    maxLength={50}
                    value={businessName}
                    onChange={handleOnChange}
                    disabled={status === Status.Updating}
                    error={businessNameError}
                  />
                </div>

                <div className="form-group col-sm-6 col-md-4">
                  <label htmlFor="documentNumber">Nro. RUC (*):</label>
                  <InputForm
                    type="text"
                    required
                    placeholder="RUC"
                    maxLength={11}
                    name="documentNumber"
                    value={documentNumber}
                    onChange={handleOnChange}
                    disabled={status === Status.Updating}
                    error={documentNumberError}
                  />
                </div>

                <div className="form-group col-sm-6 col-md-4">
                  <label htmlFor="contactName">Nombre del Contacto (*):</label>
                  <InputForm
                    type="text"
                    required
                    placeholder="Nombre del Contacto"
                    maxLength={50}
                    name="contactName"
                    value={contactName}
                    onChange={handleOnChange}
                    disabled={status === Status.Updating}
                    error={contactNameError}
                  />
                </div>

                <div className="form-group col-sm-6 col-md-4">
                  <label htmlFor="phoneNumber">Télefono (*):</label>
                  <InputForm
                    type="text"
                    required
                    placeholder="Número de Contacto"
                    maxLength={12}
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={handleOnChange}
                    disabled={status === Status.Updating}
                    error={phoneNumberError}
                  />
                </div>
                <div className="col-12" />
                <div className="form-group col-sm-6 col-md-4 mt-3">
                  <button
                    type="submit"
                    disabled={disable}
                    className="btn btn-block btn-primary w-100"
                  >
                    {status === Status.Updating ? "Cargando" : "Registrar"}
                  </button>
                </div>
                <div className="form-group col-sm-6 col-md-4 mt-3">
                  <Link
                    to="/proveedores"
                    className="btn btn-block btn-secondary w-100"
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

export default NewProviderComponent;
