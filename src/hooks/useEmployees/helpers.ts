import ENVIROMENTS from "../../enviroments/env";

import { Employee, GetEmployee, GetEmployees } from "./types";

const { GENERAL_API } = ENVIROMENTS;

export const getEmployees = (token: string): Promise<GetEmployees> =>
  fetch(`${GENERAL_API}/employees`, {
    method: "GET",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  }).then((res) => res.json()).catch(res=> res.json());

export const getEmployeeById = (
  token: string,
  id: string
): Promise<GetEmployee> =>
  fetch(`${GENERAL_API}/employees/${id}`, {
    method: "GET",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  }).then((res) => res.json());

export const postEmployee = (
  token: string,
  {
    name,
    lastname,
    secondLastname,
    birthdate,
    documentType,
    documentNumber,
    personalEmail,
    corporateEmail,
    phoneNumber,
    status,
    position,
  }: Employee
): Promise<Employee> =>
  fetch(`${GENERAL_API}/employees`, {
    method: "POST",
    cache: "no-cache",
    body: JSON.stringify({
      name: name || null,
      lastname: lastname || null,
      secondLastname: secondLastname || null,
      birthdate: birthdate || null,
      documentType: documentType.name || null,
      documentNumber: documentNumber || null,
      personalEmail: personalEmail || null,
      corporateEmail: corporateEmail || null,
      phoneNumber: phoneNumber || null,
      status: status || 1,
      position: position.name || null,
    }),
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  }).then((res) => res.json());
