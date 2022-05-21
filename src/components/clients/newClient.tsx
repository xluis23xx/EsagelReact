/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Link, useHistory } from "react-router-dom";
import useForm from "../../hooks/useForm";
import {
  formatDescription,
  formatDocument,
  formatEmail,
  formatNames,
  formatPhone,
  minBirthDay,
} from "../../utils/errors";
import { InputForm } from "../global-components/inputForm";

import { Client, Status, useClients } from "../../hooks/useClients";

import { useContactForms, ContactForm } from "../../hooks/useContactForms";
import {
  useProspectStatuses,
  ProspectusStatus,
} from "../../hooks/usePropectusStatus";
import {
  useProspectOrigins,
  ProspectusOrigin,
} from "../../hooks/useProspectusOrigin";
import { getUbigeo } from "../../utils/services";
import { useDocumentTypes, DocumentType } from "../../hooks/useDocuments";
import { SubmitButton } from "../global-components/globalButtons";
import CIcon from "@coreui/icons-react";
import { cilHamburgerMenu } from "@coreui/icons";

const NewClientComponent = () => {
  const { registerClient, status } = useClients();
  const { getAllDocumentTypes, documents } = useDocumentTypes();
  const { getAllContactForms, contactForms } = useContactForms();
  const { getAllProspectStatuses, prospectStatuses } = useProspectStatuses();
  const { getAllProspectOrigins, prospectOrigins } = useProspectOrigins();
  const [deparments, setDeparments] = React.useState([]);

  const history = useHistory();

  React.useEffect(() => {
    getAllDocumentTypes();
    getAllContactForms();
    getAllProspectOrigins();
    getAllProspectStatuses();
    getUbigeo("260000").then((departmentsArray: any) =>
      setDeparments(departmentsArray)
    );
  }, []);

  const stateSchema = {
    name: { value: "", error: "" },
    lastname: { value: "", error: "" },
    secondLastname: { value: "", error: "" },
    email: { value: "", error: "" },
    phoneNumber: { value: "", error: "" },
    address: { value: "", error: "" },
    documentType: { value: "", error: "" },
    documentNumber: { value: "", error: "" },
    birthdate: { value: "", error: "" },
    department: { value: "", error: "" },
    leadSource: { value: "", error: "" },
    prospectStatus: { value: "", error: "" },
    contactForm: { value: "", error: "" },
    profession: { value: "", error: "" },
    business: { value: "", error: "" },
  };

  const stateValidatorSchema = {
    name: {
      required: true,
      validator: formatNames(),
      min2caracts: true,
      invalidtext: true,
    },
    lastname: {
      required: true,
      validator: formatNames(),
      min2caracts: true,
      invalidtext: true,
    },
    secondLastname: {
      required: true,
      validator: formatNames(),
      min2caracts: true,
      invalidtext: true,
    },
    email: {
      required: true,
      validator: formatEmail(),
      invalidtext: true,
    },
    phoneNumber: { required: true, validator: formatPhone() },
    address: {
      required: true,
      validator: formatDescription(),
      min2caracts: true,
    },
    documentType: {
      required: true,
    },
    documentNumber: {
      required: true,
      validator: formatDocument(),
    },
    birthdate: { required: true, validator: minBirthDay() },
    department: { required: true },
    leadSource: { required: true },
    prospectStatus: { required: true },
    contactForm: { required: true },
    profession: { validator: formatNames(), min2caracts: true },
    business: { validator: formatDescription(), min2caracts: true },
  };

  const onSubmitForm = (data: Client) => {
    const client = {
      name: data.name || null,
      lastname: data.lastname || null,
      secondLastname: data.secondLastname || null,
      phoneNumber: data.phoneNumber || null,
      documentType: data.documentType || null,
      documentNumber: data.documentNumber || null,
      address: data.address || null,
      email: data.email || null,
      birthdate: data.birthdate || null,
      department: data.department || null,
      leadSource: data.leadSource || null,
      prospectStatus: data.prospectStatus || null,
      contactForm: data.contactForm || null,
      profession: data.profession || null,
      business: data.business || null,
      status: 1,
    };
    registerClient(client).then((response) => {
      if (response?.status === 200 || response?.status === 201) {
        history.push("/clientes");
      }
    });
  };

  const {
    values: {
      name,
      lastname,
      secondLastname,
      phoneNumber,
      documentType,
      documentNumber,
      address,
      email,
      birthdate,
      department,
      leadSource,
      prospectStatus,
      contactForm,
      profession,
      business,
    },
    errors: {
      name: nameError,
      lastname: lastnameError,
      secondLastname: secondLastnameError,
      phoneNumber: phoneNumberError,
      documentType: documentTypeError,
      documentNumber: documentNumberError,
      address: addressError,
      email: emailError,
      birthdate: birthdateError,
      department: departmentError,
      leadSource: leadSourceError,
      prospectStatus: prospectStatusError,
      contactForm: contactFormError,
      profession: professionError,
      business: businessError,
    },
    handleOnChange,
    handleOnSubmit,
    disable,
  } = useForm(stateSchema, stateValidatorSchema, onSubmitForm);

  return (
    <div className="row my-3">
      <div className="col-lg-12">
        <div className="card">
          <div className="card-header">
            <div className="row">
              <div className="col-12 col-sm-6 col-md-10 my-auto">
                <CIcon icon={cilHamburgerMenu} />
                &nbsp;NUEVO CLIENTE
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="col-sm-12">
              <div className="form-group">
                <label className="fw-bold">
                  Los campos con (*) son obligatorios
                </label>
                <br />
              </div>

              <form className="row" onSubmit={handleOnSubmit}>
                <div className="form-group mt-1 col-sm-6 col-xl-4">
                  <label className="form-label" htmlFor="name">
                    Nombres (*):
                  </label>
                  <InputForm
                    type="text"
                    required
                    placeholder="Nombres"
                    name="name"
                    maxLength={25}
                    value={name}
                    onChange={handleOnChange}
                    disabled={status === Status.Updating}
                    error={nameError}
                  />
                </div>

                <div className="form-group mt-1 col-sm-6 col-xl-4">
                  <label className="form-label" htmlFor="lastname">
                    Apellido Paterno (*):
                  </label>
                  <InputForm
                    type="text"
                    required
                    placeholder="Apellido Paterno"
                    maxLength={25}
                    name="lastname"
                    value={lastname}
                    onChange={handleOnChange}
                    disabled={status === Status.Updating}
                    error={lastnameError}
                  />
                </div>

                <div className="form-group mt-1 col-sm-6 col-xl-4">
                  <label className="form-label" htmlFor="secondLastname">
                    Apellido Materno (*):
                  </label>
                  <InputForm
                    type="text"
                    required
                    placeholder="Apellido Materno"
                    maxLength={25}
                    name="secondLastname"
                    value={secondLastname}
                    onChange={handleOnChange}
                    disabled={status === Status.Updating}
                    error={secondLastnameError}
                  />
                </div>
                <div className="form-group mt-1 col-sm-6 col-xl-4">
                  <label className="form-label" htmlFor="email">
                    Correo Personal (*):
                  </label>
                  <InputForm
                    type="email"
                    required
                    maxLength={60}
                    placeholder="Correo Personal"
                    name="email"
                    value={email}
                    onChange={handleOnChange}
                    disabled={status === Status.Updating}
                    error={emailError}
                  />
                </div>
                <div className="form-group mt-1 col-sm-6 col-xl-4">
                  <label className="form-label" htmlFor="documentType">
                    Tipo de Documento (*):
                  </label>
                  <select
                    id="documentType"
                    name="documentType"
                    required
                    value={documentType}
                    onChange={handleOnChange}
                    onBlur={handleOnChange}
                    disabled={status === Status.Updating}
                    className={`btn border-secondary btn-default w-100 ${
                      documentTypeError ? "border border-danger" : ""
                    }`}
                  >
                    <option value="">Seleccione</option>
                    {documents.length > 0
                      ? documents.map((pos: DocumentType) => {
                          if (pos?.operation === "persona") {
                            return (
                              <option key={pos.name} value={`${pos.name}`}>
                                {pos.name.toUpperCase()}
                              </option>
                            );
                          }
                          return null;
                        })
                      : null}
                  </select>
                </div>

                <div className="form-group mt-1 col-sm-6 col-xl-4">
                  <label className="form-label" htmlFor="documentNumber">
                    Número de Documento (*):
                  </label>
                  <InputForm
                    type="text"
                    required
                    maxLength={15}
                    placeholder="Nro de Documento"
                    name="documentNumber"
                    value={documentNumber}
                    onChange={handleOnChange}
                    disabled={status === Status.Updating}
                    error={documentNumberError}
                  />
                </div>
                <div className="form-group mt-1 col-sm-6 col-xl-4">
                  <label className="form-label" htmlFor="department">
                    Departamento (*):
                  </label>
                  <select
                    id="department"
                    name="department"
                    required
                    disabled={status === Status.Updating}
                    value={department}
                    onChange={handleOnChange}
                    onBlur={handleOnChange}
                    className={`btn border-secondary btn-default w-100 ${
                      departmentError ? "border border-danger" : ""
                    }`}
                  >
                    <option value="">Seleccione</option>
                    {deparments.length > 0
                      ? deparments.map((dep: [number, string]) => (
                          <option key={`${dep[0]}`} value={`${dep[0]}`}>
                            {dep[1]}
                          </option>
                        ))
                      : null}
                  </select>
                </div>
                <div className="form-group mt-1 col-sm-6 col-xl-4">
                  <label className="form-label" htmlFor="address">
                    Dirección (*):
                  </label>
                  <InputForm
                    type="text"
                    required
                    maxLength={100}
                    placeholder="Dirección"
                    name="address"
                    value={address}
                    onChange={handleOnChange}
                    disabled={status === Status.Updating}
                    error={addressError}
                  />
                </div>

                <div className="form-group mt-1 col-sm-6 col-xl-4">
                  <label className="form-label" htmlFor="phoneNumber">
                    Teléfono (*):
                  </label>
                  <InputForm
                    type="tel"
                    required
                    placeholder="Teléfono"
                    maxLength={9}
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={handleOnChange}
                    disabled={status === Status.Updating}
                    error={phoneNumberError}
                  />
                </div>

                <div className="form-group mt-1 col-sm-6 col-xl-4">
                  <label className="form-label" htmlFor="birthdate">
                    Fecha de Nacimiento (*):
                  </label>
                  <InputForm
                    type="date"
                    placeholder="Fecha de Nacimiento"
                    name="birthdate"
                    required
                    value={birthdate}
                    onChange={handleOnChange}
                    disabled={status === Status.Updating}
                    error={birthdateError}
                  />
                </div>
                <div className="form-group mt-1 col-sm-6 col-xl-4">
                  <label className="form-label" htmlFor="leadSource">
                    Origen de Prospecto (*):
                  </label>
                  <select
                    id="leadSource"
                    name="leadSource"
                    required
                    disabled={status === Status.Updating}
                    value={leadSource}
                    onChange={handleOnChange}
                    onBlur={handleOnChange}
                    className={`btn border-secondary btn-default w-100 ${
                      leadSourceError ? "border border-danger" : ""
                    }`}
                  >
                    <option value="">Seleccione</option>
                    {prospectOrigins.length > 0
                      ? prospectOrigins.map((ori: ProspectusOrigin) => (
                          <option key={ori.name} value={`${ori.name}`}>
                            {ori.name}
                          </option>
                        ))
                      : null}
                  </select>
                </div>
                <div className="form-group mt-1 col-sm-6 col-xl-4">
                  <label className="form-label" htmlFor="prospectStatus">
                    Estado de Prospecto (*):
                  </label>
                  <select
                    id="prospectStatus"
                    name="prospectStatus"
                    required
                    disabled={status === Status.Updating}
                    value={prospectStatus}
                    onChange={handleOnChange}
                    onBlur={handleOnChange}
                    className={`btn border-secondary btn-default w-100 ${
                      prospectStatusError ? "border border-danger" : ""
                    }`}
                  >
                    <option value="">Seleccione</option>
                    {prospectStatuses.length > 0
                      ? prospectStatuses.map((sta: ProspectusStatus) => (
                          <option key={sta.name} value={`${sta.name}`}>
                            {sta.name}
                          </option>
                        ))
                      : null}
                  </select>
                </div>
                <div className="form-group mt-1 col-sm-6 col-xl-4">
                  <label className="form-label" htmlFor="contactForm">
                    Medio de Contacto (*):
                  </label>
                  <select
                    id="contactForm"
                    name="contactForm"
                    required
                    disabled={status === Status.Updating}
                    value={contactForm}
                    onChange={handleOnChange}
                    onBlur={handleOnChange}
                    className={`btn border-secondary btn-default w-100 ${
                      contactFormError ? "border border-danger" : ""
                    }`}
                  >
                    <option value="">Seleccione</option>
                    {contactForms.length > 0
                      ? contactForms.map((cfo: ContactForm) => (
                          <option key={cfo.name} value={`${cfo.name}`}>
                            {cfo.name}
                          </option>
                        ))
                      : null}
                  </select>
                </div>
                <div className="form-group mt-1 col-sm-6 col-xl-4">
                  <label className="form-label" htmlFor="business">
                    Negocio:
                  </label>
                  <InputForm
                    type="text"
                    placeholder="Negocio"
                    maxLength={60}
                    name="business"
                    value={business}
                    onChange={handleOnChange}
                    disabled={status === Status.Updating}
                    error={businessError}
                  />
                </div>
                <div className="form-group mt-1 col-sm-6 col-xl-4">
                  <label className="form-label" htmlFor="profession">
                    Profesión:
                  </label>
                  <InputForm
                    type="text"
                    placeholder="Profesión"
                    maxLength={60}
                    name="profession"
                    value={profession}
                    onChange={handleOnChange}
                    disabled={status === Status.Updating}
                    error={professionError}
                  />
                </div>
                <div className="col-12" />
                <div className="form-group col-sm-6 col-xl-3 mt-3">
                  <SubmitButton
                    disabled={disable || status === Status.Updating}
                  >
                    {status === Status.Updating ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        &nbsp;Cargando...
                      </>
                    ) : (
                      "Registrar"
                    )}
                  </SubmitButton>
                </div>
                <div className="form-group col-sm-6 col-xl-3 mt-3">
                  <Link
                    to="/clientes"
                    className="btn btn-secondary text-white w-100"
                  >
                    Cancelar
                  </Link>
                </div>
              </form>
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewClientComponent;
