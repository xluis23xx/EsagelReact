import React from "react";
import { AuthContext } from "./context/AuthContext";
import { Role } from "./hooks/useUsers";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));

// Notifications
const HelpComponent = React.lazy(() => import("./components/help/help"));

const MyAccountComponent = React.lazy(
  () => import("./components/myAccount/profile")
);

// Componentes propios del proyecto ESAGEL
const EmployeesComponent = React.lazy(
  () => import("./components/employees/employees")
);

const UsersComponent = React.lazy(() => import("./components/users/users"));

const NewUserComponent = React.lazy(() => import("./components/users/newUser"));

const EditUserComponent = React.lazy(
  () => import("./components/users/editUser")
);

const NewEmployeeComponent = React.lazy(
  () => import("./components/employees/newEmployee")
);

const EditEmployeeComponent = React.lazy(
  () => import("./components/employees/editEmployee")
);

const DocumentTypesComponent = React.lazy(
  () => import("./components/documentTypes/documents")
);

const NewDocumentTypeComponent = React.lazy(
  () => import("./components/documentTypes/newDocument")
);

const EditDocumentTypeComponent = React.lazy(
  () => import("./components/documentTypes/editDocument")
);

const TopicsComponent = React.lazy(() => import("./components/topics/topics"));

const NewTopicComponent = React.lazy(
  () => import("./components/topics/newTopic")
);

const EditTopicComponent = React.lazy(
  () => import("./components/topics/editTopic")
);

const OrdersComponent = React.lazy(() => import("./components/orders/orders"));

const NewOrderComponent = React.lazy(
  () => import("./components/orders/newOrder")
);

const DetailOrderComponent = React.lazy(
  () => import("./components/orders/detailOrder")
);

const SalesComponent = React.lazy(() => import("./components/sales/sales"));

const PurchasesComponent = React.lazy(
  () => import("./components/purchases/purchases")
);

const NewPurchaseComponent = React.lazy(
  () => import("./components/purchases/newPurchase")
);

const EditPurchaseComponent = React.lazy(
  () => import("./components/purchases/editPurchase")
);

const DetailSaleComponent = React.lazy(
  () => import("./components/sales/detailSale")
);

const ProspectusStatusesComponent = React.lazy(
  () => import("./components/prospectusStatuses/prospectusStatuses")
);

const NewProspectusStatusComponent = React.lazy(
  () => import("./components/prospectusStatuses/newProspectusStatus")
);

const EditProspectusStatusComponent = React.lazy(
  () => import("./components/prospectusStatuses/editProspectusStatus")
);

const ProspectusOriginsComponent = React.lazy(
  () => import("./components/prospectusOrigins/prospectusOrigins")
);

const NewProspectusOriginComponent = React.lazy(
  () => import("./components/prospectusOrigins/newProspectusOrigin")
);

const EditProspectusOriginComponent = React.lazy(
  () => import("./components/prospectusOrigins/editProspectusOrigin")
);

const ContactFormsComponent = React.lazy(
  () => import("./components/contactForms/contactForms")
);

const NewContactFormComponent = React.lazy(
  () => import("./components/contactForms/newContactForm")
);

const EditContactFormComponent = React.lazy(
  () => import("./components/contactForms/editContactForm")
);

const CourseTypesComponent = React.lazy(
  () => import("./components/courseTypes/courseTypes")
);

const NewCourseTypeComponent = React.lazy(
  () => import("./components/courseTypes/newCourseType")
);

const EditCourseTypeComponent = React.lazy(
  () => import("./components/courseTypes/editCourseType")
);

const ProvidersComponent = React.lazy(
  () => import("./components/providers/providers")
);

const NewProviderComponent = React.lazy(
  () => import("./components/providers/newProvider")
);

const EditProviderComponent = React.lazy(
  () => import("./components/providers/editProvider")
);

const ClientsComponent = React.lazy(
  () => import("./components/clients/clients")
);

const NewClientComponent = React.lazy(
  () => import("./components/clients/newClient")
);

const EditClientComponent = React.lazy(
  () => import("./components/clients/editClient")
);

const CoursesComponent = React.lazy(
  () => import("./components/courses/courses")
);

const NewCourseComponent = React.lazy(
  () => import("./components/courses/newCourse")
);

const EditCourseComponent = React.lazy(
  () => import("./components/courses/editCourse")
);

const GoalsComponent = React.lazy(() => import("./components/goals/goals"));

const NewGoalComponent = React.lazy(() => import("./components/goals/newGoal"));

const EditGoalComponent = React.lazy(
  () => import("./components/goals/editGoal")
);

const SettingsComponent = React.lazy(
  () => import("./components/settings/settings")
);

enum Roles {
  USER = "user",
  ADMIN = "admin",
  MODERATOR = "moderator",
}

export const RoutesArray = (): any[] => {
  const { user } = React.useContext(AuthContext);

  const routes = [];

  const roles = user?.roles ? user?.roles.map((rol: Role) => rol?.name) : [];

  const isUser = roles?.includes(Roles.USER);
  const isAdmin = roles?.includes(Roles.ADMIN);
  const isModerator = roles?.includes(Roles.MODERATOR);

  const routesUser = [
    { path: "/", exact: true, name: "Escritorio", element: Dashboard },
    { path: "/home", exact: true, name: "Escritorio", element: Dashboard },
    {
      path: "/pedidos",
      name: "Pedidos",
      element: OrdersComponent,
      exact: true,
    },
    {
      path: "/mi-perfil",
      name: "Mi Perfil",
      element: MyAccountComponent,
      exact: true,
    },
    {
      path: "/pedidos/nuevo",
      name: "Nuevo",
      element: NewOrderComponent,
      exact: true,
    },
    {
      path: "/pedidos/detalle/:id",
      name: "Detalle",
      element: DetailOrderComponent,
      exact: true,
    },
    {
      path: "/ventas",
      name: "Ventas",
      element: SalesComponent,
      exact: true,
    },
    {
      path: "/ventas/detalle/:id",
      name: "Detalle",
      element: DetailSaleComponent,
      exact: true,
    },
    {
      path: "/cursos",
      name: "Cursos",
      element: CoursesComponent,
      exact: true,
    },
    {
      path: "/cursos/nuevo",
      name: "Nuevo",
      element: NewCourseComponent,
      exact: true,
    },
    {
      path: "/cursos/editar/:id",
      name: "Editar",
      element: EditCourseComponent,
      exact: true,
    },
    {
      path: "/temas",
      name: "Temas",
      element: TopicsComponent,
      exact: true,
    },
    {
      path: "/temas/nuevo",
      name: "Nuevo",
      element: NewTopicComponent,
      exact: true,
    },
    {
      path: "/temas/editar/:id",
      name: "Editar",
      element: EditTopicComponent,
      exact: true,
    },

    {
      path: "/ayuda",
      name: "Ayuda",
      element: HelpComponent,
      exact: true,
    },
  ];

  const routesAdmin = [
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
      path: "/tipos-documento",
      name: "Tipos de Documento",
      element: DocumentTypesComponent,
      exact: true,
    },
    {
      path: "/tipos-documento/nuevo",
      name: "Nuevo",
      element: NewDocumentTypeComponent,
      exact: true,
    },
    {
      path: "/tipos-documento/editar/:id",
      name: "Editar",
      element: EditDocumentTypeComponent,
      exact: true,
    },
    {
      path: "/clientes",
      name: "Clientes",
      element: ClientsComponent,
      exact: true,
    },
    {
      path: "/clientes/nuevo",
      name: "Nuevo",
      element: NewClientComponent,
      exact: true,
    },
    {
      path: "/clientes/editar/:id",
      name: "Editar",
      element: EditClientComponent,
      exact: true,
    },
    {
      path: "/tipos-curso",
      name: "Tipos de Curso",
      element: CourseTypesComponent,
      exact: true,
    },
    {
      path: "/tipos-curso/nuevo",
      name: "Nuevo",
      element: NewCourseTypeComponent,
      exact: true,
    },
    {
      path: "/tipos-curso/editar/:id",
      name: "Editar",
      element: EditCourseTypeComponent,
      exact: true,
    },
    {
      path: "/origenes-prospecto",
      name: "Origen de Prospecto",
      element: ProspectusOriginsComponent,
      exact: true,
    },
    {
      path: "/origenes-prospecto/nuevo",
      name: "Nuevo",
      element: NewProspectusOriginComponent,
      exact: true,
    },
    {
      path: "/origenes-prospecto/editar/:id",
      name: "Editar",
      element: EditProspectusOriginComponent,
      exact: true,
    },
    {
      path: "/medios-contacto",
      name: "Medio de Contacto",
      element: ContactFormsComponent,
      exact: true,
    },
    {
      path: "/medios-contacto/nuevo",
      name: "Nuevo",
      element: NewContactFormComponent,
      exact: true,
    },
    {
      path: "/medios-contacto/editar/:id",
      name: "Editar",
      element: EditContactFormComponent,
      exact: true,
    },
    {
      path: "/estados-prospecto",
      name: "Estados de Prospecto",
      element: ProspectusStatusesComponent,
      exact: true,
    },
    {
      path: "/estados-prospecto/nuevo",
      name: "Nuevo",
      element: NewProspectusStatusComponent,
      exact: true,
    },
    {
      path: "/estados-prospecto/editar/:id",
      name: "Editar",
      element: EditProspectusStatusComponent,
      exact: true,
    },
    {
      path: "/compras",
      name: "Compras",
      element: PurchasesComponent,
      exact: true,
    },
    {
      path: "/compras/nuevo",
      name: "Nuevo",
      element: NewPurchaseComponent,
      exact: true,
    },
    {
      path: "/compras/editar/:id",
      name: "Editar",
      element: EditPurchaseComponent,
      exact: true,
    },
    {
      path: "/proveedores",
      name: "Proveedores",
      element: ProvidersComponent,
      exact: true,
    },
    {
      path: "/proveedores/nuevo",
      name: "Nuevo",
      element: NewProviderComponent,
      exact: true,
    },
    {
      path: "/proveedores/editar/:id",
      name: "Editar",
      element: EditProviderComponent,
      exact: true,
    },
    {
      path: "/metas",
      name: "Metas",
      element: GoalsComponent,
      exact: true,
    },
    {
      path: "/metas/nuevo",
      name: "Nuevo",
      element: NewGoalComponent,
      exact: true,
    },
    {
      path: "/metas/editar/:id",
      name: "Editar",
      element: EditGoalComponent,
      exact: true,
    },
  ];
  const routesModerator = [
    {
      path: "/usuarios",
      name: "Usuarios",
      element: UsersComponent,
      exact: true,
    },
    {
      path: "/usuarios/nuevo",
      name: "Nuevo",
      element: NewUserComponent,
      exact: true,
    },
    {
      path: "/usuarios/editar/:id",
      name: "Editar",
      element: EditUserComponent,
      exact: true,
    },
    {
      path: "/configuracion",
      name: "Configuración",
      element: SettingsComponent,
      exact: true,
    },
  ];

  if (roles.length > 0) {
    if (isModerator) {
      routes.push(...routesAdmin, ...routesModerator, ...routesUser);
    } else if (isAdmin) {
      routes.push(...routesAdmin, ...routesUser);
    } else if (isUser) {
      routes.push(...routesUser);
    }
  }

  return routes;
};

export default RoutesArray;
