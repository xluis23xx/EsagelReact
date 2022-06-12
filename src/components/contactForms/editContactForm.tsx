/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { formatDescription, formatNames } from "../../utils/errors";
import { InputForm } from "../global-components/inputForm";

import {
  ContactForm,
  Status,
  useContactForms,
} from "../../hooks/useContactForms";
import { setFormatDate } from "../../utils/formats";
import { TextAreaForm } from "../global-components/textareaForm";
import { SubmitButton } from "../global-components/globalButtons";
import CIcon from "@coreui/icons-react";
import { cilHamburgerMenu } from "@coreui/icons";

const EditContactFormComponent = () => {
  const { updateContactForm, setContactFormById, contactFormInfo, status } =
    useContactForms();
  const history = useHistory();
  const { id } = useParams<any>();

  React.useEffect(() => {
    if (!id) {
      history.push("/medios-contacto");
    }
    setContactFormById(id);
  }, []);

  const stateSchema = {
    name: { value: null, error: "" },
    description: { value: null, error: "" },
  };

  const stateValidatorSchema = {
    name: {
      required: true,
      validator: formatNames(),
      min2caracts: true,
      invalidtext: true,
    },
    description: {
      required: true,
      validator: formatDescription(),
      min2caracts: true,
      invalidtext: true,
    },
  };

  const onSubmitForm = (data: ContactForm) => {
    const contactForm = {
      name: (data?.name ?? contactFormInfo?.name) || null,
      description: (data?.description ?? contactFormInfo?.description) || null,
      status: 1,
    };
    updateContactForm(id, contactForm).then((response) => {
      if (response?.status === 200 || response?.status === 201) {
        history.push("/medios-contacto");
      }
    });
  };

  const {
    values: { name, description },
    errors: { name: nameError, description: descriptionError },
    handleOnChange,
    handleOnSubmit,
    disable,
  } = useForm(stateSchema, stateValidatorSchema, onSubmitForm);

  return (
    <div className="row my-3">
      <div className="col-lg-12">
        <div className="card">
          <div className="card-header">
            <div className="row">
              <div className="col-12 col-sm-6 col-md-10 my-auto">
                <CIcon icon={cilHamburgerMenu} />
                &nbsp;EDITAR MEDIO DE CONTACTO
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="col-sm-12">
              <div className="form-group">
                <label className="fw-bold">
                  Los campos con (*) son obligatorios
                </label>
                <br />
              </div>

              <form className="row" onSubmit={handleOnSubmit}>
                <div className="form-group mt-1 col-sm-6">
                  <label className="form-label" htmlFor="name">
                    Nombre (*):
                  </label>
                  <InputForm
                    type="text"
                    required
                    placeholder="Nombre"
                    name="name"
                    value={(name ?? contactFormInfo?.name) || ""}
                    onChange={handleOnChange}
                    disabled={
                      status === Status.Loading || status === Status.Updating
                    }
                    error={nameError}
                  />
                </div>

                <div className="form-group mt-1 col-sm-6">
                  <label className="form-label" htmlFor="description">
                    Descripción (*):
                  </label>
                  <TextAreaForm
                    required
                    placeholder="Descripción"
                    name="description"
                    value={(description ?? contactFormInfo?.description) || ""}
                    maxLength={100}
                    rows={2}
                    onChange={handleOnChange}
                    disabled={
                      status === Status.Loading || status === Status.Updating
                    }
                    error={descriptionError}
                  />
                </div>
                <div className="col-12" />
                <div className="form-group mt-1 col-sm-6">
                  <label className="form-label" htmlFor="createdAt">
                    Fecha de creación:
                  </label>
                  <InputForm
                    type="date"
                    placeholder="Fecha de creación"
                    name="createdAt"
                    value={
                      setFormatDate({
                        date: contactFormInfo?.createdAt,
                        order: 1,
                      }) || ""
                    }
                    onChange={handleOnChange}
                    disabled={true}
                    showError={false}
                  />
                </div>
                <div className="form-group mt-1 col-sm-6">
                  <label className="form-label" htmlFor="createdAt">
                    Fecha de actualización:
                  </label>
                  <InputForm
                    type="date"
                    placeholder="Fecha de actualización"
                    name="updatedAt"
                    value={
                      setFormatDate({
                        date: contactFormInfo?.updatedAt,
                        order: 1,
                      }) || ""
                    }
                    onChange={handleOnChange}
                    disabled={true}
                    showError={false}
                  />
                </div>
                <div className="col-12" />
                <div className="form-group col-sm-6 col-xl-3 mt-3">
                  <SubmitButton
                    disabled={
                      disable ||
                      status === Status.Loading ||
                      status === Status.Updating
                    }
                  >
                    {status === Status.Updating ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        &nbsp;Cargando...
                      </>
                    ) : (
                      "Actualizar"
                    )}
                  </SubmitButton>
                </div>
                <div className="form-group col-sm-6 col-xl-3 mt-3">
                  <Link
                    to="/medios-contacto"
                    className="btn btn-secondary text-white w-100"
                  >
                    Cancelar
                  </Link>
                </div>
              </form>
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditContactFormComponent;
