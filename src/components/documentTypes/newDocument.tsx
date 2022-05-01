import React from "react";
import { Link, useHistory } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { formatNames } from "../../utils/errors";
import { InputForm } from "../global-components/inputForm";

import {
  DocumentType,
  Status,
  useDocumentTypes,
} from "../../hooks/useDocuments";

const NewDocumentTypeComponent = () => {
  const { registerDocumentType, status } = useDocumentTypes();
  const history = useHistory();

  const stateSchema = {
    name: { value: "", error: "" },
    operation: { value: "", error: "" },
  };

  const stateValidatorSchema = {
    name: {
      required: true,
      validator: formatNames(),
      min2caracts: true,
      invalidtext: true,
    },
    operation: { required: true },
  };

  const onSubmitForm = (data: DocumentType) => {
    const documentType = {
      name: data?.name || null,
      operation: data?.operation || null,
      status: 1,
    };
    registerDocumentType(documentType).then((response) => {
      if (response?.status === 200 || response?.status === 201) {
        history.push("/tipos-documento");
      }
    });
  };

  const {
    values: { name, operation },
    errors: { name: nameError, operation: operationError },
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
                <i className="fa fa-align-justify"></i>NUEVO TIPO DE DOCUMENTO
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
                  <label htmlFor="name">Nombre (*):</label>
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
                  <label htmlFor="operation">Tipo de Operación (*):</label>
                  <select
                    id="operation"
                    name="operation"
                    required
                    disabled={status === Status.Updating}
                    value={operation}
                    onChange={handleOnChange}
                    onBlur={handleOnChange}
                    className={`btn border-secondary btn-default w-100 ${
                      operationError ? "border border-danger" : ""
                    }`}
                  >
                    <option value="">Seleccione</option>
                    <option value="persona">Persona</option>
                    <option value="comprobante">Vendedor</option>
                  </select>
                </div>
                <div className="form-group col-sm-6 mt-3">
                  <button
                    type="submit"
                    disabled={disable}
                    className="btn btn-block btn-primary w-100"
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
                  </button>
                </div>
                <div className="form-group col-sm-6 mt-3">
                  <Link
                    to="/tipos-documento"
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

export default NewDocumentTypeComponent;
