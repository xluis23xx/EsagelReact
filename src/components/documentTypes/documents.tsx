/* eslint-disable react-hooks/exhaustive-deps */
import { cilHamburgerMenu } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import * as React from "react";
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
import { ExportButtons } from "../global-components/exportButtons";
import { RedirectionButton } from "../global-components/globalButtons";
import { savePathname } from "../../utils/location";

const DocumentTypesComponent = () => {
  const { documents, deleteDocumentType, getAllDocumentTypes, status } =
    useDocumentTypes();
  const [visible, setVisible] = React.useState(false);
  const [documentTypeId, setDocumentTypeId] = React.useState("");

  React.useEffect(() => {
    savePathname();
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

  const tableExportId = "documentTypes-table";

  const headers = [
    { label: "Nombre", key: "name" },
    { label: "Operación", key: "operation" },
    { label: "Código", key: "code" },
    { label: "Longitud", key: "length" },
    { label: "Fecha de creación", key: "createdAt" },
    { label: "Última fecha de actualización", key: "updatedAt" },
  ];

  return (
    <>
      <div className="row mb-3">
        <RedirectionButton redirection="/tipos-documento/nuevo" />
      </div>
      <div className="row my-3">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <CIcon icon={cilHamburgerMenu} />
              &nbsp;TIPOS DE DOCUMENTO
            </div>
            <div className="card-body">
              <nav className="navbar navbar-expand-lg navbar-light bg-light px-3 my-2 row">
                <ExportButtons
                  dataReport={documents}
                  documentName="document types"
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
                documents.length > 0 ? (
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
                      {documents.map(
                        (document: DocumentType, index: number) => {
                          const {
                            _id = "",
                            name,
                            operation,
                            createdAt,
                            updatedAt,
                            code,
                            length,
                            status,
                          } = document;
                          return (
                            <DocumentTypeItem
                              key={index}
                              _id={_id}
                              name={name}
                              code={code}
                              length={length}
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
                  ¿Estás seguro que quieres eliminar este tipo de documento?
                </CModalBody>
                <CModalFooter>
                  <CButton
                    color="secondary"
                    className="text-white"
                    onClick={() => {
                      setDocumentTypeId("");
                      setVisible(false);
                    }}
                  >
                    Cerrar
                  </CButton>
                  <CButton
                    color="danger"
                    className="text-white"
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
