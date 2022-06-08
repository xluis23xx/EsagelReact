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
  RedirectionButton,
} from "../global-components/globalButtons";

const GoalsComponent = () => {
  const { goals, deleteGoal, getAllGoals, searchGoalsByInterval, status } =
    useGoals();
  const [visibleAbortModal, setVisibleAbortModal] = React.useState(false);
  const [goalId, setGoalId] = React.useState("");

  React.useEffect(() => {
    getAllGoals();
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
      startDate = data?.startDate;
    }
    if (data?.endDate) {
      endDate = data?.endDate;
    }
    searchGoalsByInterval(startDate, endDate);
  };

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
                <ExportButtons />
                <IntervalButton
                  handleSearch={handleSearchByInterval}
                  validators={validators}
                />
              </nav>
              <br />
              <div className="w-100 overflow-auto" style={{ height: 300 }}>
                {/* {status === Status.Loading ? (
                  <h4 className="text-center">Espere un momento...</h4>
                ) : null}
                {(status === Status.Ready || status === Status.Updating) &&
                goals.length > 0 ? ( */}
                <table className="table">
                  <thead>
                    <tr>
                      <th>N°</th>
                      <th>Empleado</th>
                      <th>Cantidad Estimada</th>
                      <th>Cantidad Vendida</th>
                      <th>Fecha Inicio</th>
                      <th>Fecha Fin</th>
                      <th>Cumplió?</th>
                      <th>Opciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* {goals.map((goal: Goal, index: number) => {
                        const {
                          _id,
                          estimatedQuantity,
                          quantitySold,
                          endDate,
                          startDate,
                          employee = null,
                          status,
                        } = goal;
                        return ( */}
                    <GoalItem
                      key={5}
                      code={"fdfdfdfdf"}
                      employee={{ lastname: "Pablo", name: "pablo" }}
                      estimatedQuantity={500}
                      quantitySold={800}
                      index={5 + 1}
                      status={1}
                      startDate={"2022/09/10"}
                      endDate={"2022/10/13"}
                      handleCancel={abortGoal}
                    />
                    {/* );
                      })} */}
                  </tbody>
                </table>
                {/* ) : null} */}
              </div>

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
