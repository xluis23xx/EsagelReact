export type ContactForm = {
  _id?: string;
  name?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  status?: number | null;
};

export type GetContactForm = ContactForm;
export type GetContactForms = ContactForm[];