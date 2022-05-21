/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import { useHistory } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { Status, User, useUsers } from "../../hooks/useUsers";
import { formatNames } from "../../utils/errors";
import { InputForm } from "../global-components/inputForm";
import FormContainer from "./formContainer";

const ProfileComponent = ({ profile }: { profile: User }) => {
  const { status, updateUser } = useUsers();
  const history = useHistory();
  const stateSchema = {
    firstname: { value: null, error: "" },
    lastname: { value: null, error: "" },
    secondLastname: { value: null, error: "" },
  };

  const stateValidatorSchema = {
    firstname: {
      validator: formatNames(),
      min2caracts: true,
      invalidtext: true,
    },
    lastname: {
      validator: formatNames(),
      min2caracts: true,
      invalidtext: true,
    },
    secondLastname: {
      validator: formatNames(),
      min2caracts: true,
      invalidtext: true,
    },
  };

  const onSubmitForm = (data: User) => {
    const updateProfile = {
      firstname: (data?.firstname ?? profile?.firstname) || null,
      lastname: (data?.lastname ?? profile?.lastname) || null,
      secondLastname: (data?.secondLastname ?? profile?.secondLastname) || null,
    };
    console.log(updateProfile);
    updateUser(profile?._id, updateProfile).then((response) => {
      if (response?.status === 200 || response?.status === 201) {
        history.push("/mi-perfil");
      }
    });
  };

  const {
    values: { firstname, lastname, secondLastname },
    errors: {
      firstname: firstnameError,
      lastname: lastnameError,
      secondLastname: secondLastnameError,
    },
    handleOnChange,
    handleOnSubmit,
    disable,
  } = useForm(stateSchema, stateValidatorSchema, onSubmitForm);

  return (
    <FormContainer
      status={status}
      onSubmit={handleOnSubmit}
      disabled={disable}
      title="EDITAR PERFIL"
    >
      <div className="form-group mt-1 col-sm-6 col-xl-4">
        <label className="form-label" htmlFor="firstname">
          Nombre:
        </label>
        <InputForm
          placeholder="Nombres"
          name="firstname"
          value={(firstname ?? profile?.firstname) || ""}
          onChange={handleOnChange}
          disabled={status === Status.Updating}
          error={firstnameError}
        />
      </div>
      <div className="form-group mt-1 col-sm-6 col-xl-4">
        <label className="form-label" htmlFor="lastname">
          Apellido Paterno:
        </label>
        <InputForm
          placeholder="Ape. Paterno"
          name="lastname"
          value={(lastname ?? profile?.lastname) || ""}
          onChange={handleOnChange}
          disabled={status === Status.Updating}
          error={lastnameError}
        />
      </div>
      <div className="form-group mt-1 col-sm-6 col-xl-4">
        <label className="form-label" htmlFor="secondLastname">
          Apellido Materno:
        </label>
        <InputForm
          placeholder="Ape. Materno"
          name="secondLastname"
          value={(secondLastname ?? profile?.secondLastname) || ""}
          onChange={handleOnChange}
          disabled={status === Status.Updating}
          error={secondLastnameError}
        />
      </div>
      <div className="form-group mt-1 col-sm-6 col-xl-4">
        <label className="form-label" htmlFor="username">
          Correo Electrónico:
        </label>
        <InputForm
          required
          placeholder="Correo Electrónico"
          name="username"
          value={profile?.username || ""}
          onChange={handleOnChange}
          disabled={true}
        />
      </div>
    </FormContainer>
  );
};

export default ProfileComponent;
