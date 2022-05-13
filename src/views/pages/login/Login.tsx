import React from "react";
import { CImage, CInputGroupText } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilUser } from "@coreui/icons";
import { formatEmail, formatPass } from "../../../utils/errors";
import useForm from "../../../hooks/useForm";
import { InputForm as Input } from "../../../components/global-components/inputForm";
import { useAuth, Status, Auth } from "../../../hooks/useAuth";
import { AuthContext } from "../../../context/AuthContext";
import { SettingsContext } from "../../../context/SettingsContext";
import { setCookie } from "../../../utils/cookies";
import { useSettings } from "../../../hooks/useSettings";
import esagelImage from "src/assets/images/esagel-blanco.png";

const Login = () => {
  const { setUser } = React.useContext(AuthContext);
  const { setConfig } = React.useContext(SettingsContext);
  const [showFormatInvalid, setShowFormatInvalid] = React.useState("");
  const { verifyAuthentication, message, status } = useAuth();
  const { getSettingsConfig } = useSettings();

  const stateSchema = {
    username: { value: "", error: "" },
    password: { value: "", error: "" },
  };

  const stateValidatorSchema = {
    username: {
      required: true,
      validator: formatEmail(),
    },
    password: {
      required: true,
      validator: formatPass(),
      nospaces: true,
    },
  };

  const checkFormat = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.indexOf(" ") >= 0) {
      setShowFormatInvalid("No se permite espacios");
    } else {
      setShowFormatInvalid("");
    }
  };

  const onSubmitForm = async (data: Auth) => {
    const resp = await verifyAuthentication(data);
    if (resp?.status === 200 || resp?.status === 201) {
      if (resp?.token) {
        setCookie("esagel_token", resp?.token, 1);
        const config = await getSettingsConfig();
        setConfig(config);
      }
      if (resp?.user) {
        localStorage.setItem("esagel_profile", JSON.stringify(resp?.user));
        setUser(resp.user);
      }
    }
  };

  const {
    values: { username, password },
    errors: { username: usernameError, password: passwordError },
    handleOnChange,
    handleOnSubmit,
    disable,
  } = useForm(stateSchema, stateValidatorSchema, onSubmitForm);

  return (
    <div
      className="min-vh-100 d-flex flex-row align-items-center"
      style={{ backgroundColor: "#D9D9D9" }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-sm-8 col-md-5 col-lg-4">
            <div className="card-group">
              <div className="card">
                <div
                  className="card-header"
                  style={{ backgroundColor: "#F50000", maxHeight: 90 }}
                >
                  <CImage
                    src={esagelImage}
                    style={{
                      width: "auto",
                      padding: 3,
                      margin: "auto",
                      display: "block",
                      maxHeight: 70,
                    }}
                  />
                </div>
                <div className="card-body p-4 pb-5">
                  <p className="w-100 d-flex">
                    <span
                      style={{ height: 3, backgroundColor: "#000000" }}
                      className="d-flex w-100 my-auto"
                    />
                    <span
                      className="text-large-emphasis text-center fw-bolder mx-2 d-flex"
                      style={{ color: "#F50000" }}
                    >
                      BIENVENIDO
                    </span>
                    <span
                      style={{ height: 3, backgroundColor: "#000000" }}
                      className="d-flex w-100 my-auto"
                    />
                  </p>

                  <form onSubmit={handleOnSubmit}>
                    {status === Status.Error ? (
                      <div
                        className="alert alert-danger text-center p-1"
                        role="alert"
                        style={{ fontSize: 14 }}
                      >
                        {message}
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="input-group mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <Input
                        type="email"
                        placeholder="Correo electrónico"
                        autoComplete="username"
                        disabled={status === Status.Loading}
                        name="username"
                        required
                        value={username}
                        onChange={(e) => {
                          handleOnChange(e);
                        }}
                        error={usernameError}
                      />
                    </div>
                    <div className="input-group mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <Input
                        type="password"
                        placeholder="Contraseña"
                        autoComplete="current-password"
                        disabled={status === Status.Loading}
                        required
                        name="password"
                        value={password}
                        onChange={(e) => {
                          handleOnChange(e);
                          checkFormat(e);
                        }}
                        error={passwordError || showFormatInvalid}
                      />
                    </div>
                    {/* <Link
                      className="m-0 ms-auto d-block mb-3 text-end"
                      to="/restore"
                    >
                      ¿Olvidaste tu contraseña?
                    </Link> */}
                    <div className="row">
                      <div className="col-12">
                        <button
                          className="btn text-white w-100"
                          style={{ backgroundColor: "red" }}
                          type="submit"
                          disabled={
                            disable ||
                            status === Status.Loading ||
                            showFormatInvalid
                              ? true
                              : false
                          }
                        >
                          {status === Status.Loading ? (
                            <>
                              <span
                                className="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true"
                              ></span>
                              &nbsp;Cargando...
                            </>
                          ) : (
                            "Iniciar sesión"
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
