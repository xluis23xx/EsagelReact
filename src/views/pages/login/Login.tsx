import React from "react";
import { Link } from "react-router-dom";
import { CInputGroupText } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilUser } from "@coreui/icons";
import { formatEmail, formatPass } from "../../../utils/errors";
import useForm from "../../../hooks/useForm";
import { InputForm as Input } from "../../../components/global-components/inputForm";
import { useAuth, Status, Auth } from "../../../hooks/useAuth";
import { AuthContext } from "../../../context/AuthContext";
import { setCookie } from "src/utils/cookies";

const Login = () => {
  const { setUser } = React.useContext(AuthContext);
  const [showFormatInvalid, setShowFormatInvalid] = React.useState("");
  const { verifyAuthentication, message, status } = useAuth();

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
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-sm-10 col-md-6 col-lg-5">
            <div className="card-group">
              <div className="card p-4">
                <div className="card-body">
                  <h1>Iniciar Sesión</h1>
                  <p className="text-medium-emphasis">Accede a tu cuenta</p>
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
                    <Link
                      className="m-0 ms-auto d-block mb-3 text-end"
                      to="/restore"
                    >
                      ¿Olvidaste tu contraseña?
                    </Link>
                    <div className="row">
                      <div className="col-12">
                        <button
                          className="btn btn-info text-white w-100"
                          type="submit"
                          disabled={
                            disable ||
                            status === Status.Loading ||
                            showFormatInvalid
                              ? true
                              : false
                          }
                        >
                          {status === Status.Loading
                            ? "Cargando..."
                            : "Ingresar"}
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
