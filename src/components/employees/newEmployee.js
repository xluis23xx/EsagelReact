import React from "react";
import { Link } from "react-router-dom";

const EmployeesComponent = () => {
  return (
    <div className="row mt-3">
      <div className="col-lg-12">
        <div className="card">
          <div className="card-header">
            <i className="fa fa-align-justify"></i>NUEVO EMPLEADO
          </div>
          <div className="card-body">
            <div className="col-sm-12">
              <div className="form-group">
                <b>
                  <label>Los campos con (*) son obligatorios</label>
                </b>
                <br />
              </div>

              <div className="row">
                <div className="form-group col-sm-6 col-md-4">
                  <label htmlFor="nombres">Nombres (*):</label>
                  <input
                    type="text"
                    className="form-control"
                    id="employee-name"
                    placeholder="Nombres"
                  />
                </div>

                <div className="form-group col-sm-6 col-md-4">
                  <label htmlFor="apePaterno">Apellido Paterno (*):</label>
                  <input
                    type="text"
                    className="form-control"
                    id="employee-first-lasta-name"
                    placeholder="Apellido Paterno"
                  />
                </div>

                <div className="form-group col-sm-6 col-md-4">
                  <label htmlFor="apeMaterno">Apellido Materno (*):</label>
                  <input
                    type="text"
                    className="form-control"
                    id="employee-second-lasta-name"
                    placeholder="Apellido Materno"
                  />
                </div>

                <div className="form-group col-sm-6 col-md-4">
                  <label htmlFor="tipo de documento">
                    Tipo de Documento (*):
                  </label>
                  <select className="form-control" id="employee-type-document">
                    <option>Selecciona tipo de documento</option>
                    <option>DNI</option>
                    <option>CARNET DE EXTRANJERIA</option>
                  </select>
                </div>

                <div className="form-group col-sm-6 col-md-4">
                  <label htmlFor="número-documento">
                    Número de Documento (*):
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="employee-number-document"
                    placeholder="Número de Documento"
                  />
                </div>

                <div className="form-group col-sm-6 col-md-4">
                  <label htmlFor="correo-coorporativo">
                    Correo Coorporativo (*):
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="employee-email-company"
                    placeholder="Correo Coorporativo"
                  />
                </div>
                <div className="form-group col-sm-6 col-md-4">
                  <label htmlFor="dirección">Dirección (*):</label>
                  <input
                    type="text"
                    className="form-control"
                    id="employee-adress"
                    placeholder="Dirección"
                  />
                </div>

                <div className="form-group col-sm-6 col-md-4">
                  <label htmlFor="teléfono">Teléfono (*):</label>
                  <input
                    type="text"
                    className="form-control"
                    id="employee-phone"
                    placeholder="Teléfono"
                  />
                </div>

                <div className="form-group col-sm-6 col-md-4">
                  <label htmlFor="email">Correo personal (*):</label>
                  <input
                    type="text"
                    className="form-control"
                    id="employee-email"
                    placeholder="Email"
                  />
                </div>

                <div className="form-group col-sm-6 col-md-4">
                  <label htmlFor="fecha de nacimiento">
                    Fecha de Nacimiento:
                  </label>
                  <input
                    className="form-control"
                    id="employee-birthday"
                    type="date"
                    name="employee-birthday"
                    placeholder="date"
                  />
                </div>

                <div className="form-group col-sm-6 col-md-4">
                  <label htmlFor="foto">Foto:</label>
                  <input
                    type="file"
                    id="employee-photo"
                    name="employee-photo"
                    className="form-control"
                  />
                </div>

                <div className="form-group col-sm-6 col-md-4">
                  <label htmlFor="rol">Cargo (*):</label>
                  <select className="form-control" id="employee-role">
                    <option>Jefe de Medios Digitales</option>
                    <option>Asistente de Medios Digitales</option>
                    <option>Asesor Comercial</option>
                    <option>Coordinador de Operaciones</option>
                  </select>
                </div>
              </div>
              <br />
            </div>

            <div className="row col-sm-4">
              <div className="col-6 col-sm-4 col-md-2 col-xl mb-3 mb-xl-0">
                <button type="button" className="btn btn-block btn-primary">
                  Registrar
                </button>
              </div>
              <div className="col-6 col-sm-4 col-md-2 col-xl mb-3 mb-xl-0">
                <Link to="/empleados" className="btn btn-block btn-secondary">
                  Cancelar
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeesComponent;
