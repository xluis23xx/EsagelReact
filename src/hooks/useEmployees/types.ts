
export type DocumentType = {
    _id: string
    name: string
    status: number
    operation: string // "comprobante" o "persona"
}
type Position = {
    _id: string
    name: string
    status: number
}

export type Employee = {
    _id?: string;
    name?: string;
    lastname?: string;
    secondLastname?: string;
    phoneNumber?: string;
    documentType?: DocumentType;
    documentNumber?: string;
    address?: string;
    corporateEmail?: string | null;
    personalEmail?: string | null;
    birthdate?: string;
    position?: Position
    status?:  number | null;
  };

  export type GetEmployee = Employee
  export type GetEmployees = Employee[]