/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import useForm from "../../hooks/useForm";
import { Status, User } from "../../hooks/useUsers";
import { formatNames } from "../../utils/errors";
import { InputForm } from "../global-components/inputForm";
import FormContainer from "./formContainer";
import { AuthContext } from "../../context/AuthContext";
import { useProfile } from "../../hooks/useProfile/useProfile";

const ProfileComponent = ({ profile }: { profile: User }) => {
  const { status, updateProfile } = useProfile();
  const { setUser } = React.useContext<any>(AuthContext);
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
    const newProfile = {
      name: (data?.firstname ?? profile?.employee?.name) || null,
      lastname: (data?.lastname ?? profile?.employee?.lastname) || null,
      secondLastname:
        (data?.secondLastname ?? profile?.employee?.secondLastname) || null,
    };
    updateProfile(profile?.employee?._id || "", newProfile).then((response) => {
      if (response?.status === 200 || response?.status === 201) {
        if (data?.firstname || data?.lastname || data?.secondLastname) {
          const USER_PROFILE = localStorage.getItem("esagel_profile");
          if (USER_PROFILE) {
            const USER_PROFILEJSON = JSON.parse(USER_PROFILE);
            const NEW_PROFILE = {
              ...USER_PROFILEJSON,
              employee: {
                ...USER_PROFILEJSON.employee,
                name: data?.firstname ?? profile?.employee?.name,
                lastname: data?.lastname,
                secondLastname: data?.secondLastname,
              },
            };
            setUser(NEW_PROFILE);
            localStorage.setItem("esagel_profile", JSON.stringify(NEW_PROFILE));
          }
        }
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
          value={(firstname ?? profile?.employee?.name) || ""}
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
          value={(lastname ?? profile?.employee?.lastname) || ""}
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
          value={(secondLastname ?? profile?.employee?.secondLastname) || ""}
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
