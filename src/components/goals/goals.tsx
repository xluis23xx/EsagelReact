/* eslint-disable react-hooks/exhaustive-deps */
import { cilHamburgerMenu } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import * as React from "react";
import { GoalItem } from "./_children/goal";
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import { Goal, useGoals, Status } from "../../hooks/useGoals";
import { ExportButtons } from "../global-components/exportButtons";
import {
  IntervalButton,
  PaginateButtons,
  RedirectionButton,
} from "../global-components/globalButtons";
import { savePathname } from "../../utils/location";
import { setFormatDate } from "../../utils/formats";

const GoalsComponent = () => {
  const {
    goals,
    deleteGoal,
    getGoalsByFilter,
    paginateData,
    status,
    setSearchFilter,
    changePage,
  } = useGoals();
  const [visibleAbortModal, setVisibleAbortModal] = React.useState(false);
  const [goalId, setGoalId] = React.useState("");

  React.useEffect(() => {
    savePathname();
    const currentDate = new Date();
    const startDate = `${setFormatDate({
      order: 1,
      date: currentDate,
      separator: "-",
    })}T00:00:00.0+00:00`;
    const endDate = `${setFormatDate({
      order: 1,
      date: currentDate,
      separator: "-",
    })}T23:59:59.999+00:00`;
    setSearchFilter({
      startDate: startDate,
      endDate: endDate,
      status: 1,
    });
    getGoalsByFilter(
      { startDate, endDate, status: 1 },
      { limit: 20, pageSize: 1 }
    );
  }, []);

  const abortGoal = (id: string) => {
    setVisibleAbortModal(!visibleAbortModal);
    if (!visibleAbortModal) {
      setGoalId(id);
    } else if (visibleAbortModal && goalId) {
      deleteGoal(id);
      setGoalId("");
    }
  };

  const validators = {
    required: true,
    invalidtext: true,
  };

  const handleSearchByInterval = (data) => {
    let startDate = "";
    let endDate = "";
    if (data?.startDate) {
      startDate = `${data?.startDate.replace("/", "-")}T00:00:00.0+00:00`;
    }
    if (data?.endDate) {
      endDate = `${data?.endDate.replace("/", "-")}T23:59:59.999+00:00`;
    }
    setSearchFilter({ startDate: startDate, endDate: endDate });
    getGoalsByFilter(
      { startDate, endDate, status: 1 },
      { limit: 20, pageSize: 1 }
    );
  };

  const tableExportId = "goals-table";

  const headers = [
    { label: "Empleado", key: "employeeName" },
    { label: "Cantidad Estimada", key: "estimatedQuantity" },
    { label: "Cantidad Vendida", key: "quantitySold" },
    { label: "Fecha Inicio", key: "startDate" },
    { label: "Fecha Fin", key: "endDate" },
    { label: "Cumplió?", key: "isSucceed" },
  ];

  return (
    <>
      <div className="row mb-3">
        <RedirectionButton redirection="/metas/nuevo" />
      </div>
      <div className="row my-3">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <CIcon icon={cilHamburgerMenu} />
              &nbsp;METAS
            </div>
            <div className="card-body">
              <nav className="navbar navbar-expand-lg navbar-light bg-light px-3 my-2 row">
                <ExportButtons
                  dataReport={goals.map((goal) => {
                    const {
                      seller = null,
                      estimatedQuantity = 1,
                      quantitySold = 0,
                    } = goal || {};
                    let employeeName = "Desconocido";
                    const { employee = null } = seller || {};
                    if (employee) {
                      employee?.name ? (employeeName = employee?.name) : "";
                      employee?.lastname
                        ? (employeeName = `${employeeName} ${employee?.lastname}`)
                        : "";
                    }
                    return {
                      ...goal,
                      employeeName: employeeName,
                      isSucceed:
                        estimatedQuantity <= quantitySold ? "SÍ" : "NO",
                    };
                  })}
                  headers={headers}
                  documentName={"goals"}
                  tableId={tableExportId}
                />
                <IntervalButton
                  handleSearch={handleSearchByInterval}
                  validators={validators}
                  required={false}
                />
              </nav>
              <br />
              <div className="w-100 overflow-auto" style={{ height: 300 }}>
                {status === Status.Loading ? (
                  <h4 className="text-center">Espere un momento...</h4>
                ) : null}
                {(status === Status.Ready || status === Status.Updating) &&
                goals.length > 0 ? (
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
                      {goals.map((goal: Goal, index: number) => {
                        const {
                          _id = "",
                          estimatedQuantity,
                          quantitySold,
                          endDate,
                          startDate,
                          seller = null,
                        } = goal;
                        return (
                          <GoalItem
                            key={index}
                            code={_id}
                            seller={seller}
                            estimatedQuantity={estimatedQuantity}
                            quantitySold={quantitySold}
                            index={index + 1}
                            startDate={startDate}
                            endDate={endDate}
                            handleCancel={abortGoal}
                          />
                        );
                      })}
                    </tbody>
                  </table>
                ) : null}
              </div>
              {goals.length > 0 ? (
                <div className="w-100 text-center mt-2">
                  <PaginateButtons
                    handleChange={changePage}
                    paginate={paginateData}
                  ></PaginateButtons>
                </div>
              ) : null}

              <CModal
                visible={visibleAbortModal}
                onClose={() => {
                  setGoalId("");
                  setVisibleAbortModal(false);
                }}
              >
                <CModalHeader closeButton={true}>
                  <CModalTitle>Eliminar Meta</CModalTitle>
                </CModalHeader>
                <CModalBody>
                  ¿Estás seguro que quieres eliminar esta meta?
                </CModalBody>
                <CModalFooter>
                  <CButton
                    color="secondary"
                    className="text-white"
                    onClick={() => {
                      setGoalId("");
                      setVisibleAbortModal(false);
                    }}
                  >
                    Cerrar
                  </CButton>
                  <CButton
                    color="danger"
                    className="text-white"
                    onClick={() => abortGoal(goalId)}
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

export default GoalsComponent;
