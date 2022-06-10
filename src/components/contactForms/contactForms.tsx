/* eslint-disable react-hooks/exhaustive-deps */
import { cilHamburgerMenu } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import * as React from "react";

import { ContactFormItem } from "./_children/contactForm";
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import {
  ContactForm,
  useContactForms,
  Status,
} from "../../hooks/useContactForms";
import { ExportButtons } from "../global-components/exportButtons";
import { RedirectionButton } from "../global-components/globalButtons";

const ContactFormsComponent = () => {
  const { contactForms, deleteContactForm, getAllContactForms, status } =
    useContactForms();
  const [visible, setVisible] = React.useState(false);
  const [contactFormId, setContactFormId] = React.useState("");

  React.useEffect(() => {
    getAllContactForms();
  }, []);

  const removeContactForm = (id: string) => {
    setVisible(!visible);
    if (!visible) {
      setContactFormId(id);
    } else if (visible && contactFormId) {
      deleteContactForm(id);
      setContactFormId("");
    }
  };

  const tableExportId = "contactForms-table";

  const headers = [
    { label: "Nombre", key: "name" },
    { label: "Descripción", key: "description" },
    { label: "Estado", key: "status" },
  ];

  return (
    <>
      <div className="row mb-3">
        <RedirectionButton redirection="/medios-contacto/nuevo" />
      </div>
      <div className="row my-3">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <CIcon icon={cilHamburgerMenu} />
              &nbsp;MEDIOS DE CONTACTO
            </div>
            <div className="card-body">
              <nav className="navbar navbar-expand-lg navbar-light bg-light px-3 my-2 row">
                <ExportButtons
                  dataReport={contactForms}
                  documentName={"contact forms"}
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
                contactForms.length > 0 ? (
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
                      {contactForms.map(
                        (contactForm: ContactForm, index: number) => {
                          const {
                            _id = "",
                            name,
                            description,
                            status,
                          } = contactForm;
                          return (
                            <ContactFormItem
                              key={index}
                              code={_id}
                              name={name}
                              description={description}
                              status={status}
                              orderNumber={index + 1}
                              handleRemove={removeContactForm}
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
                  setContactFormId("");
                  setVisible(false);
                }}
              >
                <CModalHeader closeButton={true}>
                  <CModalTitle>Eliminar Medio de Contacto</CModalTitle>
                </CModalHeader>
                <CModalBody>
                  ¿Estás seguro que quieres eliminar este medio de contacto?
                </CModalBody>
                <CModalFooter>
                  <CButton
                    color="secondary"
                    className="text-white"
                    onClick={() => {
                      setContactFormId("");
                      setVisible(false);
                    }}
                  >
                    Cerrar
                  </CButton>
                  <CButton
                    color="danger"
                    className="text-white"
                    onClick={() => removeContactForm(contactFormId)}
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

export default ContactFormsComponent;
