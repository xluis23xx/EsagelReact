export type CourseType = {
  _id?: string;
  code?: string;
  name?: string;
  status?: number;
  description?: string; // "comprobante" o "persona"
  createdAt?: string;
  updatedAt?: string;
};

export type GetCourseType = CourseType;
export type GetCourseTypes = CourseType[];
