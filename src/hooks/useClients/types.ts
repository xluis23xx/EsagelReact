import { DocumentType } from "../useDocuments";
import { ProspectusOrigin } from "../useProspectusOrigin";
import { ProspectStatus } from "../usePropectusStatus";
import { ContactForm } from "../useContactForms";
import { GeneralResponse } from "../types";
import { Ubigeo } from "../../components/ubigeo/types";

export type Department = {
  _id?: string;
  name?: string;
};

export type Client = {
  _id?: string;
  name?: string;
  lastname?: string;
  secondLastname?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
  documentNumber?: string;
  birthdate?: string;
  documentType?: DocumentType;
  department?: Ubigeo;
  leadSource?: ProspectusOrigin;
  prospectStatus?: ProspectStatus;
  contactForm?: ContactForm;
  profession?: string;
  business?: string;
  status?: number | null;
  createdAt?: string;
  updatedAt?: string;
};

export type ClientResponse = GeneralResponse & {
  doc?: Client | null;
};
