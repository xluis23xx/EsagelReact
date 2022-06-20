/* eslint-disable react-hooks/exhaustive-deps */
import { cilHamburgerMenu } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import * as React from "react";
import { CenterItem } from "./_children/center";

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
import { useCenters, Center, Status } from "../../hooks/useCenters";

const CentersComponent = () => {
  const { centers, deleteCenter, getCentersByFilter, status } = useCenters();
  const [visible, setVisible] = React.useState(false);
  const [centerId, setCenterId] = React.useState("");

  React.useEffect(() => {
    savePathname();
    getCentersByFilter({ filter: "" }, { limit: 100 });
  }, []);

  const removeCenter = (id: string) => {
    setVisible(!visible);
    if (!visible) {
      setCenterId(id);
    } else if (visible && centerId) {
      deleteCenter(id);
      setCenterId("");
    }
  };

  const tableExportId = "centers-table";

  const headers = [
    { label: "Nombre Local", key: "branchName" },
    { label: "Dirección", key: "address" },
    { label: "Fecha de creación", key: "createdAt" },
    { label: "Última fecha de actualización", key: "updatedAt" },
    { label: "Estado", key: "status" },
  ];

  return (
    <>
      <div className="row mb-3">
        <RedirectionButton redirection="/centros/nuevo" />
      </div>
      <div className="row my-3">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <CIcon icon={cilHamburgerMenu} />
              &nbsp;CENTROS
            </div>
            <div className="card-body">
              <nav className="navbar navbar-expand-lg navbar-light bg-light px-3 my-2 row">
                <ExportButtons
                  dataReport={centers}
                  documentName={"centers"}
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
                centers.length > 0 ? (
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
                      {centers.map((center: Center, index: number) => {
                        const {
                          _id = "",
                          branchName,
                          address,
                          createdAt,
                          updatedAt,
                          status,
                        } = center;
                        return (
                          <CenterItem
                            key={index}
                            code={_id}
                            branchName={branchName}
                            address={address}
                            createdAt={createdAt}
                            updatedAt={updatedAt}
                            status={status}
                            orderNumber={index + 1}
                            handleRemove={removeCenter}
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
                  setCenterId("");
                  setVisible(false);
                }}
              >
                <CModalHeader closeButton={true}>
                  <CModalTitle>Eliminar Tipo de Curso</CModalTitle>
                </CModalHeader>
                <CModalBody>
                  ¿Estás seguro que quieres deshabilitar este centro?
                </CModalBody>
                <CModalFooter>
                  <CButton
                    color="secondary"
                    className="text-white"
                    onClick={() => {
                      setCenterId("");
                      setVisible(false);
                    }}
                  >
                    Cerrar
                  </CButton>
                  <CButton
                    color="danger"
                    className="text-white"
                    onClick={() => removeCenter(centerId)}
                  >
                    Deshabilitar
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

export default CentersComponent;
