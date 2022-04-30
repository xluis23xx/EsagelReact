/* eslint-disable react-hooks/exhaustive-deps */
import { cilHamburgerMenu } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import * as React from "react";
import { Link } from "react-router-dom";
import { PropesctusStatusItem } from "./_children/prospectusStatus";
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import {
  ProspectusStatus,
  useProspectStatuses,
  Status,
} from "../../hooks/usePropectusStatus";

const ProspectStatusesComponent = () => {
  const {
    prospectStatuses,
    deleteProspectStatus,
    getAllProspectStatuses,
    status,
  } = useProspectStatuses();
  const [visible, setVisible] = React.useState(false);
  const [prospectusStatusId, setProspectusStatusId] = React.useState("");

  React.useEffect(() => {
    getAllProspectStatuses();
  }, []);

  const removeProspectStatus = (id: string) => {
    setVisible(!visible);
    if (!visible) {
      setProspectusStatusId(id);
    } else if (visible && prospectusStatusId) {
      deleteProspectStatus(id);
      setProspectusStatusId("");
    }
  };

  return (
    <>
      <div className="row mb-3">
        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
          <Link
            className="btn btn-block btn-success w-100 h-auto text-white"
            to="/estados-prospecto/nuevo"
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
              &nbsp;Estados de Prospecto
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
                prospectStatuses.length > 0 ? (
                  <table className="table">
                    <thead>
                      <tr>
                        <th>N°</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Estado</th>
                        <th>Opciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {prospectStatuses.map(
                        (prospect: ProspectusStatus, index: number) => {
                          const { _id, name, description, status } = prospect;
                          return (
                            <PropesctusStatusItem
                              key={index}
                              code={_id}
                              name={name}
                              description={description}
                              status={status}
                              orderNumber={index + 1}
                              handleRemove={removeProspectStatus}
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
                  setProspectusStatusId("");
                  setVisible(false);
                }}
              >
                <CModalHeader closeButton={true}>
                  <CModalTitle>Eliminar Estado de Prospecto</CModalTitle>
                </CModalHeader>
                <CModalBody>
                  ¿Estás seguro que quieres eliminar este estado de prospecto?
                </CModalBody>
                <CModalFooter>
                  <CButton
                    color="secondary"
                    onClick={() => {
                      setProspectusStatusId("");
                      setVisible(false);
                    }}
                  >
                    Cerrar
                  </CButton>
                  <CButton
                    color="danger"
                    onClick={() => removeProspectStatus(prospectusStatusId)}
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

export default ProspectStatusesComponent;
