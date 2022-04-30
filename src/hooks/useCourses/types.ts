import { CourseType } from "../useCourseTypes";

export type Course = {
  _id?: string;
  code?: string;
  name?: string;
  modality?: string;
  price?: number;
  image?: string | null;
  vacanciesNumber?: number;
  status?: number | null;
  courseType?: CourseType;
  createdAt?: string;
  updatedAt?: string;
};

export type GetCourse = Course;
export type GetCourses = Course[];
