/* eslint-disable react-hooks/exhaustive-deps */
import { cilHamburgerMenu } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import * as React from "react";
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
import { ExportButtons } from "../global-components/exportButtons";
import { RedirectionButton } from "../global-components/globalButtons";
import { savePathname } from "../../utils/location";

const CourseTypesComponent = () => {
  const { courseTypes, deleteCourseType, getAllCourseTypes, status } =
    useCourseTypes();
  const [visible, setVisible] = React.useState(false);
  const [courseTypeId, setCourseTypeId] = React.useState("");

  React.useEffect(() => {
    savePathname();
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

  const tableExportId = "courseTypes-table";

  const headers = [
    { label: "Código", key: "code" },
    { label: "Nombre", key: "name" },
    { label: "Fecha de creación", key: "createdAt" },
    { label: "Última fecha de actualización", key: "updatedAt" },
    { label: "Descripción", key: "description" },
  ];

  return (
    <>
      <div className="row mb-3">
        <RedirectionButton redirection="/tipos-curso/nuevo" />
      </div>
      <div className="row my-3">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <CIcon icon={cilHamburgerMenu} />
              &nbsp;TIPOS DE CURSO
            </div>
            <div className="card-body">
              <nav className="navbar navbar-expand-lg navbar-light bg-light px-3 my-2 row">
                <ExportButtons
                  dataReport={courseTypes}
                  documentName={"course types"}
                  headers={headers}
                  tableId={tableExportId}
                />
                <div className="col-12 col-md-6" />
              </nav>
              <br />
              <div className="w-100 overflow-auto" style={{ height: 300 }}>
                {status === Status.Loading ? (
                  <h4 className="text-center">Espere un momento...</h4>
                ) : null}
                {(status === Status.Ready || status === Status.Updating) &&
                courseTypes.length > 0 ? (
                  <table className="table" id={tableExportId}>
                    <thead>
                      <tr>
                        <th>N°</th>
                        {headers
                          ? headers.map((header) => (
                              <th key={header.label}>{header.label}</th>
                            ))
                          : null}
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
                    className="text-white"
                    onClick={() => {
                      setCourseTypeId("");
                      setVisible(false);
                    }}
                  >
                    Cerrar
                  </CButton>
                  <CButton
                    color="danger"
                    className="text-white"
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
