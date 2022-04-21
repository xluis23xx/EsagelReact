import { cilHamburgerMenu } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import * as React from "react";
import { Link } from "react-router-dom";
import { EmployeeItem } from "./_children/employee";
import { Employee, Status, useEmployees } from "../../hooks/useEmployees";

const EmployeesComponent = () => {
  const { employees, status } = useEmployees();

  return (
    <>
      <div className="row mb-3">
        <div className="col-6">
          <Link
            className="btn btn-block btn-success w-auto h-auto"
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
              <nav className="navbar navbar-expand-lg navbar-light bg-light px-3 my-2">
                <ul className="navbar-nav mr-auto">
                  <div className="d-flex">
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
                </ul>

                <form className="d-flex ms-md-auto">
                  <input
                    className="form-control  my-2 my-sm-0"
                    type="search"
                    placeholder="Buscar"
                    aria-label="Search"
                  />
                  <button
                    className="btn btn-outline-success my-2 my-sm-0"
                    type="submit"
                  >
                    Buscar
                  </button>
                </form>
              </nav>
              <br />

              <div className="w-100 overflow-auto" style={{ height: 300 }}>
                {status === Status.Loading ? (
                  <h1>Espere un momento...</h1>
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
                        <th>Correo Coorporativo</th>
                        <th>Correo personal</th>
                        <th>Teléfono</th>
                        <th>Fecha de Nacimiento</th>
                        <th>Estado</th>
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
                          status,
                        } = employee;
                        return (
                          <EmployeeItem
                            key={index}
                            code={_id}
                            fullName={`${name} ${lastname} ${secondLastname}`}
                            birthdate={birthdate}
                            corporateEmail={corporateEmail}
                            documentNumber={documentNumber}
                            documentType={documentType}
                            personalEmail={personalEmail}
                            phoneNumber={phoneNumber}
                            status={status}
                            orderNumber={index + 1}
                          />
                        );
                      })}
                    </tbody>
                  </table>
                ) : (
                  <h1>No Hay empleados</h1>
                )}
              </div>

              {/* <ul className="pagination">
     <li className="page-item"><a className="page-link" href="#">Anterior</a></li>
     <li className="page-item active">
       <a className="page-link" href="#">1</a>
     </li>
     <li className="page-item"><a className="page-link" href="#">2</a></li>
     <li className="page-item"><a className="page-link" href="#">3</a></li>
     <li className="page-item"><a className="page-link" href="#">4</a></li>
     <li className="page-item"><a className="page-link" href="#">Siguiente</a></li>
   </ul> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeesComponent;
