import { Position } from "../usePositions";
import { DocumentType } from "../useDocuments";
import { GeneralResponse } from "../types";

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

export type EmployeeResponse = GeneralResponse & {
  doc?: Employee | null;
}
