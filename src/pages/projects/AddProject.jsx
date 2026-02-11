// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Button,
//   MenuItem,
//   Paper,
//   Stack,
//   TextField,
//   Typography
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { getClients, addProject } from "../../services/api";

// const AddProject = () => {
//   const navigate = useNavigate();
//   const [clients, setClients] = useState([]);

//   const [formData, setFormData] = useState({
//     projectName: "",
//     clientRefId: "",
//     location: "",
//     description: "",
//     projectValue: "",
//     vatAmount: "",
//     deductions: "",
//     totalAmount: 0,
//     projectStatus: "",
//     lpoDate: "",
//     startDate: "",
//     endDate: "",
//     acceptanceDate: ""
//   });

//   useEffect(() => {
//     fetchClients();
//   }, []);

//   useEffect(() => {
//     const value = Number(formData.projectValue) || 0;
//     const vat = Number(formData.vatAmount) || 0;
//     const deduction = Number(formData.deductions) || 0;
//     setFormData((prev) => ({
//       ...prev,
//       totalAmount: value + vat - deduction
//     }));
//   }, [formData.projectValue, formData.vatAmount, formData.deductions]);

//   const fetchClients = async () => {
//     const res = await getClients(1, 100);
//     setClients(res.data.data || []);
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async () => {
//     await addProject(formData);
//     navigate("/projects/list");
//   };

//   return (
//     <Box sx={{ p: 5 }}>
//       <Paper sx={{ p: 4, maxWidth: 800, mx: "auto" }}>
//         <Typography variant="h5" mb={3}>
//           Add Project
//         </Typography>

//         <Stack spacing={2}>
//           <TextField
//             label="Project Name"
//             name="projectName"
//             onChange={handleChange}
//             fullWidth
//           />

//           <TextField
//             select
//             label="Client Name"
//             name="clientRefId"
//             onChange={handleChange}
//             fullWidth
//           >
//             {clients.map((c) => (
//               <MenuItem key={c._id} value={c._id}>
//                 {c.clientName}
//               </MenuItem>
//             ))}
//           </TextField>

//           <TextField label="Location" name="location" onChange={handleChange} />
//           <TextField
//             label="Description"
//             name="description"
//             onChange={handleChange}
//             multiline
//             rows={3}
//           />

//           <TextField
//             label="Project Value"
//             name="projectValue"
//             type="number"
//             onChange={handleChange}
//           />

//           <TextField
//             label="VAT Amount"
//             name="vatAmount"
//             type="number"
//             onChange={handleChange}
//           />

//           <TextField
//             label="Deductions"
//             name="deductions"
//             type="number"
//             onChange={handleChange}
//           />

//           <TextField
//             label="Total Project Amount"
//             value={formData.totalAmount}
//             disabled
//           />

//           <TextField
//             select
//             label="Project Status"
//             name="projectStatus"
//             onChange={handleChange}
//           >
//             {["Ongoing", "Not Started", "Completed", "Accepted"].map((s) => (
//               <MenuItem key={s} value={s}>
//                 {s}
//               </MenuItem>
//             ))}
//           </TextField>

//           <TextField
//             type="date"
//             label="LPO Date"
//             name="lpoDate"
//             InputLabelProps={{ shrink: true }}
//             onChange={handleChange}
//           />

//           <TextField
//             type="date"
//             label="Project Start Date"
//             name="startDate"
//             InputLabelProps={{ shrink: true }}
//             onChange={handleChange}
//           />

//           <TextField
//             type="date"
//             label="Project End Date"
//             name="endDate"
//             InputLabelProps={{ shrink: true }}
//             onChange={handleChange}
//           />

//           <TextField
//             type="date"
//             label="Acceptance Date"
//             name="acceptanceDate"
//             InputLabelProps={{ shrink: true }}
//             onChange={handleChange}
//           />

//           <Button variant="contained" onClick={handleSubmit}>
//             Save Project
//           </Button>
//         </Stack>
//       </Paper>
//     </Box>
//   );
// };

// export default AddProject;

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
  Snackbar,
  Alert
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getClients, addProject } from "../../services/api";

const AddProject = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [formData, setFormData] = useState({
    projectName: "",
    clientRefId: "",
    location: "",
    description: "",
    projectValue: "",
    vatAmount: "",
    deductions: "",
    totalAmount: 0,
    projectStatus: "",
    lpoDate: "",
    projectStartDate: "",
    projectEndDate: "",
    acceptanceDate: ""
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  // Fetch clients on mount
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await getClients(1, 100);
        setClients(res.data.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchClients();
  }, []);

  // Calculate totalAmount whenever value, VAT or deductions change
  useEffect(() => {
    const value = Number(formData.projectValue) || 0;
    const vat = Number(formData.vatAmount) || 0;
    const deduction = Number(formData.deductions) || 0;
    setFormData((prev) => ({ ...prev, totalAmount: value + vat - deduction }));
  }, [formData.projectValue, formData.vatAmount, formData.deductions]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await addProject(formData);

      if (res.data.status === 100) {
        // Show success message
        setSnackbar({
          open: true,
          message: "Project added successfully!",
          severity: "success"
        });
        // Redirect after short delay
        setTimeout(() => navigate("/projects/list"), 1500);
      } else {
        // API returned failure
        setSnackbar({
          open: true,
          message: "Failed to add project",
          severity: "error"
        });
      }
    } catch (err) {
      console.error(err);
      setSnackbar({
        open: true,
        message: "Error adding project",
        severity: "error"
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <Box sx={{ p: 5 }}>
      <Paper sx={{ p: 4, maxWidth: 800, mx: "auto" }}>
        <Typography variant="h5" mb={3}>
          Add Project
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="Project Name"
            name="projectName"
            onChange={handleChange}
            fullWidth
          />

          <TextField
            select
            label="Client Name"
            name="clientRefId"
            onChange={handleChange}
            fullWidth
          >
            {clients.map((c) => (
              <MenuItem key={c._id} value={c._id}>
                {c.clientName}
              </MenuItem>
            ))}
          </TextField>

          <TextField label="Location" name="location" onChange={handleChange} />
          <TextField
            label="Description"
            name="description"
            onChange={handleChange}
            multiline
            rows={3}
          />
          <TextField
            label="Project Value"
            name="projectValue"
            type="number"
            onChange={handleChange}
          />
          <TextField
            label="VAT Amount"
            name="vatAmount"
            type="number"
            onChange={handleChange}
          />
          <TextField
            label="Deductions"
            name="deductions"
            type="number"
            onChange={handleChange}
          />
          <TextField
            label="Total Project Amount"
            value={formData.totalAmount}
            disabled
          />

          <TextField
            select
            label="Project Status"
            name="projectStatus"
            onChange={handleChange}
          >
            {["Ongoing", "Not Started", "Completed", "Accepted"].map((s) => (
              <MenuItem key={s} value={s}>
                {s}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            type="date"
            label="LPO Date"
            name="lpoDate"
            InputLabelProps={{ shrink: true }}
            onChange={handleChange}
          />
          <TextField
            type="date"
            label="Project Start Date"
            name="projectStartDate"
            InputLabelProps={{ shrink: true }}
            onChange={handleChange}
          />
          <TextField
            type="date"
            label="Project End Date"
            name="projectEndDate"
            InputLabelProps={{ shrink: true }}
            onChange={handleChange}
          />
          <TextField
            type="date"
            label="Acceptance Date"
            name="acceptanceDate"
            InputLabelProps={{ shrink: true }}
            onChange={handleChange}
          />

          <Button variant="contained" onClick={handleSubmit}>
            Save Project
          </Button>
        </Stack>
      </Paper>

      {/* Snackbar for success/error messages */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddProject;

