import * as React from "react";
import { getCookie } from "../../utils/cookies";
import Swal from "sweetalert2";

import { getCourseById, getCourses, postCourse, putCourse } from "./helpers";
import { Course } from "./index";
import { BodyParams, PaginateParams, PaginateResponse } from "../types";
import { CourseResponse } from "./types";

export enum Status {
  Loading,
  Ready,
  Updating,
  Error,
}

export const useCourses = () => {
  const [courses, setCourses] = React.useState<Course[]>([]);
  const [courseInfo, setCourseInfo] = React.useState<Course | null>(null);
  const [status, setStatus] = React.useState(Status.Loading);
  const [paginateData, setPaginateData] = React.useState<PaginateResponse| null>(null)
  const [searchFilter, setSearchFilter] = React.useState<BodyParams>({
    filter: "",
    status: null
  })


  function setCourseById(id: string) {
    setStatus(Status.Loading);

    const token = getCookie("esagel_token") || "";
    getCourseById(token, id).then((response) => {
      if(response?.status===200){
        setCourseInfo(response?.doc || null);
        setStatus(Status.Ready);
      }
    });
  }


  async function getCoursesByFilter(
    { filter="", status=null }: BodyParams,
    {limit, pageSize}: PaginateParams
    ): Promise<PaginateResponse> {
    const token = getCookie("esagel_token") || "";
    return getCourses(token,{filter, status}, {limit, pageSize})
      .then((response: PaginateResponse) => {
        if(response?.status===200){
          const { docs: coursesObtained = [] } = response || {};
          setCourses(coursesObtained);
          setPaginateData(response);
        }else{
          Swal.fire({
            icon: "error",
            title: "Algo ocurrió!",
            text: response?.message || "",
            timer: 2000,
            confirmButtonColor: "#ff0000",
          });
        }
        setStatus(Status.Ready)
        return response;
      })
      .catch((error) => {
        setStatus(Status.Error);
        return error;
      });
  }

  async function updateCourse(id: string, course: any): Promise<CourseResponse>{
    setStatus(Status.Updating);
    const token = getCookie("esagel_token") || "";
    return putCourse(token, id, course)
      .then((response) => {
        if (response?.status === 200 || response?.status === 201) {
          Swal.fire({
            icon: "success",
            title: "¡Actualización Exitosa!",
            text: "Curso actualizado éxitosamente",
            timer: 2000,
            confirmButtonColor: "#ff0000",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Algo ocurrió!",
            text: response?.message || "",
            timer: 2000,
            confirmButtonColor: "#ff0000",
          });
        }
        setStatus(Status.Ready);
        return response;
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Algo ocurrió!",
          text: "Ocurrió un error inesperado",
          timer: 2000,
          confirmButtonColor: "#ff0000",
        });
        setStatus(Status.Ready);
        return error;
      });
  }

  async function deleteCourse(id: string): Promise<CourseResponse> {
    setStatus(Status.Updating);
    const token = getCookie("esagel_token") || "";
    return putCourse(token, id, { status: 0, isDelete: true })
      .then((response) => {
        if (response?.status === 201 || response?.status === 200) {
          setCourses(courses.filter((course: Course) => course._id !== id));
          const courseName = response?.doc?.name || "";
          Swal.fire({
            title: "¡Todo salió bien!",
            icon: "success",
            text: `Curso ${courseName} eliminado con éxito`,
            timer: 2000,
            confirmButtonColor: "#ff0000",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "¡Algo ocurrió!",
            text: response?.message || "",
            timer: 2000,
            confirmButtonColor: "#ff0000",
          });
        }
        setStatus(Status.Ready);
        return response;
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Algo ocurrió!",
          text: "Ocurrió un error inesperado",
          timer: 2000,
          confirmButtonColor: "#ff0000",
        });
        setStatus(Status.Ready);
        return error;
      });
  }

  async function registerCourse(course: any): Promise<CourseResponse> {
    const token = getCookie("esagel_token") || "";
    setStatus(Status.Updating);
    return postCourse(token, course)
      .then((response) => {
        if (response?.status === 200 || response?.status === 201) {
          Swal.fire({
            icon: "success",
            title: "¡Registro Exitoso!",
            text: "Curso registrado éxitosamente",
            timer: 2000,
            confirmButtonColor: "#ff0000",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Algo ocurrió!",
            text: response?.message || "",
            timer: 2000,
            confirmButtonColor: "#ff0000",
          });
        }
        setStatus(Status.Ready);
        return response;
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Algo ocurrió!",
          text: "Ocurrió un error inesperado",
          timer: 2000,
          confirmButtonColor: "#ff0000",
        });
        setStatus(Status.Ready);
        return error;
      });
  }
  function changePage (index: number) {
    getCoursesByFilter(searchFilter, {limit: 20, pageSize:index})
  }

  return {
    courses,
    deleteCourse,
    registerCourse,
    updateCourse,
    setCourseById,
    courseInfo,
    getCoursesByFilter,
    paginateData,
    setSearchFilter,
    changePage,
    status,
  };
};