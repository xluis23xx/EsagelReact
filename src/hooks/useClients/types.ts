import { DocumentType } from "../useDocuments";
import { ProspectusOrigin } from "../useProspectusOrigin/types";
import { ProspectusStatus } from "../usePropectusStatus";
import { ContactForm } from "../useContactForms";

export type Department = {
  _id?: string;
  name?: string;
};

export type Client = {
  name: string;
  lastname: string;
  secondLastname: string;
  email: string;
  phoneNumber: string;
  address: string;
  documentNumber: string;
  birthdate: string;
  documentType: DocumentType;
  department: Department;
  leadSource: ProspectusOrigin;
  prospectStatus: ProspectusStatus; // falta crear su objeto
  contactForm: ContactForm; // falta crear su objeto
  profession: string;
  business: string;
  status: number | null;
};
