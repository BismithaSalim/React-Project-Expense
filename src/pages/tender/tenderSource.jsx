import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Grid,
  CircularProgress,
  InputAdornment,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { addSettings, getSettings } from "../../services/api";
import { useNavigate } from "react-router-dom";

const AddTenderSource = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    smtpServer: "",
    port: "",
    username: "",
    emailPassword: "",
  });

  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const response = await getSettings();
        if (response?.data?.status === 100 && response.data.data) {
          const botEmail = response.data.data;
          setForm({
            smtpServer: botEmail.smtpServer || "",
            port: botEmail.port || "",
            username: botEmail.username || "",
            emailPassword: botEmail.password || "",
          });
        }
      } catch (error) {
        console.error("Error fetching bot email settings", error);
        showSnackbar("Failed to load existing settings", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const showSnackbar = (message, severity = "success") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requiredFields = ["smtpServer", "port", "username", "emailPassword"];
    for (let field of requiredFields) {
      if (!form[field]) {
        showSnackbar(`Please fill ${field}`, "warning");
        return;
      }
    }

    try {
      const response = await addSettings(form);
      if (response?.data?.status === 100) {
        showSnackbar("Settings saved successfully!", "success");
      } else {
        showSnackbar(response?.data?.message || "Failed to save settings", "error");
      }
    } catch (error) {
      console.error("Error saving settings", error);
      showSnackbar("Something went wrong", "error");
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 4, mb: 4 }}>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            BOT Email Credentials
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="SMTP Server"
                name="smtpServer"
                value={form.smtpServer}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="Port"
                name="port"
                value={form.port}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Username"
                name="username"
                value={form.username}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type={showPassword ? "text" : "password"}
                label="Password"
                name="emailPassword"
                value={form.emailPassword}
                onChange={handleChange}
                autoComplete="new-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Box sx={{ display: "flex", gap: 2 }}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
        <Button variant="outlined" color="secondary" onClick={() => navigate(-1)}>
          Cancel
        </Button>
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddTenderSource;