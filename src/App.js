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

/////////////NEW///////////////////////////////////////////
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
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainRoutes from "./routes/MainRoutes";
import LoginPage from "./pages/login/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login page (public) */}
        <Route path="/" element={<LoginPage />} />

        {/* SuperAdmin routes */}
        <Route
          element={
            <ProtectedRoute roles={["superAdmin"]}>
              <MainRoutes.element />
            </ProtectedRoute>
          }
        >
          {MainRoutes.children
            .filter(route =>
              route.path.startsWith("/organisations") ||
              route.path.startsWith("/superadmin")
            )
            .map((route, idx) => (
              <Route key={idx} path={route.path} element={route.element} />
            ))}
        </Route>

        {/* Admin routes */}
        <Route
          element={
            <ProtectedRoute roles={["admin"]}>
              <MainRoutes.element />
            </ProtectedRoute>
          }
        >
          {MainRoutes.children
            .filter(route => !route.path.startsWith("/organisations"))
            .map((route, idx) => (
              <Route key={idx} path={route.path} element={route.element} />
            ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
