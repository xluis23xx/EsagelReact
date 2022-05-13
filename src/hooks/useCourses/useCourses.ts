import * as React from "react";
import { getCookie } from "../../utils/cookies";
import Swal from "sweetalert2";

import { getCourseById, getCourses, postCourse, putCourse } from "./helpers";
import { Course } from "./index";

export enum Status {
  Loading,
  Ready,
  Updating,
  Error,
}

export const useCourses = () => {
  const [courses, setCourses] = React.useState<Course[]>([]);
  const [coursesAll, setCoursesAll] = React.useState<Course[]>([]);
  const [courseInfo, setCourseInfo] = React.useState<Course>(null);
  const [status, setStatus] = React.useState(Status.Loading);

  function setCourseById(id: string) {
    setStatus(Status.Loading);

    const token = getCookie("esagel_token") || "";
    getCourseById(token, id).then((response) => {
      if (response?._id) {
        setCourseInfo(response);
        setStatus(Status.Ready);
      }
    });
  }

  function getAllCourses() {
    const token = getCookie("esagel_token") || "";
    getCourses(token)
      .then((coursesObtained: Course[]) => {
        const enableCourses =
          coursesObtained.filter((course: Course) => course.status === 1) || [];
        setCourses(enableCourses);
        setCoursesAll(enableCourses);
        setStatus(Status.Ready);
      })
      .catch(() => {
        setStatus(Status.Error);
      });
  }

  function searchCoursesByFilter(filter: string) {
    if (filter.length === 0) {
      setCoursesAll(coursesAll);
    } else {
      const coursesFilter = coursesAll.filter((course: Course) => {
        const { name = "", price = 0 } = course || {};
        const regex = new RegExp(filter.toLowerCase());
        return regex.test(`${name} ${price}`.toLowerCase());
      });
      setCourses(coursesFilter);
    }
  }

  async function updateCourse(id: string, course: any) {
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
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Algo ocurrió!",
          text: "Ocurrió un error inesperado",
          timer: 2000,
          confirmButtonColor: "#ff0000",
        });
        setStatus(Status.Ready);
        return undefined;
      });
  }

  async function deleteCourse(id: string) {
    setStatus(Status.Updating);
    const token = getCookie("esagel_token") || "";
    putCourse(token, id, { status: 0, isDelete: true })
      .then((response) => {
        if (response?.status === 201 || response?.status === 200) {
          setCourses(courses.filter((course: Course) => course._id !== id));
          setCoursesAll(courses.filter((course: Course) => course._id !== id));
          const courseName = response?.updatedCourse?.name || "";
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
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Algo ocurrió!",
          text: "Ocurrió un error inesperado",
          timer: 2000,
          confirmButtonColor: "#ff0000",
        });
        setStatus(Status.Ready);
      });
  }

  async function registerCourse(course: any) {
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
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Algo ocurrió!",
          text: "Ocurrió un error inesperado",
          timer: 2000,
          confirmButtonColor: "#ff0000",
        });
        setStatus(Status.Ready);
        return undefined;
      });
  }

  return {
    courses,
    deleteCourse,
    searchCoursesByFilter,
    registerCourse,
    updateCourse,
    setCourseById,
    courseInfo,
    getAllCourses,
    status,
  };
};

// FALTA CREAR METODOS PARA AGREGAR TEMAS A LOS CURSOS
