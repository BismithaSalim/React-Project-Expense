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
import WorkIcon from "@mui/icons-material/Work";

const SuperAdminDashboard = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Organisations",
      description: "View and add organisations",
      icon: <WorkIcon fontSize="large" />,
      route: "/organisations/list"
    }
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

export default SuperAdminDashboard;
