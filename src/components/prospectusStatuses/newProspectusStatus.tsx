import React from "react";
import { Link, useHistory } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { formatDescription, formatNames } from "../../utils/errors";
import { InputForm } from "../global-components/inputForm";

import {
  ProspectusStatus,
  Status,
  useProspectStatuses,
} from "../../hooks/usePropectusStatus";
import { TextAreaForm } from "../global-components/textareaForm";

const NewProspectStatusComponent = () => {
  const { registerProspectStatus, status } = useProspectStatuses();
  const history = useHistory();

  const stateSchema = {
    name: { value: "", error: "" },
    description: { value: "", error: "" },
  };

  const stateValidatorSchema = {
    name: {
      required: true,
      validator: formatNames(),
      min2caracts: true,
      invalidtext: true,
    },
    description: {
      required: true,
      validator: formatDescription(),
      min2caracts: true,
      invalidtext: true,
    },
  };

  const onSubmitForm = (data: ProspectusStatus) => {
    const prospectStatus = {
      name: data?.name || null,
      description: data?.description || null,
      status: 1,
    };
    registerProspectStatus(prospectStatus).then((response) => {
      if (response?.status === 200 || response?.status === 201) {
        history.push("/estados-prospecto");
      }
    });
  };

  const {
    values: { name, description },
    errors: { name: nameError, description: descriptionError },
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
                <i className="fa fa-align-justify"></i>NUEVO ESTADO DE PROSPECTO
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
                  <label htmlFor="description">Descripción (*):</label>
                  <TextAreaForm
                    required
                    placeholder="Descripción"
                    name="description"
                    value={description}
                    rows={2}
                    onChange={handleOnChange}
                    disabled={status === Status.Updating}
                    error={descriptionError}
                  />
                </div>
                <div className="col-12" />
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
                    to="/estados-prospecto"
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

export default NewProspectStatusComponent;
