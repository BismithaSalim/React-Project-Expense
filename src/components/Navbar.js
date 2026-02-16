// import React from "react";
// import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
// import HomeIcon from "@mui/icons-material/Home";
// import { useNavigate, useLocation } from "react-router-dom";
// import { logoutUser } from "../services/api";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const isHomePage = location.pathname === "/home";

//   const handleLogout = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return;

//       const res = await logoutUser(token); // API call
//       if (res.data.status === 100) {
//         // Clear token
//         localStorage.removeItem("token");
//         localStorage.removeItem("userName");
//         navigate("/");
//       } else {
//         alert(res.data.message || "Logout failed");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Logout failed!");
//     }
//   };

//   return (
//     <AppBar position="static" color="primary">
//       <Toolbar>
//         {/* Home button ONLY if NOT on home page */}
//         {!isHomePage && (
//           <Button
//             variant="contained"
//             startIcon={<HomeIcon />}
//             onClick={() => navigate("/home")}
//             sx={{
//               backgroundColor: "#0D47A1",
//               "&:hover": { backgroundColor: "#0B3C91" },
//               color: "white",
//               textTransform: "none",
//             }}
//           >
//             Home
//           </Button>
//         )}

//         {/* Center Title */}
//         <Box sx={{ flexGrow: 1, textAlign: "center" }}>
//           <Typography variant="h6">Project Expense Management</Typography>
//         </Box>

//         {/* Logout button ONLY on home page */}
//         {isHomePage && (
//           <Button
//             variant="contained"
//             sx={{
//               backgroundColor: "#0D47A1",
//               "&:hover": { backgroundColor: "#0B3C91" },
//               color: "white",
//               textTransform: "none",
//             }}
//             onClick={handleLogout}
//           >
//             Logout
//           </Button>
//         )}
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Navbar;

/////////////////////////NEW////////////////////////////////////////////////////

// import { AppBar, Toolbar, Button, Typography, Box, menuByRole, handleLogout  } from "@mui/material";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import { useNavigate, useLocation } from "react-router-dom";
// import { logoutUser } from "../services/api";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const pathname = location.pathname;

//   // Determine if on home page
//   const isHomePage = pathname === "/home";

//   // Determine if on Add/Edit pages
//   const isAddEditPage = pathname.includes("/add") || pathname.includes("/edit");

//   // Determine corresponding list page for back button
//   let backLink = "/home"; // default
//   if (pathname.includes("/clients")) backLink = "/clients/list";
//   else if (pathname.includes("/projects")) backLink = "/projects/list";
//   else if (pathname.includes("/expenses")) backLink = "/expenses/list";

//   const handleLogout = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return;

//       const res = await logoutUser(token); // API call
//       if (res.data.status === 100) {
//         localStorage.removeItem("token");
//         localStorage.removeItem("userName");
//         navigate("/");
//       } else {
//         alert(res.data.message || "Logout failed");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Logout failed!");
//     }
//   };

//   return (
//     <AppBar position="static" color="primary">
//       <Toolbar>
//         {/* Show Home button if NOT on home or add/edit pages */}
//         {!isHomePage && !isAddEditPage && (
//           <Button
//             variant="contained"
//             onClick={() => navigate("/home")}
//             sx={{
//               backgroundColor: "#0D47A1",
//               "&:hover": { backgroundColor: "#0B3C91" },
//               color: "white",
//               textTransform: "none",
//             }}
//           >
//             Home
//           </Button>
//         )}

//         {/* Show Back button if on add/edit pages */}
//         {isAddEditPage && (
//           <Button
//             variant="contained"
//             startIcon={<ArrowBackIcon />}
//             onClick={() => navigate(backLink)}
//             sx={{
//               backgroundColor: "#0D47A1",
//               "&:hover": { backgroundColor: "#0B3C91" },
//               color: "white",
//               textTransform: "none",
//             }}
//           >
//             Back
//           </Button>
//         )}

//         {/* Center Title */}
//         <Box sx={{ flexGrow: 1, textAlign: "center" }}>
//           <Typography variant="h6">Project Expense Management</Typography>
//         </Box>

//         {/* Logout button ONLY on home page */}
//         {isHomePage && (
//           <Button
//             variant="contained"
//             sx={{
//               backgroundColor: "#0D47A1",
//               "&:hover": { backgroundColor: "#0B3C91" },
//               color: "white",
//               textTransform: "none",
//             }}
//             onClick={handleLogout}
//           >
//             Logout
//           </Button>
//         )}
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Navbar;


////////////////////////////////////NEW NEW/////////////////////////////////////////////
// import React from "react";
// import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import { useNavigate, useLocation } from "react-router-dom";
// import { logoutUser } from "../services/api";

// // Define menus per role
// const menuByRole = {
//   admin: [
//     { label: "Clients", path: "/clients/list" },
//     { label: "Projects", path: "/projects/list" },
//     { label: "Expenses", path: "/expenses/list" },
//   ],
//   superAdmin: [
//     { label: "Organisations", path: "/organisations/list" },
//   ],
// };

// const Navbar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const role = localStorage.getItem("role"); // role from login

//   const pathname = location.pathname;

//   // Determine Home page
//   const isHomePage = pathname === "/home" || pathname === "/superadmin/home";

//   // Determine Add/Edit pages
//   const isAddEditPage = pathname.includes("/add") || pathname.includes("/edit");

//   // Determine Back button link
//   let backLink = "/home";
//   if (pathname.includes("/clients")) backLink = "/clients/list";
//   else if (pathname.includes("/projects")) backLink = "/projects/list";
//   else if (pathname.includes("/expenses")) backLink = "/expenses/list";
//   else if (pathname.includes("/organisations")) backLink = "/organisations/list";

//   const handleLogout = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return;

//       const res = await logoutUser(token);
//       if (res.data.status === 100) {
//         localStorage.removeItem("token");
//         localStorage.removeItem("userName");
//         localStorage.removeItem("role");
//         navigate("/");
//       } else {
//         alert(res.data.message || "Logout failed");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Logout failed!");
//     }
//   };

//   return (
//     <AppBar position="static" color="primary">
//       <Toolbar>
//         {/* Home button */}
//         {!isHomePage && !isAddEditPage && (
//           <Button
//             variant="contained"
//             onClick={() => navigate(isHomePage ? "/" : "/home")}
//             sx={{
//               backgroundColor: "#0D47A1",
//               "&:hover": { backgroundColor: "#0B3C91" },
//               color: "white",
//               textTransform: "none",
//             }}
//           >
//             Home
//           </Button>
//         )}

//         {/* Back button */}
//         {isAddEditPage && (
//           <Button
//             variant="contained"
//             startIcon={<ArrowBackIcon />}
//             onClick={() => navigate(backLink)}
//             sx={{
//               backgroundColor: "#0D47A1",
//               "&:hover": { backgroundColor: "#0B3C91" },
//               color: "white",
//               textTransform: "none",
//             }}
//           >
//             Back
//           </Button>
//         )}

//         {/* Role-based menu items */}
//         {!isAddEditPage &&
//           menuByRole[role]?.map((item) => (
//             <Button
//               key={item.path}
//               variant="contained"
//               onClick={() => navigate(item.path)}
//               sx={{
//                 ml: 1,
//                 backgroundColor: "#0D47A1",
//                 "&:hover": { backgroundColor: "#0B3C91" },
//                 color: "white",
//                 textTransform: "none",
//               }}
//             >
//               {item.label}
//             </Button>
//           ))}

//         {/* Center title */}
//         <Box sx={{ flexGrow: 1, textAlign: "center" }}>
//           <Typography variant="h6">Project Expense Management</Typography>
//         </Box>

//         {/* Logout button on Home page */}
//         {isHomePage && (
//           <Button
//             variant="contained"
//             sx={{
//               backgroundColor: "#0D47A1",
//               "&:hover": { backgroundColor: "#0B3C91" },
//               color: "white",
//               textTransform: "none",
//             }}
//             onClick={handleLogout}
//           >
//             Logout
//           </Button>
//         )}
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Navbar;


import React from "react";
import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useLocation } from "react-router-dom";
import { logoutUser } from "../services/api";

// Define menus per role (removed Organisations for superAdmin)
const menuByRole = {
  admin: [
    { label: "Clients", path: "/clients/list" },
    { label: "Projects", path: "/projects/list" },
    { label: "Expenses", path: "/expenses/list" },
    // { label: "Master Data", path: "/master-data" },
  ],
  superAdmin: [
    // No menu for Organisations
  ],
  viewer: [
    { label: "Home", path: "/home" },
    { label: "Clients", path: "/clients/list" },
    { label: "Projects", path: "/projects/list" },
    { label: "Expenses", path: "/expenses/list" },
    { label: "Master Data", path: "/master-data" },
  ],
  expenseEditor:[
    { label: "Home", path: "/home" },
    { label: "Clients", path: "/clients/list" },
    { label: "Projects", path: "/projects/list" },
    { label: "Expenses", path: "/expenses/list" },
  ]
};

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const role = localStorage.getItem("role") || ""; // fallback empty string
  const pathname = location.pathname;

  // Determine Home page based on role
  // const isHomePage =
  //   (pathname === "/home" && role === "admin" || "viewer") ||
  //   (pathname === "/superadmin/home" && role === "superAdmin");
  const isHomePage =
  ((pathname === "/home") && (role === "admin" || role === "viewer" || role === "expenseEditor")) ||
  ((pathname === "/superadmin/home") && (role === "superAdmin"));


  // Determine Add/Edit pages
  const isAddEditPage = pathname.includes("/add") || pathname.includes("/edit");

  // Determine Back button link
  let backLink = "/home";
  if (pathname.includes("/clients")) backLink = "/clients/list";
  else if (pathname.includes("/projects")) backLink = "/projects/list";
  else if (pathname.includes("/expenses")) backLink = "/expenses/list";
  else if (pathname.includes("/organisations")) backLink = "/organisations/list";

  // Logout handler
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await logoutUser(token);
      if (res.data.status === 100) {
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        localStorage.removeItem("role");
        localStorage.removeItem("user");
        navigate("/"); // go to login
      } else {
        alert(res.data.message || "Logout failed");
      }
    } catch (err) {
      console.error(err);
      alert("Logout failed!");
    }
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        {/* Home button */}
        {!isHomePage && !isAddEditPage && (
          <Button
            variant="contained"
            onClick={() =>
              role === "admin" || role === "viewer" || role === "expenseEditor" ? navigate("/home") : navigate("/superadmin/home")
            }

            sx={{
              backgroundColor: "#0D47A1",
              "&:hover": { backgroundColor: "#0B3C91" },
              color: "white",
              textTransform: "none",
            }}
          >
            Home
          </Button>
        )}

        {/* Back button */}
        {isAddEditPage && (
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(backLink)}
            sx={{
              backgroundColor: "#0D47A1",
              "&:hover": { backgroundColor: "#0B3C91" },
              color: "white",
              textTransform: "none",
            }}
          >
            Back
          </Button>
        )}

        {/* Role-based menu items */}
        {!isAddEditPage &&
          menuByRole[role]?.map((item) => (
            <Button
              key={item.path}
              variant="contained"
              onClick={() => navigate(item.path)}
              sx={{
                ml: 1,
                backgroundColor: "#0D47A1",
                "&:hover": { backgroundColor: "#0B3C91" },
                color: "white",
                textTransform: "none",
              }}
            >
              {item.label}
            </Button>
          ))}

        {/* Center title */}
        <Box sx={{ flexGrow: 1, textAlign: "center" }}>
          <Typography variant="h6">Project Expense Management</Typography>
        </Box>

        {/* Logout button visible everywhere */}
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#0D47A1",
            "&:hover": { backgroundColor: "#0B3C91" },
            color: "white",
            textTransform: "none",
          }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;






