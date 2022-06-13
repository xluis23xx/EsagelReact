import React from "react";
import { Link, useHistory } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { formatDescription, formatExtendNames } from "../../utils/errors";
import { InputForm } from "../global-components/inputForm";

import { Topic, Status, useTopics } from "../../hooks/useTopics";
import { TextAreaForm } from "../global-components/textareaForm";
import { SubmitButton } from "../global-components/globalButtons";
import CIcon from "@coreui/icons-react";
import { cilHamburgerMenu } from "@coreui/icons";

const NewTopicComponent = () => {
  const { registerTopic, status } = useTopics();
  const history = useHistory();

  const stateSchema = {
    name: { value: "", error: "" },
    description: { value: "", error: "" },
  };

  const stateValidatorSchema = {
    name: {
      required: true,
      validator: formatExtendNames(),
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

  const onSubmitForm = (data: Topic) => {
    const topic = {
      name: data.name || null,
      description: data.description || null,
      status: 1,
    };
    registerTopic(topic).then((response) => {
      if (response?.status === 200 || response?.status === 201) {
        history.push("/temas");
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
                &nbsp;NUEVO TEMA
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
                <div className="form-group col-sm-6">
                  <label className="form-label" htmlFor="name">
                    Nombre *
                  </label>
                  <InputForm
                    type="text"
                    required
                    placeholder="Nombre"
                    name="name"
                    value={name}
                    onChange={handleOnChange}
                    disabled={status === Status.Updating}
                    error={nameError}
                  />
                </div>

                <div className="form-group col-sm-6">
                  <label className="form-label" htmlFor="description">
                    Descripción *
                  </label>
                  <TextAreaForm
                    required
                    placeholder="Descripción"
                    name="description"
                    value={description}
                    maxLength={100}
                    rows={2}
                    onChange={handleOnChange}
                    disabled={status === Status.Updating}
                    error={descriptionError}
                  />
                </div>
                <div className="col-12" />
                <div className="form-group col-sm-6 col-xl-3 mt-3">
                  <SubmitButton
                    disabled={disable || status === Status.Updating}
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
                      "Registrar"
                    )}
                  </SubmitButton>
                </div>
                <div className="form-group col-sm-6 col-xl-3 mt-3">
                  <Link
                    to="/temas"
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

export default NewTopicComponent;
