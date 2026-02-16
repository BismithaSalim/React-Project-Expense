import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Paper,
  Stack,
  Typography,
  CircularProgress,
  MenuItem
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { getUserById, updateUser } from "../../services/api";

const EditUser = () => {
const location = useLocation();
const queryParams = new URLSearchParams(location.search);
  const id  =queryParams.get("id");
//    useParams(); // userId
  console.log("id",id)
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    mobileNo: "",
    password: "",
    role: ""
  });

  // Fetch user details
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserById(id);

        if (res.data.status === 100) {
          const user = res.data?.data?.[0];

          setForm({
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            userName: user.userName || "",
            email: user.email || "",
            mobileNo: user.mobileNo || "",
            password: "", // do NOT prefill password
            role: user.role || "expenseEditor"
          });
        } else {
          alert("Failed to load user");
        }
      } catch (err) {
        console.error(err);
        alert("Error fetching user");
      } finally {
        setInitialLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 Update user
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.firstName || !form.userName || !form.email || !form.mobileNo) {
      alert("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      const payload = { ...form };

      // If password empty → remove from payload
      if (!payload.password) {
        delete payload.password;
      }

      const res = await updateUser(id, payload);

      if (res.data.status === 100) {
        alert("User updated successfully");
        navigate(-1);
      } else {
        alert(res.data.message || "Update failed");
      }

    } catch (err) {
      console.error(err);
      alert("Error updating user");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <Stack alignItems="center" mt={5}>
        <CircularProgress />
      </Stack>
    );
  }

  return (
    <Paper sx={{ maxWidth: 600, mx: "auto", p: 4 }}>
      <Typography variant="h5" mb={3}>
        Edit User
      </Typography>

      <form onSubmit={handleSubmit}>
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
            label="New Password (leave empty if not changing)"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
          />

          <TextField
            select
            label="Role"
            name="role"
            value={form.role}
            onChange={handleChange}
          >
            <MenuItem value="expenseEditor">Expense Editor</MenuItem>
            <MenuItem value="viewer">Viewer</MenuItem>
          </TextField>

          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button variant="outlined" onClick={() => navigate(-1)}>
              Cancel
            </Button>

            <Button variant="contained" type="submit" disabled={loading}>
              {loading ? <CircularProgress size={22} /> : "Update User"}
            </Button>
          </Stack>

        </Stack>
      </form>
    </Paper>
  );
};

export default EditUser;