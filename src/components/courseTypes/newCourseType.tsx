import React from "react";
import { Link, useHistory } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { formatDescription, formatNames } from "../../utils/errors";
import { InputForm } from "../global-components/inputForm";

import { CourseType, Status, useCourseTypes } from "../../hooks/useCourseTypes";
import { TextAreaForm } from "../global-components/textareaForm";
import { SubmitButton } from "../global-components/globalButtons";

const NewCourseTypeComponent = () => {
  const { registerCourseType, status: statusUse } = useCourseTypes();
  const history = useHistory();

  const stateSchema = {
    code: { value: "", error: "" },
    name: { value: "", error: "" },
    description: { value: "", error: "" },
  };

  const stateValidatorSchema = {
    code: {
      required: true,
      validator: formatNames(),
      min2caracts: true,
      invalidtext: true,
    },
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
    status: {
      required: true,
    },
  };

  const onSubmitForm = (data: CourseType) => {
    const courseType = {
      code: data?.code || null,
      name: data?.name || null,
      description: data?.description || null,
      status: 1,
    };
    registerCourseType(courseType).then((response) => {
      if (response?.status === 200 || response?.status === 201) {
        history.push("/tipos-curso");
      }
    });
  };

  const {
    values: { code, name, description, status },
    errors: {
      code: codeError,
      name: nameError,
      description: descriptionError,
      status: statusError,
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
                <i className="fa fa-align-justify"></i>NUEVO TIPO DE CURSO
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
                  <label htmlFor="code">Código (*):</label>
                  <InputForm
                    type="text"
                    required
                    placeholder="Código"
                    name="code"
                    value={code}
                    onChange={handleOnChange}
                    disabled={statusUse === Status.Updating}
                    error={codeError}
                  />
                </div>
                <div className="form-group mt-1 col-sm-6 col-md-4">
                  <label htmlFor="name">Nombre (*):</label>
                  <InputForm
                    type="text"
                    required
                    placeholder="Nombre"
                    name="name"
                    value={name}
                    onChange={handleOnChange}
                    disabled={statusUse === Status.Updating}
                    error={nameError}
                  />
                </div>
                <div className="form-group mt-1 col-sm-6 col-md-4">
                  <label htmlFor="status">Estado (*):</label>
                  <select
                    id="status"
                    name="status"
                    required
                    disabled={statusUse === Status.Updating}
                    value={status}
                    onChange={handleOnChange}
                    onBlur={handleOnChange}
                    className={`btn border-secondary btn-default w-100 ${
                      statusError ? "border border-danger" : ""
                    }`}
                  >
                    <option value="">Seleccione</option>
                    <option value="0">Inactivo</option>
                    <option value="1">Activo</option>
                  </select>
                </div>
                <div className="form-group mt-1 col-12">
                  <label htmlFor="description">Descripción (*):</label>
                  <TextAreaForm
                    required
                    placeholder="Descripción"
                    name="description"
                    rows={3}
                    maxLength={100}
                    value={description}
                    onChange={handleOnChange}
                    disabled={statusUse === Status.Updating}
                    error={descriptionError}
                  />
                </div>

                <div className="col-12" />
                <div className="form-group col-sm-6 col-md-3 mt-3">
                  <SubmitButton
                    disabled={disable || statusUse === Status.Updating}
                  >
                    {statusUse === Status.Updating ? (
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
                <div className="form-group col-sm-6 col-md-3 mt-3">
                  <Link
                    to="/tipos-curso"
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

export default NewCourseTypeComponent;
