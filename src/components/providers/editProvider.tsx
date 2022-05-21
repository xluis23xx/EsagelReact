/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { formatNames, formatPhone, formatRuc } from "../../utils/errors";
import { InputForm } from "../global-components/inputForm";

import { Status, useProviders } from "../../hooks/useProviders";
import { setFormatDate } from "../../utils/formats";
import { SubmitButton } from "../global-components/globalButtons";
import CIcon from "@coreui/icons-react";
import { cilHamburgerMenu } from "@coreui/icons";

const EditProviderComponent = () => {
  const { updateProvider, setProviderById, providerInfo, status } =
    useProviders();

  const history = useHistory();

  const { id } = useParams<any>();

  React.useEffect(() => {
    if (!id) {
      history.push("/proveedores");
    }
    setProviderById(id);
  }, []);

  const stateSchema = {
    businessName: { value: null, error: "" },
    contactName: { value: null, error: "" },
    documentType: { value: null, error: "" },
    documentNumber: { value: null, error: "" },
    phoneNumber: { value: null, error: "" },
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
      businessName: (data?.businessName ?? providerInfo?.businessName) || null,
      contactName: (data?.contactName ?? providerInfo?.contactName) || null,
      documentNumber:
        (data?.documentNumber ?? providerInfo?.documentNumber) || null,
      phoneNumber: (data?.phoneNumber ?? providerInfo?.phoneNumber) || null,
      status: 1,
    };
    updateProvider(id, provider).then((response) => {
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
    <div className="row my-3">
      <div className="col-lg-12">
        <div className="card">
          <div className="card-header">
            <div className="row">
              <div className="col-12 col-sm-6 col-md-10 my-auto">
                <CIcon icon={cilHamburgerMenu} />
                &nbsp;EDITAR PROVEEDOR
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
                <div className="form-group mt-1 col-sm-6 col-md-4">
                  <label className="form-label" htmlFor="createdAt">
                    Fecha de Registro:
                  </label>
                  <InputForm
                    type="date"
                    required
                    placeholder="Fecha de Registro"
                    name="createdAt"
                    value={
                      setFormatDate({
                        order: 1,
                        date: providerInfo?.createdAt,
                      }) || ""
                    }
                    disabled={true}
                  />
                </div>
                <div className="form-group mt-1 col-sm-6 col-md-4">
                  <label className="form-label" htmlFor="updatedAt">
                    Última modificación:
                  </label>
                  <InputForm
                    type="date"
                    required
                    placeholder="Última modificación"
                    name="updatedAt"
                    value={
                      setFormatDate({
                        order: 1,
                        date: providerInfo?.updatedAt,
                      }) || ""
                    }
                    disabled={true}
                  />
                </div>
                <div className="form-group mt-1 col-sm-6 col-md-4">
                  <label className="form-label" htmlFor="businessName">
                    Nombre de la Empresa (*):
                  </label>
                  <InputForm
                    type="text"
                    required
                    placeholder="Nombre"
                    name="businessName"
                    maxLength={50}
                    value={(businessName ?? providerInfo?.businessName) || ""}
                    onChange={handleOnChange}
                    disabled={true}
                    error={businessNameError}
                  />
                </div>
                <div className="form-group mt-1 col-sm-6 col-md-4">
                  <label className="form-label" htmlFor="documentNumber">
                    Nro. RUC (*):
                  </label>
                  <InputForm
                    type="text"
                    required
                    placeholder="RUC"
                    maxLength={11}
                    name="documentNumber"
                    value={
                      (documentNumber ?? providerInfo?.documentNumber) || ""
                    }
                    onChange={handleOnChange}
                    disabled={true}
                    error={documentNumberError}
                  />
                </div>
                <div className="form-group mt-1 col-sm-6 col-md-4">
                  <label className="form-label" htmlFor="contactName">
                    Nombre del Contacto (*):
                  </label>
                  <InputForm
                    type="text"
                    required
                    placeholder="Nombre del Contacto"
                    maxLength={50}
                    name="contactName"
                    value={(contactName ?? providerInfo?.contactName) || ""}
                    onChange={handleOnChange}
                    disabled={
                      status === Status.Loading || status === Status.Updating
                    }
                    error={contactNameError}
                  />
                </div>
                <div className="form-group mt-1 col-sm-6 col-md-4">
                  <label className="form-label" htmlFor="phoneNumber">
                    Télefono (*):
                  </label>
                  <InputForm
                    type="text"
                    required
                    placeholder="Número de Contacto"
                    maxLength={12}
                    name="phoneNumber"
                    value={(phoneNumber ?? providerInfo?.phoneNumber) || ""}
                    onChange={handleOnChange}
                    disabled={
                      status === Status.Loading || status === Status.Updating
                    }
                    error={phoneNumberError}
                  />
                </div>
                <div className="col-12" />
                <div className="form-group col-sm-6 col-md-3 mt-3">
                  <SubmitButton
                    disabled={
                      disable ||
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
                <div className="form-group col-sm-6 col-md-3 mt-3">
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

export default EditProviderComponent;
