// import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import FrontPage from "./pages/front";
// import MainRoutes from "./routes/MainRoutes";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Front page */}
//         <Route path="/" element={<FrontPage />} />

//         {/* Main pages */}
//         {MainRoutes.children.map((route, idx) => (
//           <Route key={idx} path={route.path} element={<MainRoutes.element>{route.element}</MainRoutes.element>} />
//         ))}
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

// ///////////NEW///////////////////////////////////////////
// import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// // import FrontPage from "./pages/front";
// import MainRoutes from "./routes/MainRoutes";
// import LoginPage from "./pages/login/LoginPage";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Front page */}
//         {/* <Route path="/" element={<FrontPage />} /> */}
//         <Route path="/" element={<LoginPage />} />

//         {/* All other pages inside MainLayout */}
//         <Route element={<MainRoutes.element />}>
//           {MainRoutes.children.map((route, idx) => (
//             <Route key={idx} path={route.path} element={route.element} />
//           ))}
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }
// export default App;

// import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import MainRoutes from "./routes/MainRoutes";
// import LoginPage from "./pages/login/LoginPage";
// import ProtectedRoute from "./components/ProtectedRoute";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Public login */}
//         <Route path="/" element={<LoginPage />} />

//         {/* Admin protected layout */}
//         <Route
//           element={
//             <ProtectedRoute roles={["admin"]}>
//               <MainRoutes.element />
//             </ProtectedRoute>
//           }
//         >
//           {MainRoutes.children
//             .filter(r => !r.path.startsWith("/organisations"))
//             .map((route, idx) => (
//               <Route key={idx} path={route.path} element={route.element} />
//             ))}
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

// ///////////////////////After first deployment//////////////////////
// import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import MainRoutes from "./routes/MainRoutes";
// import LoginPage from "./pages/login/LoginPage";
// import ProtectedRoute from "./components/ProtectedRoute";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Login page (public) */}
//         <Route path="/" element={<LoginPage />} />

//         {/* SuperAdmin routes */}
//         <Route
//           element={
//             <ProtectedRoute roles={["superAdmin"]}>
//               <MainRoutes.element />
//             </ProtectedRoute>
//           }
//         >
//           {MainRoutes.children
//             .filter(route =>
//               route.path.startsWith("/organisations") ||
//               route.path.startsWith("/superadmin")
//             )
//             .map((route, idx) => (
//               <Route key={idx} path={route.path} element={route.element} />
//             ))}
//         </Route>

//         {/* Admin routes */}
//         <Route
//           element={
//             <ProtectedRoute roles={["admin","viewer","expenseEditor"]}>
//               <MainRoutes.element />
//             </ProtectedRoute>
//           }
//         >
//           {MainRoutes.children
//             .filter(route => !route.path.startsWith("/organisations"))
//             .map((route, idx) => (
//               <Route key={idx} path={route.path} element={route.element} />
//             ))}
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

//////////////////////////////////////Latest///////////////////
// import React, { useEffect } from "react";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import MainRoutes from "./routes/MainRoutes";
// import LoginPage from "./pages/login/LoginPage";
// import ProtectedRoute from "./components/ProtectedRoute";
// import MainLayout from "./layout/MainLayout";
// import ExecutiveDashboard from "./pages/executive/executiveDashboard";
// import CostCalculation from "./pages/costCalculator/costCalculation";

// function AppContent() {
//   // const navigate = useNavigate();

//  useEffect(() => {
//   const handleStorageChange = (event) => {
//     if (event.key === "token" && !event.newValue) {
//       localStorage.removeItem("user");
//       localStorage.removeItem("userName");
//       window.location.replace("/");
//     }
//   };

//   window.addEventListener("storage", handleStorageChange);

//   return () => {
//     window.removeEventListener("storage", handleStorageChange);
//   };
// }, []);


//   return (
//     <Routes>
//       {/* Login page */}
//       <Route path="/" element={<LoginPage />} />

//       {/* SuperAdmin routes */}
//       <Route
//         element={
//           <ProtectedRoute roles={["superAdmin"]}>      
//             <MainLayout />
//             {/* <MainRoutes.element /> */}
//           </ProtectedRoute>
//         }
//       >
//         {MainRoutes.children
//           .filter(route =>
//             route.path.startsWith("/organisations") ||
//             route.path.startsWith("/superadmin")
//           )
//           .map((route, idx) => (
//             <Route key={idx} path={route.path} element={route.element} />
//           ))}
//       </Route>

//       {/* Admin routes */}
//       <Route
//         element={
//           <ProtectedRoute roles={["admin","viewer","expenseEditor"]}>
//             <MainLayout />
//             {/* <MainRoutes.element /> */}
//           </ProtectedRoute>
//         }
//       >
//         {MainRoutes.children
//           .filter(route => !route.path.startsWith("/organisations"))
//           .map((route, idx) => (
//             <Route key={idx} path={route.path} element={route.element} />
//           ))}
//       </Route>

//       {/* Executive routes */}
//       {/* <Route
//         element={
//           <ProtectedRoute roles={["executive"]}>
//             <MainLayout />
//           </ProtectedRoute>
//         }
//       >
//         <Route path="/executive/home" element={<ExecutiveDashboard />} />
//         <Route path="/cost-calculation" element={<CostCalculation />} />
//       </Route> */}
//        <Route
//     path="/executive"
//     element={
//       <ProtectedRoute roles={["executive"]}>
//         <MainLayout />
//       </ProtectedRoute>
//     }
//   >
//     <Route index element={<Navigate to="home" />} />
//     <Route path="home" element={<ExecutiveDashboard />} />
//     <Route path="cost-calculation" element={<CostCalculation />} />
//   </Route>

//     </Routes>
//   );
// }

// function App() {
//   return (
//     <BrowserRouter>
//       <AppContent />
//     </BrowserRouter>
//   );
// }

// export default App;

////////////////////////////////////working///////////////////////////////////

import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import MainLayout from "./layout/MainLayout";
import MainRoutes from "./routes/MainRoutes";
import LoginPage from "./pages/login/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import FrontPage from "./pages/front";
import ExecutiveDashboard from "./pages/executive/executiveDashboard";
import CostCalculation from "./pages/costCalculator/costCalculation";
import SuperAdminDashboard from "./pages/superadmin/superadminDashboard";
import ExpenseClaim from "./pages/expenseClaim/expenseClaimPage";
import TenderForm from "./pages/tender/tenderForm";
import TenderList from "./pages/tender/tenderList";
import BotDashboard from "./pages/bot/botUserDashboard";

const CLIENT_ID = "707824241932-rvlucrlqm4h1oe8vnggh7sp2ie3ccilf.apps.googleusercontent.com";

// function AppContent() {

//   useEffect(() => {
//     const handleStorageChange = (event) => {
//       if (event.key === "token" && !event.newValue) {
//         localStorage.clear();
//         window.location.replace("/");
//       }
//     };

//     window.addEventListener("storage", handleStorageChange);
//     return () => window.removeEventListener("storage", handleStorageChange);
//   }, []);

//   return (
// <Routes>
//   {/* Login */}
//   <Route path="/" element={<LoginPage />} />
//   <Route path="/cost-calculation" element={<CostCalculation />} />

//   {/* EXECUTIVE */}
//   <Route element={<ProtectedRoute roles={["executive"]} />}>
//     <Route element={<MainLayout />}>
//       <Route path="/executive" element={<Navigate to="home" replace />} />
//       <Route path="/executive/home" element={<ExecutiveDashboard />} />
//       <Route path="executive/cost-calculation" element={<CostCalculation />} />
//       <Route path="/executive/expense-claim" element={<ExpenseClaim />} />
//     </Route>
//   </Route>

//   <Route element={<ProtectedRoute roles={["bot"]} />}>
//     <Route element={<MainLayout />}>

//       {/* redirect */}
//       <Route path="/tender" element={<Navigate to="/tender/home" replace />} />

//       {/* BOT dashboard */}
//       <Route path="/tender/home" element={<BotDashboard />} />

//       {/* Tender pages */}
//       {/* <Route path="/bot/tender/list" element={<TenderList />} />
//       <Route path="/bot/tender/add" element={<TenderForm />} />
//       <Route path="/bot/tender/edit/:tenderId" element={<TenderForm />} /> */}

//     </Route>
//   </Route>


//   {/* SUPER ADMIN */}
//   <Route element={<ProtectedRoute roles={["superAdmin"]} />}>
//     <Route element={<MainLayout />}>
//       {MainRoutes.children
//         .filter(
//           (route) =>
//             route.path.startsWith("/organisations") ||
//             route.path.startsWith("/superadmin")
//         )
//         .map((route, idx) => (
//           <Route key={idx} path={route.path} element={route.element} />
//         ))}
//       <Route path="/superadmin/home" element={<SuperAdminDashboard />} />
//     </Route>
//   </Route>

//   {/* ADMIN / VIEWER / EXPENSE EDITOR */}
//   <Route element={<ProtectedRoute roles={["admin", "viewer", "editor"]} />}>
//     <Route element={<MainLayout />}>
//       {MainRoutes.children
//         .filter(
//           (route) =>
//             !route.path.startsWith("/organisations") &&
//             !route.path.startsWith("/superadmin") &&
//             !route.path.startsWith("/executive")
//         )
//         .map((route, idx) => (
//           // console.log(route.path)
//           <Route key={idx} path={route.path} element={route.element} />
//         ))}
//       <Route path="/home" element={<FrontPage />} />
//       <Route path="/home/cost-calculation" element={<CostCalculation />} />
//       <Route path="/home/expense-claim" element={<ExpenseClaim />} />
//       {/* <Route path="/tender-source/add" element={<tenderSource />} /> */}
//     </Route>
//   </Route>
// </Routes>
//   );
// }

function AppContent() {
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "token" && !event.newValue) {
        localStorage.clear();
        window.location.replace("/");
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <Routes>
      {/* LOGIN */}
      <Route path="/" element={<LoginPage />} />
      <Route path="/cost-calculation" element={<CostCalculation />} />

      {/* EXECUTIVE */}
      <Route element={<ProtectedRoute roles={["executive"]} />}>
        <Route element={<MainLayout />}>
          <Route path="/executive" element={<Navigate to="home" replace />} />
          <Route path="/executive/home" element={<ExecutiveDashboard />} />
          <Route path="/executive/cost-calculation" element={<CostCalculation />} />
          <Route path="/executive/expense-claim" element={<ExpenseClaim />} />
        </Route>
      </Route>

      {/* BOT & ADMIN/EDITOR/VIEWER tender routes */}
      <Route element={<ProtectedRoute roles={["bot", "admin", "editor", "viewer"]} />}>
        <Route element={<MainLayout />}>
          {/* BOT dashboard */}
          <Route path="/tender/home" element={<BotDashboard />} />

          {/* Tender pages */}
          <Route path="/tender/list" element={<TenderList />} />
          <Route path="/tender/add" element={<TenderForm />} />
          <Route path="/tender/edit/:tenderId" element={<TenderForm />} />

          {/* Redirect /tender -> dashboard */}
          <Route path="/tender" element={<Navigate to="/tender/home" replace />} />
        </Route>
      </Route>

      {/* SUPER ADMIN */}
      <Route element={<ProtectedRoute roles={["superAdmin"]} />}>
        <Route element={<MainLayout />}>
          {MainRoutes.children
            .filter(
              (route) =>
                route.path.startsWith("/organisations") ||
                route.path.startsWith("/superadmin")
            )
            .map((route, idx) => (
              <Route key={idx} path={route.path} element={route.element} />
            ))}
          <Route path="/superadmin/home" element={<SuperAdminDashboard />} />
        </Route>
      </Route>

      {/* ADMIN / VIEWER / EXPENSE EDITOR */}
      <Route element={<ProtectedRoute roles={["admin", "viewer", "editor"]} />}>
        <Route element={<MainLayout />}>
          {MainRoutes.children
            .filter(
              (route) =>
                !route.path.startsWith("/organisations") &&
                !route.path.startsWith("/superadmin") &&
                !route.path.startsWith("/executive")
            )
            .map((route, idx) => (
              <Route key={idx} path={route.path} element={route.element} />
            ))}
          <Route path="/home" element={<FrontPage />} />
          <Route path="/home/cost-calculation" element={<CostCalculation />} />
          <Route path="/home/expense-claim" element={<ExpenseClaim />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    // <BrowserRouter>
    //   <AppContent />
    // </BrowserRouter>
    <BrowserRouter>
      {/* Wrap the entire app with GoogleOAuthProvider */}
      <GoogleOAuthProvider clientId={CLIENT_ID}>
        <AppContent />
      </GoogleOAuthProvider>
    </BrowserRouter>
  );
}



