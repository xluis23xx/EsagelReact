import React from "react";
import {
  CAvatar,
  CDropdown,
  CDropdownHeader,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";
import { cilLockLocked, cilUser } from "@coreui/icons";
import CIcon from "@coreui/icons-react";

import avatarDefault from "./../../assets/images/avatars/avatar-default.png";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { SettingsContext } from "../../context/SettingsContext";

import { useAuth } from "../../hooks/useAuth";

const AppHeaderDropdown = () => {
  const { setUser, user } = React.useContext(AuthContext);
  const { setConfig } = React.useContext(SettingsContext);

  const { logoutUser } = useAuth();

  const closeSession = () => {
    logoutUser();
    setUser(null);
    setConfig(null);
  };

  let userImage = "";

  if (user?.image) {
    userImage = user?.image;
  } else if (user?.employee?.image) {
    userImage = user?.employee?.image;
  }

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={userImage || avatarDefault} size="lg" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">
          Mi Cuenta
        </CDropdownHeader>

        <Link className="dropdown-item" to="/mi-perfil">
          <CIcon icon={cilUser} className="me-2" />
          Editar Perfil
        </Link>
        <button
          className="dropdown-item"
          type="button"
          onClick={() => closeSession()}
        >
          <CIcon icon={cilLockLocked} className="me-2" />
          Cerrar Sesión
        </button>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default AppHeaderDropdown;
