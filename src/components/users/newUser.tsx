import React from "react";
import { Link, useHistory } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { formatEmail, formatNames } from "../../utils/errors";

import { User, Status, useUsers } from "../../hooks/useUsers";
import CIcon from "@coreui/icons-react";

import { SearchButton, SubmitButton } from "../global-components/globalButtons";
import { Employee, useEmployees } from "../../hooks/useEmployees";
import FileUploader from "react-firebase-file-uploader";

import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import { cilCheckCircle, cilPencil, cilSearch } from "@coreui/icons";
import { FirebaseContext } from "../../firebase";
import Swal from "sweetalert2";

const NewUserComponent = () => {
  const { registerUser, status } = useUsers();

  const {
    searchEmployeesByName,
    employees,
    employeeProfile,
    setEmployeeById,
    cleanEmployeeProfile,
  } = useEmployees();

  const [visible, setVisible] = React.useState(false);

  const [selectedEmployee, setSelectedEmployee] =
    React.useState<Employee>(null);

  const [showEmployeeError, setShowEmployeeError] =
    React.useState<boolean>(false);

  const [selectedRoles, setSelectedRoles] = React.useState<string[]>([]);
  const [showRolesError, setShowRolesError] = React.useState<boolean>(false);

  const [enableCustomUsername, setEnableCustomUsername] =
    React.useState<boolean>(false);

  // state para las imagenes
  const [uploading, setUploading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [urlImage, setUrlImage] = React.useState("");
  const [showImage, setShowImage] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  // Context con las operaciones de firebase
  const { firebase } = React.useContext(FirebaseContext);

  const history = useHistory();

  const stateSchema = {
    username: { value: "", error: "" },
    status: { value: "", error: "" },
  };

  React.useEffect(() => {
    setSelectedEmployee(employeeProfile);
  }, [employeeProfile]);

  const stateValidatorSchema = {
    username: {
      validator: formatEmail(),
    },
    status: {
      required: true,
    },
  };

  const onSubmitForm = (data: User) => {
    const user = {
      employee: selectedEmployee?._id || null,
      username: enableCustomUsername
        ? data.username
        : selectedEmployee?.corporateEmail || null,
      roles: selectedRoles || [],
      status: data?.status || 0,
      image: showImage || null,
    };
    registerUser(user).then((response) => {
      if (response?.status === 200 || response?.status === 201) {
        history.push("/usuarios");
      }
    });
  };

  const validators = {
    required: false,
    validator: formatNames(),
    invalidtext: true,
  };

  const {
    values: { username, status: statusForm },
    errors: { status: statusFormError },
    handleOnChange,
    handleOnSubmit,
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
      .ref("usuarios")
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

  const handleSearch = (data) => {
    searchEmployeesByName(data.search);
  };

  return (
    <div className="row mt-3">
      <div className="col-lg-12">
        <div className="card">
          <div className="card-header">
            <div className="row">
              <div className="col-12 col-sm-6 col-md-10 my-auto">
                <i className="fa fa-align-justify"></i>NUEVO USUARIO
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
                  <label htmlFor="employee">Empleado (*):</label>
                  <div className="d-flex mt-1">
                    <input
                      required
                      className={`w-100 ${
                        showEmployeeError ? "border border-danger" : ""
                      }`}
                      placeholder="Seleccione..."
                      name="employee"
                      value={
                        `${
                          selectedEmployee?.name ? selectedEmployee?.name : ""
                        }${
                          selectedEmployee?.lastname
                            ? ` ${selectedEmployee?.name}`
                            : ""
                        }` || ""
                      }
                      onChange={(e) => {
                        if (e.target.value) {
                          setShowEmployeeError(true);
                        } else {
                          setShowEmployeeError(false);
                        }
                      }}
                      onBlur={(e) => {
                        if (e.target.value) {
                          setShowEmployeeError(true);
                        } else {
                          setShowEmployeeError(false);
                        }
                      }}
                      disabled={true}
                    />
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => setVisible(true)}
                    >
                      <CIcon icon={cilSearch}></CIcon>
                    </button>
                  </div>
                  {showEmployeeError ? (
                    <p
                      className="w-100 pb-0 mb-0 text-danger"
                      style={{ fontSize: 15 }}
                    >
                      Este campo es requerido.
                    </p>
                  ) : null}
                </div>
                <div className="form-group mt-1 col-sm-6 col-md-4">
                  <label htmlFor="status">Estado (*):</label>
                  <select
                    id="status"
                    name="status"
                    required
                    disabled={status === Status.Updating}
                    value={statusForm || ""}
                    onChange={handleOnChange}
                    onBlur={handleOnChange}
                    className={`btn border-secondary btn-default w-100 ${
                      statusFormError ? "border border-danger" : ""
                    }`}
                  >
                    <option value="">Seleccione</option>
                    <option value="0">Inactivo</option>
                    <option value="1">Activo</option>
                  </select>
                </div>

                <div className="form-group mt-1 col-sm-6 col-md-4">
                  <label htmlFor="roles">Roles (*):</label>
                  <select
                    id="roles"
                    name="roles"
                    required
                    multiple
                    disabled={status === Status.Updating}
                    onChange={(e) => {
                      let values = [];
                      Array.from(e.target.selectedOptions).map((val) =>
                        values.push(val.value)
                      );
                      if (values.length === 0) {
                        setShowRolesError(true);
                      } else {
                        setShowRolesError(false);
                      }
                      setSelectedRoles(values);
                    }}
                    onBlur={() => {
                      if (selectedRoles.length === 0) {
                        setShowRolesError(true);
                      } else {
                        setShowRolesError(false);
                      }
                    }}
                    className={`btn border-secondary form-control btn-default w-100 ${
                      showRolesError ? "border border-danger" : ""
                    }`}
                  >
                    <option value="user">Usuario</option>
                    <option value="admin">Administrador</option>
                    <option value="moderator">Moderador</option>
                  </select>
                  {showRolesError ? (
                    <p
                      className="w-100 pb-0 mb-0 text-danger"
                      style={{ fontSize: 15 }}
                    >
                      Este campo es requerido.
                    </p>
                  ) : null}
                </div>
                <div className="form-group mt-1 col-sm-6 col-md-4">
                  <label htmlFor="username">Usuario (*):</label>
                  <div className="d-flex mt-1">
                    <input
                      id="username"
                      type="text"
                      required
                      className="w-100"
                      placeholder="Usuario"
                      name="username"
                      value={
                        enableCustomUsername
                          ? username
                          : selectedEmployee?.corporateEmail || ""
                      }
                      onChange={handleOnChange}
                      onBlur={handleOnChange}
                      disabled={!enableCustomUsername ? true : false}
                    />
                    <button
                      type="button"
                      className="btn btn-warning"
                      onClick={() =>
                        setEnableCustomUsername(!enableCustomUsername)
                      }
                    >
                      <CIcon icon={cilPencil}></CIcon>
                    </button>
                  </div>
                </div>
                <div className="form-group mt-1 col-sm-6 col-md-4">
                  <label htmlFor="image">Foto:</label>
                  <FileUploader
                    accept="image/*"
                    id="imagen"
                    name="imagen"
                    randomizeFilename
                    storageRef={firebase.storage.ref("usuarios")}
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
                <div className="col-12" />
                <div className="form-group col-sm-6 col-md-3 mt-3">
                  <SubmitButton
                    disabled={
                      statusForm === ""
                        ? true
                        : false ||
                          (enableCustomUsername && !username ? true : false) ||
                          !selectedEmployee ||
                          selectedRoles.length === 0
                        ? true
                        : false ||
                          status === Status.Updating ||
                          uploading ||
                          errorMessage
                        ? true
                        : false
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
                <div className="form-group col-sm-6 col-md-3 mt-3">
                  <Link
                    to="/usuarios"
                    className="btn btn-block btn-secondary w-100"
                  >
                    Cancelar
                  </Link>
                </div>
              </form>
              <br />
            </div>
            <CModal
              visible={visible}
              onClose={() => {
                cleanEmployeeProfile();
                setVisible(false);
              }}
            >
              <CModalHeader closeButton={true}>
                <CModalTitle>Selecciona un Empleado</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <SearchButton
                  validators={validators}
                  textButton={"Buscar"}
                  handleSearch={handleSearch}
                  className="align-items-end my-1 col-12 flex-md-row d-sm-flex"
                />
                <div className="w-100 overflow-auto" style={{ height: 300 }}>
                  <table className="table">
                    <thead>
                      <tr>
                        <th style={{ width: 20 }}></th>
                        <th>Empleado</th>
                        <th>Cargo</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employees?.length > 0
                        ? employees.map((emp: Employee, index) => {
                            const {
                              _id,
                              name = "",
                              lastname = "",
                              secondLastname = "",
                              position = null,
                            } = emp;
                            if (index > 4) {
                              return null;
                            } else {
                              return (
                                <tr key={_id}>
                                  <td>
                                    <CButton
                                      type="button"
                                      color="success"
                                      onClick={() => {
                                        setEmployeeById(_id);
                                        setShowEmployeeError(false);
                                        setVisible(false);
                                      }}
                                    >
                                      <CIcon icon={cilCheckCircle}></CIcon>
                                    </CButton>
                                  </td>
                                  <td>
                                    {name} {lastname} {secondLastname}
                                  </td>
                                  <td>
                                    {position?.name ? position?.name : ""}
                                  </td>
                                </tr>
                              );
                            }
                          })
                        : null}
                    </tbody>
                  </table>
                </div>
              </CModalBody>
              <CModalFooter>
                <CButton
                  color="secondary"
                  onClick={() => {
                    cleanEmployeeProfile();
                    setShowEmployeeError(true);
                    setVisible(false);
                  }}
                >
                  Cerrar
                </CButton>
              </CModalFooter>
            </CModal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewUserComponent;
