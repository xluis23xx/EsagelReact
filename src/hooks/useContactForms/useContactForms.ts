import * as React from "react";
import { getCookie } from "../../utils/cookies";
import Swal from "sweetalert2";

import {
  getContactFormById,
  getContactForms,
  postContactForm,
  putContactForm,
} from "./helpers";
import { ContactForm } from "./index";
import { BodyParams, PaginateParams, PaginateResponse } from "../types";
import { ContactFormResponse } from "./types";

export enum Status {
  Loading,
  Ready,
  Updating,
  Error,
}

export const useContactForms = () => {
  const [contactForms, setContactForms] = React.useState<ContactForm[]>([]);
  const [contactFormInfo, setContactFormInfo] =
    React.useState<ContactForm | null>(null);
  const [status, setStatus] = React.useState(Status.Loading);
  const [paginateData, setPaginateData] = React.useState<PaginateResponse| null>(null)
  const [searchFilter, setSearchFilter] = React.useState<BodyParams>({
    filter: "",
    status: null
  })

  function setContactFormById(id: string) {
    setStatus(Status.Loading);
    const token = getCookie("esagel_token") || "";
    getContactFormById(token, id).then((response) => {
      if (response?.status===200) {
        setContactFormInfo(response?.doc || null);
        setStatus(Status.Ready);
      }
    });
  }

  async function getContactFormsByFilter(
    { filter="", status=null }: BodyParams,
    {limit, pageSize}: PaginateParams
    ): Promise<PaginateResponse> {
    const token = getCookie("esagel_token") || "";
    return getContactForms(token,{filter, status}, {limit, pageSize})
      .then((response:PaginateResponse) => {
        if(response?.status===200){
          const { docs: contactFormsObtained = [] } = response || {};
          setContactForms(contactFormsObtained);
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
        return response
      })
      .catch((error) => {
        setStatus(Status.Error);
        return error
      });
  }

  async function updateContactForm(id: string, contactForm: any):Promise<ContactFormResponse>  {
    setStatus(Status.Updating);
    const token = getCookie("esagel_token") || "";
    return putContactForm(token, id, contactForm)
      .then((response) => {
        if (response?.status === 201 || response?.status === 200) {
          Swal.fire({
            icon: "success",
            title: "¡Actualización Exitosa!",
            text: "Forma de contacto actualizada éxitosamente",
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

  async function deleteContactForm(id: string):Promise<ContactFormResponse> {
    setStatus(Status.Updating);
    const token = getCookie("esagel_token") || "";
    return putContactForm(token, id, { status: 0, isDelete: true })
      .then((response) => {
        if (response?.status === 200 || response?.status === 201) {
          setContactForms(
            contactForms.filter(
              (contactForm: ContactForm) => contactForm._id !== id
            )
          );
          const contactFormName = response?.doc?.name || "";
          Swal.fire({
            title: "¡Todo salió bien!",
            icon: "success",
            text: `Forma de Contacto ${contactFormName} eliminada con éxito`,
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

  async function registerContactForm(contactForm: any):Promise<ContactFormResponse> {
    const token = getCookie("esagel_token") || "";
    setStatus(Status.Updating);
    return postContactForm(token, contactForm)
      .then((response) => {
        if (response?.status === 200 || response?.status === 201) {
          Swal.fire({
            icon: "success",
            title: "¡Registro Exitoso!",
            text: "Forma de Contacto registrada éxitosamente",
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
    getContactFormsByFilter(searchFilter, {limit: 20, pageSize:index})
  }

  return {
    contactForms,
    getContactFormsByFilter,
    registerContactForm,
    updateContactForm,
    deleteContactForm,
    setContactFormById,
    contactFormInfo,
    paginateData,
    setSearchFilter,
    changePage,
    status,
  };
};
