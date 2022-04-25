import { Position } from "../useCombos/types";
import { DocumentType } from "../useDocuments";

export type Employee = {
  _id?: string;
  name?: string;
  lastname?: string;
  secondLastname?: string;
  phoneNumber?: string;
  documentType?: DocumentType;
  documentNumber?: string;
  address?: string;
  image?: string | null;
  corporateEmail?: string | null;
  personalEmail?: string | null;
  birthdate?: string;
  position?: Position;
  status?: number | null;
};

export type GetEmployee = Employee;
export type GetEmployees = Employee[];
