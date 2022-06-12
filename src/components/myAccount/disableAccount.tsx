/* eslint-disable react-hooks/exhaustive-deps */
import { cilWarning } from "@coreui/icons";
import * as React from "react";
import { useHistory } from "react-router-dom";
import { useProfile, Status } from "../../hooks/useProfile/useProfile";
import { useAuth } from "../../hooks/useAuth/useAuth";
import { User } from "../../hooks/useUsers";
import { InputForm } from "../global-components/inputForm";
import { AuthContext } from "../../context/AuthContext";
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

const DisableAccountComponent = ({ profile }: { profile: User }) => {
  const { setUser } = React.useContext<any>(AuthContext);
  const { status, disableProfile } = useProfile();
  const { logoutUser } = useAuth();
  const [modalDisableAccount, setModalDisableAccount] = React.useState(false);
  const [wordSecretForm, setWordSecretForm] = React.useState("");
  const [wordUser, setWordUser] = React.useState("");
  const history = useHistory();

  React.useEffect(() => {
    if (profile) {
      let characters = "";
      if (profile?.employee?.name) {
        characters = profile?.employee?.name;
      }
      if (profile?.employee?.lastname) {
        characters = characters + " " + profile?.employee?.lastname;
      }
      setWordSecretForm(characters);
    }
  }, [profile]);

  const onSubmitForm = () => {
    if (wordUser) {
      disableProfile(profile?._id || "").then((response) => {
        if (response?.status === 200 || response?.status === 201) {
          logoutUser();
          setUser(null);
          history.push("/auth/login");
        }
      });
    }
  };

  const showModal = () => {
    setModalDisableAccount(true);
  };

  return (
    <>
      <div className="row my-3">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header bg-danger">
              <div className="row">
                <div className="col-12 col-sm-6 col-md-10 my-auto text-white fw-bold">
                  <CIcon icon={cilWarning} />
                  &nbsp; DESHABILITAR MI CUENTA
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="col-sm-12">
                <div className="form-group">
                  <label className="fw-bold">
                    Una vez que dehabilite su cuenta, solo el administrador
                    podrá volverla a activar. Por favor, esté seguro.
                  </label>
                  <br />
                </div>
                <div className="row">
                  <div className="form-group col-sm-4 col-xl-3 mt-3">
                    <button
                      className="btn btn-dark text-danger w-100 fw-bold"
                      onClick={showModal}
                    >
                      Deshabilitar mi Cuenta
                    </button>
                  </div>
                </div>

                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
      <CModal
        visible={modalDisableAccount}
        onClose={() => {
          setModalDisableAccount(false);
        }}
      >
        <CModalHeader closeButton={true}>
          <CModalTitle>Estás seguro de hacer esto?</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p className="p-3">
            Al deshabilitar tu cuenta solo podrás acceder una vez el
            administrador te vuelva a habilitar tu cuenta. Para continuar con la
            deshabilitación escriba el siguiente texto:{" "}
            <span className="fw-semibold">{wordSecretForm}</span>
          </p>
          <form>
            <InputForm
              value={wordUser}
              type="text"
              maxLength={100}
              onChange={(e) => setWordUser(e.target.value)}
            />
          </form>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            className="text-white"
            onClick={() => {
              setModalDisableAccount(false);
            }}
          >
            Cancelar
          </CButton>
          <CButton
            color="danger"
            className="text-white"
            disabled={
              status === Status.Updating ||
              wordUser !== wordSecretForm ||
              !wordSecretForm
            }
            onClick={onSubmitForm}
          >
            Deshabilitar
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default DisableAccountComponent;
