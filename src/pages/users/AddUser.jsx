import React, { useState } from "react";
import {
  TextField,
  Button,
  Paper,
  Stack,
  Typography,
  CircularProgress,
  MenuItem,
  Snackbar,
  Alert
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { addUser } from "../../services/api";

const AddUser = () => {
  const { id } = useParams(); // organisationId
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    mobileNo: "",
    password: "",
    role: "expenseEditor"
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.firstName ||
      !form.userName ||
      !form.email ||
      !form.mobileNo ||
      !form.password
    ) {
      alert("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        ...form,
        organisationId: id, // attach organisation
      };

      const res = await addUser(payload);

      if (res.data.status === 100) {
        setSnackbarMessage("User added successfully");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        setTimeout(() => navigate(-1), 1000);
        // navigate(-1); // go back
      } else {
        alert(res.data.errorDetails || "Failed to add user");
      }

    }catch (err) {
      console.error("errrrr", err.response?.data?.errorDetails);

      setSnackbarMessage(
        err.response?.data?.errorDetails || "Error saving user"
      );

      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }

    // catch (err) {
    //   console.error("errrrr",err.response.data.errorDetails);
    //   if(err.response?.data?.errorDetails === "Username must be unique"){
    //     alert("Username must be unique");
    //   }else{
    //     alert("Error saving user");
    //   }
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <Paper sx={{ maxWidth: 600, mx: "auto", p: 4 }}>
      <Typography variant="h5" mb={3}>
        Add User
      </Typography>

      <form onSubmit={handleSubmit} autoComplete="off">
        <Stack spacing={2}>

          <TextField
            label="First Name"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            required
          />

          <TextField
            label="Last Name"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
          />

          <TextField
            label="Username"
            name="userName"
            value={form.userName}
            onChange={handleChange}
            required
            autoComplete="new-username"
          />

          <TextField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <TextField
            label="Mobile Number"
            name="mobileNo"
            value={form.mobileNo}
            onChange={handleChange}
            required
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
            autoComplete="new-password"
          />

          {/* Role Selection */}
          <TextField
            select
            label="Role"
            name="role"
            value={form.role}
            onChange={handleChange}
          >
            <MenuItem value="expenseEditor">Expense Editor</MenuItem>
            <MenuItem value="viewer">Viewer</MenuItem>
            <MenuItem value="executive">Executive</MenuItem>
          </TextField>

          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button variant="outlined" onClick={() => navigate(-1)}>
              Cancel
            </Button>

            <Button variant="contained" type="submit" disabled={loading}>
              {loading ? <CircularProgress size={22} /> : "Add User"}
            </Button>
          </Stack>

        </Stack>
      </form>

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

    </Paper>
  );
};

export default AddUser;
