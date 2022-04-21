import React, { useContext } from "react";
import { CImage, CSidebar, CSidebarBrand, CSidebarNav } from "@coreui/react";
import CIcon from "@coreui/icons-react";

import { AppSidebarNav } from "./AppSidebarNav";
import { sygnet } from "src/assets/brand/sygnet";

import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import esagelImage from "src/assets/images/esagel.png";

// sidebar nav config
import navigation from "../_nav";
import { NavContext } from "../context/navContext";

const AppSidebar = () => {
  //sidebarShow, unfoldable;

  const { navProperties, setNavProperties } = useContext(NavContext);

  return (
    <CSidebar
      position="fixed"
      className="bg-dark"
      unfoldable={navProperties.unfoldable}
      visible={navProperties.sidebarShow}
      onVisibleChange={(visible) =>
        setNavProperties({ ...navProperties, sidebarShow: visible })
      }
    >
      <CSidebarBrand
        className="d-none d-md-flex"
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
