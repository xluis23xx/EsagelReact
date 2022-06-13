/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Link, useHistory } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { formatExtendNames, minNumber } from "../../utils/errors";

import { Goal, Status, useGoals } from "../../hooks/useGoals";
import CIcon from "@coreui/icons-react";

import { SearchButton, SubmitButton } from "../global-components/globalButtons";

import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import { cilHamburgerMenu, cilSearch } from "@coreui/icons";

import { InputForm } from "../global-components/inputForm";
import { User, useUsers } from "../../hooks/useUsers";

const NewGoalComponent = () => {
  const { registerGoal, status } = useGoals();
  const { getUsersByFilter, setSearchFilter, users } = useUsers();

  const [visibleEmployeeModal, setVisibleEmployeeModal] = React.useState(false);

  const [selectedSeller, setSelectedSeller] = React.useState<User | null>(null);

  const [showSellerError, setShowSellerError] = React.useState<boolean>(false);

  const history = useHistory();

  React.useEffect(() => {
    setSearchFilter({
      filter: "",
      status: 1,
    });
    getUsersByFilter({ filter: "", status: 1 }, { limit: 5, pageSize: 1 });
  }, []);

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
      seller: selectedSeller?._id || null,
      status: 1,
    };
    registerGoal(goal).then((response) => {
      if (response?.status === 200 || response?.status === 201) {
        history.push("/metas");
      }
    });
  };

  const validators = {
    required: false,
    validator: formatExtendNames(),
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

  const handleSearchSellers = (data) => {
    let filter = "";
    if (data?.search) {
      filter = data?.search;
    }
    getUsersByFilter({ filter: filter, status: 1 }, { limit: 5, pageSize: 1 });
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
                        showSellerError ? "border border-danger" : ""
                      }`}
                      placeholder="Seleccione..."
                      name="employee"
                      value={
                        `${
                          selectedSeller?.employee?.name
                            ? selectedSeller?.employee?.name
                            : ""
                        }${
                          selectedSeller?.employee?.lastname
                            ? ` ${selectedSeller?.employee?.lastname}`
                            : ""
                        }` || ""
                      }
                      onChange={(e) => {
                        if (e.target.value) {
                          setShowSellerError(true);
                        } else {
                          setShowSellerError(false);
                        }
                      }}
                      onBlur={(e) => {
                        if (e.target.value) {
                          setShowSellerError(true);
                        } else {
                          setShowSellerError(false);
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
                  {showSellerError ? (
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
                      disable || !selectedSeller || status === Status.Updating
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
                  handleSearch={handleSearchSellers}
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
                      {users?.length > 0
                        ? users.map((user: User, index) => {
                            const {
                              _id,
                              employee = null,
                              username,
                            } = user || {};
                            return (
                              <tr key={_id}>
                                <td>
                                  <input
                                    type="checkbox"
                                    className="form-check-input form-check-success p-2"
                                    onClick={() => {
                                      setSelectedSeller(user);
                                      setShowSellerError(false);
                                      setVisibleEmployeeModal(false);
                                    }}
                                    checked={selectedSeller?._id === _id}
                                  />
                                </td>
                                <td>
                                  {employee?.name || ""}{" "}
                                  {employee?.lastname || ""}{" "}
                                  {employee?.secondLastname || ""}
                                </td>
                                <td>{username || ""}</td>
                              </tr>
                            );
                          })
                        : null}
                    </tbody>
                  </table>
                </div>
              </CModalBody>
              <CModalFooter>
                <CButton
                  color="secondary"
                  className="text-white"
                  onClick={() => {
                    setSelectedSeller(null);
                    setShowSellerError(true);
                    setVisibleEmployeeModal(false);
                  }}
                >
                  Limpiar
                </CButton>
                <CButton
                  color="dark"
                  onClick={() => {
                    if (!selectedSeller) {
                      setShowSellerError(true);
                    }
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
