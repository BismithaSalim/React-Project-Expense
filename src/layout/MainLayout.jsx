// // src/layout/MainLayout.js
// import React from "react";
// import Navbar from "../components/Navbar";

// const MainLayout = ({ children }) => {
//   return (
//     <div>
//       <Navbar />
//       <main style={{ padding: "20px" }}>
//         {children}
//       </main>
//     </div>
//   );
// };

// export default MainLayout;

import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Container } from "@mui/material";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Container sx={{ mt: 4 }}>
        <Outlet /> {/* This is where child pages render */}
      </Container>
    </>
  );
};

export default MainLayout;

