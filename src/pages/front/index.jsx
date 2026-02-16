// import React from "react";
// import { Button, Typography, Paper } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// const FrontPage = () => {
//   const navigate = useNavigate();

//   return (
//     <Paper
//       sx={{
//         p: 5,
//         textAlign: "center",
//         maxWidth: 600,
//         margin: "50px auto",
//       }}
//     >
//       <Typography variant="h3" gutterBottom>
//         Project Expense Management
//       </Typography>
//       <Typography variant="body1" gutterBottom>
//         Click below to start adding clients.
//       </Typography>

//       <Button
//         variant="contained"
//         color="primary"
//         size="large"
//         onClick={() => navigate("/clients/add")}
//       >
//         Start
//       </Button>
//     </Paper>
//   );
// };

// export default FrontPage;

import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Avatar
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import WorkIcon from "@mui/icons-material/Work";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AssessmentIcon from "@mui/icons-material/Assessment";

const FrontPage = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Clients",
      description: "Manage your clients and their details",
      icon: <PeopleIcon fontSize="large" />,
      route: "/clients/list"
    },
    {
      title: "Projects",
      description: "View and add projects under each client",
      icon: <WorkIcon fontSize="large" />,
      route: "/projects/list"
    },
    {
      title: "Expenses",
      description: "Track expenses for each project",
      icon: <ReceiptIcon fontSize="large" />,
      route: "/expenses/list"
    },
    {
      title: "Project Summary",
      description: "Overall financial summary of all projects",
      icon: <AssessmentIcon fontSize="large" />,
      route: "/projects/summary"
   },
   {
      title: "Users",
      description: "Manage your users and their details",
      icon: <PeopleIcon fontSize="large" />,
      route: "/users/list"
    },
  ];

  return (
    <Box sx={{ p: 5, background: "#d3e4f5ff", minHeight: "100vh" }}>
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        sx={{ fontWeight: 700, mb: 5 }}
      >
        Project Expense Management
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {cards.map((card) => (
          <Grid item xs={12} sm={6} md={4} key={card.title}>
            <Card
              sx={{
                p: 2,
                textAlign: "center",
                borderRadius: 3,
                boxShadow: 6,
                "&:hover": {
                  boxShadow: 12,
                  transform: "translateY(-5px)",
                  transition: "0.3s"
                }
              }}
            >
              <Avatar
                sx={{
                  bgcolor: "#1976d2",
                  width: 60,
                  height: 60,
                  margin: "0 auto",
                  mb: 2
                }}
              >
                {card.icon}
              </Avatar>

              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {card.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {card.description}
                </Typography>
              </CardContent>

              <CardActions sx={{ justifyContent: "center" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate(card.route)}
                >
                  Go
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FrontPage;
