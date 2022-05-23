import * as React from "react";
import { getCookie } from "../../utils/cookies";
import Swal from "sweetalert2";

import {
  getEmployeeById,
  getEmployees,
  postEmployee,
  putEmployee,
} from "./helpers";
import { Employee } from "./index";
import { PaginateResponse } from "../types";

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
    getEmployeeById(token, id).then((response) => {
      if (response?._id) {
        setEmployeeProfile(response);
        setStatus(Status.Ready);
      }
    });
  }

  function cleanEmployeeProfile() {
    setEmployeeProfile(null);
  }

  function getAllEmployees() {
    const token = getCookie("esagel_token") || "";
    getEmployees(token, {})
      .then((response: PaginateResponse) => {
        const { docs: employeesObtained = [] } = response || {};
        const enableEmployees =
          employeesObtained.filter(
            (employee: Employee) => employee.status === 1
          ) || [];
        setEmployees(enableEmployees);
        setEmployeesAll(enableEmployees);
        setStatus(Status.Ready);
      })
      .catch(() => {
        setStatus(Status.Error);
      });
  }

  function searchEmployeesByName(filter: string) {
    if (employeesAll.length === 0) {
      getAllEmployees();
    }
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
    setStatus(Status.Updating);
    const token = getCookie("esagel_token") || "";
    return putEmployee(token, id, employee)
      .then((response) => {
        if (response?.status === 200 || response?.status === 201) {
          Swal.fire({
            icon: "success",
            title: "¡Actualización Exitosa!",
            text: "Empleado actualizado éxitosamente",
            timer: 2000,
            confirmButtonColor: "#ff0000",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Algo ocurrió!",
            text: response?.message || "",
            timer: 2000,
            confirmButtonColor: "#ff0000",
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
          confirmButtonColor: "#ff0000",
        });
        setStatus(Status.Ready);
        return undefined;
      });
  }

  async function deleteEmployee(id: string) {
    setStatus(Status.Updating);
    const token = getCookie("esagel_token") || "";
    putEmployee(token, id, { status: 0, isDelete: true })
      .then((response) => {
        if (response?.status === 201 || response?.status === 200) {
          setEmployees(
            employees.filter((employee: Employee) => employee._id !== id)
          );
          setEmployeesAll(
            employees.filter((employee: Employee) => employee._id !== id)
          );
          const employeeName = response?.updatedEmployee?.name || "";
          const employeeLastname = response?.updatedEmployee?.lastname || "";
          Swal.fire({
            title: "¡Todo salió bien!",
            icon: "success",
            text: `Empleado ${employeeName} ${employeeLastname} eliminado con éxito`,
            timer: 2000,
            confirmButtonColor: "#ff0000",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "¡Algo ocurrió!",
            text: response?.message || "",
            timer: 2000,
            confirmButtonColor: "#ff0000",
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
          confirmButtonColor: "#ff0000",
        });
        setStatus(Status.Ready);
      });
  }

  async function registerEmployee(employee: any) {
    const token = getCookie("esagel_token") || "";
    setStatus(Status.Updating);
    return postEmployee(token, employee)
      .then((response) => {
        if (response?.status === 200 || response?.status === 201) {
          Swal.fire({
            icon: "success",
            title: "¡Registro Exitoso!",
            text: "Empleado registrado éxitosamente",
            timer: 2000,
            confirmButtonColor: "#ff0000",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Algo ocurrió!",
            text: response?.message || "",
            timer: 2000,
            confirmButtonColor: "#ff0000",
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
          confirmButtonColor: "#ff0000",
        });
        setStatus(Status.Ready);
        return undefined;
      });
  }

  return {
    employees,
    deleteEmployee,
    searchEmployeesByName,
    cleanEmployeeProfile,
    registerEmployee,
    updateEmployee,
    setEmployeeById,
    employeeProfile,
    getAllEmployees,
    status,
  };
};
