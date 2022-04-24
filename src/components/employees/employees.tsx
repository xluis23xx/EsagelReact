/* eslint-disable react-hooks/exhaustive-deps */
import { cilHamburgerMenu } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import * as React from "react";
import { Link } from "react-router-dom";
import { EmployeeItem } from "./_children/employee";
import { Employee, Status, useEmployees } from "../../hooks/useEmployees";
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import { formatNames } from "../../utils/errors";
import useForm from "src/hooks/useForm";
import { InputForm } from "../global-components/inputForm";

const EmployeesComponent = () => {
  const {
    employees,
    deleteEmployee,
    getAllEmployees,
    searchEmployeeSByName,
    status,
  } = useEmployees();
  const [visible, setVisible] = React.useState(false);
  const [employeeId, setEmployeeId] = React.useState("");

  React.useEffect(() => {
    getAllEmployees();
  }, []);

  const stateSchema = {
    search: { value: "", error: "" },
  };

  const stateValidatorSchema = {
    search: {
      required: false,
      validator: formatNames(),
      invalidtext: true,
    },
  };

  const removeEmployee = (id: string) => {
    setVisible(!visible);
    if (!visible) {
      setEmployeeId(id);
    } else if (visible && employeeId) {
      deleteEmployee(id);
      setEmployeeId("");
    }
  };

  const handleSearch = (data) => {
    searchEmployeeSByName(data.search);
  };

  const {
    values: { search },
    errors: { search: searchError },
    handleOnChange,
    handleOnSubmit,
    disable,
  } = useForm(stateSchema, stateValidatorSchema, handleSearch);

  return (
    <>
      <div className="row mb-3">
        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
          <Link
            className="btn btn-block btn-success w-100 h-auto text-white"
            to="/empleados/nuevo"
          >
            Nuevo
          </Link>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <CIcon icon={cilHamburgerMenu} />
              &nbsp;EMPLEADOS
            </div>
            <div className="card-body">
              <nav className="navbar navbar-expand-lg navbar-light bg-light px-3 my-2 row">
                <div className="mx-auto mx-ms-0 me-ms-auto col-12 col-md-6 text-center text-md-start">
                  <button
                    type="button"
                    className="btn btn-default btn-secondary"
                  >
                    COPIA
                  </button>

                  <button
                    type="button"
                    className="btn btn-default btn-secondary"
                  >
                    EXCEL
                  </button>

                  <button
                    type="button"
                    className="btn btn-default btn-secondary"
                  >
                    CSV
                  </button>

                  <button
                    type="button"
                    className="btn btn-default btn-secondary"
                  >
                    PDF
                  </button>
                </div>

                <form
                  className="align-items-end my-1 col-12 col-md-6 flex-md-row d-sm-flex"
                  onSubmit={handleOnSubmit}
                >
                  <div className="col-12 col-sm-8">
                    <InputForm
                      type="search"
                      name="search"
                      className="form-control"
                      placeholder="Buscar"
                      aria-label="Search"
                      value={search}
                      error={searchError}
                      showError={false}
                      onChange={handleOnChange}
                    />
                  </div>

                  <button
                    className="btn btn-success text-white col-12 col-sm-4 my-1 my-sm-0"
                    type="submit"
                    disabled={disable}
                  >
                    Buscar
                  </button>
                </form>
              </nav>
              <br />
              <div className="w-100 overflow-auto" style={{ height: 300 }}>
                {status === Status.Loading ? (
                  <h4 className="text-center">Espere un momento...</h4>
                ) : null}
                {(status === Status.Ready || status === Status.Updating) &&
                employees.length > 0 ? (
                  <table className="table">
                    <thead>
                      <tr>
                        <th>N°</th>
                        <th>Nombre Completo</th>
                        <th>Tipo de Documento</th>
                        <th>N° Documento</th>
                        <th>Correo Corporativo</th>
                        <th>Teléfono</th>
                        <th>Fecha de Nacimiento</th>
                        <th>Imagen</th>
                        {/* <th>Estado</th> */}
                        <th>Opciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employees.map((employee: Employee, index: number) => {
                        const {
                          _id,
                          name,
                          lastname,
                          secondLastname,
                          birthdate,
                          corporateEmail,
                          documentNumber,
                          documentType,
                          personalEmail,
                          phoneNumber,
                          image,
                          status,
                        } = employee;
                        return (
                          <EmployeeItem
                            key={index}
                            code={_id}
                            fullName={`${name ? name : ""} ${
                              lastname ? lastname : ""
                            } ${secondLastname ? secondLastname : ""}`}
                            birthdate={birthdate}
                            corporateEmail={corporateEmail}
                            documentNumber={documentNumber}
                            documentType={documentType}
                            personalEmail={personalEmail}
                            phoneNumber={phoneNumber}
                            status={status}
                            orderNumber={index + 1}
                            image={image}
                            handleRemove={removeEmployee}
                          />
                        );
                      })}
                    </tbody>
                  </table>
                ) : null}
              </div>
              <CModal
                visible={visible}
                onClose={() => {
                  setEmployeeId("");
                  setVisible(false);
                }}
              >
                <CModalHeader closeButton={true}>
                  <CModalTitle>Eliminar Empleado</CModalTitle>
                </CModalHeader>
                <CModalBody>
                  ¿Estás seguro que quieres eliminar este empleado?
                </CModalBody>
                <CModalFooter>
                  <CButton
                    color="secondary"
                    onClick={() => {
                      setEmployeeId("");
                      setVisible(false);
                    }}
                  >
                    Cerrar
                  </CButton>
                  <CButton
                    color="danger"
                    onClick={() => removeEmployee(employeeId)}
                  >
                    Eliminar
                  </CButton>
                </CModalFooter>
              </CModal>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeesComponent;
