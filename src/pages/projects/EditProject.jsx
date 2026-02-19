import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
  MenuItem,
  CircularProgress
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { getProjectById, updateProject, getClients } from "../../services/api";

const EditProject = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get projectId from query string: /projects/edit?id=123
  const queryParams = new URLSearchParams(location.search);
  const projectId = queryParams.get("id");

  const [formData, setFormData] = useState({
    projectName: "",
    clientRefId: "",
    location: "",
    description: "",
    projectValue: "",
    vatAmount: "",
    deductions: "",
    totalProjectAmount: "",
    projectStatus: "",
    lpoDate: "",
    projectStartDate: "",
    projectEndDate: "",
    acceptanceDate: ""
  });

  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch clients and project data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch clients
        const clientsRes = await getClients(1, 100);
        setClients(clientsRes.data.data || []);

        // Fetch project by ID
        if (projectId) {
          const projectRes = await getProjectById(projectId);
          const p = projectRes.data?.data?.[0];
          if (p) {
            setFormData({
              projectName: p.projectName || "",
              clientRefId: p.clientRefId?._id  || "",
              location: p.location || "",
              description: p.description || "",
              projectValue: p.projectValue || "",
              vatAmount: p.vatAmount || "",
              deductions: p.deductions || "",
              totalProjectAmount: (p.projectValue + p.vatAmount - p.deductions) || "",
              projectStatus: p.projectStatus || "",
              lpoDate: p.lpoDate?.substr(0, 10) || "",
              projectStartDate: p.projectStartDate?.substr(0, 10) || "",
              projectEndDate: p.projectEndDate?.substr(0, 10) || "",
              acceptanceDate: p.acceptanceDate?.substr(0, 10) || ""
            });
          }
        }
      } catch (err) {
        console.error(err);
        alert("Failed to fetch project data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [projectId]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    let updatedForm = { ...formData, [name]: value };

    // Auto calculate totalProjectAmount
    if (["projectValue", "vatAmount", "deductions"].includes(name)) {
      const projectValue = parseFloat(name === "projectValue" ? value : updatedForm.projectValue) || 0;
      const vatAmount = parseFloat(name === "vatAmount" ? value : updatedForm.vatAmount) || 0;
      const deductions = parseFloat(name === "deductions" ? value : updatedForm.deductions) || 0;
      updatedForm.totalProjectAmount = projectValue + vatAmount - deductions;
    }

    setFormData(updatedForm);
  };

  const handleUpdate = async () => {
    try {
      await updateProject(projectId, formData);
      alert("Project updated successfully!");
      navigate("/projects/list");
    } catch (err) {
      console.error(err);
      alert("Failed to update project");
    }
  };

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 5 }}>
      <Paper sx={{ p: 4, maxWidth: 800, mx: "auto" }}>
        <Typography variant="h5" mb={3}>
          Edit Project
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="Project Name"
            name="projectName"
            value={formData.projectName}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            select
            label="Client"
            name="clientRefId"
            value={formData.clientRefId}
            onChange={handleChange}
            fullWidth
          >
            {clients.map((c) => (
              <MenuItem key={c._id} value={c._id}>
                {c.clientName}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={3}
          />

          <TextField
            label="Project Value"
            name="projectValue"
            type="number"
            value={formData.projectValue}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="VAT Amount"
            name="vatAmount"
            type="number"
            value={formData.vatAmount}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Deductions"
            name="deductions"
            type="number"
            value={formData.deductions}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Total Project Amount"
            name="totalProjectAmount"
            type="number"
            value={formData.totalProjectAmount}
            InputProps={{ readOnly: true }}
            fullWidth
          />

          <TextField
            select
            label="Project Status"
            name="projectStatus"
            value={formData.projectStatus}
            onChange={handleChange}
            fullWidth
          >
            {["Not Started", "In Progress", "Completed","Accepted"].map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="LPO Date"
            name="lpoDate"
            type="date"
            value={formData.lpoDate}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="Project Start Date"
            name="projectStartDate"
            type="date"
            value={formData.projectStartDate}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="Project End Date"
            name="projectEndDate"
            type="date"
            value={formData.projectEndDate}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="Acceptance Date"
            name="acceptanceDate"
            type="date"
            value={formData.acceptanceDate}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />

          <Button variant="contained" onClick={handleUpdate}>
            Update Project
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default EditProject;
