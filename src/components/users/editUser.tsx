/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import useForm from "../../hooks/useForm";

import { User, Status, useUsers } from "../../hooks/useUsers";

import { SubmitButton } from "../global-components/globalButtons";
import FileUploader from "react-firebase-file-uploader";

import { FirebaseContext } from "../../firebase";
import Swal from "sweetalert2";

const EditUserComponent = () => {
  const { updateUser, status, setUserById, userInfo } = useUsers();

  const { id } = useParams<any>();

  const [selectedRoles, setSelectedRoles] = React.useState<string[]>([]);
  const [showRolesError, setShowRolesError] = React.useState<boolean>(false);

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
    status: { value: null, error: "" },
  };

  React.useEffect(() => {
    if (id) {
      setUserById(id);
    }
  }, []);

  React.useEffect(() => {
    if (userInfo) {
      const roles = userInfo?.roles.map((rol) => rol.name);
      setSelectedRoles([...roles]);
      setShowImage(userInfo?.image);
    }
  }, [userInfo]);

  const stateValidatorSchema = {
    status: {
      required: true,
    },
  };

  const onSubmitForm = (data: User) => {
    const user = {
      roles: selectedRoles || [],
      status: (data?.status ?? userInfo?.status) || 0,
      image: showImage || null,
    };
    updateUser(id, user).then((response) => {
      if (response?.status === 200 || response?.status === 201) {
        history.push("/usuarios");
      }
    });
  };

  const {
    values: { status: statusForm },
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

  return (
    <div className="row mt-3">
      <div className="col-lg-12">
        <div className="card">
          <div className="card-header">
            <div className="row">
              <div className="col-12 col-sm-6 col-md-10 my-auto">
                <i className="fa fa-align-justify"></i>EDITAR USUARIO
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
                        imageAlt: "imagen del usuario",
                        confirmButtonColor: "#ff0000",
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
                      className={`w-100`}
                      placeholder="Seleccione..."
                      name="employee"
                      value={
                        userInfo
                          ? `${
                              userInfo?.employee?.name
                                ? userInfo?.employee?.name
                                : ""
                            }${
                              userInfo?.employee?.lastname
                                ? ` ${userInfo?.employee?.name}`
                                : ""
                            }`
                          : ""
                      }
                      disabled={true}
                    />
                  </div>
                </div>
                <div className="form-group mt-1 col-sm-6 col-md-4">
                  <label htmlFor="status">Estado (*):</label>
                  <select
                    id="status"
                    name="status"
                    required
                    disabled={
                      status === Status.Loading || status === Status.Updating
                    }
                    value={(statusForm ?? userInfo?.status.toString()) || ""}
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
                    value={selectedRoles}
                    disabled={
                      status === Status.Loading || status === Status.Updating
                    }
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
                      value={userInfo?.username || ""}
                      onChange={handleOnChange}
                      onBlur={handleOnChange}
                      disabled={true}
                    />
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
                        : false || !userInfo || selectedRoles.length === 0
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
                      "Actualizar"
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUserComponent;
