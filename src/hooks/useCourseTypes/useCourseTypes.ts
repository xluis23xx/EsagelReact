import * as React from "react";
import { getCookie } from "../../utils/cookies";
import Swal from "sweetalert2";

import {
  getCourseTypeById,
  getCourseTypes,
  postCourseType,
  putCourseType,
} from "./helpers";
import { CourseType } from "./index";

export enum Status {
  Loading,
  Ready,
  Updating,
  Error,
}

export const useCourseTypes = () => {
  const [courseTypes, setCourseTypes] = React.useState<CourseType[]>([]);
  const [courseTypeInfo, setCourseTypeInfo] = React.useState<CourseType>(null);
  const [status, setStatus] = React.useState(Status.Loading);

  function setCourseTypeById(id: string) {
    setStatus(Status.Loading);
    const token = getCookie("esagel_token") || "";
    getCourseTypeById(token, id).then((response) => {
      if (response?._id) {
        setStatus(Status.Ready);
        setCourseTypeInfo(response);
      }
    });
  }

  function getAllCourseTypes() {
    const token = getCookie("esagel_token") || "";
    getCourseTypes(token)
      .then((response) => {
        const enableCourseTypes =
          response.filter(
            (courseType: CourseType) => courseType.status === 1
          ) || [];
        setCourseTypes(enableCourseTypes);
        setStatus(Status.Ready);
      })
      .catch(() => {
        setStatus(Status.Error);
      });
  }

  async function updateCourseType(id: string, courseType: any) {
    setStatus(Status.Updating);
    const token = getCookie("esagel_token") || "";
    return putCourseType(token, id, courseType)
      .then((response) => {
        if (response?.status === 201 || response?.status === 200) {
          Swal.fire({
            icon: "success",
            title: "¡Actualización Exitosa!",
            text: "Tipo de Curso actualizado éxitosamente",
            timer: 2000,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Algo ocurrió!",
            text: response?.message || "",
            timer: 2000,
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
        });
        return undefined;
      });
  }

  function deleteCourseType(id: string) {
    setStatus(Status.Updating);
    const token = getCookie("esagel_token") || "";
    putCourseType(token, id, { status: 0, isDelete: true })
      .then((response) => {
        if (response?.status === 200 || response?.status === 201) {
          setCourseTypes(
            courseTypes.filter(
              (courseType: CourseType) => courseType._id !== id
            )
          );
          const courseTypeName = response?.name || "";
          Swal.fire({
            title: "¡Todo salió bien!",
            icon: "success",
            text: `Tipo de Curso ${courseTypeName} eliminado con éxito`,
            timer: 2000,
          });
        } else {
          Swal.fire({
            title: "¡Algo ocurrió!",
            icon: "error",
            text: response?.message || "",
            timer: 2000,
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
        });
      });
  }

  async function registerCourseType(courseType: any) {
    const token = getCookie("esagel_token") || "";
    setStatus(Status.Updating);
    return postCourseType(token, courseType)
      .then((response) => {
        if (response?.status === 200 || response?.status === 201) {
          Swal.fire({
            icon: "success",
            title: "¡Registro Exitoso!",
            text: "Tipo de Curso registrado éxitosamente",
            timer: 2000,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Algo ocurrió!",
            text: response?.message || "",
            timer: 2000,
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
        });
        return undefined;
      });
  }

  return {
    courseTypes,
    getAllCourseTypes,
    registerCourseType,
    updateCourseType,
    deleteCourseType,
    setCourseTypeById,
    courseTypeInfo,
    status,
  };
};
