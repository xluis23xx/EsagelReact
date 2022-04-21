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

import avatar8 from "./../../assets/images/avatars/8.jpg";
import { Link } from "react-router-dom";

const AppHeaderDropdown = () => {
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
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
          onClick={() => console.log("cerrar Sesion")}
        >
          <CIcon icon={cilLockLocked} className="me-2" />
          Cerrar Sesión
        </button>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default AppHeaderDropdown;
