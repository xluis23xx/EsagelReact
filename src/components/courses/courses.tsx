/* eslint-disable react-hooks/exhaustive-deps */
import { cilHamburgerMenu } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import * as React from "react";
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
import {
  RedirectionButton,
  SearchButton,
} from "../global-components/globalButtons";

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

  const validators = {
    required: false,
    validator: formatDescription(),
    invalidtext: true,
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

  return (
    <>
      <div className="row mb-3">
        <RedirectionButton redirection="/cursos/nuevo" />
      </div>
      <div className="row my-3">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <CIcon icon={cilHamburgerMenu} />
              &nbsp;CURSOS
            </div>
            <div className="card-body">
              <nav className="navbar navbar-expand-lg navbar-light bg-light px-3 my-2 row">
                <SharedButtons />
                <SearchButton
                  validators={validators}
                  handleSearch={handleSearch}
                />
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
