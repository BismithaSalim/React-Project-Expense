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

//////////////////////////////SECOND DEPLOYMENT//////////////////////////////////////////////
// import React from "react";
// import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import { useNavigate, useLocation } from "react-router-dom";
// import { logoutUser } from "../services/api";
// import { Drawer, IconButton, List, ListItemButton, ListItemText } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import { useState } from "react";

// // Define menus per role (removed Organisations for superAdmin)
// const menuByRole = {
//   admin: [
//     { label: "Clients", path: "/clients/list" },
//     { label: "Projects", path: "/projects/list" },
//     { label: "Expenses", path: "/expenses/list" },
//     // { label: "Master Data", path: "/master-data" },
//   ],
//   superAdmin: [
//     // No menu for Organisations
//   ],
//   viewer: [
//     { label: "Home", path: "/home" },
//     { label: "Clients", path: "/clients/list" },
//     { label: "Projects", path: "/projects/list" },
//     { label: "Expenses", path: "/expenses/list" },
//     { label: "Master Data", path: "/master-data" },
//   ],
//   expenseEditor:[
//     { label: "Home", path: "/home" },
//     { label: "Clients", path: "/clients/list" },
//     { label: "Projects", path: "/projects/list" },
//     { label: "Expenses", path: "/expenses/list" },
//   ]
// };

// const Navbar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const role = localStorage.getItem("role") || ""; // fallback empty string
//   const pathname = location.pathname;
//   const [drawerOpen , setDrawerOpen ] = useState(false);

//   // Determine Home page based on role
//   // const isHomePage =
//   //   (pathname === "/home" && role === "admin" || "viewer") ||
//   //   (pathname === "/superadmin/home" && role === "superAdmin");
//   const isHomePage =
//   ((pathname === "/home") && (role === "admin" || role === "viewer" || role === "expenseEditor")) ||
//   ((pathname === "/superadmin/home") && (role === "superAdmin"));


//   // Determine Add/Edit pages
//   const isAddEditPage = pathname.includes("/add") || pathname.includes("/edit");

//   // Determine Back button link
//   let backLink = "/home";
//   if (pathname.includes("/clients")) backLink = "/clients/list";
//   else if (pathname.includes("/projects")) backLink = "/projects/list";
//   else if (pathname.includes("/expenses")) backLink = "/expenses/list";
//   else if (pathname.includes("/organisations")) backLink = "/organisations/list";

//   // Logout handler
//   const handleLogout = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return;

//       const res = await logoutUser(token);
//       if (res.data.status === 100) {
//         localStorage.removeItem("token");
//         localStorage.removeItem("userName");
//         localStorage.removeItem("role");
//         localStorage.removeItem("user");
//         navigate("/"); // go to login
//       } else {
//         alert(res.data.message || "Logout failed");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Logout failed!");
//     }
//   };

//   return (
//   <>
//     <AppBar position="static" color="primary">
//       <Toolbar>

//         {/* Hamburger */}
//         {!isAddEditPage && (
//           <IconButton
//             color="inherit"
//             edge="start"
//             onClick={() => setDrawerOpen(true)}
//           >
//             <MenuIcon />
//           </IconButton>
//         )}

//         {/* Back button (still visible on add/edit) */}
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

//         {/* Title */}
//         <Box sx={{ flexGrow: 1, textAlign: "center" }}>
//           <Typography variant="h6">
//             Project Expense Management
//           </Typography>
//         </Box>

//         {/* Logout */}
//         <Button
//           variant="contained"
//           onClick={handleLogout}
//           sx={{
//             backgroundColor: "#0D47A1",
//             "&:hover": { backgroundColor: "#0B3C91" },
//             color: "white",
//             textTransform: "none",
//           }}
//         >
//           Logout
//         </Button>

//       </Toolbar>
//     </AppBar>

//     {/* Drawer Menu */}
//     <Drawer
//       anchor="left"
//       open={drawerOpen}
//       onClose={() => setDrawerOpen(false)}
//     >
//       <List sx={{ width: 250 }}>

//         {/* Home */}
//         {!isHomePage && (
//           <ListItemButton
//             onClick={() => {
//               role === "superAdmin"
//                 ? navigate("/superadmin/home")
//                 : navigate("/home");
//               setDrawerOpen(false);
//             }}
//           >
//             <ListItemText primary="Home" />
//           </ListItemButton>
//         )}

//         {/* Role-based menu */}
//         {menuByRole[role]?.map((item) => (
//           <ListItemButton
//             key={item.path}
//             onClick={() => {
//               navigate(item.path);
//               setDrawerOpen(false);
//             }}
//           >
//             <ListItemText primary={item.label} />
//           </ListItemButton>
//         ))}

//         {/* Logout inside drawer (optional, you can remove top one if you want cleaner UI) */}
//         <ListItemButton
//           onClick={() => {
//             handleLogout();
//             setDrawerOpen(false);
//           }}
//         >
//           <ListItemText primary="Logout" />
//         </ListItemButton>

//       </List>
//     </Drawer>
//   </>
// );

//   // return (
//   //   <AppBar position="static" color="primary">
//   //     <Toolbar>
//   //       {/* Home button */}
//   //       {!isHomePage && !isAddEditPage && (
//   //         <Button
//   //           variant="contained"
//   //           onClick={() =>
//   //             role === "admin" || role === "viewer" || role === "expenseEditor" ? navigate("/home") : navigate("/superadmin/home")
//   //           }

//   //           sx={{
//   //             backgroundColor: "#0D47A1",
//   //             "&:hover": { backgroundColor: "#0B3C91" },
//   //             color: "white",
//   //             textTransform: "none",
//   //           }}
//   //         >
//   //           Home
//   //         </Button>
//   //       )}

//   //       {/* Back button */}
//   //       {isAddEditPage && (
//   //         <Button
//   //           variant="contained"
//   //           startIcon={<ArrowBackIcon />}
//   //           onClick={() => navigate(backLink)}
//   //           sx={{
//   //             backgroundColor: "#0D47A1",
//   //             "&:hover": { backgroundColor: "#0B3C91" },
//   //             color: "white",
//   //             textTransform: "none",
//   //           }}
//   //         >
//   //           Back
//   //         </Button>
//   //       )}

//   //       {/* Role-based menu items */}
//   //       {!isAddEditPage &&
//   //         menuByRole[role]?.map((item) => (
//   //           <Button
//   //             key={item.path}
//   //             variant="contained"
//   //             onClick={() => navigate(item.path)}
//   //             sx={{
//   //               ml: 1,
//   //               backgroundColor: "#0D47A1",
//   //               "&:hover": { backgroundColor: "#0B3C91" },
//   //               color: "white",
//   //               textTransform: "none",
//   //             }}
//   //           >
//   //             {item.label}
//   //           </Button>
//   //         ))}

//   //       {/* Center title */}
//   //       <Box sx={{ flexGrow: 1, textAlign: "center" }}>
//   //         <Typography variant="h6">Project Expense Management</Typography>
//   //       </Box>

//   //       {/* Logout button visible everywhere */}
//   //       <Button
//   //         variant="contained"
//   //         sx={{
//   //           backgroundColor: "#0D47A1",
//   //           "&:hover": { backgroundColor: "#0B3C91" },
//   //           color: "white",
//   //           textTransform: "none",
//   //         }}
//   //         onClick={handleLogout}
//   //       >
//   //         Logout
//   //       </Button>
//   //     </Toolbar>
//   //   </AppBar>
//   // );
// };

// export default Navbar;


import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useLocation } from "react-router-dom";
import { logoutUser } from "../services/api";
import { getRole } from "../utils/auth";

const menuByRole = {
  admin: [
    { label: "Clients", path: "/clients/list" },
    { label: "Projects", path: "/projects/list" },
    { label: "Expenses", path: "/expenses/list" },
    { label: "Users", path: "/users/list" },
    { label: "Project Summary", path: "/projects/summary" },
    { label: "Master" , path: "/master-data" }
  ],
  viewer: [
    { label: "Clients", path: "/clients/list" },
    { label: "Projects", path: "/projects/list" },
    { label: "Expenses", path: "/expenses/list" },
    { label: "Users", path: "/users/list" },
    { label: "Project Summary", path: "/projects/summary" },
  ],
  expenseEditor: [
    { label: "Clients", path: "/clients/list" },
    { label: "Projects", path: "/projects/list" },
    { label: "Expenses", path: "/expenses/list" },
    { label: "Users", path: "/users/list" },
    { label: "Project Summary", path: "/projects/summary" },
  ],
  superAdmin: [],
};

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // const role = localStorage.getItem("role");
  const pathname = location.pathname;
  const role = getRole();
  // console.log("Current role:", role);

  const [open, setOpen] = useState(false);

  const isAddEditPage =
    pathname.includes("/add") || pathname.includes("/edit");

  let backLink = "/home";
  if (pathname.includes("/clients")) backLink = "/clients/list";
  else if (pathname.includes("/projects")) backLink = "/projects/list";
  else if (pathname.includes("/expenses")) backLink = "/expenses/list";
  else if (pathname.includes("/users")) backLink = "/users/list";
  else if (pathname.includes("/master-data")) backLink = "/master-data";

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await logoutUser(token);
      if (res.data.status === 100) {
        localStorage.clear();
        navigate("/");
      }
    } catch (err) {
      alert("Logout failed!");
    }
  };

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar>

          {/* Hamburger Icon */}
          {!isAddEditPage && (
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Back Button */}
          {isAddEditPage && (
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate(backLink)}
              color="inherit"
            >
              Back
            </Button>
          )}

          {/* Title */}
          <Box sx={{ flexGrow: 1, textAlign: "center" }}>
            <Typography variant="h6">
              Project Expense Management
            </Typography>
          </Box>

          {/* Logout */}
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            width: 250,
            backgroundColor: "#d8e5f3ff", // drawer background
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >

          <List sx={{ flexGrow: 1 }}>
            {/* Home */}
            <ListItemButton
              onClick={() => {
                role === "superAdmin"
                  ? navigate("/superadmin/home")
                  : navigate("/home");
                setOpen(false);
              }}
              selected={pathname === "/home"}
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "#1976d2", // active menu color
                  color: "#fff",
                  borderLeft: "5px solid #0d47a1", // left bar indicator
                },
                "&:hover": {
                  backgroundColor: "#a3c0e0", // hover color
                },
              }}
            >
              <ListItemText primary="Home" />
            </ListItemButton>

            {/* Role Based Menus */}
            {menuByRole[role]?.map((item) => (
              <ListItemButton
                key={item.path}
                selected={pathname === item.path}
                onClick={() => {
                  navigate(item.path);
                  setOpen(false);
                }}
                sx={{
                  "&.Mui-selected": {
                    backgroundColor: "#1976d2",
                    color: "#fff",
                    borderLeft: "5px solid #0d47a1",
                  },
                  "&:hover": {
                    backgroundColor: "#a3c0e0",
                  },
                }}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;

