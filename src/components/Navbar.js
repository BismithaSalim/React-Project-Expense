///////////////////////////After second deployment/////////////////////////////////////
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

// const menuByRole = {
//   admin: [
//     { label: "Clients", path: "/clients/list" },
//     { label: "Projects", path: "/projects/list" },
//     { label: "Expenses", path: "/expenses/list" },
//     { label: "Users", path: "/users/list" },
//     { label: "Project Summary", path: "/projects/summary" },
//     { label: "Master" , path: "/master-data" },
//     { label: "Rate Master" , path: "/ratemaster/list" }
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
//   // const role = localStorage.getItem("role");
//   const pathname = location.pathname;
//   const role = getRole();
//   const user = getUser();
//   console.log("Current user:", user);

//   const firstName = user?.firstName || "";
//   const lastName = user?.lastName || "";
//   const organisation = user?.organisationRefId?.organisationName || "";


//   const [open, setOpen] = useState(false);

//   const isAddEditPage =
//     pathname.includes("/add") || pathname.includes("/edit");

//   let backLink = "/home";
//   if (pathname.includes("/clients")) backLink = "/clients/list";
//   else if (pathname.includes("/projects")) backLink = "/projects/list";
//   else if (pathname.includes("/expenses")) backLink = "/expenses/list";
//   else if (pathname.includes("/users")) backLink = "/users/list";
//   else if (pathname.includes("/master-data")) backLink = "/master-data";
//   else if (pathname.includes("/ratemaster")) backLink = "/ratemaster/list";

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
//       <AppBar position="static" color="primary">
//         <Toolbar>

//           {/* Hamburger Icon */}
//           {!isAddEditPage && (
//             <IconButton
//               edge="start"
//               color="inherit"
//               onClick={() => setOpen(true)}
//             >
//               <MenuIcon />
//             </IconButton>
//           )}

//           {/* Back Button */}
//           {isAddEditPage && (
//             <Button
//               startIcon={<ArrowBackIcon />}
//               onClick={() => navigate(backLink)}
//               color="inherit"
//             >
//               Back
//             </Button>
//           )}

//           {/* Title */}
//           <Box sx={{ flexGrow: 1, textAlign: "center" }}>
//             <Typography variant="h6">
//               Project Expense Management
//             </Typography>
//           </Box>

//           {/* Logout */}
//           {/* <Button color="inherit" onClick={handleLogout}>
//             Logout
//           </Button> */}

//           {/* User Info + Logout */}
//           {/* <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//             <Box sx={{ textAlign: "right" }}>
//               <Typography variant="body2" sx={{ fontWeight: 600 }}>
//                 {organisation}
//               </Typography>
//               <Typography variant="caption">
//                 {firstName} {lastName}
//               </Typography>
//             </Box>

//             <Button color="inherit" onClick={handleLogout}>
//               Logout
//             </Button>
//           </Box> */}

//             {/* User Info + Logout */}
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               gap: 2,
//               padding: "4px 8px",
//               borderRadius: 2,
//               backgroundColor: "#1565c0", // subtle professional bg
//               color: "#fff",
//             }}
//           >
//             {/* Avatar with initials */}
//             <Box
//               sx={{
//                 width: 40,
//                 height: 40,
//                 borderRadius: "50%",
//                 backgroundColor: "#fff",
//                 color: "#1565c0",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontWeight: 700,
//                 fontSize: 14,
//                 textTransform: "uppercase",
//               }}
//             >
//               {firstName?.[0] || ""}{lastName?.[0] || ""}
//             </Box>

//             {/* Name & Organisation */}
//             <Box sx={{ textAlign: "left", flexGrow: 1 }}>
//               <Typography variant="body2" sx={{ fontWeight: 600 }}>
//                 {organisation || ""}
//               </Typography>
//               <Typography variant="caption" sx={{ opacity: 0.9 }}>
//                 {firstName} {lastName}
//               </Typography>
//             </Box>

//             {/* Logout Button */}
//             <Button
//               variant="outlined"
//               size="small"
//               sx={{
//                 color: "#fff",
//                 borderColor: "#fff",
//                 "&:hover": {
//                   backgroundColor: "#fff",
//                   color: "#1565c0",
//                   borderColor: "#fff",
//                 },
//               }}
//               onClick={handleLogout}
//             >
//               Logout
//             </Button>
//           </Box>

//         </Toolbar>
//       </AppBar>

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
  Divider,
  ListItemIcon,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import WorkIcon from "@mui/icons-material/Work";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import GroupIcon from "@mui/icons-material/Group";
import AssessmentIcon from "@mui/icons-material/Assessment";
import StorageIcon from "@mui/icons-material/Storage";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

import { useNavigate, useLocation } from "react-router-dom";
import { logoutUser } from "../services/api";
import { getRole, getUser } from "../utils/auth";

const menuByRole = {
  admin: [
    { label: "Clients", path: "/clients/list", icon: <PeopleIcon /> },
    { label: "Projects", path: "/projects/list", icon: <WorkIcon /> },
    { label: "Expenses", path: "/expenses/list", icon: <MonetizationOnIcon /> },
    { label: "Users", path: "/users/list", icon: <GroupIcon /> },
    { label: "Project Summary", path: "/projects/summary", icon: <AssessmentIcon /> },
    { label: "Master", path: "/master-data", icon: <StorageIcon /> },
    { label: "Rate Master", path: "/ratemaster/list", icon: <AttachMoneyIcon /> },
  ],
  viewer: [
    { label: "Clients", path: "/clients/list", icon: <PeopleIcon /> },
    { label: "Projects", path: "/projects/list", icon: <WorkIcon /> },
    { label: "Expenses", path: "/expenses/list", icon: <MonetizationOnIcon /> },
    { label: "Users", path: "/users/list", icon: <GroupIcon /> },
    { label: "Project Summary", path: "/projects/summary", icon: <AssessmentIcon /> },
  ],
  expenseEditor: [
    { label: "Clients", path: "/clients/list", icon: <PeopleIcon /> },
    { label: "Projects", path: "/projects/list", icon: <WorkIcon /> },
    { label: "Expenses", path: "/expenses/list", icon: <MonetizationOnIcon /> },
    { label: "Users", path: "/users/list", icon: <GroupIcon /> },
    { label: "Project Summary", path: "/projects/summary", icon: <AssessmentIcon /> },
  ],
  superAdmin: [],
};

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const role = getRole();
  const user = getUser();

  const firstName = user?.firstName || "";
  const lastName = user?.lastName || "";
  const organisation = user?.organisationRefId?.organisationName || "";

  const [open, setOpen] = useState(false);
  const isAddEditPage = pathname.includes("/add") || pathname.includes("/edit");

  let backLink = "/home";
  if (pathname.includes("/clients")) backLink = "/clients/list";
  else if (pathname.includes("/projects")) backLink = "/projects/list";
  else if (pathname.includes("/expenses")) backLink = "/expenses/list";
  else if (pathname.includes("/users")) backLink = "/users/list";
  else if (pathname.includes("/master-data")) backLink = "/master-data";
  else if (pathname.includes("/ratemaster")) backLink = "/ratemaster/list";

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await logoutUser(token);
      if (res.data.status === 100) {
        // localStorage.clear();
        localStorage.removeItem("token");
        navigate("/");
      }
    } catch {
      alert("Logout failed!");
    }
  };

//   const handleLogout = async (navigate) => {
//   try {
//     const token = localStorage.getItem("token");
//     if (!token) return;

//     const res = await logoutUser(token);

//     if (res.data.status === 100) {
//       // Remove token from localStorage
//       localStorage.removeItem("token"); // triggers storage event in other tabs
//       navigate("/"); // redirect current tab
//     }
//   } catch (err) {
//     console.error(err);
//     alert("Logout failed!");
//   }
// };

  return (
    <>
      <AppBar position="static" color="primary" elevation={3}>
        <Toolbar sx={{ gap: 2 }}>
          {!isAddEditPage && (
            <IconButton edge="start" color="inherit" onClick={() => setOpen(true)}>
              <MenuIcon />
            </IconButton>
          )}

          {isAddEditPage && (
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate(backLink)}
              color="inherit"
            >
              Back
            </Button>
          )}

          <Box sx={{ flexGrow: 1, textAlign: "center" }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Project Expense Management
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              padding: "4px 10px",
              borderRadius: 2,
              backgroundColor: "#1565c0",
              color: "#fff",
            }}
          >
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

            <Box sx={{ textAlign: "left", flexGrow: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {organisation || ""}
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.9 }}>
                {firstName} {lastName}
              </Typography>
            </Box>

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

      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            width: 260,
            backgroundColor: "#f5f7fa",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <List sx={{ flexGrow: 1, py: 2 }}>
            {/* <ListItemButton
              onClick={() => {
                role === "superAdmin" ? navigate("/superadmin/home") : navigate("/home");
                setOpen(false);
              }}
              selected={pathname === "/home"}
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "#1976d2",
                  color: "#fff",
                  borderLeft: "5px solid #0d47a1",
                },
                "&:hover": { backgroundColor: "#e3f2fd" },
              }}
            >
              <ListItemIcon>
                <HomeIcon color={pathname === "/home" ? "inherit" : "action"} />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton> */}

            <ListItemButton
              onClick={() => {
                if (role === "superAdmin") navigate("/superadmin/home");
                else if (role === "executive") navigate("/executive/home");
                else navigate("/home");
                setOpen(false);
              }}
              selected={
                pathname === "/home" ||
                pathname === "/superadmin/home" ||
                pathname === "/executive/home"
              }
            >
              <ListItemIcon>
                <HomeIcon color={
                  pathname === "/home" || pathname === "/superadmin/home" || pathname === "/executive/home"
                    ? "inherit"
                    : "action"
                } />
              </ListItemIcon>
              <ListItemText primary="Home" />
        </ListItemButton>

            <Divider sx={{ my: 1 }} />

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
                  "&:hover": { backgroundColor: "#e3f2fd" },
                  py: 1.5,
                  px: 3,
                }}
              >
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{ fontWeight: 500 }}
                />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;