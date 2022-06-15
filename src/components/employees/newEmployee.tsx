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

import FileUploader from "react-firebase-file-uploader";

import { Employee, Status, useEmployees } from "../../hooks/useEmployees";
import { FirebaseContext } from "../../firebase";
import Swal from "sweetalert2";
import { usePositions, Position } from "../../hooks/usePositions";
import { useDocumentTypes, DocumentType } from "../../hooks/useDocuments";
import { useFileUpload } from "../../hooks/useFileUpload";
import { SubmitButton } from "../global-components/globalButtons";
import CIcon from "@coreui/icons-react";
import { cilHamburgerMenu } from "@coreui/icons";
import { setFormatDate } from "../../utils/formats";

const NewEmployeeComponent = () => {
  const { registerEmployee, status } = useEmployees();
  const { getAllDocumentTypes, documents } = useDocumentTypes();
  const { getAllPositions, positions } = usePositions();
  const {
    uploading: imageUploading,
    progress: imageProgress,
    setShowDocument: setShowImage,
    showDocument: showImage,
    urlDocument: urlImage,
    errorMessage: imageErrorMessage,
    handleUploadError: handleUploadImageError,
    handleUploadStart: handleUploadImageStart,
    handleUploadSuccess: handleUploadImageSuccess,
    handleProgress: handleImageProgress,
  } = useFileUpload({
    directory: "employees",
    timerMessage: 3000,
  });
  const history = useHistory();

  // Context con las operaciones de firebase
  const { firebase } = React.useContext(FirebaseContext);

  React.useEffect(() => {
    getAllDocumentTypes();
    getAllPositions();
  }, []);

  const stateSchema = {
    name: { value: "", error: "" },
    lastname: { value: "", error: "" },
    secondLastname: { value: "", error: "" },
    documentType: { value: "", error: "" },
    documentNumber: { value: "", error: "" },
    corporateEmail: { value: "", error: "" },
    personalEmail: { value: "", error: "" },
    address: { value: "", error: "" },
    phoneNumber: { value: "", error: "" },
    birthdate: { value: "", error: "" },
    image: { value: "", error: "" },
    position: { value: "", error: "" },
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
    documentType: {
      required: true,
    },
    documentNumber: {
      required: true,
      validator: formatDocument(),
    },
    corporateEmail: {
      required: true,
      validator: formatEmail(),
    },
    personalEmail: {
      required: true,
      validator: formatEmail(),
    },
    address: {
      required: true,
      validator: formatDescription(),
      min2caracts: true,
    },
    phoneNumber: { required: true, validator: formatPhone() },
    birthdate: { required: true, validator: minBirthDay() },
    image: {
      required: false,
      validator: {
        func: (value: string) =>
          /.jpg|.png|.jpeg/.test(value) || value.length === 0,
        error: "Formato inválido.",
      },
    },
    position: { required: true },
  };

  const onSubmitForm = (data: Employee) => {
    const employee = {
      name: data.name || null,
      lastname: data.lastname || null,
      secondLastname: data.secondLastname || null,
      phoneNumber: data.phoneNumber || null,
      documentType: data.documentType || null,
      documentNumber: data.documentNumber || null,
      address: data.address || null,
      corporateEmail: data.corporateEmail || null,
      personalEmail: data.personalEmail || null,
      image: showImage || null,
      birthdate: data.birthdate || null,
      position: data.position || null,
      status: 1,
    };
    registerEmployee(employee).then((response) => {
      if (response?.status === 200 || response?.status === 201) {
        history.push("/empleados");
      }
    });
  };

  const {
    values: {
      name,
      lastname,
      secondLastname,
      documentType,
      documentNumber,
      corporateEmail,
      personalEmail,
      address,
      phoneNumber,
      birthdate,
      position,
    },
    errors: {
      name: nameError,
      lastname: lastnameError,
      secondLastname: secondLastnameError,
      documentType: documentTypeError,
      documentNumber: documentNumberError,
      corporateEmail: corporateEmailError,
      personalEmail: personalEmailError,
      address: addressError,
      phoneNumber: phoneNumberError,
      birthdate: birthdateError,
      position: positionError,
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
                &nbsp;NUEVO EMPLEADO
              </div>
              {showImage ? (
                <div className="col-12 col-sm-6 col-md-2 text-end">
                  <button
                    className="btn btn-dark w-100"
                    onClick={() =>
                      Swal.fire({
                        imageUrl: showImage,
                        imageHeight: "auto",
                        padding: "20",
                        imageAlt: name || "",
                        confirmButtonText: "Cerrar",
                        confirmButtonColor: "#4f5d73",
                        showDenyButton: true,
                        denyButtonText: "Limpiar",
                        denyButtonColor: "#9da5b1",
                      }).then((result) =>
                        result.isDenied ? setShowImage("") : null
                      )
                    }
                  >
                    Ver Foto
                  </button>
                </div>
              ) : null}
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
                    Nombres *
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
                    Apellido Paterno *
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
                    Apellido Materno *
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
                  <label className="form-label" htmlFor="documentType">
                    Tipo de Documento *
                  </label>
                  <select
                    id="documentType"
                    name="documentType"
                    required
                    value={documentType || ""}
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
                                {pos?.name?.toUpperCase()}
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
                    Número de Documento *
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
                  <label className="form-label" htmlFor="corporateEmail">
                    Correo Corporativo *
                  </label>
                  <InputForm
                    type="email"
                    required
                    maxLength={60}
                    placeholder="Correo Corporativo"
                    name="corporateEmail"
                    value={corporateEmail}
                    onChange={handleOnChange}
                    disabled={status === Status.Updating}
                    error={corporateEmailError}
                  />
                </div>
                <div className="form-group mt-1 col-sm-6 col-xl-4">
                  <label className="form-label" htmlFor="address">
                    Dirección *
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
                    Teléfono *
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
                  <label className="form-label" htmlFor="personalEmail">
                    Correo personal *
                  </label>
                  <InputForm
                    type="email"
                    required
                    maxLength={60}
                    placeholder="Correo Personal"
                    name="personalEmail"
                    value={personalEmail}
                    onChange={handleOnChange}
                    disabled={status === Status.Updating}
                    error={personalEmailError}
                  />
                </div>

                <div className="form-group mt-1 col-sm-6 col-xl-4">
                  <label className="form-label" htmlFor="birthdate">
                    Fecha de Nacimiento *
                  </label>
                  <InputForm
                    type="date"
                    placeholder="Fecha de Nacimiento"
                    name="birthdate"
                    required
                    value={birthdate}
                    onChange={handleOnChange}
                    max={setFormatDate({
                      order: 1,
                      date: new Date(),
                      separator: "-",
                    })}
                    disabled={status === Status.Updating}
                    error={birthdateError}
                  />
                </div>

                <div className="form-group mt-1 col-sm-6 col-xl-4">
                  <label className="form-label" htmlFor="image">
                    Foto:
                  </label>
                  <FileUploader
                    accept="image/*"
                    id="imagen"
                    name="imagen"
                    randomizeFilename
                    storageRef={firebase.storage.ref("employees")}
                    onUploadStart={handleUploadImageStart}
                    onUploadError={handleUploadImageError}
                    className="form-control"
                    onUploadSuccess={handleUploadImageSuccess}
                    onProgress={handleImageProgress}
                  />
                  {imageUploading && (
                    <div className="text-dark p-1 text-center my-1">
                      {imageProgress} %
                    </div>
                  )}
                  {imageErrorMessage && (
                    <div className="text-danger p-1 text-center my-1">
                      {imageErrorMessage}
                    </div>
                  )}
                  {urlImage && (
                    <p className="text-black p-1 text-center my-1">
                      La imagen se subió correctamente
                    </p>
                  )}
                </div>

                <div className="form-group mt-1 col-sm-6 col-xl-4">
                  <label className="form-label" htmlFor="position">
                    Cargo *
                  </label>
                  <select
                    id="position"
                    name="position"
                    required
                    disabled={status === Status.Updating}
                    value={position || ""}
                    onChange={handleOnChange}
                    onBlur={handleOnChange}
                    className={`btn border-secondary btn-default w-100 ${
                      positionError ? "border border-danger" : ""
                    }`}
                  >
                    <option value="">Seleccione</option>
                    {positions.length > 0
                      ? positions.map((pos: Position) => (
                          <option key={pos.name} value={`${pos.name}`}>
                            {pos.name}
                          </option>
                        ))
                      : null}
                  </select>
                </div>
                <div className="col-12" />
                <div className="form-group col-sm-6 col-xl-3 mt-3">
                  <SubmitButton
                    disabled={
                      disable || imageUploading || imageErrorMessage
                        ? true
                        : false || status === Status.Updating
                    }
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
                    to="/empleados"
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

export default NewEmployeeComponent;
