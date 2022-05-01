import React from "react";
import {
  CImage,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarToggler,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

import { AppSidebarNav } from "./AppSidebarNav";
import { sygnet } from "src/assets/brand/sygnet";

import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import esagelImage from "src/assets/images/esagel.png";

import navigation from "../_nav";
import { useDispatch, useSelector } from "react-redux";
import { SettingsContext } from "../context/SettingsContext";
import { types } from "../types/types";

const AppSidebar = () => {
  const distpatch = useDispatch();
  const { config } = React.useContext(SettingsContext);

  const { sidebarShow, unfoldable } = useSelector((state) => state.nav);

  return (
    <CSidebar
      position="fixed"
      className={`bg-dark`}
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        distpatch({ type: types.nav.set, payload: visible });
      }}
    >
      <CSidebarBrand className="d-md-flex" to="/">
        {config?.url ? (
          <a href={config?.url} target={"_blank"} rel="noreferrer">
            <CImage
              src={config?.logo || esagelImage}
              align="center"
              width={150}
              alt="Logo"
            />
          </a>
        ) : (
          <CImage
            src={config?.logo || esagelImage}
            align="center"
            width={150}
            alt="Logo"
          />
        )}
        <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} />
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => {
          distpatch({ type: types.nav.set, payload: !sidebarShow });
        }}
      />
    </CSidebar>
  );
};

export default React.memo(AppSidebar);
