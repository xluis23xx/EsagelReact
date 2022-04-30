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

export enum Status {
  Loading,
  Ready,
  Updating,
  Error,
}

export const useContactForms = () => {
  const [contactForms, setContactForms] = React.useState<ContactForm[]>([]);
  const [contactFormInfo, setContactFormInfo] =
    React.useState<ContactForm>(null);
  const [status, setStatus] = React.useState(Status.Loading);

  function setContactFormById(id: string) {
    setStatus(Status.Loading);

    const token = getCookie("esagel_token") || "";
    getContactFormById(token, id).then((response) => {
      if (response?._id) {
        setStatus(Status.Ready);
        setContactFormInfo(response);
      }
    });
  }

  function getAllContactForms() {
    const token = getCookie("esagel_token") || "";
    getContactForms(token)
      .then((response) => {
        const enableContactForms =
          response.filter(
            (contactForm: ContactForm) => contactForm.status === 1
          ) || [];
        setContactForms(enableContactForms);
        setStatus(Status.Ready);
      })
      .catch(() => {
        setStatus(Status.Error);
      });
  }

  async function updateContactForm(id: string, contactForm: any) {
    const token = getCookie("esagel_token") || "";
    return putContactForm(token, id, contactForm)
      .then((response) => {
        if (response?.status === 201 || response?.status === 200) {
          Swal.fire({
            icon: "success",
            title: "¡Actualización Exitosa!",
            text: "Forma de contacto actualizada éxitosamente",
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

  function deleteContactForm(id: string) {
    setStatus(Status.Updating);
    const token = getCookie("esagel_token") || "";
    putContactForm(token, id, { status: 0, isDelete: true })
      .then((response) => {
        if (response?.status === 200 || response?.status === 201) {
          setContactForms(
            contactForms.filter(
              (contactForm: ContactForm) => contactForm._id !== id
            )
          );
          const contactFormName = response?.updateContact?.name || "";
          Swal.fire({
            title: "¡Todo salió bien!",
            icon: "success",
            text: `Forma de Contacto ${contactFormName} eliminada con éxito`,
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

  async function registerContactForm(contactForm: any) {
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
    contactForms,
    getAllContactForms,
    registerContactForm,
    updateContactForm,
    deleteContactForm,
    setContactFormById,
    contactFormInfo,
    status,
  };
};
