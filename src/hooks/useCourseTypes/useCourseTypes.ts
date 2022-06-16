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
import { BodyParams, PaginateParams, PaginateResponse } from "../types";
import { CourseTypeResponse } from "./types";

export enum Status {
  Loading,
  Ready,
  Updating,
  Error,
}

export const useCourseTypes = () => {
  const [courseTypes, setCourseTypes] = React.useState<CourseType[]>([]);
  const [courseTypeInfo, setCourseTypeInfo] = React.useState<CourseType | null>(null);
  const [status, setStatus] = React.useState(Status.Loading);
  const [paginateData, setPaginateData] = React.useState<PaginateResponse| null>(null)
  const [searchFilter, setSearchFilter] = React.useState<BodyParams>({
    filter: "",
    status: null
  })

  function setCourseTypeById(id: string) {
    setStatus(Status.Loading);
    const token = getCookie("esagel_token") || "";
    getCourseTypeById(token, id).then((response) => {
      if (response?.status===200) {
        setCourseTypeInfo(response?.doc || null);
        setStatus(Status.Ready);
      }
    });
  }

  async function getCourseTypesByFilter(
    { filter="", status=null }: BodyParams,
    {limit, pageSize}: PaginateParams
  ): Promise<PaginateResponse> {
    const token = getCookie("esagel_token") || "";
    return getCourseTypes(token,{filter, status}, {limit, pageSize})
      .then((response: PaginateResponse) => {
        if(response?.status===200){
          const { docs: courseTypesObtained = [] } = response || {};
          setCourseTypes(courseTypesObtained);
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
        setStatus(Status.Ready);
        return response;
      })
      .catch((error) => {
        setStatus(Status.Error);
        return error;
      });
  }

  async function updateCourseType(id: string, courseType: any): Promise<CourseTypeResponse>{
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

  async function deleteCourseType(id: string): Promise<CourseTypeResponse> {
    setStatus(Status.Updating);
    const token = getCookie("esagel_token") || "";
    return putCourseType(token, id, { status: 0, isDelete: true })
      .then((response) => {
        if (response?.status === 200 || response?.status === 201) {
          setCourseTypes(
            courseTypes.filter(
              (courseType: CourseType) => courseType._id !== id
            )
          );
          const courseTypeName = response?.doc?.name || "";
          Swal.fire({
            title: "¡Todo salió bien!",
            icon: "success",
            text: `Tipo de Curso ${courseTypeName} eliminado con éxito`,
            timer: 2000,
            confirmButtonColor: "#ff0000",
          });
        } else {
          Swal.fire({
            title: "¡Algo ocurrió!",
            icon: "error",
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

  async function registerCourseType(courseType: any): Promise<CourseTypeResponse>  {
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
    getCourseTypesByFilter(searchFilter, {limit: 20, pageSize:index})
  }

  return {
    courseTypes,
    getCourseTypesByFilter,
    registerCourseType,
    updateCourseType,
    deleteCourseType,
    setCourseTypeById,
    courseTypeInfo,
    paginateData,
    setSearchFilter,
    changePage,
    status,
  };
};
