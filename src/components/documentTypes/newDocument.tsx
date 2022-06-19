import React from "react";
import { Link, useHistory } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { formatExtendNames, formatNames, minNumber } from "../../utils/errors";
import { InputForm } from "../global-components/inputForm";

import {
  DocumentType,
  Status,
  useDocumentTypes,
} from "../../hooks/useDocuments";
import { SubmitButton } from "../global-components/globalButtons";
import CIcon from "@coreui/icons-react";
import { cilHamburgerMenu } from "@coreui/icons";

const NewDocumentTypeComponent = () => {
  const { registerDocumentType, status } = useDocumentTypes();
  const history = useHistory();

  const stateSchema = {
    name: { value: "", error: "" },
    operation: { value: "", error: "" },
    code: { value: "", error: "" },
    length: { value: "", error: "" },
  };

  const stateValidatorSchema = {
    name: {
      required: true,
      validator: formatNames(),
      min2caracts: true,
      invalidtext: true,
    },
    operation: { required: true },
    code: { required: true, validator: formatExtendNames(), min2caracts: true },
    length: { required: true, validator: minNumber(1) },
  };

  const onSubmitForm = (data: DocumentType) => {
    const documentType = {
      name: data?.name || null,
      operation: data?.operation || null,
      code: data?.operation === "comprobante" ? data?.code : data?.name,
      length: data?.operation === "comprobante" ? data?.length : null,
      status: 1,
    };
    registerDocumentType(documentType).then((response) => {
      if (response?.status === 200 || response?.status === 201) {
        history.replace("/tipos-documento");
      }
    });
  };

  const {
    values: { name, operation, code, length },
    errors: {
      name: nameError,
      operation: operationError,
      code: codeError,
      length: lengthError,
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
                &nbsp;NUEVO TIPO DE DOCUMENTO
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
                <div className="form-group mt-1 col-sm-6">
                  <label className="form-label" htmlFor="name">
                    Nombre *
                  </label>
                  <InputForm
                    type="text"
                    required
                    placeholder="Nombre"
                    name="name"
                    value={name}
                    onChange={handleOnChange}
                    disabled={status === Status.Updating}
                    error={nameError}
                  />
                </div>
                <div className="form-group mt-1 col-sm-6">
                  <label className="form-label" htmlFor="operation">
                    Tipo de Operación *
                  </label>
                  <select
                    id="operation"
                    name="operation"
                    required
                    disabled={status === Status.Updating}
                    value={operation || ""}
                    onChange={handleOnChange}
                    onBlur={handleOnChange}
                    className={`btn border-secondary btn-default w-100 ${
                      operationError ? "border border-danger" : ""
                    }`}
                  >
                    <option value="">Seleccione</option>
                    <option value="persona">Persona</option>
                    <option value="comprobante">Comprobante</option>
                  </select>
                </div>
                {operation === "comprobante" ? (
                  <div className="form-group mt-1 col-sm-6">
                    <label className="form-label" htmlFor="code">
                      Código *
                    </label>
                    <InputForm
                      type="text"
                      required
                      placeholder="Código"
                      name="code"
                      value={code}
                      onChange={handleOnChange}
                      disabled={status === Status.Updating}
                      error={codeError}
                    />
                  </div>
                ) : null}
                {operation === "comprobante" ? (
                  <div className="form-group mt-1 col-sm-6">
                    <label className="form-label" htmlFor="name">
                      Longitud *
                    </label>
                    <InputForm
                      type="number"
                      required
                      placeholder="Longitud"
                      name="length"
                      value={length}
                      max={11}
                      onChange={handleOnChange}
                      disabled={status === Status.Updating}
                      error={lengthError}
                    />
                  </div>
                ) : null}
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
                    to="/tipos-documento"
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

export default NewDocumentTypeComponent;
