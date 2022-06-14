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

import { useFileUpload } from "../../hooks/useFileUpload";
import FileUploader from "react-firebase-file-uploader";

import { FirebaseContext } from "../../firebase";
import Swal from "sweetalert2";
import { SubmitButton } from "../global-components/globalButtons";
import CIcon from "@coreui/icons-react";
import { cilHamburgerMenu } from "@coreui/icons";
import { savePathname } from "../../utils/location";

const NewCourseTypeComponent = () => {
  const { status, getSettingsConfig, updateSetting } = useSettings();
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
    directory: "esagel",
    timerMessage: 3000,
  });

  const {
    uploading: manualUploading,
    progress: manualProgress,
    setShowDocument: setShowManual,
    showDocument: showManual,
    urlDocument: urlManual,
    errorMessage: manualErrorMessage,
    handleUploadError: handleUploadManualError,
    handleUploadStart: handleUploadManualStart,
    handleUploadSuccess: handleUploadManualSuccess,
    handleProgress: handleManualProgress,
  } = useFileUpload({
    directory: "esagel",
    timerMessage: 3000,
  });
  const { config, setConfig } = React.useContext<any>(SettingsContext);

  // // Context con las operaciones de firebase
  const { firebase } = React.useContext(FirebaseContext);

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
    savePathname();
  }, []);

  React.useEffect(() => {
    if (config?.logo) {
      setShowImage(config.logo);
    }
    if (config?.manual) {
      setShowManual(config.manual);
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
      manual: showManual || null,
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

  return (
    <div className="row my-3">
      <div className="col-lg-12">
        <div className="card">
          <div className="card-header">
            <div className="row">
              <div className="col-12 col-sm-6 col-md-6 my-auto">
                <CIcon icon={cilHamburgerMenu} />
                &nbsp;CONFIGURACIÓN DE SISTEMA
              </div>
              {showManual ? (
                <>
                  {showImage ? null : <div className="col-md-2" />}
                  <div className="ms-auto col-12 col-sm-6 col-md-3 col-xl-2 my-1 text-end">
                    <a
                      href={showManual}
                      target="_blank"
                      className="btn btn-dark col-10 w-100"
                      rel="noreferrer"
                    >
                      Ver Manual
                    </a>
                  </div>
                </>
              ) : null}
              {showImage ? (
                <>
                  {showManual ? null : <div className="col-md-2" />}
                  <div className="col-12 col-sm-6 col-md-3 col-xl-2 my-1 text-end">
                    <button
                      className="btn btn-dark col-10 w-100"
                      onClick={() =>
                        Swal.fire({
                          imageUrl: showImage,
                          imageHeight: "auto",
                          padding: "20",
                          imageAlt: "Logo de la empresa",
                          confirmButtonText: "Cerrar",
                          confirmButtonColor: "#4f5d73",
                        })
                      }
                    >
                      Ver Foto
                    </button>
                  </div>
                </>
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
                  <label className="form-label" htmlFor="companyName">
                    Nombre de la Compañía *
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
                <div className="form-group mt-1 col-sm-6 col-xl-4">
                  <label className="form-label" htmlFor="description">
                    Descripción *
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
                <div className="form-group mt-1 col-sm-6 col-xl-4">
                  <label className="form-label" htmlFor="businessName">
                    Razón Social *
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
                <div className="form-group mt-1 col-sm-6 col-xl-4">
                  <label className="form-label" htmlFor="ruc">
                    Nro. RUC *
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
                <div className="form-group mt-1 col-sm-6 col-xl-4">
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
                <div className="form-group mt-1 col-sm-6 col-xl-4">
                  <label className="form-label" htmlFor="image">
                    Foto:
                  </label>
                  <FileUploader
                    accept="image/*"
                    id="imagen"
                    name="imagen"
                    randomizeFilename
                    storageRef={firebase.storage.ref("esagel")}
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
                <div className="form-group mt-1 col-sm-6 col-xl-4">
                  <label className="form-label" htmlFor="manual">
                    Manual:
                  </label>
                  <FileUploader
                    accept="application/pdf"
                    id="manual"
                    name="manual"
                    randomizeFilename
                    storageRef={firebase.storage.ref("esagel")}
                    onUploadStart={handleUploadManualStart}
                    onUploadError={handleUploadManualError}
                    className="form-control"
                    onUploadSuccess={handleUploadManualSuccess}
                    onProgress={handleManualProgress}
                  />
                  {manualUploading && (
                    <div className="text-black p-1 text-center my-1">
                      {manualProgress} %
                    </div>
                  )}
                  {manualErrorMessage && (
                    <div className="text-red p-1 text-center my-1">
                      {manualErrorMessage}
                    </div>
                  )}
                  {urlManual && (
                    <p className="text-black p-1 text-center my-1">
                      El manual se subió correctamente
                    </p>
                  )}
                </div>
                <div className="col-12" />
                <div className="form-group col-sm-6 col-xl-3 mt-3">
                  <SubmitButton
                    disabled={
                      disable || imageUploading || imageErrorMessage
                        ? true
                        : false || manualUploading || manualErrorMessage
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
                <div className="form-group col-sm-6 col-xl-3 mt-3">
                  <Link
                    to="/home"
                    className="btn btn-secondary w-100 text-white"
                  >
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
