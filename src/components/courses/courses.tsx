/* eslint-disable react-hooks/exhaustive-deps */
import { cilHamburgerMenu } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import * as React from "react";
import { ExportButtons } from "../global-components/exportButtons";
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
import { formatExtendNames } from "../../utils/errors";
import {
  PaginateButtons,
  RedirectionButton,
  SearchButton,
} from "../global-components/globalButtons";
import { savePathname } from "../../utils/location";

const CoursesComponent = () => {
  const {
    courses,
    deleteCourse,
    getCoursesByFilter,
    setSearchFilter,
    changePage,
    paginateData,
    status,
  } = useCourses();
  const [visible, setVisible] = React.useState(false);
  const [courseId, setCourseId] = React.useState("");

  React.useEffect(() => {
    savePathname();
    setSearchFilter({
      filter: "",
      status: 1,
    });
    getCoursesByFilter({ filter: "", status: 1 }, { limit: 20, pageSize: 1 });
  }, []);

  const validators = {
    required: false,
    validator: formatExtendNames(),
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

  const handleSearch = ({ search }: { search: string | null }) => {
    let filter = "";
    if (search) {
      filter = search;
    }
    getCoursesByFilter({ filter, status: 1 }, { limit: 20, pageSize: 1 });
  };

  const tableExportId = "courses-table";

  const headers = [
    { label: "Código", key: "code" },
    { label: "Nombre", key: "name" },
    { label: "Tipo", key: "courseTypeName" },
    { label: "Modalidad", key: "modality" },
    { label: "Precio", key: "price" },
    { label: "Nro. Vacantes", key: "vacanciesNumber" },
    { label: "Estado", key: "status" },
  ];

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
                <ExportButtons
                  tableId={tableExportId}
                  documentName="courses"
                  dataReport={courses.map((course: Course) => {
                    const { courseType = null } = course || {};
                    let typeName = "";
                    if (courseType) {
                      courseType?.name ? (typeName = courseType?.name) : "";
                    }
                    return {
                      ...course,
                      courseTypeName: typeName,
                    };
                  })}
                  headers={headers}
                />
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
                      {courses.map((course: Course, index: number) => {
                        const {
                          _id = "",
                          code = "",
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
              {courses.length > 0 ? (
                <div className="w-100 text-center mt-2">
                  <PaginateButtons
                    handleChange={changePage}
                    paginate={paginateData}
                  ></PaginateButtons>
                </div>
              ) : null}
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
                    className="text-white"
                    onClick={() => {
                      setCourseId("");
                      setVisible(false);
                    }}
                  >
                    Cerrar
                  </CButton>
                  <CButton
                    color="danger"
                    className="text-white"
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

export default CoursesComponent;
