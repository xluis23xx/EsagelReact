import { DocumentType } from "../useDocuments";
import { ProspectusOrigin } from "../useProspectusOrigin";
import { ProspectusStatus } from "../usePropectusStatus";
import { ContactForm } from "../useContactForms";

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
  department?: string;
  leadSource?: ProspectusOrigin;
  prospectStatus?: ProspectusStatus;
  contactForm?: ContactForm;
  profession?: string;
  business?: string;
  status?: number | null;
  createdAt?: string;
  updatedAt?: string;
};

export type GetClient = Client;
export type GetClients = Client[];
