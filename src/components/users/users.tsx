/* eslint-disable react-hooks/exhaustive-deps */
import { cilHamburgerMenu } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import * as React from "react";
import { SharedButtons } from "../global-components/sharedButtons";
import { UserItem } from "./_children/user";
import { User, Status, useUsers } from "../../hooks/useUsers";
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import { formatDescription } from "../../utils/errors";
import {
  RedirectionButton,
  SearchButton,
} from "../global-components/globalButtons";

const UsersComponent = () => {
  const { users, disableUser, getAllUsers, searchUsersByFilter, status } =
    useUsers();
  const [visible, setVisible] = React.useState(false);
  const [userId, setUserId] = React.useState("");

  React.useEffect(() => {
    getAllUsers();
  }, []);

  const validators = {
    required: false,
    validator: formatDescription(),
    invalidtext: true,
  };

  const removeUser = (id: string) => {
    setVisible(!visible);
    if (!visible) {
      setUserId(id);
    } else if (visible && userId) {
      disableUser(id);
      setUserId("");
    }
  };

  const handleSearch = (data) => {
    searchUsersByFilter(data.search);
  };

  return (
    <>
      <div className="row mb-3">
        <RedirectionButton redirection="/usuarios/nuevo" />
      </div>
      <div className="row my-3">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <CIcon icon={cilHamburgerMenu} />
              &nbsp;USUARIOS
            </div>
            <div className="card-body">
              <nav className="navbar navbar-expand-lg navbar-light bg-light px-3 my-2 row">
                <SharedButtons />
                <SearchButton
                  validators={validators}
                  handleSearch={handleSearch}
                />
              </nav>
              <br />
              <div className="w-100 overflow-auto" style={{ height: 300 }}>
                {status === Status.Loading ? (
                  <h4 className="text-center">Espere un momento...</h4>
                ) : null}
                {(status === Status.Ready || status === Status.Updating) &&
                users.length > 0 ? (
                  <table className="table">
                    <thead>
                      <tr>
                        <th>N°</th>
                        <th>Empleado</th>
                        <th>Rol</th>
                        <th>Usuario</th>
                        <th>Estado</th>
                        <th>Opciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user: User, index: number) => {
                        const { _id, employee, username, roles, status } = user;
                        return (
                          <UserItem
                            key={index}
                            code={_id}
                            employee={employee}
                            username={username}
                            roles={roles}
                            status={status}
                            orderNumber={index + 1}
                            handleRemove={removeUser}
                          />
                        );
                      })}
                    </tbody>
                  </table>
                ) : null}
              </div>
              <CModal
                visible={visible}
                onClose={() => {
                  setUserId("");
                  setVisible(false);
                }}
              >
                <CModalHeader closeButton={true}>
                  <CModalTitle>Deshabilitar Usuario</CModalTitle>
                </CModalHeader>
                <CModalBody>
                  ¿Estás seguro que quieres deshabilitar este usuario?
                </CModalBody>
                <CModalFooter>
                  <CButton
                    color="secondary"
                    className="text-white"
                    onClick={() => {
                      setUserId("");
                      setVisible(false);
                    }}
                  >
                    Cerrar
                  </CButton>
                  <CButton color="danger" onClick={() => removeUser(userId)}>
                    Eliminar
                  </CButton>
                </CModalFooter>
              </CModal>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UsersComponent;
