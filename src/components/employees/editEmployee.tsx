/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import useForm from "../../hooks/useForm";
import {
  formatDescription,
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

const EditEmployeeComponent = () => {
  const { updateEmployee, setEmployeeById, employeeProfile, status } =
    useEmployees();
  const { getAllDocumentTypes, documents } = useDocumentTypes();
  const { getAllPositions, positions } = usePositions();
  // Context con las operaciones de firebase
  const { firebase } = React.useContext(FirebaseContext);
  const history = useHistory();

  // state para las imagenes
  const [uploading, setUploading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [urlImage, setUrlImage] = React.useState(null);
  const [showImage, setShowImage] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const { id } = useParams<any>();

  React.useEffect(() => {
    if (!id) {
      history.push("/empleados");
    }
    getAllDocumentTypes();
    getAllPositions();
    setEmployeeById(id);
  }, []);

  React.useEffect(() => {
    if (employeeProfile?.image) {
      setShowImage(employeeProfile?.image);
    }
  }, [employeeProfile]);

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
      validator: {
        func: (value: string) => !value.match(/00000000|12345678/),
        error: "Formato inválido.",
      },
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
      name: (data?.name ?? employeeProfile?.name) || null,
      lastname: (data?.lastname ?? employeeProfile?.lastname) || null,
      secondLastname:
        (data?.secondLastname ?? employeeProfile?.secondLastname) || null,
      phoneNumber: (data?.phoneNumber ?? employeeProfile?.phoneNumber) || null,
      //   documentType:
      //     (data?.documentType ?? employeeProfile?.documentType?.name) || null,
      //   documentNumber:
      //     (data?.documentNumber ?? employeeProfile?.documentNumber) || null,
      address: (data?.address ?? employeeProfile?.address) || null,
      //   corporateEmail:
      //     (data?.corporateEmail ?? employeeProfile?.corporateEmail) || null,
      personalEmail:
        (data?.personalEmail ?? employeeProfile?.personalEmail) || null,
      image: showImage || null,
      //   birthdate:
      //     (data?.birthdate ?? setBirtdate(employeeProfile?.birthdate)) || null,
      position: (data?.position ?? employeeProfile?.position?.name) || null,
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

  // Todo sobre las imagenes
  const handleUploadStart = () => {
    setProgress(0);
    setUploading(true);
    if (urlImage) {
      setUrlImage("");
    }
  };

  const handleUploadError = (error: string) => {
    setUploading(false);
    setErrorMessage(error);
    setTimeout(() => {
      setErrorMessage("");
    }, 3000);
  };

  const handleUploadSuccess = async (nam: string) => {
    setProgress(100);
    setUploading(false);

    // Almacenar la URL de destino
    const url = await firebase.storage
      .ref("employees")
      .child(nam)
      .getDownloadURL();

    setUrlImage(url);
    setTimeout(() => {
      setUrlImage("");
    }, 3000);
    setShowImage(url);
  };

  const handleProgress = (prog) => {
    setProgress(prog);
  };

  return (
    <div className="row mt-3">
      <div className="col-lg-12">
        <div className="card">
          <div className="card-header">
            <div className="row">
              <div className="col-12 col-sm-6 col-md-10 my-auto">
                <i className="fa fa-align-justify"></i>EDITAR EMPLEADO
              </div>
              {showImage ? (
                <div className="col-12 col-sm-6 col-md-2 text-end">
                  <button
                    className="btn btn-dark w-100"
                    onClick={() =>
                      Swal.fire({
                        imageUrl: showImage,
                        imageHeight: "auto",
                        imageAlt: "imagen del empleado",
                      })
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
                <div className="form-group mt-1 col-sm-6 col-md-4">
                  <label htmlFor="name">Nombres (*):</label>
                  <InputForm
                    type="text"
                    required
                    maxLength={25}
                    placeholder="Nombres"
                    name="name"
                    value={(name ?? employeeProfile?.name) || ""}
                    onChange={handleOnChange}
                    disabled={
                      status === Status.Loading || status === Status.Updating
                    }
                    error={nameError}
                  />
                </div>

                <div className="form-group mt-1 col-sm-6 col-md-4">
                  <label htmlFor="lastname">Apellido Paterno (*):</label>
                  <InputForm
                    type="text"
                    required
                    maxLength={25}
                    placeholder="Apellido Paterno"
                    name="lastname"
                    value={(lastname ?? employeeProfile?.lastname) || ""}
                    onChange={handleOnChange}
                    disabled={
                      status === Status.Loading || status === Status.Updating
                    }
                    error={lastnameError}
                  />
                </div>

                <div className="form-group mt-1 col-sm-6 col-md-4">
                  <label htmlFor="secondLastname">Apellido Materno (*):</label>
                  <InputForm
                    type="text"
                    required
                    maxLength={25}
                    placeholder="Apellido Materno"
                    name="secondLastname"
                    value={
                      (secondLastname ?? employeeProfile?.secondLastname) || ""
                    }
                    onChange={handleOnChange}
                    disabled={
                      status === Status.Loading || status === Status.Updating
                    }
                    error={secondLastnameError}
                  />
                </div>

                <div className="form-group mt-1 col-sm-6 col-md-4">
                  <label htmlFor="documentType">Tipo de Documento (*):</label>
                  <select
                    id="documentType"
                    name="documentType"
                    required
                    value={
                      (documentType ?? employeeProfile?.documentType?.name) ||
                      ""
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
                                {pos.name.toUpperCase()}
                              </option>
                            );
                          }
                          return null;
                        })
                      : null}
                  </select>
                </div>

                <div className="form-group mt-1 col-sm-6 col-md-4">
                  <label htmlFor="documentNumber">
                    Número de Documento (*):
                  </label>
                  <InputForm
                    type="text"
                    required
                    maxLength={15}
                    placeholder="Nro de Documento"
                    name="documentNumber"
                    value={
                      (documentNumber ?? employeeProfile?.documentNumber) || ""
                    }
                    onChange={handleOnChange}
                    disabled={true}
                    error={documentNumberError}
                  />
                </div>

                <div className="form-group mt-1 col-sm-6 col-md-4">
                  <label htmlFor="corporateEmail">
                    Correo Corporativo (*):
                  </label>
                  <InputForm
                    type="email"
                    required
                    maxLength={60}
                    placeholder="Correo Corporativo"
                    name="corporateEmail"
                    value={
                      (corporateEmail ?? employeeProfile?.corporateEmail) || ""
                    }
                    onChange={handleOnChange}
                    disabled={true}
                    error={corporateEmailError}
                  />
                </div>
                <div className="form-group mt-1 col-sm-6 col-md-4">
                  <label htmlFor="address">Dirección (*):</label>
                  <InputForm
                    type="text"
                    required
                    maxLength={100}
                    placeholder="Dirección"
                    name="address"
                    value={(address ?? employeeProfile?.address) || ""}
                    onChange={handleOnChange}
                    disabled={
                      status === Status.Loading || status === Status.Updating
                    }
                    error={addressError}
                  />
                </div>

                <div className="form-group mt-1 col-sm-6 col-md-4">
                  <label htmlFor="phoneNumber">Teléfono (*):</label>
                  <InputForm
                    type="tel"
                    required
                    maxLength={9}
                    placeholder="Teléfono"
                    name="phoneNumber"
                    value={(phoneNumber ?? employeeProfile?.phoneNumber) || ""}
                    onChange={handleOnChange}
                    disabled={
                      status === Status.Loading || status === Status.Updating
                    }
                    error={phoneNumberError}
                  />
                </div>

                <div className="form-group mt-1 col-sm-6 col-md-4">
                  <label htmlFor="personalEmail">Correo personal (*):</label>
                  <InputForm
                    type="email"
                    required
                    maxLength={60}
                    placeholder="Correo Personal"
                    name="personalEmail"
                    value={
                      (personalEmail ?? employeeProfile?.personalEmail) || ""
                    }
                    onChange={handleOnChange}
                    disabled={
                      status === Status.Loading || status === Status.Updating
                    }
                    error={personalEmailError}
                  />
                </div>
                <div className="form-group mt-1 col-sm-6 col-md-4">
                  <label htmlFor="birthdate">Fecha de Nacimiento (*):</label>
                  <InputForm
                    type="date"
                    required
                    placeholder="Fecha de Nacimiento"
                    name="birthdate"
                    value={
                      (birthdate ??
                        setFormatDate({
                          date: employeeProfile?.birthdate,
                          order: 1,
                        })) ||
                      ""
                    }
                    onChange={handleOnChange}
                    disabled={true}
                    error={birthdateError}
                  />
                </div>
                <div className="form-group mt-1 col-sm-6 col-md-4">
                  <label htmlFor="image">Foto:</label>
                  <FileUploader
                    accept="image/*"
                    id="imagen"
                    name="imagen"
                    randomizeFilename
                    storageRef={firebase.storage.ref("employees")}
                    onUploadStart={handleUploadStart}
                    onUploadError={handleUploadError}
                    className="form-control"
                    onUploadSuccess={handleUploadSuccess}
                    onProgress={handleProgress}
                  />
                  {uploading && (
                    <div className="text-black p-1 text-center my-1">
                      {progress} %
                    </div>
                  )}
                  {errorMessage && (
                    <div className="text-red p-1 text-center my-1">
                      {errorMessage}
                    </div>
                  )}
                  {urlImage && (
                    <p className="text-black p-1 text-center my-1">
                      La imagen se subió correctamente
                    </p>
                  )}
                </div>

                <div className="form-group mt-1 col-sm-6 col-md-4">
                  <label htmlFor="position">Cargo (*):</label>
                  <select
                    id="position"
                    name="position"
                    required
                    disabled={
                      status === Status.Loading || status === Status.Updating
                    }
                    value={(position ?? employeeProfile?.position?.name) || ""}
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
                <div className="form-group col-sm-6 col-md-4 mt-3">
                  <button
                    type="submit"
                    disabled={
                      disable || uploading || errorMessage ? true : false
                    }
                    className="btn btn-block btn-primary w-100"
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
                  </button>
                </div>
                <div className="form-group col-sm-6 col-md-4 mt-3">
                  <Link
                    to="/empleados"
                    className="btn btn-block btn-secondary w-100"
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
