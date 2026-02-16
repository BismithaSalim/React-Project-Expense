// import { lazy } from "react";
// import Loadable from "../components/Loadable";
// import MainLayout from "../layout/MainLayout";

// // clients
// const AddClient = Loadable(lazy(() => import("../pages/clients/AddClient")));
// const ClientList = Loadable(lazy(() => import("../pages/clients/ClientList")));

// // projects
// const AddProject = Loadable(lazy(() => import("../pages/projects/AddProject")));
// const ProjectList = Loadable(lazy(() => import("../pages/projects/ProjectList")));

// // expenses
// const AddExpense = Loadable(lazy(() => import("../pages/expenses/AddExpense")));
// const ExpenseList = Loadable(lazy(() => import("../pages/expenses/ExpenseList")));

// // reports
// // const Reports = Loadable(lazy(() => import("../pages/reports")));

// const MainRoutes = {
//   element: <MainLayout />,
//   children: [
//     { path: "/clients/add", element: <AddClient /> },
//     { path: "/clients/list", element: <ClientList /> },
//     { path: "/projects/add", element: <AddProject /> },
//     { path: "/projects/list", element: <ProjectList /> },
//     { path: "/expenses/add", element: <AddExpense /> },
//     { path: "/expenses/list", element: <ExpenseList /> },
//     // { path: "/reports", element: <Reports /> },
//   ],
// };

// export default MainRoutes;

import { lazy } from "react";
import Loadable from "../components/Loadable";
import MainLayout from "../layout/MainLayout";
// import LoginPage from "../pages/login/LoginPage";
import FrontPage from "../pages/front";

// clients
const AddClient = Loadable(lazy(() => import("../pages/clients/AddClient")));
const ClientList = Loadable(lazy(() => import("../pages/clients/ClientList")));

// projects
const AddProject = Loadable(lazy(() => import("../pages/projects/AddProject")));
const ProjectList = Loadable(lazy(() => import("../pages/projects/ProjectList")));

// expenses
const AddExpense = Loadable(lazy(() => import("../pages/expenses/AddExpense")));
const ExpenseList = Loadable(lazy(() => import("../pages/expenses/ExpenseList")));
const EditExpense = Loadable(lazy(() => import("../pages/expenses/EditExpense")));
const EditProject = Loadable(lazy(() => import("../pages/projects/EditProject")));
const EditClient = Loadable(lazy(() => import("../pages/clients/EditClient")));
const ProjectPLAnalysis = Loadable(lazy(() => import("../pages/projects/ProjectPLAnalysis")));
const ProjectSummary = Loadable(lazy(() => import("../pages/projects/ProjectSummary")));
const AddOrganisation = Loadable(lazy(() => import("../pages/organisation/AddOrganisation")));
const OrganisationList = Loadable(lazy(() => import("../pages/organisation/OrganisationList")));
const SuperAdminDashboard = Loadable(lazy(() => import("../pages/superadmin/superadminDashboard")));
const EditOrganisation = Loadable(lazy(() => import("../pages/organisation/EditOrganisation")));
const AddOrganisationAdmin = Loadable(lazy(() => import("../pages/organisation/AddOrganisationAdmin")));

//Users
const AddUser = Loadable(lazy(() => import("../pages/users/AddUser")));
const EditUser = Loadable(lazy(() => import("../pages/users/EditUser")));
const UserList = Loadable(lazy(() => import("../pages/users/UserList")));
// const MasterList = Loadable(lazy(() => import("../pages/master/MasterList")));
// const AddEditMaster = Loadable(lazy(() => import("../pages/master/AddEditMaster")));

const MainRoutes = {
  element: MainLayout, // just the component, not <MainLayout />
  children: [
    { path: "/clients/add", element: <AddClient /> },
    { path: "/clients/list", element: <ClientList /> },
    { path: "/projects/add", element: <AddProject /> },
    { path: "/projects/list", element: <ProjectList /> },
    { path: "/expenses/add", element: <AddExpense /> },
    { path: "/expenses/list", element: <ExpenseList /> },
    { path: "/expenses/edit", element: <EditExpense /> },
    { path:"/projects/edit", element: <EditProject />},
    {path:"/clients/edit", element: <EditClient />},
    // { path: "/login", element: <LoginPage /> },
    { path: "/home", element: <FrontPage /> },
    { path: "/projects/pl-analysis/:id",element: <ProjectPLAnalysis />},
    {path: "/projects/summary", element: <ProjectSummary />},
    // superAdmin organisation routes
    { path: "/organisations/add", element: <AddOrganisation /> },
    { path: "/organisations/list", element: <OrganisationList /> },
    { path: "/organisations/edit/:id", element: <EditOrganisation /> },
    { path: "/superadmin/home", element: <SuperAdminDashboard /> },
    // AppRoutes / MainRoutes
    { path: "/organisations/:id/add-admin", element: <AddOrganisationAdmin /> },
    { path: "/users/add", element: <AddUser /> },
    { path: "/users/list", element: <UserList /> },
    { path: "/users/edit", element: <EditUser /> },
    // { path: "/master-data", element: <MasterList /> },
    // { path: "/master-data/add", element: <AddEditMaster /> },
    // { path: "/master-data/edit/:id", element: <AddEditMaster /> },

  ],
};

export default MainRoutes;
