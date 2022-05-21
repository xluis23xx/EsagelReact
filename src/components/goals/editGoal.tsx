/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { minNumber } from "../../utils/errors";

import { Goal, Status, useGoals } from "../../hooks/useGoals";

import { SubmitButton } from "../global-components/globalButtons";

import { InputForm } from "../global-components/inputForm";
import { setFormatDate } from "../../utils/formats";
import CIcon from "@coreui/icons-react";
import { cilHamburgerMenu } from "@coreui/icons";

const EditGoalComponent = () => {
  const { updateGoal, status, goalInfo, setGoalById } = useGoals();

  const { id } = useParams<any>();

  const history = useHistory();

  React.useEffect(() => {
    if (!id) {
      history.push("metas");
    }
    setGoalById(id);
  }, []);

  const stateSchema = {
    estimatedQuantity: { value: null, error: "" },
  };

  const stateValidatorSchema = {
    estimatedQuantity: { required: true, validator: minNumber(100) },
  };

  const onSubmitForm = (data: Goal) => {
    const goal = {
      estimatedQuantity:
        (data?.estimatedQuantity ?? goalInfo?.estimatedQuantity) || 0,
      status: 1,
    };
    console.log(goal);
    updateGoal(id, goal).then((response) => {
      if (response?.status === 200 || response?.status === 201) {
        history.push("/metas");
      }
    });
  };

  const {
    values: { estimatedQuantity },
    errors: { estimatedQuantity: estimatedQuantityError },
    disable,
    handleOnChange,
    handleOnSubmit,
  } = useForm(stateSchema, stateValidatorSchema, onSubmitForm);

  return (
    <div className="row my-3">
      <div className="col-lg-12">
        <div className="card">
          <div className="card-header">
            <div className="row">
              <div className="col-12 col-sm-6 col-md-10 my-auto">
                <CIcon icon={cilHamburgerMenu} />
                &nbsp;EDITAR META
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
                  <label className="form-label" htmlFor="employee">
                    Empleado (*):
                  </label>
                  <InputForm
                    required
                    placeholder="Seleccione..."
                    name="employee"
                    value={
                      `${
                        goalInfo?.employee?.name ? goalInfo?.employee?.name : ""
                      }${
                        goalInfo?.employee?.lastname
                          ? ` ${goalInfo?.employee?.lastname}`
                          : ""
                      }` || ""
                    }
                    disabled={true}
                  />
                </div>
                <div className="form-group mt-1 col-sm-6 col-md-4">
                  <label className="form-label" htmlFor="estimatedQuantity">
                    Cantidad Estimada (*):
                  </label>
                  <InputForm
                    type="number"
                    required
                    maxLength={6}
                    step={"0.01"}
                    placeholder="Cantidad Estimada"
                    name="estimatedQuantity"
                    value={
                      (estimatedQuantity ??
                        (goalInfo?.estimatedQuantity
                          ? goalInfo?.estimatedQuantity.toFixed(2)
                          : "")) ||
                      "0"
                    }
                    onChange={handleOnChange}
                    disabled={
                      status === Status.Loading || status === Status.Updating
                    }
                    error={estimatedQuantityError}
                  />
                </div>
                <div className="form-group mt-1 col-sm-6 col-md-4">
                  <label className="form-label" htmlFor="quantitySold">
                    Cantidad Vendida:
                  </label>
                  <InputForm
                    type="number"
                    placeholder="Cantidad Vendida"
                    name="quantitySold"
                    value={(4000).toFixed(2)}
                    onChange={handleOnChange}
                    disabled={true}
                    showError={false}
                  />
                </div>
                <div className="form-group mt-1 col-sm-6 col-md-4">
                  <label className="form-label" htmlFor="startDate">
                    Fecha de Inicio (*):
                  </label>
                  <InputForm
                    type="date"
                    required
                    placeholder="Fecha de inicio"
                    name="startDate"
                    value={
                      setFormatDate({
                        date: goalInfo?.startDate,
                        order: 1,
                      }) || ""
                    }
                    onChange={handleOnChange}
                    disabled={true}
                    showError={false}
                  />
                </div>
                <div className="form-group mt-1 col-sm-6 col-md-4">
                  <label className="form-label" htmlFor="endDate">
                    Fecha de Fin (*):
                  </label>
                  <InputForm
                    type="date"
                    required
                    placeholder="Fecha de fin"
                    name="endDate"
                    value={
                      setFormatDate({
                        date: goalInfo?.endDate,
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
                    to="/metas"
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

export default EditGoalComponent;
