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
import esagelImage from "src/assets/images/esagel.png";
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
  let dominantRole = "";
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
      let result = 999;
      result = Math.min(
        ...(user?.roles?.map((rol) => Number(rol?.priority || 999)) || 0)
      );
      dominantRole = formatRolName(
        user?.roles?.find((rol) => rol?.priority == result)?.name || ""
      );
    }
  }

  return (
    <CHeader
      position="sticky"
      className="mb-4"
      style={{ backgroundColor: "rgba(42,42,42,255)" }}
    >
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() =>
            distpatch({ type: types.nav.set, payload: !sidebarShow })
          }
        >
          <CIcon icon={cilMenu} size="lg" style={{ color: "#fff" }} />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none text-light" to="/home">
          {config?.url ? (
            <a href={config?.url} target={"_blank"} rel="noreferrer">
              <CImage src={esagelImage} height={48} alt="Logo" />
            </a>
          ) : (
            <CImage src={esagelImage} height={48} alt="Logo" />
          )}
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto text-light">
          <CNavItem className="d-block fw-bold">
            Usuario: <span className="fw-normal">{nameProfile}</span>
          </CNavItem>
          <CNavItem className="d-block fw-bold ms-5">
            Rol Principal: <span className="fw-normal">{dominantRole}</span>
          </CNavItem>
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
