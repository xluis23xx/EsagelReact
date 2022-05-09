/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { formatDescription, formatNames } from "../../utils/errors";
import { InputForm } from "../global-components/inputForm";

import FileUploader from "react-firebase-file-uploader";

import { Course, Status, useCourses } from "../../hooks/useCourses";
import { FirebaseContext } from "../../firebase";
import Swal from "sweetalert2";
import { useCourseTypes, CourseType } from "../../hooks/useCourseTypes";
import { TextAreaForm } from "../global-components/textareaForm";

const EditCourseComponent = () => {
  const { updateCourse, setCourseById, courseInfo, status } = useCourses();
  const { getAllCourseTypes, courseTypes } = useCourseTypes();
  const [modalitys, setModalitys] = React.useState<string[]>([]);

  const [modalityError, setModalityError] = React.useState<boolean>(false);

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
      history.push("/courses");
    }
    setCourseById(id);
    getAllCourseTypes();
  }, []);

  React.useEffect(() => {
    if (courseInfo?.image) {
      setShowImage(courseInfo?.image);
    }
    if (courseInfo?.modality) {
      setModalitys([...courseInfo?.modality]);
    }
  }, [courseInfo]);

  const stateSchema = {
    code: { value: null, error: "" },
    name: { value: null, error: "" },
    description: { value: null, error: "" },
    price: { value: null, error: "" },
    vacanciesNumber: { value: null, error: "" },
    courseType: { value: null, error: "" },
  };

  const stateValidatorSchema = {
    code: {
      required: true,
      validator: formatNames(),
      min2caracts: true,
      invalidtext: true,
    },
    name: {
      required: true,
      validator: formatNames(),
      min2caracts: true,
      invalidtext: true,
    },
    description: {
      validator: formatDescription(),
      min2caracts: true,
      invalidtext: true,
    },
    price: {
      required: true,
    },
    vacanciesNumber: {
      required: true,
    },
    courseType: { required: true },
  };

  const onSubmitForm = (data: Course) => {
    const course = {
      code: (data.code ?? courseInfo?.code) || null,
      name: (data.name ?? courseInfo?.name) || null,
      description: (data.description ?? courseInfo?.description) || null,
      image: showImage || null,
      modality: modalitys || null,
      price:
        (data?.price
          ? Number(data?.price)
          : null ?? courseInfo?.price
          ? Number(courseInfo?.price)
          : null) || 0.0,
      vacanciesNumber:
        (data?.vacanciesNumber
          ? Number(data?.vacanciesNumber)
          : null ?? courseInfo?.vacanciesNumber
          ? Number(courseInfo?.vacanciesNumber)
          : null) || 0,
      courseType: (data.courseType ?? courseInfo?.courseType?.name) || null,
      status: 1,
    };
    updateCourse(id, course).then((response) => {
      if (response?.status === 200 || response?.status === 201) {
        history.push("/cursos");
      }
    });
  };

  const {
    values: { code, name, description, price, vacanciesNumber, courseType },
    errors: {
      code: codeError,
      name: nameError,
      description: descriptionError,
      price: priceError,
      vacanciesNumber: vacanciesNumberError,
      courseType: courseTypeError,
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
                <i className="fa fa-align-justify"></i>EDITAR CURSO
              </div>
              {showImage ? (
                <div className="col-12 col-sm-6 col-md-2 text-end">
                  <button
                    className="btn btn-dark w-100"
                    onClick={() =>
                      Swal.fire({
                        imageUrl: showImage,
                        imageHeight: "auto",
                        imageAlt: "imagen del curso",
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
                  <label htmlFor="code">Código (*):</label>
                  <InputForm
                    type="text"
                    required
                    placeholder="Código"
                    name="code"
                    maxLength={15}
                    value={(code ?? courseInfo?.code) || ""}
                    onChange={handleOnChange}
                    disabled={true}
                    error={codeError}
                  />
                </div>
                <div className="form-group mt-1 col-sm-6 col-md-4">
                  <label htmlFor="name">Nombre (*):</label>
                  <InputForm
                    type="text"
                    required
                    placeholder="Nombre"
                    name="name"
                    maxLength={50}
                    value={(name ?? courseInfo?.name) || ""}
                    onChange={handleOnChange}
                    disabled={
                      status === Status.Loading || status === Status.Updating
                    }
                    error={nameError}
                  />
                </div>

                <div className="form-group mt-1 col-sm-6 col-md-4">
                  <label htmlFor="modality">Modalidad (*):</label>
                  <div className="w-100 d-flex">
                    <div className="form-check">
                      <input
                        type={"checkbox"}
                        name="modality"
                        required={modalitys.length === 0 ? true : undefined}
                        value="presencial"
                        disabled={
                          status === Status.Loading ||
                          status === Status.Updating
                        }
                        className="form-check-input"
                        checked={modalitys.includes("presencial")}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setModalitys([...modalitys, "presencial"]);
                            setModalityError(false);
                          } else {
                            const AuxModalitys = modalitys.filter(
                              (mod) => mod !== e.target.value
                            );
                            if (AuxModalitys.length === 0) {
                              setModalityError(true);
                            }
                            setModalitys(AuxModalitys);
                          }
                        }}
                        onBlur={() =>
                          modalitys.length === 0
                            ? setModalityError(true)
                            : setModalityError(false)
                        }
                      />
                      <label className="form-check-label">Presencial</label>
                    </div>

                    <div className="ms-5 form-check">
                      <input
                        type={"checkbox"}
                        value="virtual"
                        disabled={
                          status === Status.Loading ||
                          status === Status.Updating
                        }
                        required={modalitys.length === 0 ? true : undefined}
                        name="modality"
                        className="form-check-input"
                        checked={modalitys.includes("virtual")}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setModalitys([...modalitys, "virtual"]);
                            setModalityError(false);
                          } else {
                            const AuxModalitys = modalitys.filter(
                              (mod) => mod !== e.target.value
                            );
                            if (AuxModalitys.length === 0) {
                              setModalityError(true);
                            }
                            setModalitys(AuxModalitys);
                          }
                        }}
                        onBlur={() =>
                          modalitys.length === 0
                            ? setModalityError(true)
                            : setModalityError(false)
                        }
                      />
                      <label className="form-check-label">Virtual</label>
                    </div>
                  </div>

                  {modalityError ? (
                    <p
                      className="w-100 pb-0 mb-0 text-danger"
                      style={{ fontSize: 15 }}
                    >
                      Seleccione almenos uno.
                    </p>
                  ) : null}
                </div>

                <div className="form-group mt-1 col-sm-6 col-md-8">
                  <label htmlFor="description">Descripción (*):</label>
                  <TextAreaForm
                    placeholder="Descripción"
                    name="description"
                    value={(description ?? courseInfo?.description) || ""}
                    rows={1}
                    onChange={handleOnChange}
                    disabled={
                      status === Status.Loading || status === Status.Updating
                    }
                    error={descriptionError}
                  />
                </div>

                <div className="form-group mt-1 col-sm-6 col-md-4">
                  <label htmlFor="price">Precio (*):</label>
                  <InputForm
                    type="number"
                    required
                    placeholder="Precio"
                    step="0.1"
                    min={0}
                    max={1000}
                    name="price"
                    value={
                      price ??
                      ((courseInfo?.price
                        ? courseInfo?.price.toString()
                        : "") ||
                        "1")
                    }
                    onChange={handleOnChange}
                    disabled={
                      status === Status.Loading || status === Status.Updating
                    }
                    error={priceError}
                  />
                </div>

                <div className="form-group mt-1 col-sm-6 col-md-4">
                  <label htmlFor="vacanciesNumber">Nro. Vacantes (*):</label>
                  <InputForm
                    type="number"
                    required
                    placeholder="Nro. Vacantes"
                    min={1}
                    step={"1"}
                    name="vacanciesNumber"
                    value={
                      vacanciesNumber ??
                      ((courseInfo?.vacanciesNumber
                        ? courseInfo?.vacanciesNumber.toString()
                        : "") ||
                        "1")
                    }
                    onChange={handleOnChange}
                    disabled={
                      status === Status.Loading || status === Status.Updating
                    }
                    error={vacanciesNumberError}
                  />
                </div>

                <div className="form-group mt-1 col-sm-6 col-md-4">
                  <label htmlFor="courseType">Tipo de Curso (*):</label>
                  <select
                    id="courseType"
                    name="courseType"
                    required
                    disabled={status === Status.Updating}
                    value={(courseType ?? courseInfo?.courseType?.name) || ""}
                    onChange={handleOnChange}
                    onBlur={handleOnChange}
                    className={`btn border-secondary btn-default w-100 ${
                      courseTypeError ? "border border-danger" : ""
                    }`}
                  >
                    <option value="">Seleccione</option>
                    {courseTypes.length > 0
                      ? courseTypes.map((cos: CourseType) => (
                          <option key={cos.name} value={`${cos.name}`}>
                            {cos.name}
                          </option>
                        ))
                      : null}
                  </select>
                </div>

                <div className="form-group mt-1 col-sm-6 col-md-4">
                  <label htmlFor="image">Foto:</label>
                  <FileUploader
                    accept="image/*"
                    id="imagen"
                    name="imagen"
                    randomizeFilename
                    storageRef={firebase.storage.ref("courses")}
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

                <div className="form-group col-sm-6 col-md-4 mt-3">
                  <button
                    type="submit"
                    disabled={
                      disable || uploading || errorMessage
                        ? true
                        : false || modalityError
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
                    to="/cursos"
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

export default EditCourseComponent;
