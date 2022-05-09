/* eslint-disable react-hooks/exhaustive-deps */
import { cilHamburgerMenu } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import * as React from "react";
import { Link } from "react-router-dom";
import { SharedButtons } from "../global-components/sharedButtons";
import { CourseItem } from "./_children/course";
import { Course, Status, useCourses } from "../../hooks/useCourses";
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import { formatDescription } from "../../utils/errors";
import useForm from "../../hooks/useForm";
import { InputForm } from "../global-components/inputForm";

const EmployeesComponent = () => {
  const {
    courses,
    deleteCourse,
    getAllCourses,
    searchCoursesByFilter,
    status,
  } = useCourses();
  const [visible, setVisible] = React.useState(false);
  const [courseId, setCourseId] = React.useState("");

  React.useEffect(() => {
    getAllCourses();
  }, []);

  const stateSchema = {
    search: { value: "", error: "" },
  };

  const stateValidatorSchema = {
    search: {
      required: false,
      validator: formatDescription(),
      invalidtext: true,
    },
  };

  const removeCourse = (id: string) => {
    setVisible(!visible);
    if (!visible) {
      setCourseId(id);
    } else if (visible && courseId) {
      deleteCourse(id);
      setCourseId("");
    }
  };

  const handleSearch = (data) => {
    searchCoursesByFilter(data.search);
  };

  const {
    values: { search },
    errors: { search: searchError },
    handleOnChange,
    handleOnSubmit,
    disable,
  } = useForm(stateSchema, stateValidatorSchema, handleSearch);

  return (
    <>
      <div className="row mb-3">
        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
          <Link
            className="btn btn-block btn-success w-100 h-auto text-white"
            to="/cursos/nuevo"
          >
            Nuevo
          </Link>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <CIcon icon={cilHamburgerMenu} />
              &nbsp;CURSOS
            </div>
            <div className="card-body">
              <nav className="navbar navbar-expand-lg navbar-light bg-light px-3 my-2 row">
                <SharedButtons />
                <form
                  className="align-items-end my-1 col-12 col-md-6 flex-md-row d-sm-flex"
                  onSubmit={handleOnSubmit}
                >
                  <div className="col-12 col-sm-8">
                    <InputForm
                      type="search"
                      name="search"
                      className="form-control"
                      placeholder="Buscar"
                      aria-label="Search"
                      value={search}
                      error={searchError}
                      showError={false}
                      onChange={handleOnChange}
                    />
                  </div>
                  <button
                    className="btn btn-success text-white col-12 col-sm-4 my-1 my-sm-0"
                    type="submit"
                    disabled={disable}
                  >
                    Buscar
                  </button>
                </form>
              </nav>
              <br />
              <div className="w-100 overflow-auto" style={{ height: 300 }}>
                {status === Status.Loading ? (
                  <h4 className="text-center">Espere un momento...</h4>
                ) : null}
                {(status === Status.Ready || status === Status.Updating) &&
                courses.length > 0 ? (
                  <table className="table">
                    <thead>
                      <tr>
                        <th>N°</th>
                        <th>Código</th>
                        <th>Nombre</th>
                        <th>Tipo</th>
                        <th>Modalidad</th>
                        <th>Precio</th>
                        <th>Número de Vacantes</th>
                        <th>Estado</th>
                        <th>Opciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {courses.map((course: Course, index: number) => {
                        const {
                          _id,
                          code,
                          name,
                          modality,
                          courseType,
                          price,
                          vacanciesNumber,
                          status,
                        } = course;
                        return (
                          <CourseItem
                            key={index}
                            _id={_id}
                            code={code}
                            name={name}
                            modality={modality}
                            courseType={courseType}
                            price={price}
                            status={status}
                            orderNumber={index + 1}
                            vacanciesNumber={vacanciesNumber}
                            handleRemove={removeCourse}
                          />
                        );
                      })}
                    </tbody>
                  </table>
                ) : null}
              </div>
              <CModal
                visible={visible}
                onClose={() => {
                  setCourseId("");
                  setVisible(false);
                }}
              >
                <CModalHeader closeButton={true}>
                  <CModalTitle>Eliminar Curso</CModalTitle>
                </CModalHeader>
                <CModalBody>
                  ¿Estás seguro que quieres eliminar este curso?
                </CModalBody>
                <CModalFooter>
                  <CButton
                    color="secondary"
                    onClick={() => {
                      setCourseId("");
                      setVisible(false);
                    }}
                  >
                    Cerrar
                  </CButton>
                  <CButton
                    color="danger"
                    onClick={() => removeCourse(courseId)}
                  >
                    Eliminar
                  </CButton>
                </CModalFooter>
              </CModal>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeesComponent;
