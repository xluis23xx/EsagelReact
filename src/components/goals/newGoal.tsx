/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Link, useHistory } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { formatNames, minNumber } from "../../utils/errors";

import { Goal, Status, useGoals } from "../../hooks/useGoals";
import CIcon from "@coreui/icons-react";

import { SearchButton, SubmitButton } from "../global-components/globalButtons";
import { Employee, useEmployees } from "../../hooks/useEmployees";

import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import { cilCheckCircle, cilHamburgerMenu, cilSearch } from "@coreui/icons";

import { InputForm } from "../global-components/inputForm";

const NewGoalComponent = () => {
  const { registerGoal, status } = useGoals();

  const {
    getAllEmployees,
    searchEmployeesByName,
    employees,
    employeeProfile,
    setEmployeeById,
    cleanEmployeeProfile,
  } = useEmployees();

  const [visibleEmployeeModal, setVisibleEmployeeModal] = React.useState(false);

  const [selectedEmployee, setSelectedEmployee] =
    React.useState<Employee>(null);

  const [showEmployeeError, setShowEmployeeError] =
    React.useState<boolean>(false);

  const history = useHistory();

  React.useEffect(() => {
    getAllEmployees();
  }, []);

  React.useEffect(() => {
    setSelectedEmployee(employeeProfile);
  }, [employeeProfile]);

  const stateSchema = {
    startDate: { value: "", error: "" },
    endDate: { value: "", error: "" },
    estimatedQuantity: { value: "", error: "" },
  };

  const stateValidatorSchema = {
    startDate: { required: true },
    endDate: { required: true },
    estimatedQuantity: { required: true, validator: minNumber(100) },
  };

  const onSubmitForm = (data: Goal) => {
    const goal = {
      startDate: data?.startDate || null,
      endDate: data?.endDate || null,
      estimatedQuantity: data?.estimatedQuantity
        ? Number(data?.estimatedQuantity)
        : 0,
      status: 1,
    };
    console.log(goal);
    registerGoal(goal).then((response) => {
      if (response?.status === 200 || response?.status === 201) {
        history.push("/metas");
      }
    });
  };

  const validators = {
    required: false,
    validator: formatNames(),
    invalidtext: true,
  };

  const {
    values: { startDate, endDate, estimatedQuantity },
    errors: {
      startDate: startDateError,
      endDate: endDateError,
      estimatedQuantity: estimatedQuantityError,
    },
    disable,
    handleOnChange,
    handleOnSubmit,
  } = useForm(stateSchema, stateValidatorSchema, onSubmitForm);

  const handleSearchEmployees = (data) => {
    searchEmployeesByName(data.search);
  };

  return (
    <div className="row my-3">
      <div className="col-lg-12">
        <div className="card">
          <div className="card-header">
            <div className="row">
              <div className="col-12 col-sm-6 col-md-10 my-auto">
                <CIcon icon={cilHamburgerMenu} />
                &nbsp;NUEVA META
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
                  <label className="form-label" htmlFor="employee">
                    Empleado (*):
                  </label>
                  <div className="d-flex">
                    <input
                      required
                      className={`w-100 ${
                        showEmployeeError ? "border border-danger" : ""
                      }`}
                      placeholder="Seleccione..."
                      name="employee"
                      value={
                        `${
                          selectedEmployee?.name ? selectedEmployee?.name : ""
                        }${
                          selectedEmployee?.lastname
                            ? ` ${selectedEmployee?.lastname}`
                            : ""
                        }` || ""
                      }
                      onChange={(e) => {
                        if (e.target.value) {
                          setShowEmployeeError(true);
                        } else {
                          setShowEmployeeError(false);
                        }
                      }}
                      onBlur={(e) => {
                        if (e.target.value) {
                          setShowEmployeeError(true);
                        } else {
                          setShowEmployeeError(false);
                        }
                      }}
                      disabled={true}
                    />
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => setVisibleEmployeeModal(true)}
                    >
                      <CIcon icon={cilSearch}></CIcon>
                    </button>
                  </div>
                  {showEmployeeError ? (
                    <p
                      className="w-100 pb-0 mb-0 text-danger"
                      style={{ fontSize: 15 }}
                    >
                      Este campo es requerido.
                    </p>
                  ) : null}
                </div>
                <div className="form-group mt-1 col-sm-6 col-xl-4">
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
                      estimatedQuantity ? estimatedQuantity?.toString() : "0"
                    }
                    onChange={handleOnChange}
                    disabled={status === Status.Updating}
                    error={estimatedQuantityError}
                  />
                </div>
                <div className="form-group mt-1 col-sm-6 col-xl-4">
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
                <div className="form-group mt-1 col-sm-6 col-xl-4">
                  <label className="form-label" htmlFor="startDate">
                    Fecha de Inicio (*):
                  </label>
                  <InputForm
                    type="date"
                    required
                    placeholder="Fecha de inicio"
                    name="startDate"
                    value={startDate}
                    onChange={handleOnChange}
                    disabled={status === Status.Updating}
                    error={startDateError}
                  />
                </div>
                <div className="form-group mt-1 col-sm-6 col-xl-4">
                  <label className="form-label" htmlFor="endDate">
                    Fecha de Fin (*):
                  </label>
                  <InputForm
                    type="date"
                    required
                    placeholder="Fecha de fin"
                    name="endDate"
                    value={endDate}
                    onChange={handleOnChange}
                    disabled={status === Status.Updating}
                    error={endDateError}
                  />
                </div>
                <div className="col-12" />
                <div className="form-group col-sm-6 col-xl-3 mt-3">
                  <SubmitButton
                    disabled={
                      disable || !selectedEmployee || status === Status.Updating
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
                      "Registrar"
                    )}
                  </SubmitButton>
                </div>
                <div className="form-group col-sm-6 col-xl-3 mt-3">
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
            <CModal
              visible={visibleEmployeeModal}
              onClose={() => {
                cleanEmployeeProfile();
                setVisibleEmployeeModal(false);
              }}
            >
              <CModalHeader closeButton={true}>
                <CModalTitle>Selecciona un Empleado</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <SearchButton
                  validators={validators}
                  textButton={"Buscar"}
                  handleSearch={handleSearchEmployees}
                  className="align-items-end my-1 col-12 flex-md-row d-sm-flex"
                />
                <div className="w-100 overflow-auto" style={{ height: 300 }}>
                  <table className="table">
                    <thead>
                      <tr>
                        <th style={{ width: 20 }}></th>
                        <th>Empleado</th>
                        <th>Cargo</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employees?.length > 0
                        ? employees.map((emp: Employee, index) => {
                            const {
                              _id,
                              name = "",
                              lastname = "",
                              secondLastname = "",
                              position = null,
                            } = emp;
                            if (index > 4) {
                              return null;
                            } else {
                              return (
                                <tr key={_id}>
                                  <td>
                                    <CButton
                                      type="button"
                                      color="success"
                                      onClick={() => {
                                        setEmployeeById(_id);
                                        setShowEmployeeError(false);
                                        setVisibleEmployeeModal(false);
                                      }}
                                    >
                                      <CIcon icon={cilCheckCircle}></CIcon>
                                    </CButton>
                                  </td>
                                  <td>
                                    {name} {lastname} {secondLastname}
                                  </td>
                                  <td>
                                    {position?.name ? position?.name : ""}
                                  </td>
                                </tr>
                              );
                            }
                          })
                        : null}
                    </tbody>
                  </table>
                </div>
              </CModalBody>
              <CModalFooter>
                <CButton
                  color="secondary"
                  onClick={() => {
                    cleanEmployeeProfile();
                    setShowEmployeeError(true);
                    setVisibleEmployeeModal(false);
                  }}
                >
                  Cerrar
                </CButton>
              </CModalFooter>
            </CModal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewGoalComponent;
