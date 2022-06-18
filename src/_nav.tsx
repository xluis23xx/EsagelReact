/* eslint-disable array-callback-return */
import React from "react";
import CIcon from "@coreui/icons-react";
import {
  cilCursor,
  cilNotes,
  cilPencil,
  cilWallet,
  cibSuperuser,
  cilUser,
  cilPeople,
  cilScreenDesktop,
  cilBadge,
  cilFolderOpen,
  cilFlipToBack,
  cilUserFollow,
  cilBasket,
  cilActionRedo,
  cilCreditCard,
  cilGraph,
  cibGraphcool,
  cilLockLocked,
  cilCommentBubble,
  cilLifeRing,
} from "@coreui/icons";
import { CNavGroup, CNavItem, CNavTitle } from "@coreui/react";
import { AuthContext } from "./context/AuthContext";
import { Role } from "./hooks/useUsers";

enum Roles {
  USER = "user",
  ADMIN = "admin",
  MODERATOR = "moderator",
}

const NavRoutes = (): any[] => {
  const { user } = React.useContext<any>(AuthContext);

  const roles = user?.roles ? user?.roles?.map((rol: Role) => rol?.name) : [];

  const isUser: boolean = roles?.includes(Roles.USER);
  const isAdmin: boolean = roles?.includes(Roles.ADMIN);
  const isModerator: boolean = roles?.includes(Roles.MODERATOR);

  const routes = [
    isUser || isAdmin || isModerator
      ? {
          component: CNavTitle,
          name: "Sistema Administrativo",
        }
      : undefined,
    isUser || isAdmin || isModerator
      ? {
          component: CNavItem,
          name: "Escritorio",
          to: "/home",
          icon: <CIcon icon={cilScreenDesktop} customClassName="nav-icon" />,
        }
      : undefined,

    isAdmin || isModerator
      ? {
          component: CNavGroup,
          name: "Mantenimiento",
          icon: <CIcon icon={cibSuperuser} customClassName="nav-icon" />,
          items: [
            {
              component: CNavItem,
              name: "Empleados",
              to: "/empleados",
              icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
            },
            isModerator
              ? {
                  component: CNavItem,
                  name: "Usuarios",
                  to: "/usuarios",
                  icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
                }
              : undefined,
            {
              component: CNavItem,
              name: "Tipos de Documento",
              to: "/tipos-documento",
              icon: <CIcon icon={cilWallet} customClassName="nav-icon" />,
            },
            {
              component: CNavItem,
              name: "Tipos de Curso",
              to: "/tipos-curso",
              icon: <CIcon icon={cilBadge} customClassName="nav-icon" />,
            },
          ],
        }
      : undefined,
    isUser || isAdmin || isModerator
      ? {
          component: CNavGroup,
          name: "Repositorio",
          icon: <CIcon icon={cilFolderOpen} customClassName="nav-icon" />,
          items: [
            {
              component: CNavItem,
              name: "Cursos",
              to: "/cursos",
              icon: <CIcon icon={cilFlipToBack} customClassName="nav-icon" />,
            },
            {
              component: CNavItem,
              name: "Temas",
              to: "/temas",
              icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
            },
            isAdmin || isModerator
              ? {
                  component: CNavItem,
                  name: "Origen de Prospecto",
                  to: "/origenes-prospecto",
                  icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
                }
              : undefined,
            isAdmin || isModerator
              ? {
                  component: CNavItem,
                  name: "Medio de Contacto",
                  to: "/medios-contacto",
                  icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
                }
              : undefined,
            isAdmin || isModerator
              ? {
                  component: CNavItem,
                  name: "Estado de Prospecto",
                  to: "/estados-prospecto",
                  icon: (
                    <CIcon icon={cilUserFollow} customClassName="nav-icon" />
                  ),
                }
              : undefined,
          ],
        }
      : undefined,
    isAdmin || isModerator
      ? {
          component: CNavGroup,
          name: "Compras",
          icon: <CIcon icon={cilBasket} customClassName="nav-icon" />,
          items: [
            {
              component: CNavItem,
              name: "Egresos",
              to: "/compras",
              icon: <CIcon icon={cilActionRedo} customClassName="nav-icon" />,
            },
            {
              component: CNavItem,
              name: "Proveedores",
              to: "/proveedores",
              icon: <CIcon icon={cilUserFollow} customClassName="nav-icon" />,
            },
          ],
        }
      : undefined,
    isUser || isAdmin || isModerator
      ? {
          component: CNavGroup,
          name: "Comercio",
          icon: <CIcon icon={cilCreditCard} customClassName="nav-icon" />,
          items: [
            {
              component: CNavItem,
              name: "Pedidos",
              to: "/pedidos",
              icon: <CIcon icon={cilGraph} customClassName="nav-icon" />,
            },
            isAdmin || isModerator
              ? {
                  component: CNavItem,
                  name: "Clientes",
                  to: "/clientes",
                  icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
                }
              : undefined,
            {
              component: CNavItem,
              name: "Ventas Generales",
              to: "/ventas",
              icon: <CIcon icon={cilGraph} customClassName="nav-icon" />,
            },
          ],
        }
      : undefined,
    isModerator
      ? {
          component: CNavGroup,
          name: "Seguimiento",
          icon: <CIcon icon={cilLifeRing} customClassName="nav-icon" />,
          items: [
            {
              component: CNavItem,
              name: "Metas",
              to: "/metas",
              icon: <CIcon icon={cibGraphcool} customClassName="nav-icon" />,
            },
          ],
        }
      : undefined,

    isModerator
      ? {
          component: CNavItem,
          name: "Configuración",
          to: "/configuracion",
          icon: <CIcon icon={cilLockLocked} customClassName="nav-icon" />,
        }
      : undefined,
    isUser || isAdmin || isModerator
      ? {
          component: CNavItem,
          name: "Ayuda",
          to: "/ayuda",
          icon: <CIcon icon={cilCommentBubble} customClassName="nav-icon" />,
        }
      : undefined,
  ];

  let cleanRoutes = routes.filter((route) => route !== undefined);

  let cleanSubRoutes = cleanRoutes.map((route) => {
    if (route?.items) {
      if (route?.items?.length > 0) {
        let newRouter = { ...route };
        newRouter.items = route?.items.filter((item) => item !== undefined);
        return newRouter;
      }
    } else {
      return route;
    }
  });

  return cleanSubRoutes;
};

export default NavRoutes;
