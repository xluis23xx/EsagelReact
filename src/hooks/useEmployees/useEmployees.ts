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
import { BodyParams, PaginateParams, PaginateResponse } from "../types";

export enum Status {
  Loading,
  Ready,
  Updating,
  Error,
}

export const useEmployees = () => {
  const [employees, setEmployees] = React.useState<Employee[]>([]);
  const [employeeInfo, setemployeeInfo] = React.useState<Employee | null>(null);
  const [status, setStatus] = React.useState(Status.Loading);
  const [paginateData, setPaginateData] = React.useState<PaginateResponse| null>(null)
  const [searchFilter, setSearchFilter] = React.useState<BodyParams>({
    filter: "",
    status: null
  })

  function setEmployeeById(id: string) {
    setStatus(Status.Loading);

    const token = getCookie("esagel_token") || "";
    getEmployeeById(token, id).then((response) => {
      if (response?._id) {
        setemployeeInfo(response);
        setStatus(Status.Ready);
      }
    });
  }

  function getEmployeesByFilter(
    { filter="", status=null }: BodyParams,
    {limit, pageSize}: PaginateParams
    ) {
    const token = getCookie("esagel_token") || "";
    getEmployees(token,{filter, status}, {limit, pageSize})
      .then((response: PaginateResponse) => {
        const { docs: employeesObtained = [] } = response || {};
        setEmployees(employeesObtained);
        setPaginateData(response);
        setStatus(Status.Ready);
      })
      .catch(() => {
        setStatus(Status.Error);
      });
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

  function changePage (index: number) {
    getEmployeesByFilter(searchFilter, {limit: 20, pageSize:index})
  }

  return {
    employees,
    deleteEmployee,
    registerEmployee,
    updateEmployee,
    setEmployeeById,
    employeeInfo,
    getEmployeesByFilter,
    paginateData,
    setSearchFilter,
    changePage,
    status,
  };
};
