/* eslint-disable react-hooks/exhaustive-deps */
import { cilHamburgerMenu } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import * as React from "react";
import { Link } from "react-router-dom";
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
import { SharedButtons } from "../global-components/sharedButtons";

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

  return (
    <>
      <div className="row mb-3">
        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
          <Link
            className="btn btn-block btn-success w-100 h-auto text-white"
            to="/medios-contacto/nuevo"
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
              &nbsp;Medios de Contacto
            </div>
            <div className="card-body">
              <nav className="navbar navbar-expand-lg navbar-light bg-light px-3 my-2 row">
                <SharedButtons />
              </nav>
              <br />
              <div className="w-100 overflow-auto" style={{ height: 300 }}>
                {status === Status.Loading ? (
                  <h4 className="text-center">Espere un momento...</h4>
                ) : null}
                {(status === Status.Ready || status === Status.Updating) &&
                contactForms.length > 0 ? (
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
                      {contactForms.map(
                        (contactForm: ContactForm, index: number) => {
                          const { _id, name, description, status } =
                            contactForm;
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
                    onClick={() => {
                      setContactFormId("");
                      setVisible(false);
                    }}
                  >
                    Cerrar
                  </CButton>
                  <CButton
                    color="danger"
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
