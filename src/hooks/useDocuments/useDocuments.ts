import * as React from "react";
import { getCookie } from "../../utils/cookies";
import Swal from "sweetalert2";

import {
  getDocumentTypeById,
  getDocumentTypes,
  postDocumentType,
  putDocumentType,
} from "./helpers";
import { DocumentType } from "./index";
import { BodyParams, PaginateParams, PaginateResponse } from "../types";
import { DocumentTypeResponse } from "./types";

export enum Status {
  Loading,
  Ready,
  Updating,
  Error,
}

export const useDocumentTypes = () => {
  const [documents, setDocuments] = React.useState<DocumentType[]>([]);
  const [documentInfo, setDocumentInfo] = React.useState<DocumentType | null>(null);
  const [status, setStatus] = React.useState(Status.Loading);
  const [paginateData, setPaginateData] = React.useState<PaginateResponse| null>(null)
  const [searchFilter, setSearchFilter] = React.useState<BodyParams>({
    filter: "",
    status: null
  })

  function setDocumentTypeById(id: string) {
    setStatus(Status.Loading);
    const token = getCookie("esagel_token") || "";
    getDocumentTypeById(token, id).then((response) => {
      if (response?.status===200) {
        setDocumentInfo(response?.doc || null);
        setStatus(Status.Ready);
      }
    });
  }
  
  async function getDocumentTypesByFilter(
    { filter="", status=null }: BodyParams,
    {limit, pageSize}: PaginateParams
  ): Promise<PaginateResponse> {
    const token = getCookie("esagel_token") || "";
    return getDocumentTypes(token,{filter, status}, {limit, pageSize})
    .then((response: PaginateResponse) => {
      if(response?.status===200){
        const { docs: documentsObtained = [] } = response || {};
        setDocuments(documentsObtained);
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

  async function updateDocumentType(id: string, document: any): Promise<DocumentTypeResponse> {
    setStatus(Status.Updating);
    const token = getCookie("esagel_token") || "";
    return putDocumentType(token, id, document)
      .then((response) => {
        if (response?.status === 201 || response?.status === 200) {
          Swal.fire({
            icon: "success",
            title: "¡Actualización Exitosa!",
            text: "Tipo de Documento actualizado éxitosamente",
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

  async function deleteDocumentType(id: string): Promise<DocumentTypeResponse> {
    setStatus(Status.Updating);
    const token = getCookie("esagel_token") || "";
    return putDocumentType(token, id, { status: 0, isDelete: true })
      .then((response) => {
        if (response?.status === 200 || response?.status === 201) {
          setDocuments(
            documents.filter((document: DocumentType) => document._id !== id)
          );
          const documentName = response?.doc?.name || "";
          Swal.fire({
            title: "¡Todo salió bien!",
            icon: "success",
            text: `Tipo de Documento ${documentName} eliminado con éxito`,
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

  async function registerDocumentType(document: any): Promise<DocumentTypeResponse> {
    const token = getCookie("esagel_token") || "";
    setStatus(Status.Updating);
    return postDocumentType(token, document)
      .then((response) => {
        if (response?.status === 200 || response?.status === 201) {
          Swal.fire({
            icon: "success",
            title: "¡Registro Exitoso!",
            text: "Tipo de Documento registrado éxitosamente",
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
    getDocumentTypesByFilter(searchFilter, {limit: 20, pageSize:index})
  }

  return {
    documents,
    getDocumentTypesByFilter,
    registerDocumentType,
    updateDocumentType,
    deleteDocumentType,
    setDocumentTypeById,
    documentInfo,
    paginateData,
    setSearchFilter,
    changePage,
    status,
  };
}
