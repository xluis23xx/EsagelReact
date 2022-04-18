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

  const ingresarLogin = (datos) => dispatch(LoginAction(datos));

  const stateSchema = {
    lemail: { value: "", error: "" },
    lpassword: { value: "", error: "" },
  };

  const stateValidatorSchema = {
    lemail: {
      required: true,
      validator: formatEmail(),
    },
    lpassword: {
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

  // const ingresarLogin = (datos) => dispatch(LoginAction(datos));

  const onSubmitForm = (data) => {
    // dispatch(LoginAction({ email: data.email, password: data.password }));
    ingresarLogin(data);
  };

  const {
    values: { lemail, lpassword },
    errors: { lemail: lemailError, lpassword: lpasswordError },
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
                        placeholder="Correo electrónico"
                        autoComplete="username"
                        disabled={showLoading}
                        name="lemail"
                        required
                        value={lemail}
                        onChange={(e) => {
                          handleOnChange(e);
                        }}
                        error={lemailError}
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
                        name="lpassword"
                        value={lpassword}
                        onChange={(e) => {
                          handleOnChange(e);
                          checkFormat(e);
                        }}
                        error={lpasswordError || showFormatInvalid}
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
                          onClick={() => console.log("perrooo")}
                          disabled={disable || showLoading || showFormatInvalid}
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
