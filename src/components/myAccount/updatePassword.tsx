/* eslint-disable react-hooks/exhaustive-deps */
import { cilLockLocked } from "@coreui/icons";
import * as React from "react";
import { useHistory } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { useProfile, Status } from "../../hooks/useProfile/useProfile";
import { useAuth } from "../../hooks/useAuth/useAuth";
import { User } from "../../hooks/useUsers";
import { formatPass } from "../../utils/errors";
import { InputForm } from "../global-components/inputForm";
import FormContainer from "./formContainer";
import { AuthContext } from "../../context/AuthContext";

const UpdatePassComponent = ({ profile }: { profile: User }) => {
  const { status, updatedpassword } = useProfile();
  const { logoutUser } = useAuth();
  const { setUser } = React.useContext(AuthContext);
  const history = useHistory();
  const stateSchema = {
    newPassword: { value: null, error: "" },
    oldPassword: { value: null, error: "" },
  };

  const stateValidatorSchema = {
    newPassword: {
      required: true,
      validator: formatPass(),
      nospaces: true,
    },
    oldPassword: {
      required: true,
      validator: formatPass(),
      nospaces: true,
    },
  };

  const onSubmitForm = ({
    newPassword,
    oldPassword,
  }: {
    newPassword: string;
    oldPassword: string;
  }) => {
    const changePassword = {
      oldPassword: oldPassword || null,
      newPassword: newPassword || null,
    };
    updatedpassword(profile?._id, changePassword).then((response) => {
      if (response?.status === 200 || response?.status === 201) {
        logoutUser();
        setUser(null);
        history.push("/auth/login");
      }
    });
  };

  const {
    values: { newPassword, oldPassword },
    errors: { newPassword: newPasswordError, oldPassword: oldPasswordError },
    handleOnChange,
    handleOnSubmit,
    disable,
  } = useForm(stateSchema, stateValidatorSchema, onSubmitForm);

  return (
    <FormContainer
      status={status}
      onSubmit={handleOnSubmit}
      disabled={disable}
      icon={cilLockLocked}
      title="CAMBIAR CONTRASEÑA"
    >
      <div className="form-group mt-1 col-sm-6 col-xl-4">
        <label className="form-label" htmlFor="newPassword">
          Nueva Contraseña (*):
        </label>
        <InputForm
          required
          type="password"
          placeholder="Nueva contraseña"
          name="newPassword"
          value={newPassword || ""}
          onChange={handleOnChange}
          disabled={status === Status.Updating}
          error={newPasswordError}
        />
      </div>
      <div className="form-group mt-1 col-sm-6 col-xl-4">
        <label className="form-label" htmlFor="oldPassword">
          Contraseña Actual (*):
        </label>
        <InputForm
          required
          type="password"
          placeholder="Contraseña Actual"
          name="oldPassword"
          value={oldPassword || ""}
          onChange={handleOnChange}
          disabled={status === Status.Updating}
          error={oldPasswordError}
        />
      </div>
    </FormContainer>
  );
};

export default UpdatePassComponent;
