/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Link, useHistory, useParams } from "react-router-dom";
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
import { setFormatDate } from "../../utils/formats";
import { usePositions, Position } from "../../hooks/usePositions";
import { useDocumentTypes, DocumentType } from "../../hooks/useDocuments";
import { SubmitButton } from "../global-components/globalButtons";
import { cilHamburgerMenu } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { useFileUpload } from "../../hooks/useFileUpload";

const EditEmployeeComponent = () => {
  const { updateEmployee, setEmployeeById, employeeInfo, status } =
    useEmployees();
  const { getDocumentTypesByFilter, documents } = useDocumentTypes();
  const { getPositionsByFilter, positions } = usePositions();
  const {
    uploading: imageUploading,
    progress: imageProgress,
    showDocument: showImage,
    setShowDocument: setShowImage,
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
  // Context con las operaciones de firebase
  const { firebase } = React.useContext(FirebaseContext);
  const history = useHistory();

  const { id } = useParams<any>();

  React.useEffect(() => {
    if (!id) {
      history.push("/empleados");
    }
    getDocumentTypesByFilter({ filter: "", status: 1 }, { limit: 100 });
    getPositionsByFilter({ filter: "", status: 1 }, { limit: 100 });
    setEmployeeById(id);
  }, []);

  React.useEffect(() => {
    if (employeeInfo?.image) {
      setShowImage(employeeInfo.image);
    }
  }, [employeeInfo]);

  const stateSchema = {
    name: { value: null, error: "" },
    lastname: { value: null, error: "" },
    secondLastname: { value: null, error: "" },
    documentType: { value: null, error: "" },
    documentNumber: { value: null, error: "" },
    corporateEmail: { value: null, error: "" },
    personalEmail: { value: null, error: "" },
    address: { value: null, error: "" },
    phoneNumber: { value: null, error: "" },
    birthdate: { value: null, error: "" },
    image: { value: null, error: "" },
    position: { value: null, error: "" },
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
    position: { required: true },
  };

  const onSubmitForm = (data: Employee) => {
    const employee = {
      name: (data?.name ?? employeeInfo?.name) || null,
      lastname: (data?.lastname ?? employeeInfo?.lastname) || null,
      secondLastname:
        (data?.secondLastname ?? employeeInfo?.secondLastname) || null,
      phoneNumber: (data?.phoneNumber ?? employeeInfo?.phoneNumber) || null,
      address: (data?.address ?? employeeInfo?.address) || null,
      personalEmail:
        (data?.personalEmail ?? employeeInfo?.personalEmail) || null,
      image: showImage || null,
      position: (data?.position ?? employeeInfo?.position?.name) || null,
      status: 1,
    };
    updateEmployee(id, employee).then((response) => {
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
                &nbsp;EDITAR EMPLEADO
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
                        imageAlt: (employeeInfo?.name ?? name) || "",
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
                    maxLength={25}
                    placeholder="Nombres"
                    name="name"
                    value={(name ?? employeeInfo?.name) || ""}
                    onChange={handleOnChange}
                    disabled={
                      status === Status.Loading || status === Status.Updating
                    }
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
                    maxLength={25}
                    placeholder="Apellido Paterno"
                    name="lastname"
                    value={(lastname ?? employeeInfo?.lastname) || ""}
                    onChange={handleOnChange}
                    disabled={
                      status === Status.Loading || status === Status.Updating
                    }
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
                    maxLength={25}
                    placeholder="Apellido Materno"
                    name="secondLastname"
                    value={
                      (secondLastname ?? employeeInfo?.secondLastname) || ""
                    }
                    onChange={handleOnChange}
                    disabled={
                      status === Status.Loading || status === Status.Updating
                    }
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
                    value={
                      (documentType ?? employeeInfo?.documentType?.name) || ""
                    }
                    onChange={handleOnChange}
                    onBlur={handleOnChange}
                    disabled={true}
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
                    value={
                      (documentNumber ?? employeeInfo?.documentNumber) || ""
                    }
                    onChange={handleOnChange}
                    disabled={true}
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
                    value={
                      (corporateEmail ?? employeeInfo?.corporateEmail) || ""
                    }
                    onChange={handleOnChange}
                    disabled={true}
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
                    value={(address ?? employeeInfo?.address) || ""}
                    onChange={handleOnChange}
                    disabled={
                      status === Status.Loading || status === Status.Updating
                    }
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
                    maxLength={9}
                    placeholder="Teléfono"
                    name="phoneNumber"
                    value={(phoneNumber ?? employeeInfo?.phoneNumber) || ""}
                    onChange={handleOnChange}
                    disabled={
                      status === Status.Loading || status === Status.Updating
                    }
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
                    value={(personalEmail ?? employeeInfo?.personalEmail) || ""}
                    onChange={handleOnChange}
                    disabled={
                      status === Status.Loading || status === Status.Updating
                    }
                    error={personalEmailError}
                  />
                </div>
                <div className="form-group mt-1 col-sm-6 col-xl-4">
                  <label className="form-label" htmlFor="birthdate">
                    Fecha de Nacimiento *
                  </label>
                  <InputForm
                    type="date"
                    required
                    placeholder="Fecha de Nacimiento"
                    name="birthdate"
                    value={
                      (birthdate ??
                        setFormatDate({
                          date: employeeInfo?.birthdate,
                          order: 1,
                        })) ||
                      ""
                    }
                    max={setFormatDate({
                      order: 1,
                      date: new Date(),
                      separator: "-",
                    })}
                    onChange={handleOnChange}
                    disabled={true}
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
                    <div className="text-black p-1 text-center my-1">
                      {imageProgress} %
                    </div>
                  )}
                  {imageErrorMessage && (
                    <div className="text-red p-1 text-center my-1">
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
                    disabled={
                      status === Status.Loading || status === Status.Updating
                    }
                    value={(position ?? employeeInfo?.position?.name) || ""}
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
                        : false ||
                          status === Status.Loading ||
                          status === Status.Updating
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
                      "Actualizar"
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

export default EditEmployeeComponent;
