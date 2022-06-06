import { CourseType } from "../useCourseTypes";
import { Topic } from "../useTopics";

export type Course = {
  _id?: string;
  code?: string;
  name?: string;
  description?: string;
  modality?: string;
  price?: number;
  image?: string | null;
  vacanciesNumber?: number;
  courseType?: CourseType;
  status?: number | null;
  courseLines?: Topic[] | null;
  createdAt?: string;
  updatedAt?: string;
};

export type GetCourse = Course;
export type GetCourses = Course[];
