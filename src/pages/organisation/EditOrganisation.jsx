import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Stack,
  Typography,
  Paper
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import {
  getOrganisationById,
  updateOrganisation
} from "../../services/api";

const EditOrganisation = () => {
  const { id } = useParams(); // comes from /organisations/edit/:id
  const navigate = useNavigate();

  const [form, setForm] = useState({
    organisationName: "",
    organisationId: "",
    address: "",
    email: "",
    mobileNo: ""
  });

  const [loading, setLoading] = useState(false);

  // 🔹 Fetch organisation by ID
 useEffect(() => {
  const fetchOrganisation = async () => {
    try {
      const res = await getOrganisationById(id);

      if (res.data.status === 100) {
        const org = res.data?.data?.[0]; // API returns array

        if (org) {
          setForm({
            organisationName: org.organisationName || "",
            // organisationId: org.organisationId || "",
            address: org.address || "",
            email: org.email || "",
            mobileNo: org.mobileNo || ""
          });
        }
      } else {
        alert("Failed to load organisation");
      }
    } catch (err) {
      console.error(err);
      alert("Error loading organisation");
    }
  };

  fetchOrganisation();
}, [id]);


  // 🔹 Input change handler
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 Update organisation
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const res = await updateOrganisation(id, form);

      if (res.data.status === 100) {
        navigate("/organisations/list");
      } else {
        alert(res.data.message || "Update failed");
      }
    } catch (err) {
      console.error(err);
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 600, mx: "auto" }}>
      <Typography variant="h5" mb={3}>
        Edit Organisation
      </Typography>

      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Organisation Name"
            name="organisationName"
            value={form.organisationName}
            onChange={handleChange}
            required
          />

          <TextField
            label="Address"
            name="address"
            value={form.address}
            onChange={handleChange}
          />

          <TextField
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />

          <TextField
            label="Mobile No"
            name="mobileNo"
            value={form.mobileNo}
            onChange={handleChange}
          />

          <Button
            variant="contained"
            type="submit"
            disabled={loading}
          >
            Update Organisation
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};

export default EditOrganisation;