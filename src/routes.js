import React from "react";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const Typography = React.lazy(() =>
  import("./views/theme/typography/Typography")
);

// Base
const Accordion = React.lazy(() => import("./views/base/accordion/Accordion"));

const Cards = React.lazy(() => import("./views/base/cards/Cards"));
const Collapses = React.lazy(() => import("./views/base/collapses/Collapses"));
const ListGroups = React.lazy(() =>
  import("./views/base/list-groups/ListGroups")
);
const Navs = React.lazy(() => import("./views/base/navs/Navs"));

const Popovers = React.lazy(() => import("./views/base/popovers/Popovers"));
const Progress = React.lazy(() => import("./views/base/progress/Progress"));
const Spinners = React.lazy(() => import("./views/base/spinners/Spinners"));
const Tables = React.lazy(() => import("./views/base/tables/Tables"));

//Forms
const FormControl = React.lazy(() =>
  import("./views/forms/form-control/FormControl")
);

const Select = React.lazy(() => import("./views/forms/select/Select"));

// Icons
const CoreUIIcons = React.lazy(() =>
  import("./views/icons/coreui-icons/CoreUIIcons")
);

// Notifications
const Alerts = React.lazy(() => import("./views/notifications/alerts/Alerts"));
const Badges = React.lazy(() => import("./views/notifications/badges/Badges"));
const Modals = React.lazy(() => import("./views/notifications/modals/Modals"));
const Toasts = React.lazy(() => import("./views/notifications/toasts/Toasts"));

// Componentes propios del proyecto ESAGEL
const EmployeesComponent = React.lazy(() =>
  import("./components/employees/employees")
);

const NewEmployeeComponent = React.lazy(() =>
  import("./components/employees/newEmployee")
);

const EditEmployeeComponent = React.lazy(() =>
  import("./components/employees/editEmployee")
);

const DocumentTypesComponent = React.lazy(() =>
  import("./components/documentTypes/documents")
);

const NewDocumentTypeComponent = React.lazy(() =>
  import("./components/documentTypes/newDocument")
);

const EditDocumentTypeComponent = React.lazy(() =>
  import("./components/documentTypes/editDocument")
);

const routes = [
  { path: "/", exact: true, name: "Home", element: Dashboard },
  { path: "/home", exact: true, name: "Escritorio", element: Dashboard },
  {
    path: "/empleados",
    name: "Empleado",
    element: EmployeesComponent,
    exact: true,
  },
  {
    path: "/empleados/nuevo",
    name: "Nuevo",
    element: NewEmployeeComponent,
    exact: true,
  },
  {
    path: "/empleados/editar/:id",
    name: "Editar",
    element: EditEmployeeComponent,
    exact: true,
  },
  {
    path: "/usuarios",
    name: "Usuarios",
    element: Typography,
    exact: true,
  },
  {
    path: "/tipo-documentos",
    name: "Tipos de Documento",
    element: DocumentTypesComponent,
    exact: true,
  },
  {
    path: "/tipo-documentos/nuevo",
    name: "Nuevo",
    element: NewDocumentTypeComponent,
    exact: true,
  },
  {
    path: "/tipo-documentos/editar/:id",
    name: "Editar",
    element: EditDocumentTypeComponent,
    exact: true,
  },
  {
    path: "/tipo-cursos",
    name: "Tipo de Cursos",
    element: Cards,
    exact: true,
  },
  {
    path: "/cursos",
    name: "Cursos",
    element: CoreUIIcons,
    exact: true,
  },
  {
    path: "/temas",
    name: "Temas",
    element: Collapses,
    exact: true,
  },
  {
    path: "/origen-prospecto",
    name: "Origen de Prospecto",
    element: ListGroups,
    exact: true,
  },
  {
    path: "/medio-contacto",
    name: "Medio de Contacto",
    element: Navs,
    exact: true,
  },
  {
    path: "/estado-prospecto",
    name: "Estado de Prospecto",
    element: Select,
    exact: true,
  },
  {
    path: "/egresos",
    name: "Egresos",
    element: Tables,
    exact: true,
  },
  {
    path: "/proveedores",
    name: "Proveedores",
    element: Alerts,
    exact: true,
  },
  {
    path: "/pedidos",
    name: "Pedidos",
    element: Modals,
    exact: true,
  },
  {
    path: "/clientes",
    name: "Clientes",
    element: Popovers,
    exact: true,
  },
  {
    path: "/ventas",
    name: "Ventas",
    element: Progress,
    exact: true,
  },
  {
    path: "/metas",
    name: "Metas",
    element: FormControl,
    exact: true,
  },
  { path: "/reportes", name: "Reportes", element: Spinners, exact: true },
  {
    path: "/configuracion",
    name: "Configuración",
    element: Toasts,
    exact: true,
  },
  {
    path: "/ayuda",
    name: "Ayuda",
    element: Badges,
    exact: true,
  },
];

export default routes;
