import React from "react";
import { Link, useHistory } from "react-router-dom";
import useForm from "../../hooks/useForm";
import {
  formatDescription,
  formatNames,
  formatPhone,
  formatRuc,
} from "../../utils/errors";
import { InputForm } from "../global-components/inputForm";

import { Status, useProviders, Provider } from "../../hooks/useProviders";
import { SubmitButton } from "../global-components/globalButtons";
import CIcon from "@coreui/icons-react";
import { cilHamburgerMenu } from "@coreui/icons";
import { TextAreaForm } from "../global-components/textareaForm";

const NewProviderComponent = () => {
  const { registerProvider, status } = useProviders();
  const history = useHistory();

  const stateSchema = {
    businessName: { value: "", error: "" },
    contactName: { value: "", error: "" },
    documentType: { value: "", error: "" },
    documentNumber: { value: "", error: "" },
    description: { value: "", error: "" },
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
    description: {
      required: true,
      validator: formatDescription(),
      min2caracts: true,
      invalidtext: true,
    },
    phoneNumber: { required: true, validator: formatPhone() },
  };

  const onSubmitForm = (data: Provider) => {
    const provider = {
      businessName: data.businessName || null,
      contactName: data.contactName || null,
      phoneNumber: data.phoneNumber || null,
      documentType: "RUC" || null,
      description: data.description || null,
      documentNumber: data.documentNumber || null,
      status: 1,
    };
    registerProvider(provider).then((response) => {
      if (response?.status === 200 || response?.status === 201) {
        history.replace("/proveedores");
      }
    });
  };

  const {
    values: {
      businessName,
      contactName,
      phoneNumber,
      description,
      documentNumber,
    },
    errors: {
      businessName: businessNameError,
      contactName: contactNameError,
      documentNumber: documentNumberError,
      description: descriptionError,
      phoneNumber: phoneNumberError,
    },
    handleOnChange,
    handleOnSubmit,
    disable,
  } = useForm(stateSchema, stateValidatorSchema, onSubmitForm);

  return (
    <div className="row my-3">
      <div className="col-lg-12">
        <div className="card">
          <div className="card-header">
            <div className="row">
              <div className="col-12 col-sm-6 col-md-10 my-auto">
                <CIcon icon={cilHamburgerMenu} />
                &nbsp;NUEVO PROVEEDOR
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
                  <label className="form-label" htmlFor="businessName">
                    Nombre de la Empresa *
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

                <div className="form-group mt-1 col-sm-6 col-xl-4">
                  <label className="form-label" htmlFor="documentNumber">
                    Nro. RUC *
                  </label>
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
                <div className="form-group col-sm-6 col-xl-4">
                  <label className="form-label" htmlFor="description">
                    Descripción *
                  </label>
                  <TextAreaForm
                    required
                    placeholder="Descripción"
                    name="description"
                    value={description}
                    maxLength={100}
                    rows={2}
                    onChange={handleOnChange}
                    disabled={status === Status.Updating}
                    error={descriptionError}
                  />
                </div>

                <div className="form-group mt-1 col-sm-6 col-xl-4">
                  <label className="form-label" htmlFor="contactName">
                    Nombre del Contacto *
                  </label>
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

                <div className="form-group mt-1 col-sm-6 col-xl-4">
                  <label className="form-label" htmlFor="phoneNumber">
                    Télefono *
                  </label>
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
                <div className="form-group col-sm-6 col-xl-3 mt-3">
                  <SubmitButton
                    disabled={disable || status === Status.Updating}
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
                    to="/proveedores"
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

export default NewProviderComponent;
