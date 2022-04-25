/* eslint-disable react-hooks/exhaustive-deps */
import { cilHamburgerMenu } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import * as React from "react";
import { Link } from "react-router-dom";
import { DocumentTypeItem } from "./_children/document";
import {
  DocumentType,
  Status,
  useDocumentTypes,
} from "../../hooks/useDocuments";
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";

const DocumentTypesComponent = () => {
  const { documents, deleteDocumentType, getAllDocumentTypes, status } =
    useDocumentTypes();
  const [visible, setVisible] = React.useState(false);
  const [documentTypeId, setDocumentTypeId] = React.useState("");

  React.useEffect(() => {
    getAllDocumentTypes();
  }, []);

  const removeDocumentType = (id: string) => {
    setVisible(!visible);
    if (!visible) {
      setDocumentTypeId(id);
    } else if (visible && documentTypeId) {
      deleteDocumentType(id);
      setDocumentTypeId("");
    }
  };

  return (
    <>
      <div className="row mb-3">
        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
          <Link
            className="btn btn-block btn-success w-100 h-auto text-white"
            to="/tipo-documentos/nuevo"
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
              &nbsp;Tipos de Documento
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
                documents.length > 0 ? (
                  <table className="table">
                    <thead>
                      <tr>
                        <th>N°</th>
                        <th>Nombre</th>
                        <th>Operación</th>
                        <th>Fecha de creación</th>
                        <th>Ultimá fecha de actualización</th>
                        <th>Opciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {documents.map(
                        (document: DocumentType, index: number) => {
                          const {
                            _id,
                            name,
                            operation,
                            createdAt,
                            updatedAt,
                            status,
                          } = document;
                          return (
                            <DocumentTypeItem
                              key={index}
                              code={_id}
                              name={name}
                              operation={operation}
                              createdAt={createdAt}
                              updatedAt={updatedAt}
                              status={status}
                              orderNumber={index + 1}
                              handleRemove={removeDocumentType}
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
                  setDocumentTypeId("");
                  setVisible(false);
                }}
              >
                <CModalHeader closeButton={true}>
                  <CModalTitle>Eliminar Tipo de Documento</CModalTitle>
                </CModalHeader>
                <CModalBody>
                  ¿Estás seguro que quieres eliminar este empleado?
                </CModalBody>
                <CModalFooter>
                  <CButton
                    color="secondary"
                    onClick={() => {
                      setDocumentTypeId("");
                      setVisible(false);
                    }}
                  >
                    Cerrar
                  </CButton>
                  <CButton
                    color="danger"
                    onClick={() => removeDocumentType(documentTypeId)}
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

export default DocumentTypesComponent;
