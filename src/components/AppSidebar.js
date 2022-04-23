import React from "react";
import { CImage, CSidebar, CSidebarBrand, CSidebarNav } from "@coreui/react";
import CIcon from "@coreui/icons-react";

import { AppSidebarNav } from "./AppSidebarNav";
import { sygnet } from "src/assets/brand/sygnet";

import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import esagelImage from "src/assets/images/esagel.png";

// sidebar nav config
import navigation from "../_nav";
import { useDispatch, useSelector } from "react-redux";
import { types } from "../types/types";

const AppSidebar = () => {
  const distpatch = useDispatch();
  const sidebarNav = "side-nav-bar";

  const { sidebarShow, unfoldable } = useSelector((state) => state.nav);

  return (
    <CSidebar
      position="fixed"
      id={sidebarNav}
      className={`bg-dark`}
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        distpatch({ type: types.nav.set, payload: visible });
      }}
    >
      <CSidebarBrand
        className="d-md-flex"
        to="/"
        style={{ backgroundColor: "#627386" }}
      >
        <CImage
          fluid
          src={esagelImage}
          align="center"
          alt="saegel logo"
          width={150}
        />
        <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} />
      </CSidebarBrand>
      <CSidebarNav className="bg-dark">
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
      {/* <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => {
          dispatch({ type: types.nav.set, payload: !sidebarShow });
        }}
      /> */}
    </CSidebar>
  );
};

export default React.memo(AppSidebar);
