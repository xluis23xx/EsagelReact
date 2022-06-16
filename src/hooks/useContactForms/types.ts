import { GeneralResponse } from "../types";

export type ContactForm = {
  _id?: string;
  name?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  status?: number | null;
};

export type ContactFormResponse =  GeneralResponse & {
  doc?: ContactForm | null;
}