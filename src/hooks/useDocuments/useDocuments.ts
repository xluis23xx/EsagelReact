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

  function setDocumentTypeById(id: string) {
    setStatus(Status.Loading);

    const token = getCookie("esagel_token") || "";
    getDocumentTypeById(token, id).then((response) => {
      if (response?._id) {
        setStatus(Status.Ready);
        setDocumentInfo(response);
      }
    });
  }

  function getAllDocumentTypes() {
    const token = getCookie("esagel_token") || "";
    getDocumentTypes(token)
      .then((documentsObtained: DocumentType[]) => {
        const enableDocuments =
          documentsObtained.filter(
            (document: DocumentType) => document.status === 1
          ) || [];
        setDocuments(enableDocuments);
        setStatus(Status.Ready);
      })
      .catch(() => {
        setStatus(Status.Error);
      });
  }

  async function updateDocumentType(id: string, document: any) {
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

  function deleteDocumentType(id: string) {
    setStatus(Status.Updating);
    const token = getCookie("esagel_token") || "";
    putDocumentType(token, id, { status: 0, isDelete: true })
      .then((response) => {
        if (response?.status === 200 || response?.status === 201) {
          setDocuments(
            documents.filter((document: DocumentType) => document._id !== id)
          );
          const documentName = response?.name || "";
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

  async function registerDocumentType(document: any) {
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
    documents,
    getAllDocumentTypes,
    registerDocumentType,
    updateDocumentType,
    deleteDocumentType,
    setDocumentTypeById,
    documentInfo,
    status,
  };
};
