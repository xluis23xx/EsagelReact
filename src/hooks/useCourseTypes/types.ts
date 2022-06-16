import { GeneralResponse } from "../types";

export type CourseType = {
  _id?: string;
  code?: string;
  name?: string;
  status?: number;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type CourseTypeResponse = GeneralResponse & {
  doc?: CourseType | null;
}
