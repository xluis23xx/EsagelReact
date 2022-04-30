import React from "react";
import { Link, useHistory } from "react-router-dom";
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

const NewEmployeeComponent = () => {
  const { registerEmployee, status } = useEmployees();
  const history = useHistory();

  // state para las imagenes
  const [uploading, setUploading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [urlImage, setUrlImage] = React.useState("");
  const [showImage, setShowImage] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  // Context con las operaciones de firebase
  const { firebase } = React.useContext(FirebaseContext);

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

  // Todo sobre las imagenes
  const handleUploadStart = () => {
    setProgress(0);
    setUploading(true);
    if (urlImage) {
      setUrlImage("");
    }
    if (showImage) {
      setShowImage("");
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
                <i className="fa fa-align-justify"></i>NUEVO EMPLEADO
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
                <div className="form-group col-sm-6 col-md-4">
                  <label htmlFor="name">Nombres (*):</label>
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

                <div className="form-group col-sm-6 col-md-4">
                  <label htmlFor="lastname">Apellido Paterno (*):</label>
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

                <div className="form-group col-sm-6 col-md-4">
                  <label htmlFor="secondLastname">Apellido Materno (*):</label>
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

                <div className="form-group col-sm-6 col-md-4">
                  <label htmlFor="documentType">Tipo de Documento (*):</label>
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
                    <option value="DNI">DNI</option>
                    <option value="Carnet Extranjeria">
                      CARNET DE EXTRANJERIA
                    </option>
                    <option value="CIP">CIP</option>
                  </select>
                </div>

                <div className="form-group col-sm-6 col-md-4">
                  <label htmlFor="documentNumber">
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

                <div className="form-group col-sm-6 col-md-4">
                  <label htmlFor="corporateEmail">
                    Correo Corporativo (*):
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
                <div className="form-group col-sm-6 col-md-4">
                  <label htmlFor="address">Dirección (*):</label>
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

                <div className="form-group col-sm-6 col-md-4">
                  <label htmlFor="phoneNumber">Teléfono (*):</label>
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

                <div className="form-group col-sm-6 col-md-4">
                  <label htmlFor="personalEmail">Correo personal (*):</label>
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

                <div className="form-group col-sm-6 col-md-4">
                  <label htmlFor="birthdate">Fecha de Nacimiento (*):</label>
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

                <div className="form-group col-sm-6 col-md-4">
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
                    <div className="text-dark p-1 text-center my-1">
                      {progress} %
                    </div>
                  )}
                  {errorMessage && (
                    <div className="text-danger p-1 text-center my-1">
                      {errorMessage}
                    </div>
                  )}
                  {urlImage && (
                    <p className="text-black p-1 text-center my-1">
                      La imagen se subió correctamente
                    </p>
                  )}
                </div>

                <div className="form-group col-sm-6 col-md-4">
                  <label htmlFor="position">Cargo (*):</label>
                  <select
                    id="position"
                    name="position"
                    required
                    disabled={status === Status.Updating}
                    value={position}
                    onChange={handleOnChange}
                    onBlur={handleOnChange}
                    className={`btn border-secondary btn-default w-100 ${
                      positionError ? "border border-danger" : ""
                    }`}
                  >
                    <option value="">Seleccione</option>
                    <option value="Asistente">Asistente</option>
                    <option value="Vendedor">Vendedor</option>
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
                    {status === Status.Updating ? "Cargando" : "Registrar"}
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

export default NewEmployeeComponent;
