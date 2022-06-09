/* eslint-disable react-hooks/exhaustive-deps */
import { cilHamburgerMenu } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import * as React from "react";
import { PropesctusOriginItem } from "./_children/prospectusOrigin";
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import {
  ProspectusOrigin,
  useProspectOrigins,
  Status,
} from "../../hooks/useProspectusOrigin";
import { ExportButtons } from "../global-components/exportButtons";
import { RedirectionButton } from "../global-components/globalButtons";
import { savePathname } from "../../utils/location";

const ProspectOriginsComponent = () => {
  const {
    prospectOrigins,
    deleteProspectOrigin,
    getAllProspectOrigins,
    status,
  } = useProspectOrigins();
  const [visible, setVisible] = React.useState(false);
  const [prospectusOriginId, setProspectusOriginId] = React.useState("");

  React.useEffect(() => {
    savePathname();
    getAllProspectOrigins();
  }, []);

  const removeProspectOrigin = (id: string) => {
    setVisible(!visible);
    if (!visible) {
      setProspectusOriginId(id);
    } else if (visible && prospectusOriginId) {
      deleteProspectOrigin(id);
      setProspectusOriginId("");
    }
  };

  const tableExportId = "prospectusOrigins-table";

  const headers = [
    { label: "Nombre", key: "name" },
    { label: "Descripción", key: "description" },
    { label: "Estado", key: "status" },
  ];

  return (
    <>
      <div className="row mb-3">
        <RedirectionButton redirection="/origenes-prospecto/nuevo" />
      </div>
      <div className="row my-3">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <CIcon icon={cilHamburgerMenu} />
              &nbsp;ORÍGENES DE PROSPECTO
            </div>
            <div className="card-body">
              <nav className="navbar navbar-expand-lg navbar-light bg-light px-3 my-2 row">
                <ExportButtons
                  dataReport={prospectOrigins}
                  documentName={"prospectus origins"}
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
                prospectOrigins.length > 0 ? (
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
                      {prospectOrigins.map(
                        (prospect: ProspectusOrigin, index: number) => {
                          const { _id, name, description, status } = prospect;
                          return (
                            <PropesctusOriginItem
                              key={index}
                              code={_id}
                              name={name}
                              description={description}
                              status={status}
                              orderNumber={index + 1}
                              handleRemove={removeProspectOrigin}
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
                  setProspectusOriginId("");
                  setVisible(false);
                }}
              >
                <CModalHeader closeButton={true}>
                  <CModalTitle>Eliminar Origen de Prospecto</CModalTitle>
                </CModalHeader>
                <CModalBody>
                  ¿Estás seguro que quieres eliminar este origen de prospecto?
                </CModalBody>
                <CModalFooter>
                  <CButton
                    color="secondary"
                    className="text-white"
                    onClick={() => {
                      setProspectusOriginId("");
                      setVisible(false);
                    }}
                  >
                    Cerrar
                  </CButton>
                  <CButton
                    color="danger"
                    className="text-white"
                    onClick={() => removeProspectOrigin(prospectusOriginId)}
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

export default ProspectOriginsComponent;
