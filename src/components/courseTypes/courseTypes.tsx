/* eslint-disable react-hooks/exhaustive-deps */
import { cilHamburgerMenu } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import * as React from "react";
import { Link } from "react-router-dom";
import { CourseTypeItem } from "./_children/courseType";
import { CourseType, Status, useCourseTypes } from "../../hooks/useCourseTypes";
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";

const CourseTypesComponent = () => {
  const { courseTypes, deleteCourseType, getAllCourseTypes, status } =
    useCourseTypes();
  const [visible, setVisible] = React.useState(false);
  const [courseTypeId, setCourseTypeId] = React.useState("");

  React.useEffect(() => {
    getAllCourseTypes();
  }, []);

  const removeCourseType = (id: string) => {
    setVisible(!visible);
    if (!visible) {
      setCourseTypeId(id);
    } else if (visible && courseTypeId) {
      deleteCourseType(id);
      setCourseTypeId("");
    }
  };

  return (
    <>
      <div className="row mb-3">
        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
          <Link
            className="btn btn-block btn-success w-100 h-auto text-white"
            to="/tipos-curso/nuevo"
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
              &nbsp;Tipos de Curso
            </div>
            <div className="card-body">
              <nav className="navbar navbar-expand-lg navbar-light bg-light px-3 my-2 row">
                <div className="mx-ms-0 me-ms-auto col-12 col-md-6 text-center text-md-start">
                  <button
                    type="button"
                    className="btn btn-default btn-secondary"
                  >
                    COPIA
                  </button>

                  <button
                    type="button"
                    className="btn btn-default btn-secondary"
                  >
                    EXCEL
                  </button>

                  <button
                    type="button"
                    className="btn btn-default btn-secondary"
                  >
                    CSV
                  </button>

                  <button
                    type="button"
                    className="btn btn-default btn-secondary"
                  >
                    PDF
                  </button>
                </div>
              </nav>
              <br />
              <div className="w-100 overflow-auto" style={{ height: 300 }}>
                {status === Status.Loading ? (
                  <h4 className="text-center">Espere un momento...</h4>
                ) : null}
                {(status === Status.Ready || status === Status.Updating) &&
                courseTypes.length > 0 ? (
                  <table className="table">
                    <thead>
                      <tr>
                        <th>N°</th>
                        <th>Código</th>
                        <th>Nombre</th>
                        <th>Fecha de creación</th>
                        <th>Última fecha de actualización</th>
                        <th>Descripción</th>
                        <th>Opciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {courseTypes.map(
                        (courseType: CourseType, index: number) => {
                          const {
                            _id,
                            code,
                            name,
                            description,
                            createdAt,
                            updatedAt,
                            status,
                          } = courseType;
                          return (
                            <CourseTypeItem
                              id={_id}
                              key={index}
                              code={code}
                              name={name}
                              description={description}
                              createdAt={createdAt}
                              updatedAt={updatedAt}
                              status={status}
                              orderNumber={index + 1}
                              handleRemove={removeCourseType}
                            />
                          );
                        }
                      )}
                    </tbody>
                  </table>
                ) : null}
              </div>
              <CModal
                visible={visible}
                onClose={() => {
                  setCourseTypeId("");
                  setVisible(false);
                }}
              >
                <CModalHeader closeButton={true}>
                  <CModalTitle>Eliminar Tipo de Curso</CModalTitle>
                </CModalHeader>
                <CModalBody>
                  ¿Estás seguro que quieres eliminar este tipo de curso?
                </CModalBody>
                <CModalFooter>
                  <CButton
                    color="secondary"
                    onClick={() => {
                      setCourseTypeId("");
                      setVisible(false);
                    }}
                  >
                    Cerrar
                  </CButton>
                  <CButton
                    color="danger"
                    onClick={() => removeCourseType(courseTypeId)}
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

export default CourseTypesComponent;