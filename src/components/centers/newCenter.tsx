import React from "react";
import { Link, useHistory } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { formatDescription, formatExtendNames } from "../../utils/errors";
import { InputForm } from "../global-components/inputForm";

import { Center, Status, useCenters } from "../../hooks/useCenters";
import { SubmitButton } from "../global-components/globalButtons";
import CIcon from "@coreui/icons-react";
import { cilHamburgerMenu } from "@coreui/icons";

const NewCenterComponent = () => {
  const { registerCenter, status: statusUse } = useCenters();
  const history = useHistory();

  const stateSchema = {
    branchName: { value: "", error: "" },
    address: { value: "", error: "" },
    status: { value: "", error: "" },
  };

  const stateValidatorSchema = {
    branchName: {
      required: true,
      validator: formatExtendNames(),
      min2caracts: true,
      invalidtext: true,
    },
    address: {
      required: true,
      validator: formatDescription(),
      min2caracts: true,
      invalidtext: true,
    },
    status: {
      required: true,
    },
  };

  const onSubmitForm = (data: Center) => {
    const center = {
      branchName: data?.branchName || null,
      address: data?.address || null,
      status: 1,
    };
    registerCenter(center).then((response) => {
      if (response?.status === 200 || response?.status === 201) {
        history.replace("/centros");
      }
    });
  };

  const {
    values: { branchName, address, status },
    errors: {
      branchName: branchNameError,
      address: addressError,
      status: statusError,
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
                &nbsp;NUEVO CENTRO
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
                  <label className="form-label" htmlFor="branchName">
                    Nombre del Local *
                  </label>
                  <InputForm
                    type="text"
                    required
                    placeholder="Nombre"
                    name="branchName"
                    value={branchName}
                    onChange={handleOnChange}
                    disabled={statusUse === Status.Updating}
                    error={branchNameError}
                  />
                </div>
                <div className="form-group mt-1 col-sm-6 col-xl-4">
                  <label className="form-label" htmlFor="address">
                    Dirección *
                  </label>
                  <InputForm
                    type="text"
                    required
                    placeholder="Dirección"
                    name="address"
                    value={address}
                    onChange={handleOnChange}
                    disabled={statusUse === Status.Updating}
                    error={addressError}
                  />
                </div>
                <div className="form-group mt-1 col-sm-6 col-xl-4">
                  <label className="form-label" htmlFor="status">
                    Estado *
                  </label>
                  <select
                    id="status"
                    name="status"
                    required
                    disabled={statusUse === Status.Updating}
                    value={status || ""}
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

                <div className="col-12" />
                <div className="form-group col-sm-6 col-xl-3 mt-3">
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
                <div className="form-group col-sm-6 col-xl-3 mt-3">
                  <Link
                    to="/centros"
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

export default NewCenterComponent;
