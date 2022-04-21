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

import { NavContext } from "../context/navContext";

const AppHeader = () => {
  const { navProperties, setNavProperties } = React.useContext(NavContext);

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() =>
            setNavProperties({
              ...navProperties,
              sidebarShow: !navProperties.sidebarShow,
            })
          }
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <CImage src={esagelImage} height={48} alt="Logo" />
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem className="d-block fw-bold">Pablo Urbano</CNavItem>
          <CNavItem className="d-block ms-5 fw-bold">Rol(es): Admin</CNavItem>
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
