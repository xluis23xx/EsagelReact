/* eslint-disable react-hooks/exhaustive-deps */
import { cilHamburgerMenu } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import * as React from "react";
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
import { ExportButtons } from "../global-components/exportButtons";
import {
  RedirectionButton,
  SearchButton,
} from "../global-components/globalButtons";
import { savePathname } from "../../utils/location";

const EmployeesComponent = () => {
  const {
    employees,
    deleteEmployee,
    getAllEmployees,
    searchEmployeesByName,
    status,
  } = useEmployees();
  const [visible, setVisible] = React.useState(false);
  const [employeeId, setEmployeeId] = React.useState("");

  React.useEffect(() => {
    savePathname();
    getAllEmployees();
  }, []);

  const validators = {
    required: false,
    validator: formatNames(),
    invalidtext: true,
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
    searchEmployeesByName(data.search);
  };

  const tableExportId = "employees-table";

  const headers = [
    { label: "Nombre Completo", key: "employeeName" },
    { label: "Tipo de Documento", key: "documentTypeName" },
    { label: "Nro. Documento", key: "documentNumber" },
    { label: "Correo Corporativo", key: "corporateEmail" },
    { label: "Teléfono", key: "phoneNumber" },
    { label: "Fecha de Nacimiento", key: "birthdate" },
  ];

  return (
    <>
      <div className="row mb-3">
        <RedirectionButton redirection="/empleados/nuevo" />
      </div>
      <div className="row my-3">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <CIcon icon={cilHamburgerMenu} />
              &nbsp;EMPLEADOS
            </div>
            <div className="card-body">
              <nav className="navbar navbar-expand-lg navbar-light bg-light px-3 my-2 row">
                <ExportButtons
                  dataReport={employees.map((employee: Employee) => {
                    const {
                      name,
                      lastname,
                      secondLastname,
                      documentType = null,
                    } = employee || {};
                    let employeeName = "Desconocido";
                    let documentName = "";
                    name ? (employeeName = name) : "";
                    lastname
                      ? (employeeName = `${employeeName} ${lastname}`)
                      : "";
                    secondLastname
                      ? (employeeName = `${employeeName} ${secondLastname}`)
                      : "";
                    if (documentType) {
                      const { name: documentTypeName } = documentType || {};
                      documentTypeName ? (documentName = documentTypeName) : "";
                    }
                    return {
                      ...employee,
                      employeeName: employeeName,
                      documentTypeName: documentName,
                    };
                  })}
                  headers={headers}
                  tableId={tableExportId}
                  documentName={"employees"}
                />
                <SearchButton
                  validators={validators}
                  handleSearch={handleSearch}
                />
              </nav>
              <br />
              <div className="w-100 overflow-auto" style={{ height: 300 }}>
                {status === Status.Loading ? (
                  <h4 className="text-center">Espere un momento...</h4>
                ) : null}
                {(status === Status.Ready || status === Status.Updating) &&
                employees.length > 0 ? (
                  <table className="table" id={tableExportId}>
                    <thead>
                      <tr>
                        <th>N°</th>
                        {headers
                          ? headers.map((header) => (
                              <th key={header.label}>{header.label}</th>
                            ))
                          : null}
                        <th>Imagen</th>
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
                    className="text-white"
                    onClick={() => {
                      setEmployeeId("");
                      setVisible(false);
                    }}
                  >
                    Cerrar
                  </CButton>
                  <CButton
                    color="danger"
                    className="text-white"
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
