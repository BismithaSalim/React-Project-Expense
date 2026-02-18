import React from "react";
import { Stack, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const QuickLinks = () => {
  const navigate = useNavigate();

  const links = [
    { label: "Projects", path: "/projects/list" },
    { label: "Clients", path: "/clients/list" },
    { label: "Expenses", path: "/expenses/list" },
    { label: "Users", path: "/users/list" },
    { label: "Project Summary", path: "/project-summary" }
  ];

  return (
    <Stack direction="row" spacing={2} mb={3}>
      {links.map((link) => (
        <Button
          key={link.path}
          variant="contained"
          color="primary"
          onClick={() => navigate(link.path)}
        >
          {link.label}
        </Button>
      ))}
    </Stack>
  );
};

export default QuickLinks;
