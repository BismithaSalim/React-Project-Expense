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

///////////////////////////After second deployment/////////////////////////////////////
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
import { getRole , getUser } from "../utils/auth";

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
  const user = getUser();
  console.log("Current user:", user);

  const firstName = user?.firstName || "";
const lastName = user?.lastName || "";
const organisation = user?.organisationRefId?.organisationName || "";

console.log("firstName:", firstName);
console.log("lastName:", lastName);
console.log("organisation:", organisation);

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
          {/* <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button> */}

          {/* User Info + Logout */}
          {/* <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box sx={{ textAlign: "right" }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {organisation}
              </Typography>
              <Typography variant="caption">
                {firstName} {lastName}
              </Typography>
            </Box>

            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Box> */}

            {/* User Info + Logout */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              padding: "4px 8px",
              borderRadius: 2,
              backgroundColor: "#1565c0", // subtle professional bg
              color: "#fff",
            }}
          >
            {/* Avatar with initials */}
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                backgroundColor: "#fff",
                color: "#1565c0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: 14,
                textTransform: "uppercase",
              }}
            >
              {firstName?.[0] || ""}{lastName?.[0] || ""}
            </Box>

            {/* Name & Organisation */}
            <Box sx={{ textAlign: "left", flexGrow: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {organisation || ""}
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.9 }}>
                {firstName} {lastName}
              </Typography>
            </Box>

            {/* Logout Button */}
            <Button
              variant="outlined"
              size="small"
              sx={{
                color: "#fff",
                borderColor: "#fff",
                "&:hover": {
                  backgroundColor: "#fff",
                  color: "#1565c0",
                  borderColor: "#fff",
                },
              }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>

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

//////////////////////////////////////////////////////////////////////////

// import React, { useState } from "react";
// import {
//   AppBar,
//   Toolbar,
//   Button,
//   Typography,
//   Box,
//   Drawer,
//   List,
//   ListItemButton,
//   ListItemText,
//   IconButton,
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import { useNavigate, useLocation } from "react-router-dom";
// import { logoutUser } from "../services/api";
// import { getRole , getUser } from "../utils/auth";
// import Avatar from "@mui/material/Avatar";


// const menuByRole = {
//   admin: [
//     { label: "Clients", path: "/clients/list" },
//     { label: "Projects", path: "/projects/list" },
//     { label: "Expenses", path: "/expenses/list" },
//     { label: "Users", path: "/users/list" },
//     { label: "Project Summary", path: "/projects/summary" },
//     { label: "Master" , path: "/master-data" }
//   ],
//   viewer: [
//     { label: "Clients", path: "/clients/list" },
//     { label: "Projects", path: "/projects/list" },
//     { label: "Expenses", path: "/expenses/list" },
//     { label: "Users", path: "/users/list" },
//     { label: "Project Summary", path: "/projects/summary" },
//   ],
//   expenseEditor: [
//     { label: "Clients", path: "/clients/list" },
//     { label: "Projects", path: "/projects/list" },
//     { label: "Expenses", path: "/expenses/list" },
//     { label: "Users", path: "/users/list" },
//     { label: "Project Summary", path: "/projects/summary" },
//   ],
//   superAdmin: [],
// };

// const Navbar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const pathname = location.pathname;
//   const role = getRole();
//   const user = getUser();
//   // console.log("Current user:", user);

// const firstName = user?.firstName || "";
// const lastName = user?.lastName || "";
// // const organisation = user?.organisationRefId?.organisationName || "";


//   const [open, setOpen] = useState(false);

//   const isAddEditPage =
//     pathname.includes("/add") || pathname.includes("/edit");

//   let backLink = "/home";
//   if (pathname.includes("/clients")) backLink = "/clients/list";
//   else if (pathname.includes("/projects")) backLink = "/projects/list";
//   else if (pathname.includes("/expenses")) backLink = "/expenses/list";
//   else if (pathname.includes("/users")) backLink = "/users/list";
//   else if (pathname.includes("/master-data")) backLink = "/master-data";

//   const handleLogout = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return;

//       const res = await logoutUser(token);
//       if (res.data.status === 100) {
//         localStorage.clear();
//         navigate("/");
//       }
//     } catch (err) {
//       alert("Logout failed!");
//     }
//   };

//   return (
//     <>
//       <AppBar
//         position="static"
//         elevation={2}
//         sx={{
//           backgroundColor: "#ffffff",
//           color: "#1e293b",
//           borderBottom: "1px solid #e2e8f0",
//         }}
// >
//         <Toolbar sx={{ minHeight: 70 }}>

//           {/* Hamburger */}
//           {!isAddEditPage && (
//             <IconButton
//               edge="start"
//               onClick={() => setOpen(true)}
//               sx={{ color: "#334155" }}
//             >
//               <MenuIcon />
//             </IconButton>
//           )}

//           {/* Back Button */}
//           {isAddEditPage && (
//             <Button
//               startIcon={<ArrowBackIcon />}
//               onClick={() => navigate(backLink)}
//               sx={{
//                 textTransform: "none",
//                 color: "#334155",
//                 fontWeight: 500,
//               }}
//             >
//               Back
//             </Button>
//           )}

//           {/* Title */}
//           <Box sx={{ flexGrow: 1, textAlign: "center" }}>
//             <Typography
//               variant="h6"
//               sx={{
//                 fontWeight: 600,
//                 letterSpacing: 0.3,
//                 color: "#0f172a",
//               }}
//             >
//               Project Expense Management
//             </Typography>
//           </Box>

//           {/* User Section */}
//           <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>

//             {/* Avatar */}
//             <Avatar
//               sx={{
//                 width: 38,
//                 height: 38,
//                 fontSize: 14,
//                 backgroundColor: "#2563eb",
//               }}
//             >
//               {firstName?.charAt(0)}
//               {lastName?.charAt(0)}
//             </Avatar>

//             {/* User Info */}
//             <Box sx={{ textAlign: "left", lineHeight: 1.2 }}>
//               <Typography
//                 variant="subtitle2"
//                 sx={{ fontWeight: 600, color: "#0f172a" }}
//               >
//                 {firstName} {lastName}
//               </Typography>

//               {/* <Typography
//                 variant="caption"
//                 sx={{ color: "#64748b" }}
//               >
//                 {organisation}
//               </Typography> */}
//             </Box>

//             {/* Logout */}
//             <Button
//               size="small"
//               onClick={handleLogout}
//               sx={{
//                 textTransform: "none",
//                 fontWeight: 500,
//                 color: "#334155",
//                 borderRadius: 2,
//                 px: 2,
//                 "&:hover": {
//                   backgroundColor: "#f1f5f9",
//                 },
//               }}
//             >
//               Logout
//             </Button>

//           </Box>
//         </Toolbar>
//     </AppBar>


//       {/* Drawer */}
//       <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
//         <Box
//           sx={{
//             width: 250,
//             backgroundColor: "#d8e5f3ff", // drawer background
//             height: "100%",
//             display: "flex",
//             flexDirection: "column",
//           }}
//         >

//           <List sx={{ flexGrow: 1 }}>
//             {/* Home */}
//             <ListItemButton
//               onClick={() => {
//                 role === "superAdmin"
//                   ? navigate("/superadmin/home")
//                   : navigate("/home");
//                 setOpen(false);
//               }}
//               selected={pathname === "/home"}
//               sx={{
//                 "&.Mui-selected": {
//                   backgroundColor: "#1976d2", // active menu color
//                   color: "#fff",
//                   borderLeft: "5px solid #0d47a1", // left bar indicator
//                 },
//                 "&:hover": {
//                   backgroundColor: "#a3c0e0", // hover color
//                 },
//               }}
//             >
//               <ListItemText primary="Home" />
//             </ListItemButton>

//             {/* Role Based Menus */}
//             {menuByRole[role]?.map((item) => (
//               <ListItemButton
//                 key={item.path}
//                 selected={pathname === item.path}
//                 onClick={() => {
//                   navigate(item.path);
//                   setOpen(false);
//                 }}
//                 sx={{
//                   "&.Mui-selected": {
//                     backgroundColor: "#1976d2",
//                     color: "#fff",
//                     borderLeft: "5px solid #0d47a1",
//                   },
//                   "&:hover": {
//                     backgroundColor: "#a3c0e0",
//                   },
//                 }}
//               >
//                 <ListItemText primary={item.label} />
//               </ListItemButton>
//             ))}
//           </List>
//         </Box>
//       </Drawer>
//     </>
//   );
// };

// export default Navbar;