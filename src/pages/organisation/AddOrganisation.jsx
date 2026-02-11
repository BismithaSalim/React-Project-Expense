import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { createOrganisation } from "../../services/api"; // your API file
import { useNavigate } from "react-router-dom";

const AddOrganisation = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    organisationName: "",
    organisationId: "",
    address: "",
    email: "",
    mobileNo: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!formData.organisationName) {
      alert("Organisation Name is required");
      return;
    }

    try {
      setLoading(true);
      const res = await createOrganisation(formData); // API call
      if (res.data.status === 100) {
        alert("Organisation added successfully");
        navigate("/organisations/list");
      } else {
        alert(res.data.message || "Failed to add organisation");
      }
    } catch (err) {
      console.error(err);
      alert("Error adding organisation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h5" mb={2}>
        Add Organisation
      </Typography>
      <TextField
        fullWidth
        label="Organisation Name"
        name="organisationName"
        value={formData.organisationName}
        onChange={handleChange}
        margin="normal"
        required
      />
      {/* <TextField
        fullWidth
        label="Organisation ID"
        name="organisationId"
        value={formData.organisationId}
        onChange={handleChange}
        margin="normal"
      /> */}
      <TextField
        fullWidth
        label="Address"
        name="address"
        value={formData.address}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Mobile No"
        name="mobileNo"
        value={formData.mobileNo}
        onChange={handleChange}
        margin="normal"
      />
      <Box mt={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Organisation"}
        </Button>
        <Button
          variant="outlined"
          sx={{ ml: 2 }}
          onClick={() => navigate("/organisations/list")}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default AddOrganisation;
