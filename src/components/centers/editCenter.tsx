/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import useForm from "../../hooks/useForm";
import {
  formatDescription,
  formatExtendNames,
  formatNames,
} from "../../utils/errors";
import { InputForm } from "../global-components/inputForm";

import { Center, Status, useCenters } from "../../hooks/useCenters";
import { TextAreaForm } from "../global-components/textareaForm";
import { SubmitButton } from "../global-components/globalButtons";
import CIcon from "@coreui/icons-react";
import { cilHamburgerMenu } from "@coreui/icons";

const EditCenterComponent = () => {
  const {
    updateCenter,
    centerInfo,
    setCenterById,
    status: statusUse,
  } = useCenters();
  const history = useHistory();

  const { id } = useParams<any>();

  React.useEffect(() => {
    if (!id) {
      history.replace("/centros");
    }
    setCenterById(id);
  }, []);

  const stateSchema = {
    branchName: { value: null, error: "" },
    address: { value: null, error: "" },
    status: { value: null, error: "" },
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
      branchName: (data?.branchName ?? centerInfo?.branchName) || null,
      address: (data?.address ?? centerInfo?.address) || null,
      status: (data?.status ?? centerInfo?.status) || 0,
    };
    updateCenter(id, center).then((response) => {
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
                &nbsp;EDITAR CENTRO
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
                    value={(branchName ?? centerInfo?.branchName) || ""}
                    onChange={handleOnChange}
                    disabled={
                      statusUse === Status.Loading ||
                      statusUse === Status.Updating
                    }
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
                    value={(address ?? centerInfo?.address) || ""}
                    onChange={handleOnChange}
                    disabled={
                      statusUse === Status.Loading ||
                      statusUse === Status.Updating
                    }
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
                    disabled={
                      statusUse === Status.Loading ||
                      statusUse === Status.Updating
                    }
                    value={(status ?? centerInfo?.status?.toString()) || ""}
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
                    disabled={
                      disable ||
                      statusUse === Status.Loading ||
                      statusUse === Status.Updating
                    }
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
                      "Actualizar"
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

export default EditCenterComponent;
