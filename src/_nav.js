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

const _nav = [
  {
    component: CNavTitle,
    name: "Sistema de Ventas",
  },
  {
    component: CNavItem,
    name: "Escritorio",
    to: "/",
    icon: <CIcon icon={cilScreenDesktop} customClassName="nav-icon" />,
  },
  {
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
      {
        component: CNavItem,
        name: "Usuarios",
        to: "/usuarios",
        icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
      },
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
  },
  {
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
      {
        component: CNavItem,
        name: "Origen de Prospecto",
        to: "/origenes-prospecto",
        icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: "Medio de Contacto",
        to: "/medios-contacto",
        icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: "Estado de Prospecto",
        to: "/estados-prospecto",
        icon: <CIcon icon={cilUserFollow} customClassName="nav-icon" />,
      },
    ],
  },
  {
    component: CNavGroup,
    name: "Compras",
    icon: <CIcon icon={cilBasket} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Egresos",
        to: "/egresos",
        icon: <CIcon icon={cilActionRedo} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: "Proveedor",
        to: "/proveedores",
        icon: <CIcon icon={cilUserFollow} customClassName="nav-icon" />,
      },
    ],
  },
  {
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
      {
        component: CNavItem,
        name: "Clientes",
        to: "/clientes",
        icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: "Ventas Generales",
        to: "/ventas",
        icon: <CIcon icon={cilGraph} customClassName="nav-icon" />,
      },
    ],
  },
  {
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
      // {
      //   component: CNavItem,
      //   name: "Reportes",
      //   to: "/reportes",
      //   icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
      // },
    ],
  },
  {
    component: CNavItem,
    name: "Configuración",
    to: "/configuracion",
    icon: <CIcon icon={cilLockLocked} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Ayuda",
    to: "/ayuda",
    icon: <CIcon icon={cilCommentBubble} customClassName="nav-icon" />,
  },
];

export default _nav;
