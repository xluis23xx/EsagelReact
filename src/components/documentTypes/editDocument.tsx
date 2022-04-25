/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import useForm from "src/hooks/useForm";
import { formatNames } from "src/utils/errors";
import { InputForm } from "../global-components/inputForm";

import { Status, useDocumentTypes } from "../../hooks/useDocuments";
import { setFormatDate } from "src/utils/formats";

const EditEmployeeComponent = () => {
  const { updateDocumentType, setDocumentTypeById, documentInfo, status } =
    useDocumentTypes();
  const history = useHistory();
  const { id } = useParams<any>();

  React.useEffect(() => {
    setDocumentTypeById(id);
  }, []);

  const stateSchema = {
    name: { value: null, error: "" },
    operation: { value: null, error: "" },
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

  const onSubmitForm = (data: any) => {
    const documentType = {
      name: (data?.name ?? documentInfo?.name) || null,
      operation: (data?.operation ?? documentInfo?.operation) || null,
      status: 1,
    };
    updateDocumentType(id, documentType).then((response) => {
      if (response?.status === 200 || response?.status === 201) {
        history.push("/tipo-documentos");
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
                <i className="fa fa-align-justify"></i>EDITAR TIPO DE DOCUMENTO
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
                <div className="form-group col-sm-6">
                  <label htmlFor="name">Nombre (*):</label>
                  <InputForm
                    type="text"
                    required
                    placeholder="Nombre"
                    name="name"
                    value={(name ?? documentInfo?.name) || ""}
                    onChange={handleOnChange}
                    disabled={
                      status === Status.Loading || status === Status.Updating
                    }
                    error={nameError}
                  />
                </div>
                <div className="form-group col-sm-6">
                  <label htmlFor="operation">Tipo de Operación (*):</label>
                  <select
                    id="operation"
                    name="operation"
                    required
                    disabled={
                      status === Status.Loading || status === Status.Updating
                    }
                    value={(operation ?? documentInfo?.operation) || ""}
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
                <div className="form-group col-sm-6">
                  <label htmlFor="createdAt">Fecha de creación:</label>
                  <InputForm
                    type="date"
                    placeholder="Fecha de creación"
                    name="createdAt"
                    value={
                      setFormatDate({
                        date: documentInfo?.createdAt,
                        order: 1,
                      }) || ""
                    }
                    onChange={handleOnChange}
                    disabled={true}
                    showError={false}
                  />
                </div>
                <div className="form-group col-sm-6">
                  <label htmlFor="createdAt">Fecha de actualización:</label>
                  <InputForm
                    type="date"
                    placeholder="Fecha de actualización"
                    name="updatedAt"
                    value={
                      setFormatDate({
                        date: documentInfo?.updatedAt,
                        order: 1,
                      }) || ""
                    }
                    onChange={handleOnChange}
                    disabled={true}
                    showError={false}
                  />
                </div>
                <div className="form-group col-sm-6 mt-3 mb-xl-0">
                  <button
                    type="submit"
                    disabled={disable}
                    className="btn btn-block btn-primary w-100"
                  >
                    {status === Status.Updating ? "Cargando" : "Registrar"}
                  </button>
                </div>
                <div className="form-group col-sm-6 mt-3 mb-xl-0">
                  <Link
                    to="/tipo-documentos"
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

export default EditEmployeeComponent;
