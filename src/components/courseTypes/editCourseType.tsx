/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { formatDescription, formatNames } from "../../utils/errors";
import { InputForm } from "../global-components/inputForm";

import { CourseType, Status, useCourseTypes } from "../../hooks/useCourseTypes";
import { TextAreaForm } from "../global-components/textareaForm";

const NewCourseTypeComponent = () => {
  const {
    updateCourseType,
    courseTypeInfo,
    setCourseTypeById,
    status: statusUse,
  } = useCourseTypes();
  const history = useHistory();

  const { id } = useParams<any>();

  React.useEffect(() => {
    setCourseTypeById(id);
  }, []);

  const stateSchema = {
    // code: { value: null, error: "" },
    name: { value: null, error: "" },
    description: { value: null, error: "" },
    status: { value: null, error: "" },
  };

  const stateValidatorSchema = {
    // code: {
    //   required: true,
    //   validator: formatNames(),
    //   min2caracts: true,
    //   invalidtext: true,
    // },
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
      // code: data?.code || null,
      name: (data?.name ?? courseTypeInfo?.name) || null,
      description: (data?.description ?? courseTypeInfo?.description) || null,
      status: (data?.status ?? courseTypeInfo?.status) || 1,
    };
    updateCourseType(id, courseType).then((response) => {
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
                <i className="fa fa-align-justify"></i>EDITAR TIPO DE CURSO
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
                  <label htmlFor="code">Código (*):</label>
                  <InputForm
                    type="text"
                    required
                    placeholder="Código"
                    name="code"
                    value={(code ?? courseTypeInfo?.code) || ""}
                    onChange={handleOnChange}
                    disabled={true}
                    error={codeError}
                  />
                </div>
                <div className="form-group col-sm-6 col-md-4">
                  <label htmlFor="name">Nombre (*):</label>
                  <InputForm
                    type="text"
                    required
                    placeholder="Nombre"
                    name="name"
                    value={(name ?? courseTypeInfo?.name) || ""}
                    onChange={handleOnChange}
                    disabled={statusUse === Status.Updating}
                    error={nameError}
                  />
                </div>
                <div className="form-group col-sm-6 col-md-4">
                  <label htmlFor="status">Estado (*):</label>
                  <select
                    id="status"
                    name="status"
                    required
                    disabled={statusUse === Status.Updating}
                    value={(status ?? courseTypeInfo?.status?.toString()) || ""}
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
                <div className="form-group col-12">
                  <label htmlFor="description">Descripción (*):</label>
                  <TextAreaForm
                    required
                    placeholder="Descripción"
                    name="description"
                    maxLength={100}
                    rows={3}
                    value={(description ?? courseTypeInfo?.description) || ""}
                    onChange={handleOnChange}
                    disabled={statusUse === Status.Updating}
                    error={descriptionError}
                  />
                </div>
                <div className="form-group col-sm-6 col-md-4 mt-3">
                  <button
                    type="submit"
                    disabled={disable}
                    className="btn btn-block btn-primary w-100"
                  >
                    {statusUse === Status.Updating ? "Cargando" : "Actualizar"}
                  </button>
                </div>
                <div className="form-group col-sm-6 col-md-4 mt-3">
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