import { cilUser } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import * as React from "react";

import { Status } from "../../hooks/useUsers";
import { SubmitButton } from "../global-components/globalButtons";

interface FormContainerProps {
  title: string;
  icon?: any;
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  status: Status;
  disabled?: boolean;
}

const FormContainer: React.FC<FormContainerProps> = ({
  title,
  icon = cilUser,
  children,
  onSubmit,
  status = Status.Loading,
  disabled = false,
}) => {
  return (
    <div className="row my-3">
      <div className="col-lg-12">
        <div className="card">
          <div className="card-header">
            <div className="row">
              <div className="col-12 col-sm-6 col-md-10 my-auto fw-semibold">
                <CIcon icon={icon} />
                &nbsp;{title}
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
              <form className="row" onSubmit={onSubmit} noValidate>
                {children}
                <div className="col-12" />
                <div className="form-group col-sm-6 col-xl-3 mt-3">
                  <SubmitButton
                    disabled={disabled || status === Status.Updating}
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
                      "Guardar Cambios"
                    )}
                  </SubmitButton>
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

export default FormContainer;
