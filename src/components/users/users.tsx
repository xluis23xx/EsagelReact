/* eslint-disable react-hooks/exhaustive-deps */
import { cilHamburgerMenu } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import * as React from "react";
import { ExportButtons } from "../global-components/exportButtons";
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
  PaginateButtons,
  RedirectionButton,
  SearchButton,
} from "../global-components/globalButtons";
import { savePathname } from "../../utils/location";
import { formatRolName } from "../../utils/formats";

const UsersComponent = () => {
  const {
    users,
    disableUser,
    getAllUsers,
    setSearchFilter,
    changePage,
    paginateData,
    status,
  } = useUsers();
  const [visible, setVisible] = React.useState(false);
  const [userId, setUserId] = React.useState("");

  React.useEffect(() => {
    savePathname();
    setSearchFilter({
      filter: "",
    });
    getAllUsers({ filter: "" }, { limit: 20, pageSize: 1 });
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
    let filter = "";
    if (data?.search) {
      filter = data?.search;
    }
    getAllUsers({ filter: filter }, { limit: 20, pageSize: 1 });
  };

  const tableExportId = "users-table";

  const headers = [
    { label: "Empleado", key: "employeeName" },
    { label: "Rol", key: "rolesName" },
    { label: "Usuario", key: "username" },
    { label: "Estado", key: "status" },
  ];

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
                <ExportButtons
                  dataReport={users.map((user: User) => {
                    const { employee = null, roles = [] } = user || {};
                    let employeeName = "Desconocido";
                    let rolesName = "";
                    if (employee) {
                      const { name, lastname, secondLastname } = employee || {};
                      name ? (employeeName = name) : "";
                      lastname
                        ? (employeeName = `${employeeName} ${lastname}`)
                        : "";
                      secondLastname
                        ? (employeeName = `${employeeName} ${secondLastname}`)
                        : "";
                    }
                    if (roles.length > 0) {
                      roles.map((rol, index) => {
                        if (index) {
                          rolesName = `${rolesName} - ${formatRolName(
                            rol.name || ""
                          )}`;
                        } else {
                          rolesName = formatRolName(rol.name || "");
                        }
                      });
                    }

                    return {
                      ...user,
                      employeeName: employeeName,
                      rolesName: rolesName,
                    };
                  })}
                  documentName={"users"}
                  headers={headers}
                  tableId={tableExportId}
                />
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
                  <table className="table" id={tableExportId}>
                    <thead>
                      <tr>
                        <th>N°</th>
                        {headers
                          ? headers.map((header) => (
                              <th key={header.label}>{header.label}</th>
                            ))
                          : null}
                        <th>Opciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user: User, index: number) => {
                        const {
                          _id = "",
                          employee,
                          username,
                          roles,
                          status,
                        } = user;
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
              {users.length > 0 ? (
                <div className="w-100 text-center mt-2">
                  <PaginateButtons
                    handleChange={changePage}
                    paginate={paginateData}
                  ></PaginateButtons>
                </div>
              ) : null}
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
                  <CButton
                    color="danger"
                    className="text-white"
                    onClick={() => removeUser(userId)}
                  >
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
