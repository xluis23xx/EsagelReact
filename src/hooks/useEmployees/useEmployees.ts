import * as React from "react";
import { getCookie } from "src/utils/cookies";
import Swal from "sweetalert2";

import {
  getEmployeeById,
  getEmployees,
  postEmployee,
  putEmployee,
  setStatusEmployee,
} from "./helpers";
import { Employee } from "./index";

export enum Status {
  Loading,
  Ready,
  Updating,
  Error,
}

export const useEmployees = () => {
  const [employees, setEmployees] = React.useState<Employee[]>([]);
  const [employeesAll, setEmployeesAll] = React.useState<Employee[]>([]);
  const [employeeProfile, setEmployeeProfile] = React.useState<Employee>(null);
  const [status, setStatus] = React.useState(Status.Loading);

  function setEmployeeById(id: string) {
    setStatus(Status.Loading);

    const token = getCookie("esagel_token") || "";
    getEmployeeById(token, id).then((resp) => {
      if (resp._id) {
        setStatus(Status.Ready);
        setEmployeeProfile(resp);
      }
    });
  }

  function getAllEmployees() {
    const token = getCookie("esagel_token") || "";
    getEmployees(token)
      .then((allEmployees) => {
        const enableEmployees =
          allEmployees.filter((employee: Employee) => employee.status === 1) ||
          [];
        setEmployees(enableEmployees);
        setEmployeesAll(enableEmployees);
        setStatus(Status.Ready);
      })
      .catch(() => {
        setStatus(Status.Error);
      });
  }

  function getEmployee(id: string) {
    const token = getCookie("esagel_token") || "";
    return getEmployeeById(token, id);
  }

  function searchEmployeeSByName(filter: string) {
    if (filter.length === 0) {
      setEmployees(employeesAll);
    } else {
      const employeesFilter = employeesAll.filter((employee: Employee) => {
        const {
          name = "",
          lastname = "",
          secondLastname = "",
        } = employee || {};
        const regex = new RegExp(filter.toLowerCase());
        return regex.test(
          `${name} ${lastname} ${secondLastname}`.toLowerCase()
        );
      });
      setEmployees(employeesFilter);
    }
  }

  async function updateEmployee(id: string, employee: any) {
    const token = getCookie("esagel_token") || "";
    return putEmployee(token, id, employee)
      .then((response) => {
        if (response.message) {
          Swal.fire({
            icon: "error",
            title: "Algo ocurrió!",
            text: response.message,
            timer: 2000,
          });
        } else {
          Swal.fire({
            icon: "success",
            title: "¡Actualización Exitosa!",
            text: "Empleado actualizado éxitosamente",
            timer: 2000,
          });
        }
        setStatus(Status.Ready);
        return response;
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Algo ocurrió!",
          text: "Ocurrió un error inesperado",
          timer: 2000,
        });
        return undefined;
      });
  }

  function deleteEmployee(id: string) {
    setStatus(Status.Updating);
    const token = getCookie("esagel_token") || "";
    setStatusEmployee(token, id, { status: 0 })
      .then((resp) => {
        if (resp?.message) {
          Swal.fire({
            title: "¡Algo ocurrió!",
            icon: "error",
            text: resp.message,
            showCloseButton: true,
            timer: 2000,
            closeButtonAriaLabel: "Cerrar",
          });
        } else {
          setEmployees(
            employees.filter((employee: Employee) => employee._id !== id)
          );
          Swal.fire({
            title: "¡Todo salió bien!",
            icon: "success",
            text: `Empleado ${resp.lastname} eliminado con éxito`,
            showCloseButton: true,
            timer: 2000,
            closeButtonAriaLabel: "Cerrar",
          });
        }
        setStatus(Status.Ready);
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Algo ocurrió!",
          text: "Ocurrió un error inesperado",
          timer: 2000,
        });
      });
  }

  async function registerEmployee(employee: any) {
    const token = getCookie("esagel_token") || "";
    setStatus(Status.Updating);
    return postEmployee(token, employee)
      .then((response) => {
        if (response.message) {
          Swal.fire({
            icon: "error",
            title: "Algo ocurrió!",
            text: response.message,
            timer: 2000,
          });
        } else {
          Swal.fire({
            icon: "success",
            title: "¡Registro Exitoso!",
            text: "Empleado registrado éxitosamente",
            timer: 2000,
          });
        }
        setStatus(Status.Ready);
        return response;
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Algo ocurrió!",
          text: "Ocurrió un error inesperado",
          timer: 2000,
        });
        return undefined;
      });
  }

  return {
    employees,
    deleteEmployee,
    getEmployee,
    searchEmployeeSByName,
    registerEmployee,
    updateEmployee,
    setEmployeeById,
    employeeProfile,
    getAllEmployees,
    status,
  };
};
