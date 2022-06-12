/* eslint-disable react-hooks/exhaustive-deps */
import { cilHamburgerMenu } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import * as React from "react";
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
import { ExportButtons } from "../global-components/exportButtons";
import { RedirectionButton } from "../global-components/globalButtons";
import { savePathname } from "../../utils/location";

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
    savePathname();
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

  const tableExportId = "prospectusStatuses-table";

  const headers = [
    { label: "Nombre", key: "name" },
    { label: "Descripción", key: "description" },
    { label: "Estado", key: "status" },
  ];

  return (
    <>
      <div className="row mb-3">
        <RedirectionButton redirection="/estados-prospecto/nuevo" />
      </div>
      <div className="row my-3">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <CIcon icon={cilHamburgerMenu} />
              &nbsp;ESTADOS DE PROSPECTO
            </div>
            <div className="card-body">
              <nav className="navbar navbar-expand-lg navbar-light bg-light px-3 my-2 row">
                <ExportButtons
                  dataReport={prospectStatuses}
                  documentName={"prospect statuses"}
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
                prospectStatuses.length > 0 ? (
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
                      {prospectStatuses.map(
                        (prospect: ProspectusStatus, index: number) => {
                          const {
                            _id = "",
                            name,
                            description,
                            status,
                          } = prospect;
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
                    className="text-white"
                    onClick={() => {
                      setProspectusStatusId("");
                      setVisible(false);
                    }}
                  >
                    Cerrar
                  </CButton>
                  <CButton
                    color="danger"
                    className="text-white"
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
