/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { formatDescription, formatNames } from "../../utils/errors";
import { InputForm } from "../global-components/inputForm";

import {
  ProspectusOrigin,
  Status,
  useProspectOrigins,
} from "../../hooks/useProspectusOrigin";
import { setFormatDate } from "../../utils/formats";
import { TextAreaForm } from "../global-components/textareaForm";
import { SubmitButton } from "../global-components/globalButtons";

const EditProspectOriginComponent = () => {
  const { updateProspectOrigin, setProspectOriginById, prospectInfo, status } =
    useProspectOrigins();
  const history = useHistory();
  const { id } = useParams<any>();

  React.useEffect(() => {
    setProspectOriginById(id);
  }, []);

  const stateSchema = {
    name: { value: null, error: "" },
    description: { value: null, error: "" },
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

  const onSubmitForm = (data: ProspectusOrigin) => {
    const prospectOrigin = {
      name: (data?.name ?? prospectInfo?.name) || null,
      description: (data?.description ?? prospectInfo?.description) || null,
      status: 1,
    };
    updateProspectOrigin(id, prospectOrigin).then((response) => {
      if (response?.status === 200 || response?.status === 201) {
        history.push("/origenes-prospecto");
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
                <i className="fa fa-align-justify"></i>EDITAR ORIGEN DE
                PROSPECTO
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
                  <label htmlFor="code">Código (*):</label>
                  <InputForm
                    required
                    placeholder="Código"
                    name="code"
                    value={prospectInfo?.code || ""}
                    onChange={handleOnChange}
                    disabled={true}
                  />
                </div>
                <div className="form-group mt-1 col-sm-6">
                  <label htmlFor="name">Nombre (*):</label>
                  <InputForm
                    type="text"
                    required
                    placeholder="Nombre"
                    name="name"
                    value={(name ?? prospectInfo?.name) || ""}
                    onChange={handleOnChange}
                    disabled={
                      status === Status.Loading || status === Status.Updating
                    }
                    error={nameError}
                  />
                </div>

                <div className="form-group mt-1 col-sm-6">
                  <label htmlFor="description">Descripción (*):</label>
                  <TextAreaForm
                    required
                    placeholder="Descripción"
                    name="description"
                    value={(description ?? prospectInfo?.description) || ""}
                    rows={2}
                    onChange={handleOnChange}
                    disabled={
                      status === Status.Loading || status === Status.Updating
                    }
                    error={descriptionError}
                  />
                </div>
                <div className="col-12" />
                <div className="form-group mt-1 col-sm-6">
                  <label htmlFor="createdAt">Fecha de creación:</label>
                  <InputForm
                    type="date"
                    placeholder="Fecha de creación"
                    name="createdAt"
                    value={
                      setFormatDate({
                        date: prospectInfo?.createdAt,
                        order: 1,
                      }) || ""
                    }
                    onChange={handleOnChange}
                    disabled={true}
                    showError={false}
                  />
                </div>
                <div className="form-group mt-1 col-sm-6">
                  <label htmlFor="createdAt">Fecha de actualización:</label>
                  <InputForm
                    type="date"
                    placeholder="Fecha de actualización"
                    name="updatedAt"
                    value={
                      setFormatDate({
                        date: prospectInfo?.updatedAt,
                        order: 1,
                      }) || ""
                    }
                    onChange={handleOnChange}
                    disabled={true}
                    showError={false}
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
                    to="/origenes-prospecto"
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

export default EditProspectOriginComponent;
