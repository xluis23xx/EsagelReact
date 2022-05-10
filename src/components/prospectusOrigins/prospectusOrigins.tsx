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
import { SharedButtons } from "../global-components/sharedButtons";
import { RedirectionButton } from "../global-components/globalButtons";

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

  return (
    <>
      <div className="row mb-3">
        <RedirectionButton redirection="/origenes-prospecto/nuevo" />
      </div>
      <div className="row mt-3">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <CIcon icon={cilHamburgerMenu} />
              &nbsp;Orígenes de Prospecto
            </div>
            <div className="card-body">
              <nav className="navbar navbar-expand-lg navbar-light bg-light px-3 my-2 row">
                <SharedButtons />
                <div className="col-12 col-md-6" />
              </nav>
              <br />
              <div className="w-100 overflow-auto" style={{ height: 300 }}>
                {status === Status.Loading ? (
                  <h4 className="text-center">Espere un momento...</h4>
                ) : null}
                {(status === Status.Ready || status === Status.Updating) &&
                prospectOrigins.length > 0 ? (
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
                    onClick={() => {
                      setProspectusOriginId("");
                      setVisible(false);
                    }}
                  >
                    Cerrar
                  </CButton>
                  <CButton
                    color="danger"
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
