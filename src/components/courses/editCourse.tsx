/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import useForm from "../../hooks/useForm";
import {
  formatDescription,
  formatExtendNames,
  formatNames,
} from "../../utils/errors";
import { InputForm } from "../global-components/inputForm";

import FileUploader from "react-firebase-file-uploader";

import { Course, Status, useCourses } from "../../hooks/useCourses";
import { FirebaseContext } from "../../firebase";
import Swal from "sweetalert2";
import { useCourseTypes, CourseType } from "../../hooks/useCourseTypes";
import { TextAreaForm } from "../global-components/textareaForm";
import { SearchButton, SubmitButton } from "../global-components/globalButtons";
import CIcon from "@coreui/icons-react";
import { cilHamburgerMenu, cilTrash } from "@coreui/icons";
import { useFileUpload } from "../../hooks/useFileUpload";
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import { Topic, useTopics } from "../../hooks/useTopics";
import { cilSearch } from "@coreui/icons";

const EditCourseComponent = () => {
  const { updateCourse, setCourseById, courseInfo, status } = useCourses();
  const { topics, getTopicsByFilter, setSearchFilter } = useTopics();
  const { getAllCourseTypes, courseTypes } = useCourseTypes();

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
    directory: "courses",
    timerMessage: 3000,
  });

  const [modalitys, setModalitys] = React.useState<string[]>([]);

  const [modalityError, setModalityError] = React.useState<boolean>(false);

  const [visibleTopicsModal, setVisibleTopicsModal] = React.useState(false);
  const [selectedTopics, setSelectedTopics] = React.useState<Topic[]>([]);
  const [selectedTopicsIds, setSelectedTopicsIds] = React.useState<string[]>(
    []
  );

  // Context con las operaciones de firebase
  const { firebase } = React.useContext(FirebaseContext);
  const history = useHistory();

  const { id } = useParams<any>();

  React.useEffect(() => {
    if (!id) {
      history.push("/cursos");
    }
    getAllCourseTypes();
    setSearchFilter({
      filter: "",
      status: 1,
    });
    getTopicsByFilter({ filter: "", status: 1 }, { limit: 5, pageSize: 1 });
    setCourseById(id);
  }, []);

  React.useEffect(() => {
    if (courseInfo?.image) {
      setShowImage(courseInfo.image);
    }
    if (courseInfo?.modality) {
      setModalitys([...courseInfo.modality]);
    }
    if (courseInfo?.courseLines) {
      if (courseInfo?.courseLines.length > 0) {
        setSelectedTopics([...courseInfo?.courseLines]);

        setSelectedTopicsIds([
          ...courseInfo?.courseLines?.map((top) => top?._id || ""),
        ]);
      }
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
      courseLines: selectedTopics || [],
      status: 1,
    };
    updateCourse(id, course).then((response) => {
      if (response?.status === 200 || response?.status === 201) {
        history.push("/cursos");
      }
    });
  };

  const validators = {
    required: false,
    validator: formatExtendNames(),
    invalidtext: true,
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

  const handleSearchTopics = (data) => {
    let filter = "";
    if (data?.search) {
      filter = data?.search;
    }
    getTopicsByFilter({ filter: filter, status: 1 }, { limit: 5, pageSize: 1 });
  };

  return (
    <div className="row my-3">
      <div className="col-lg-12">
        <div className="card">
          <div className="card-header">
            <div className="row">
              <div className="col-12 col-sm-6 col-md-10 my-auto">
                <CIcon icon={cilHamburgerMenu} />
                &nbsp;EDITAR CURSO
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
                        imageAlt: (courseInfo?.name ?? name) || "",
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
                  <label className="form-label" htmlFor="code">
                    Código *
                  </label>
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
                <div className="form-group mt-1 col-sm-6 col-xl-4">
                  <label className="form-label" htmlFor="name">
                    Nombre *
                  </label>
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

                <div className="form-group mt-1 col-sm-6 col-xl-4">
                  <label className="form-label" htmlFor="modality">
                    Modalidad *
                  </label>
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

                <div className="form-group mt-1 col-sm-6 col-xl-8">
                  <label className="form-label" htmlFor="description">
                    Descripción *
                  </label>
                  <TextAreaForm
                    placeholder="Descripción"
                    name="description"
                    value={(description ?? courseInfo?.description) || ""}
                    maxLength={100}
                    rows={1}
                    onChange={handleOnChange}
                    disabled={
                      status === Status.Loading || status === Status.Updating
                    }
                    error={descriptionError}
                  />
                </div>

                <div className="form-group mt-1 col-sm-6 col-xl-4">
                  <label className="form-label" htmlFor="price">
                    Precio *
                  </label>
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

                <div className="form-group mt-1 col-sm-6 col-xl-4">
                  <label className="form-label" htmlFor="vacanciesNumber">
                    Nro. Vacantes *
                  </label>
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

                <div className="form-group mt-1 col-sm-6 col-xl-4">
                  <label className="form-label" htmlFor="courseType">
                    Tipo de Curso *
                  </label>
                  <select
                    id="courseType"
                    name="courseType"
                    required
                    disabled={
                      status === Status.Loading || status === Status.Updating
                    }
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

                <div className="form-group mt-1 col-sm-6 col-xl-4">
                  <label className="form-label" htmlFor="image">
                    Foto:
                  </label>
                  <FileUploader
                    accept="image/*"
                    id="imagen"
                    name="imagen"
                    randomizeFilename
                    storageRef={firebase.storage.ref("courses")}
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
                <div className="form-group mt-3 col-sm-6 col-xl-9 d-flex" />
                <div className="form-group mt-3 col-sm-6 col-xl-3 d-flex">
                  <button
                    type="button"
                    onClick={() => setVisibleTopicsModal(true)}
                    className="ms-auto btn btn-success text-white w-100 mt-auto"
                  >
                    Buscar Temas&nbsp;<CIcon icon={cilSearch}></CIcon>
                  </button>
                </div>
                <div
                  className="w-100 overflow-auto mt-3"
                  style={{ minHeight: 200 }}
                >
                  <table className="table">
                    <thead>
                      <tr>
                        <th style={{ minWidth: 60 }}>N°</th>
                        <th style={{ minWidth: 60 }}>Tema</th>
                        <th style={{ minWidth: 60 }}>Opción</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedTopics?.length > 0
                        ? selectedTopics.map((item: Topic, index: number) => {
                            const { name, _id } = item;
                            return (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{name || ""}</td>
                                <td>
                                  <button
                                    type="button"
                                    className="btn btn-danger"
                                    style={{ height: 40, width: 40 }}
                                    onClick={() => {
                                      const cleanTopics = selectedTopics.filter(
                                        (top: Topic) => top?._id !== _id
                                      );
                                      const cleanTopicIds =
                                        selectedTopicsIds.filter(
                                          (id: string) => id !== _id
                                        );
                                      setSelectedTopics([...cleanTopics]);
                                      setSelectedTopicsIds([...cleanTopicIds]);
                                    }}
                                  >
                                    <CIcon icon={cilTrash} color="#fffff" />
                                  </button>
                                </td>
                              </tr>
                            );
                          })
                        : null}
                    </tbody>
                  </table>
                </div>
                <div className="col-12" />
                <div className="form-group col-sm-6 col-xl-3 mt-3">
                  <SubmitButton
                    disabled={
                      disable || imageUploading || imageErrorMessage
                        ? true
                        : false ||
                          modalityError ||
                          status === Status.Loading ||
                          status === Status.Updating ||
                          selectedTopics.length === 0
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
                    to="/cursos"
                    className="btn btn-secondary text-white w-100"
                  >
                    Cancelar
                  </Link>
                </div>
              </form>
              <br />
            </div>
          </div>
          <CModal
            visible={visibleTopicsModal}
            onClose={() => {
              setVisibleTopicsModal(false);
            }}
          >
            <CModalHeader closeButton={true}>
              <CModalTitle>Seleccione el(os) tema(s)</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <SearchButton
                validators={validators}
                textButton={"Buscar"}
                handleSearch={handleSearchTopics}
                className="align-items-end my-1 col-12 flex-md-row d-sm-flex"
              />
              <div className="w-100 overflow-auto" style={{ height: 300 }}>
                <table className="table">
                  <thead>
                    <tr>
                      <th style={{ width: 20 }}></th>
                      <th>índice</th>
                      <th>Nombre</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topics?.length > 0
                      ? topics.map((top: Topic, index) => {
                          const { _id = "", name = "" } = top;
                          return (
                            <tr key={_id}>
                              <td>
                                <input
                                  type="checkbox"
                                  name="topic"
                                  checked={selectedTopicsIds.includes(_id)}
                                  className="form-check-input form-check-success p-2"
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      const cleanTopics = selectedTopics.filter(
                                        (topi: Topic) => topi?._id !== _id
                                      );
                                      const cleanTopicIds =
                                        selectedTopicsIds.filter(
                                          (id: string) => id !== _id
                                        );
                                      setSelectedTopics([
                                        ...cleanTopics,
                                        {
                                          _id: _id,
                                          name: name,
                                        },
                                      ]);
                                      setSelectedTopicsIds([
                                        ...cleanTopicIds,
                                        _id || "",
                                      ]);
                                    } else {
                                      const cleanTopics = selectedTopics.filter(
                                        (topi: Topic) => topi?._id !== _id
                                      );
                                      const cleanTopicIds =
                                        selectedTopicsIds.filter(
                                          (id: string) => id !== _id
                                        );
                                      setSelectedTopics([...cleanTopics]);
                                      setSelectedTopicsIds([...cleanTopicIds]);
                                    }
                                  }}
                                />
                              </td>
                              <td>{index + 1 || ""}</td>
                              <td>{name || ""}</td>
                            </tr>
                          );
                        })
                      : null}
                  </tbody>
                </table>
              </div>
            </CModalBody>
            <CModalFooter>
              <CButton
                color="secondary"
                className="text-white"
                onClick={() => {
                  setVisibleTopicsModal(false);
                }}
              >
                Cerrar
              </CButton>
            </CModalFooter>
          </CModal>
        </div>
      </div>
    </div>
  );
};

export default EditCourseComponent;
