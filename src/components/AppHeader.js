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
// import esagelImage from "src/assets/images/esagel-blanco.png";
import esagelImage2 from "src/assets/images/esagel.png";
import { useDispatch, useSelector } from "react-redux";

import { types } from "../types/types";
import { AuthContext } from "../context/AuthContext";
import { SettingsContext } from "../context/SettingsContext";
import { formatRolName } from "../utils/formats";
// import { ToggleButtonThemeComponent } from "./global-components/toggleButtonTheme";

const AppHeader = () => {
  const distpatch = useDispatch();

  const { sidebarShow } = useSelector((state) => state.nav);
  const { user } = React.useContext(AuthContext);
  const { config } = React.useContext(SettingsContext);

  let nameProfile = "";
  let roles = "";
  if (Object.keys(user).length > 0) {
    if (user?.employee?.name) {
      if (user?.employee?.lastname) {
        nameProfile = `${user.employee.name} ${user.employee.lastname}`;
      } else {
        nameProfile = user.employee.name;
      }
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
          ? (roles = roles.concat(formatRolName(rol.name)))
          : (roles = roles.concat(` - ${formatRolName(rol.name)}`))
      );
    }
  }

  return (
    <CHeader position="sticky" className="mb-4 bg-black">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() =>
            distpatch({ type: types.nav.set, payload: !sidebarShow })
          }
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none text-light" to="/">
          {config?.url ? (
            <a href={config?.url} target={"_blank"} rel="noreferrer">
              <CImage src={esagelImage2} height={48} alt="Logo" />
            </a>
          ) : (
            <CImage src={esagelImage2} height={48} alt="Logo" />
          )}
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto text-light">
          <CNavItem className="d-block fw-bold">
            Usuario: {nameProfile}
          </CNavItem>
          <CNavItem className="d-block ms-5 fw-bold">Rol(es): {roles}</CNavItem>
        </CHeaderNav>
        <CHeaderNav className="ms-auto">
          {/* <ToggleButtonThemeComponent /> */}
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
