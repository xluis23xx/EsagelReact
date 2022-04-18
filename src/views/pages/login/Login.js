import React from "react";
import { Link } from "react-router-dom";
import { CInputGroupText } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilUser } from "@coreui/icons";
import { useDispatch, useSelector } from "react-redux";
import { formatEmail, formatPass } from "../../../utils/errors";
import useForm from "../../../hooks/useForm";
import { LoginAction } from "../../../actions/authAction";
import { Input } from "../../../components/global-components/input";

const Login = () => {
  const dispatch = useDispatch();

  const [showFormatInvalid, setShowFormatInvalid] = React.useState("");
  const { loading: showLoading = false, error: showError = "" } = useSelector(
    (state) => state.auth
  );

  const stateSchema = {
    email: { value: "", error: "" },
    password: { value: "", error: "" },
  };

  const stateValidatorSchema = {
    email: {
      required: true,
      validator: formatEmail(),
    },
    password: {
      required: true,
      validator: formatPass(),
      nospaces: true,
    },
  };

  const checkFormat = (e) => {
    if (e.target.value.indexOf(" ") >= 0) {
      setShowFormatInvalid("No se permite espacios");
    } else {
      setShowFormatInvalid("");
    }
  };

  const onSubmitForm = ({ email, password }) => {
    dispatch(LoginAction({ email, password }));
  };

  const {
    values: { email, password },
    errors: { email: emailError, password: passwordError },
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
                  <form onSubmit={handleOnSubmit} noValidate>
                    {showError ? (
                      <div
                        className="alert alert-danger text-center p-1"
                        role="alert"
                        style={{ fontSize: 14 }}
                      >
                        {showError}
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
                        className="form-control"
                        placeholder="Correo electrónico"
                        autoComplete="username"
                        disabled={showLoading}
                        error={emailError}
                        name="email"
                        required
                        value={email}
                        onChange={(e) => {
                          handleOnChange(e);
                        }}
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
                        disabled={showLoading}
                        required
                        error={passwordError || showFormatInvalid}
                        name="password"
                        value={password}
                        onChange={(e) => {
                          handleOnChange(e);
                          checkFormat(e);
                        }}
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
                          disabled={disable || showFormatInvalid}
                        >
                          {showLoading ? "Cargando..." : "Ingresar"}
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
