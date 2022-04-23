import React from "react";

import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CImage,
  CNavItem,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilMenu } from "@coreui/icons";

import { AppBreadcrumb } from "./index";
import { AppHeaderDropdown } from "./header/index";
import esagelImage from "src/assets/images/esagel.png";
import { useDispatch, useSelector } from "react-redux";

import { types } from "../types/types";
import { AuthContext } from "../context/AuthContext";

const AppHeader = () => {
  const distpatch = useDispatch();

  const { sidebarShow } = useSelector((state) => state.nav);
  const { user } = React.useContext(AuthContext);
  let nameProfile = "";
  let roles = "";
  if (Object.keys(user).length > 0) {
    if (user?.employee?.name) {
      nameProfile = user.employee.name;
    } else if (user.username) {
      nameProfile = user.username;
    } else {
      nameProfile = "Invitado";
    }
  }

  if (user?.roles) {
    if (user?.roles.length > 0) {
      user?.roles.map((rol, index) =>
        index === 0
          ? (roles = roles.concat(rol.name))
          : (roles = roles.concat(`- ${rol.name}`))
      );
    }
  }

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() =>
            distpatch({ type: types.nav.set, payload: !sidebarShow })
          }
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <CImage src={esagelImage} height={48} alt="Logo" />
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem className="d-block fw-bold">
            Usuario: {nameProfile}
          </CNavItem>
          <CNavItem className="d-block ms-5 fw-bold">Rol(es): {roles}</CNavItem>
        </CHeaderNav>
        <CHeaderNav className="ms-3">
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
      <CHeaderDivider />
      <CContainer fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  );
};

export default AppHeader;
