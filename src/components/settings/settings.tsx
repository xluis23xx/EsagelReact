/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Link } from "react-router-dom";
import useForm from "../../hooks/useForm";
import {
  formatDescription,
  formatNames,
  formatRuc,
  formatTax,
  formatURL,
} from "../../utils/errors";
import { InputForm } from "../global-components/inputForm";

import { Setting, Status, useSettings } from "../../hooks/useSettings";
import { SettingsContext } from "../../context/SettingsContext";

import FileUploader from "react-firebase-file-uploader";

import { FirebaseContext } from "../../firebase";
import Swal from "sweetalert2";
import { SubmitButton } from "../global-components/globalButtons";

const NewCourseTypeComponent = () => {
  const { status, getSettingsConfig, updateSetting } = useSettings();
  const { config, setConfig } = React.useContext(SettingsContext);

  // Context con las operaciones de firebase
  const { firebase } = React.useContext(FirebaseContext);

  // state para las imagenes
  const [uploading, setUploading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [urlImage, setUrlImage] = React.useState(null);
  const [showImage, setShowImage] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  React.useEffect(() => {
    const ESAGEL_CONFIG = localStorage.getItem("esagel_config");
    if (!config) {
      if (ESAGEL_CONFIG) {
        const JSON_CONFIG = JSON.parse(ESAGEL_CONFIG || "{}");
        setConfig(JSON_CONFIG);
      } else {
        const configRP = getSettingsConfig();
        setConfig(configRP);
      }
    }
  }, []);

  React.useEffect(() => {
    if (config?.logo) {
      setShowImage(config?.logo);
    }
  }, [config]);

  const stateSchema = {
    companyName: { value: null, error: "" },
    description: { value: null, error: "" },
    businessName: { value: null, error: "" },
    ruc: { value: null, error: "" },
    url: { value: null, error: "" },
    tax: { value: null, error: "" },
  };

  const stateValidatorSchema = {
    companyName: {
      required: true,
      validator: formatNames(),
      min2caracts: true,
      invalidtext: true,
    },
    description: {
      required: true,
      validator: formatDescription(),
      min2caracts: true,
      invalidtext: true,
    },
    businessName: {
      required: true,
      validator: formatNames(),
      min2caracts: true,
      invalidtext: true,
    },
    ruc: {
      required: true,
      validator: formatRuc(),
      invalidtext: true,
    },
    url: {
      validator: formatURL(),
    },
    tax: {
      required: true,
      validator: formatTax(),
      invalidtext: true,
    },
  };

  const onSubmitForm = (data: Setting) => {
    const setting = {
      companyName: (data?.companyName ?? config?.companyName) || null,
      description: (data?.description ?? config?.description) || null,
      businessName: (data?.businessName ?? config?.businessName) || null,
      ruc: (data?.ruc ?? config?.ruc) || null,
      url: (data?.url ?? config?.url) || null,
      tax:
        (data?.tax
          ? Number(data?.tax)
          : null ?? config?.tax
          ? Number(config?.tax)
          : null) || 0.18,
      logo: showImage || null,
    };
    updateSetting(config._id, setting).then((response) => {
      if (response?.status === 200 || response?.status === 201) {
        setConfig(response?.updateSetting);
      }
    });
  };

  const {
    values: { companyName, description, businessName, ruc, url, tax },
    errors: {
      companyName: companyNameError,
      description: descriptionError,
      businessName: businessNameError,
      ruc: rucError,
      url: urlError,
      tax: taxError,
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
      .ref("saegel")
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
                <i className="fa fa-align-justify"></i>Configuración de Sistema
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
                        imageAlt: "Logo de la empresa",
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
                  <label className="form-label" htmlFor="companyName">
                    Nombre de la Compañía (*):
                  </label>
                  <InputForm
                    type="text"
                    required
                    placeholder="Nombre"
                    maxLength={50}
                    name="companyName"
                    value={(companyName ?? config?.companyName) || ""}
                    onChange={handleOnChange}
                    disabled={!config || status === Status.Updating}
                    error={companyNameError}
                  />
                </div>
                <div className="form-group mt-1 col-sm-6 col-md-4">
                  <label className="form-label" htmlFor="description">
                    Descripción (*):
                  </label>
                  <InputForm
                    required
                    placeholder="Descripción"
                    name="description"
                    maxLength={200}
                    value={(description ?? config?.description) || ""}
                    onChange={handleOnChange}
                    disabled={!config || status === Status.Updating}
                    error={descriptionError}
                  />
                </div>
                <div className="form-group mt-1 col-sm-6 col-md-4">
                  <label className="form-label" htmlFor="businessName">
                    Razón Social (*):
                  </label>
                  <InputForm
                    type="text"
                    required
                    maxLength={50}
                    placeholder="Razón Social"
                    name="businessName"
                    value={(businessName ?? config?.businessName) || ""}
                    onChange={handleOnChange}
                    disabled={!config || status === Status.Updating}
                    error={businessNameError}
                  />
                </div>
                <div className="form-group mt-1 col-sm-6 col-md-4">
                  <label className="form-label" htmlFor="ruc">
                    Nro. RUC (*):
                  </label>
                  <InputForm
                    type="text"
                    required
                    placeholder="RUC"
                    name="ruc"
                    maxLength={11}
                    value={(ruc ?? config?.ruc) || ""}
                    onChange={handleOnChange}
                    disabled={!config || status === Status.Updating}
                    error={rucError}
                  />
                </div>
                <div className="form-group mt-1 col-sm-6 col-md-4">
                  <label className="form-label" htmlFor="url">
                    URL Página Oficial:
                  </label>
                  <InputForm
                    type="text"
                    maxLength={100}
                    placeholder="url"
                    name="url"
                    value={(url ?? config?.url) || ""}
                    onChange={handleOnChange}
                    disabled={status === Status.Updating}
                    error={urlError}
                  />
                </div>
                <div className="form-group mt-1 col-sm-6 col-md-4">
                  <label className="form-label" htmlFor="image">
                    Foto:
                  </label>
                  <FileUploader
                    accept="image/*"
                    id="imagen"
                    name="imagen"
                    randomizeFilename
                    storageRef={firebase.storage.ref("saegel")}
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
                <div className="form-group mt- 1 col-sm-6 col-md-4">
                  <label className="form-label" htmlFor="tax">
                    % Impuesto:
                  </label>
                  <InputForm
                    type="number"
                    maxLength={4}
                    step={"0.01"}
                    placeholder="tax"
                    name="tax"
                    value={
                      tax ??
                      ((config?.tax ? config?.tax.toString() : "") || "0")
                    }
                    onChange={handleOnChange}
                    disabled={!config || status === Status.Updating}
                    error={taxError}
                  />
                </div>
                <div className="col-12" />
                <div className="form-group col-sm-6 col-md-3 mt-3">
                  <SubmitButton
                    disabled={
                      disable || uploading || errorMessage
                        ? true
                        : false || status === Status.Updating || !config
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
                  <Link to="/home" className="btn   btn-secondary w-100">
                    Volver
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

export default NewCourseTypeComponent;
