// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   Paper,
//   Grid,
//   TextField,
//   MenuItem,
//   Button,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   IconButton,
//   Divider,
// } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// // Import your API functions
// import { getProjects, getServices, createCostCalculation } from "../../services/api";

// const CostCalculation = () => {
//   // ==============================
//   // STATE
//   // ==============================
//   const [formData, setFormData] = useState({
//     project: "",
//     locationType: "",
//     city: "",
//     services: [],
//   });
//   const [projects, setProjects] = useState([]);
//   const [servicesMaster, setServicesMaster] = useState([]);
//   const showDeleted = false;

//   // ==============================
//   // LOAD PROJECTS
//   // ==============================
//   useEffect(() => {
//     getProjects()
//       .then((res) => setProjects(res.data.data))
//       .catch((err) => console.error(err));
//   }, []);

//   // ==============================
//   // LOAD SERVICES BASED ON LOCATION
//   // ==============================
//   useEffect(() => {
//     if (!formData.locationType) return;

//     getServices(showDeleted,formData.locationType)
//       .then((res) => setServicesMaster(res.data.data))
//       .catch((err) => console.error(err));
//   }, [formData.locationType]);

//   // ==============================
//   // CALCULATION FUNCTIONS
//   // ==============================
//   const calculateAmount = (rate, qty, margin) => (rate * qty) * (1 + margin / 100);
//   const calculateTotal = () => formData.services.reduce((sum, item) => sum + item.amount, 0);

//   // ==============================
//   // ADD SERVICE
//   // ==============================
//   const handleAddService = () => {
//     if (!formData.project || !formData.locationType) {
//       alert("Select project and location first");
//       return;
//     }

//     setFormData((prev) => ({
//       ...prev,
//       services: [
//         ...prev.services,
//         { type: "", rate: 0, unit: "", qty: 1, margin: 30, amount: 0 },
//       ],
//     }));
//   };

//   // ==============================
//   // HANDLE SERVICE TYPE CHANGE
//   // ==============================
//   const handleTypeChange = (index, value) => {
//     const selected = servicesMaster.find((s) => s.serviceName === value);
//     if (!selected) return;

//     const rate = formData.locationType === "Outside Muscat" ? selected.outsideRate : selected.muscatRate;

//     const updated = [...formData.services];
//     updated[index] = { ...updated[index], type: value, rate, unit: selected.unit, amount: calculateAmount(rate, 1, 30) };
//     setFormData({ ...formData, services: updated });
//   };

//   // ==============================
//   // HANDLE QTY / MARGIN CHANGE
//   // ==============================
//   const handleServiceChange = (index, field, value) => {
//     const updated = [...formData.services];
//     if (field === "margin" && value < 30) value = 30;
//     updated[index][field] = value;

//     const { rate, qty, margin } = updated[index];
//     updated[index].amount = calculateAmount(rate, Number(qty), Number(margin));
//     setFormData({ ...formData, services: updated });
//   };

//   // ==============================
//   // DELETE SERVICE
//   // ==============================
//   const handleDelete = (index) => {
//     const updated = formData.services.filter((_, i) => i !== index);
//     setFormData({ ...formData, services: updated });
//   };

//   // ==============================
//   // SAVE COST CALCULATION
//   // ==============================
//   const handleSave = async () => {
//     if (!formData.project || !formData.locationType || !formData.city) {
//       alert("Fill all project details first");
//       return;
//     }
//     try {
//       await createCostCalculation({
//         projectId: formData.project,
//         locationType: formData.locationType,
//         city: formData.city,
//         services: formData.services,
//         totalAmount: calculateTotal(),
//       });
//       alert("Saved successfully!");
//       setFormData({ project: "", locationType: "", city: "", services: [] });
//     } catch (err) {
//       console.error(err);
//       alert("Failed to save");
//     }
//   };

//   // ==============================
//   // EXPORT CSV
//   // ==============================
//   const handleExport = () => {
//     if (!formData.services.length) return alert("No services to export");

//     let csv = "Service,Unit,Rate,Quantity,Margin,Amount\n";
//     formData.services.forEach((item) => {
//       csv += `${item.type},${item.unit},${item.rate},${item.qty},${item.margin},${item.amount.toFixed(3)}\n`;
//     });
//     csv += `,,,,Total,${calculateTotal().toFixed(3)}\n`;

//     const blob = new Blob([csv], { type: "text/csv" });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "cost-calculation.csv";
//     a.click();
//     window.URL.revokeObjectURL(url);
//   };

//   // ==============================
//   // RENDER
//   // ==============================
//   return (
//     <Box sx={{ p: 4 }}>
//       <Typography variant="h4" mb={4}>Cost Calculation</Typography>

//       {/* Project Details */}
//       <Paper sx={{ p: 3, mb: 4 }}>
//         <Typography variant="h6" mb={2}>Project Details</Typography>
//         <Grid container spacing={3}>
//           <Grid item xs={12} md={4}>
//             <TextField
//               select fullWidth label="Project"
//               value={formData.project}
//               onChange={(e) => setFormData({ ...formData, project: e.target.value })}
//             >
//               {projects.map((p) => (
//                 <MenuItem key={p._id} value={p._id}>{p.projectName}</MenuItem>
//               ))}
//             </TextField>
//           </Grid>
//           <Grid item xs={12} md={4}>
//             <TextField
//               select fullWidth label="Location Type"
//               value={formData.locationType}
//               onChange={(e) => setFormData({ ...formData, locationType: e.target.value })}
//             >
//               <MenuItem value="Muscat">Muscat</MenuItem>
//               <MenuItem value="Outside Muscat">Outside Muscat</MenuItem>
//             </TextField>
//           </Grid>
//           <Grid item xs={12} md={4}>
//             <TextField
//               fullWidth label="City"
//               value={formData.city}
//               onChange={(e) => setFormData({ ...formData, city: e.target.value })}
//             />
//           </Grid>
//         </Grid>
//       </Paper>

//       {/* Add Service */}
//       <Paper sx={{ p: 3, mb: 4 }}>
//         <Button variant="contained" onClick={handleAddService} disabled={!formData.project || !formData.locationType}>
//           + Add Service
//         </Button>
//       </Paper>

//       {/* Services Table */}
//       {formData.services.length > 0 && (
//         <Paper sx={{ p: 3, mb: 4 }}>
//           <Typography variant="h6" mb={2}>Services</Typography>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Type</TableCell>
//                 <TableCell>Rate</TableCell>
//                 <TableCell>Unit</TableCell>
//                 <TableCell>Qty</TableCell>
//                 <TableCell>Margin (%)</TableCell>
//                 <TableCell>Amount</TableCell>
//                 <TableCell />
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {formData.services.map((item, index) => (
//                 <TableRow key={index}>
//                   <TableCell>
//                     <TextField
//                       select fullWidth value={item.type} onChange={(e) => handleTypeChange(index, e.target.value)}
//                     >
//                       {servicesMaster.map((s) => (
//                         <MenuItem key={s.serviceName} value={s.serviceName}>{s.serviceName}</MenuItem>
//                       ))}
//                     </TextField>
//                   </TableCell>
//                   <TableCell>{item.rate}</TableCell>
//                   <TableCell>{item.unit}</TableCell>
//                   <TableCell>
//                     <TextField type="number" size="small" value={item.qty} onChange={(e) => handleServiceChange(index, "qty", Number(e.target.value))} />
//                   </TableCell>
//                   <TableCell>
//                     <TextField type="number" size="small" inputProps={{ min: 30 }} value={item.margin} onChange={(e) => handleServiceChange(index, "margin", Number(e.target.value))} />
//                   </TableCell>
//                   <TableCell><strong>{item.amount.toFixed(3)}</strong></TableCell>
//                   <TableCell>
//                     <IconButton onClick={() => handleDelete(index)}><DeleteIcon /></IconButton>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </Paper>
//       )}

//       {/* Summary */}
//       {formData.services.length > 0 && (
//         <Paper sx={{ p: 3 }}>
//           <Divider sx={{ mb: 2 }} />
//           <Typography variant="h5" mb={3}>Total: {calculateTotal().toFixed(3)} OMR</Typography>
//           <Grid container spacing={2}>
//             <Grid item>
//               <Button variant="contained" onClick={handleSave}>Save</Button>
//             </Grid>
//             <Grid item>
//               <Button variant="outlined" onClick={() => window.print()}>Print</Button>
//             </Grid>
//             <Grid item>
//               <Button variant="outlined" onClick={handleExport}>Export Excel</Button>
//             </Grid>
//           </Grid>
//         </Paper>
//       )}
//     </Box>
//   );
// };

// export default CostCalculation;

// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   Paper,
//   Grid,
//   TextField,
//   MenuItem,
//   Button,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   IconButton,
//   Divider,
// } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// import {
//   getProjects,
//   getServices,
//   getCostCalculation,
//   createCostCalculation,
// } from "../../services/api";

// const CostCalculation = () => {
//   const [formData, setFormData] = useState({
//     project: "",
//     locationType: "",
//     city: "",
//     services: [],
//   });
//   const [projects, setProjects] = useState([]);
//   const [servicesMaster, setServicesMaster] = useState([]);
//   const showDeleted = false;

//   // Load all projects
//   useEffect(() => {
//     getProjects()
//       .then((res) => setProjects(res.data.data))
//       .catch((err) => console.error(err));
//   }, []);

//   // Load master services based on locationType
//   useEffect(() => {
//     if (!formData.locationType) return;

//     getServices(showDeleted, formData.locationType)
//       .then((res) => setServicesMaster(res.data.data))
//       .catch((err) => console.error(err));
//   }, [formData.locationType]);

//   // Load existing services for selected project + locationType
//   useEffect(() => {
//     const { project, locationType } = formData;
//     if (!project || !locationType) {
//       setFormData((prev) => ({ ...prev, services: [] }));
//       return;
//     }

//     getCostCalculation(project, locationType)
//       .then((res) => {
//         const data = res.data.data[0]; // first record if exists
//         if (data && data.services) {
//           const services = data.services.map((s) => ({
//             _id: s._id,
//             type: s.type || "",
//             rate: s.rate || 0,
//             unit: s.unit || "",
//             qty: s.qty || 1,
//             margin: s.margin || 30,
//             amount: s.amount || 0,
//           }));
//           setFormData((prev) => ({
//             ...prev,
//             services,
//             city: data.city || prev.city,
//           }));
//         } else {
//           setFormData((prev) => ({ ...prev, services: [] }));
//         }
//       })
//       .catch((err) => console.error(err));
//   }, [formData.project, formData.locationType]);

//   // Recalculate amounts if locationType changes after services are selected
//   useEffect(() => {
//     if (!formData.services.length) return;
//     const updated = formData.services.map((s) => {
//       const master = servicesMaster.find((m) => m.serviceName === s.type);
//       if (!master) return s;
//       const rate =
//         formData.locationType === "Outside Muscat"
//           ? master.outsideRate
//           : master.muscatRate;
//       const margin = s.margin || 30;
//       const qty = s.qty || 1;
//       return {
//         ...s,
//         rate,
//         amount: (rate * qty) * (1 + margin / 100),
//       };
//     });
//     setFormData((prev) => ({ ...prev, services: updated }));
//   }, [formData.locationType, servicesMaster]);

//   // Calculation helpers
//   const calculateAmount = (rate, qty, margin) => (rate * qty) * (1 + margin / 100);
//   const calculateTotal = () =>
//     formData.services.reduce((sum, item) => sum + (item.amount || 0), 0);

//   // Add new service
//   const handleAddService = () => {
//     if (!formData.project || !formData.locationType) {
//       alert("Select project and location first");
//       return;
//     }
//     setFormData((prev) => ({
//       ...prev,
//       services: [
//         ...prev.services,
//         { type: "", rate: 0, unit: "", qty: 1, margin: 30, amount: 0 },
//       ],
//     }));
//   };

//   // Change service type
//   const handleTypeChange = (index, value) => {
//     const master = servicesMaster.find((s) => s.serviceName === value);
//     if (!master) return;

//     const rate =
//       formData.locationType === "Outside Muscat"
//         ? master.outsideRate
//         : master.muscatRate;

//     const updated = [...formData.services];
//     updated[index] = {
//       ...updated[index],
//       type: value,
//       rate,
//       unit: master.unit,
//       qty: 1,
//       margin: 30,
//       amount: calculateAmount(rate, 1, 30),
//     };
//     setFormData({ ...formData, services: updated });
//   };

//   // Change qty or margin
//   const handleServiceChange = (index, field, value) => {
//     const updated = [...formData.services];
//     if (field === "margin" && value < 30) value = 30;
//     updated[index][field] = value;
//     const { rate, qty, margin } = updated[index];
//     updated[index].amount = calculateAmount(rate, Number(qty), Number(margin));
//     setFormData({ ...formData, services: updated });
//   };

//   // Delete service
//   const handleDelete = (index) => {
//     const updated = formData.services.filter((_, i) => i !== index);
//     setFormData({ ...formData, services: updated });
//   };

//   // Save cost calculation
//   const handleSave = async () => {
//     if (!formData.project || !formData.locationType || !formData.city) {
//       alert("Fill all project details first");
//       return;
//     }

//     try {
//       const payload = {
//         projectId: formData.project,
//         locationType: formData.locationType,
//         city: formData.city,
//         services: formData.services,
//         totalAmount: calculateTotal(),
//       };

//       const res = await createCostCalculation(payload);
//       alert("Saved successfully!");

//       // Update services with latest saved data without page refresh
//       if (res.data.data && res.data.data.services) {
//         const services = res.data.data.services.map((s) => ({
//           ...s,
//           qty: s.qty || 1,
//           margin: s.margin || 30,
//           amount: s.amount || 0,
//         }));
//         setFormData((prev) => ({ ...prev, services }));
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Failed to save");
//     }
//   };

//   // Export CSV
//   const handleExport = () => {
//     if (!formData.services.length) return alert("No services to export");

//     let csv = "Service,Unit,Rate,Quantity,Margin,Amount\n";
//     formData.services.forEach((item) => {
//       csv += `${item.type},${item.unit},${item.rate},${item.qty},${item.margin},${(item.amount || 0).toFixed(
//         3
//       )}\n`;
//     });
//     csv += `,,,,Total,${calculateTotal().toFixed(3)}\n`;

//     const blob = new Blob([csv], { type: "text/csv" });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "cost-calculation.csv";
//     a.click();
//     window.URL.revokeObjectURL(url);
//   };

//   return (
//     <Box sx={{ p: 4 }}>
//       <Typography variant="h4" mb={4}>
//         Cost Calculation
//       </Typography>

//       {/* Project Details */}
//       <Paper sx={{ p: 3, mb: 4 }}>
//         <Typography variant="h6" mb={2}>
//           Project Details
//         </Typography>
//         <Grid container spacing={3}>
//           <Grid item xs={12} md={4}>
//             <TextField
//               select
//               fullWidth
//               label="Project"
//               value={formData.project}
//               onChange={(e) =>
//                 setFormData({ ...formData, project: e.target.value })
//               }
//             >
//               {projects.map((p) => (
//                 <MenuItem key={p._id} value={p._id}>
//                   {p.projectName}
//                 </MenuItem>
//               ))}
//             </TextField>
//           </Grid>
//           <Grid item xs={12} md={4}>
//             <TextField
//               select
//               fullWidth
//               label="Location Type"
//               value={formData.locationType}
//               onChange={(e) =>
//                 setFormData({ ...formData, locationType: e.target.value })
//               }
//             >
//               <MenuItem value="Muscat">Muscat</MenuItem>
//               <MenuItem value="Outside Muscat">Outside Muscat</MenuItem>
//             </TextField>
//           </Grid>
//           <Grid item xs={12} md={4}>
//             <TextField
//               fullWidth
//               label="City"
//               value={formData.city}
//               onChange={(e) =>
//                 setFormData({ ...formData, city: e.target.value })
//               }
//             />
//           </Grid>
//         </Grid>
//       </Paper>

//       {/* Add Service */}
//       <Paper sx={{ p: 3, mb: 4 }}>
//         <Button
//           variant="contained"
//           onClick={handleAddService}
//           disabled={!formData.project || !formData.locationType}
//         >
//           + Add Service
//         </Button>
//       </Paper>

//       {/* Services Table */}
//       {formData.services.length > 0 && (
//         <Paper sx={{ p: 3, mb: 4 }}>
//           <Typography variant="h6" mb={2}>
//             Services
//           </Typography>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Type</TableCell>
//                 <TableCell>Rate</TableCell>
//                 <TableCell>Unit</TableCell>
//                 <TableCell>Qty</TableCell>
//                 <TableCell>Margin (%)</TableCell>
//                 <TableCell>Amount</TableCell>
//                 <TableCell />
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {formData.services.map((item, index) => (
//                 <TableRow key={index}>
//                   <TableCell>
//                     <TextField
//                       select
//                       fullWidth
//                       value={item.type}
//                       onChange={(e) =>
//                         handleTypeChange(index, e.target.value)
//                       }
//                     >
//                       {servicesMaster.map((s) => (
//                         <MenuItem
//                           key={s.serviceName}
//                           value={s.serviceName}
//                         >
//                           {s.serviceName}
//                         </MenuItem>
//                       ))}
//                     </TextField>
//                   </TableCell>
//                   <TableCell>{item.rate}</TableCell>
//                   <TableCell>{item.unit}</TableCell>
//                   <TableCell>
//                     <TextField
//                       type="number"
//                       size="small"
//                       value={item.qty}
//                       onChange={(e) =>
//                         handleServiceChange(index, "qty", Number(e.target.value))
//                       }
//                     />
//                   </TableCell>
//                   <TableCell>
//                     <TextField
//                       type="number"
//                       size="small"
//                       inputProps={{ min: 30 }}
//                       value={item.margin}
//                       onChange={(e) =>
//                         handleServiceChange(index, "margin", Number(e.target.value))
//                       }
//                     />
//                   </TableCell>
//                   <TableCell>
//                     <strong>{(item.amount || 0).toFixed(3)}</strong>
//                   </TableCell>
//                   <TableCell>
//                     <IconButton onClick={() => handleDelete(index)}>
//                       <DeleteIcon />
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </Paper>
//       )}

//       {/* Summary */}
//       {formData.services.length > 0 && (
//         <Paper sx={{ p: 3 }}>
//           <Divider sx={{ mb: 2 }} />
//           <Typography variant="h5" mb={3}>
//             Total: {calculateTotal().toFixed(3)} OMR
//           </Typography>
//           <Grid container spacing={2}>
//             <Grid item>
//               <Button variant="contained" onClick={handleSave}>
//                 Save
//               </Button>
//             </Grid>
//             <Grid item>
//               <Button variant="outlined" onClick={() => window.print()}>
//                 Print
//               </Button>
//             </Grid>
//             <Grid item>
//               <Button variant="outlined" onClick={handleExport}>
//                 Export Excel
//               </Button>
//             </Grid>
//           </Grid>
//         </Paper>
//       )}
//     </Box>
//   );
// };

// export default CostCalculation;

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  MenuItem,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Divider,
  Snackbar,
  Alert
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import PrintIcon from "@mui/icons-material/Print";
import SaveIcon from "@mui/icons-material/Save";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { getRole, getUser } from "../../utils/auth";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Import your API functions
import {
  getProject,
  getServices,
  getCostCalculation,
  createCostCalculation,
  updateCostCalculation,
} from "../../services/api";

const CostCalculation = () => {
  // ==============================
  // STATE
  // ==============================
  const [formData, setFormData] = useState({
    project: "",
    serviceTitle:"",
    locationType: "",
    city: "",
    services: [],
  });
  const [existingRecordId, setExistingRecordId] = useState(null);
  const [projects, setProjects] = useState([]);
  const [servicesMaster, setServicesMaster] = useState([]);
  const showDeleted = false;
  const role = getRole();
  const user = getUser()
  const organisation = user?.organisationRefId?.organisationName || "";

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // ==============================
  // HELPER FUNCTION TO SHOW SNACKBAR
  // ==============================
  const showSnackbar = (message, severity = "success") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  // ==============================
  // LOAD PROJECTS
  // ==============================
  useEffect(() => {
    getProject()
      .then((res) => setProjects(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  // ==============================
  // LOAD SERVICES BASED ON LOCATION
  // ==============================
//   useEffect(() => {
//     if (!formData.locationType) return;

//     getServices(showDeleted, formData.locationType)
//       .then((res) => setServicesMaster(res.data.data))
//       .catch((err) => console.error(err));

//     // If user already selected services, update rates when locationType changes
//     setFormData((prev) => {
//       const updatedServices = prev.services.map((s) => {
//         const master = servicesMaster.find((m) => m.serviceName === s.type);
//         if (master) {
//           const rate =
//             formData.locationType === "Outside Muscat"
//               ? master.outsideRate
//               : master.muscatRate;
//           return { ...s, rate, amount: (rate * s.quantity) * (1 + s.margin / 100) };
//         }
//         return s;
//       });
//       return { ...prev, services: updatedServices };
//     });

//     // Reset existing record if locationType changes
//     setExistingRecordId(null);
//   }, [formData.locationType]);

    useEffect(() => {
        if (!formData.locationType) return;

        getServices(showDeleted, formData.locationType)
            .then((res) => setServicesMaster(res.data.data))
            .catch((err) => console.error(err));

        setExistingRecordId(null);
        }, [formData.locationType, showDeleted]);

    useEffect(() => {
    if (!servicesMaster.length) return;

    setFormData((prev) => {
        const updatedServices = prev.services.map((s) => {
        const master = servicesMaster.find(
            (m) => m.serviceName === s.type
        );

        if (!master) return s;

        const rate =
            prev.locationType === "Outside Muscat"
            ? master.outsideRate
            : master.muscatRate;

        return {
            ...s,
            rate,
            amount: rate * s.quantity * (1 + s.margin / 100),
        };
        });

        return { ...prev, services: updatedServices };
    });
    }, [servicesMaster]);

  // ==============================
  // LOAD EXISTING SERVICES IF PROJECT + LOCATION SELECTED
  // ==============================
  useEffect(() => {
    const { project,serviceTitle, locationType } = formData;
    if (!project || !serviceTitle || !locationType) {
      setFormData((prev) => ({ ...prev, services: [] }));
      setExistingRecordId(null);
      return;
    }

    getCostCalculation(project,serviceTitle,locationType)
      .then((res) => {
        if (res.data.data && res.data.data.length) {
          const record = res.data.data[0];
          setExistingRecordId(record._id);
          setFormData((prev) => ({
            ...prev,
            city: record.city,
            services: record.services.map((s) => ({
              ...s,
              quantity: s.quantity || 1,
              margin: s.margin || 30,
              amount: s.amount || 0,
            })),
          }));
        } else {
          setExistingRecordId(null);
          setFormData((prev) => ({ ...prev, services: [] }));
        }
      })
      .catch((err) => console.error(err));
  }, [formData.project,formData.serviceTitle,formData.locationType]);

  // ==============================
  // CALCULATION FUNCTIONS
  // ==============================
  const calculateAmount = (rate, quantity, margin) => (rate * quantity) * (1 + margin / 100);
  const calculateTotal = () =>
    formData.services.reduce((sum, item) => sum + (item.amount || 0), 0);

  // ==============================
  // ADD SERVICE
  // ==============================
  const handleAddService = () => {
    if (!formData.project ||!formData.serviceTitle || !formData.locationType) {
      showSnackbar("Select project and service title and location first", "warning");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      services: [
        ...prev.services,
        { type: "", rate: 0, unit: "", quantity: 1, margin: 30, amount: 0 },
      ],
    }));
  };

  // ==============================
  // HANDLE SERVICE TYPE CHANGE
  // ==============================
  const handleTypeChange = (index, value) => {
    const selected = servicesMaster.find((s) => s.serviceName === value);
    if (!selected) return;

    const rate =
      formData.locationType === "Outside Muscat"
        ? selected.outsideRate
        : selected.muscatRate;

    const updated = [...formData.services];
    updated[index] = {
      ...updated[index],
      type: value,
      rate,
      unit: selected.unit,
      quantity: 1,
      margin: 30,
      amount: calculateAmount(rate, 1, 30),
    };
    setFormData({ ...formData, services: updated });
  };

  // ==============================
  // HANDLE QTY / MARGIN CHANGE
  // ==============================
  const handleServiceChange = (index, field, value) => {
    const updated = [...formData.services];
    if (field === "margin" && value < 30) value = 30;
    updated[index][field] = value;

    const { rate, quantity, margin } = updated[index];
    updated[index].amount = calculateAmount(rate, Number(quantity), Number(margin));
    setFormData({ ...formData, services: updated });
  };

  // ==============================
  // DELETE SERVICE
  // ==============================
  const handleDelete = (index) => {
    const updated = formData.services.filter((_, i) => i !== index);
    setFormData({ ...formData, services: updated });
  };

  // ==============================
  // SAVE / UPDATE COST CALCULATION
  // ==============================
  const handleSave = async () => {
    if (!formData.project || !formData.serviceTitle || !formData.locationType || !formData.city) {
      showSnackbar("Fill all project details first", "warning")
      return;
    }

    try {
      const payload = {
        _id: existingRecordId, // if exists, update
        projectId: formData.project,
        serviceTitle: formData.serviceTitle,
        locationType: formData.locationType,
        city: formData.city,
        services: formData.services,
        totalAmount: calculateTotal(),
      };

      const res = existingRecordId
        ? await updateCostCalculation(payload)
        : await createCostCalculation(payload);

      showSnackbar("Saved successfully!", "success");

      // update services with latest saved data (no refresh)
      if (res.data.data && res.data.data.services) {
        setFormData((prev) => ({ ...prev, services: res.data.data.services }));
        setExistingRecordId(res.data.data._id);
      }
    } catch (err) {
      console.error(err);
      showSnackbar("Failed to save", "error");
    }
  };

  // ==============================
  // EXPORT CSV
  // ==============================

    const handleExport = () => {
    if (!formData.services.length) return showSnackbar("No services to export", "warning");

    // ==============================
    // 1. Add Project Info at top
    // ==============================
    let csv = "";
    csv += `Project Name,${projects.find(p => p._id === formData.project)?.projectName || ""}\n`;
    csv += `Service Title,${formData.serviceTitle}\n`;
    csv += `Location Type,${formData.locationType}\n`;
    csv += `City,${formData.city}\n\n`;

    // ==============================
    // 2. Services Table Header
    // ==============================
    csv += "Service,Unit,Rate,Quantity,Margin,Amount\n";

    // ==============================
    // 3. Services Data
    // ==============================
    formData.services.forEach((item) => {
        csv += `${item.type},${item.unit},${item.rate},${item.quantity},${item.margin},${(item.amount || 0).toFixed(3)}\n`;
    });

    // ==============================
    // 4. Total
    // ==============================
    csv += `,,,,Total,${calculateTotal().toFixed(3)}\n`;

    // ==============================
    // 5. Download CSV
    // ==============================
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cost-calculation.csv";
    a.click();
    window.URL.revokeObjectURL(url);
    };

    const handlePrintPDF = () => {
    if (!formData.services.length) return showSnackbar("No services to print", "warning");

    const doc = new jsPDF();

    const organizationName = organisation; // <-- change this
    const projectName =
        projects.find(p => p._id === formData.project)?.projectName || "";

    // ==============================
    // 1️⃣ Organization Header
    // ==============================
    doc.setFontSize(18);
    doc.setFont(undefined, "bold");
    doc.text(organizationName, 105, 15, { align: "center" });

    doc.setFontSize(14);
    doc.setFont(undefined, "normal");
    doc.text("Cost Calculation Report", 105, 23, { align: "center" });

    // Divider line
    doc.line(14, 28, 196, 28);

    // ==============================
    // 2️⃣ Project Details Box (Table Style)
    // ==============================
    autoTable(doc, {
        startY: 35,
        theme: "grid",
        body: [
        ["Project Name", projectName],
        ["Service Title", formData.serviceTitle],
        ["Location Type", formData.locationType],
        ["City", formData.city],
        ],
        styles: {
        fontSize: 11,
        },
        columnStyles: {
        0: { fontStyle: "bold", cellWidth: 50 },
        1: { cellWidth: 120 },
        },
        headStyles: { fillColor: [240, 240, 240] },
    });

    // ==============================
    // 3️⃣ Services Table
    // ==============================
    const tableColumn = [
        "Service",
        "Unit",
        "Rate",
        "Quantity",
        "Margin",
        "Amount",
    ];

    const tableRows = formData.services.map(item => [
        item.type,
        item.unit,
        item.rate,
        item.quantity,
        item.margin,
        (item.amount || 0).toFixed(3),
    ]);

    // Add Total row
    tableRows.push([
        "",
        "",
        "",
        "",
        "Total",
        calculateTotal().toFixed(3),
    ]);

    autoTable(doc, {
        startY: doc.lastAutoTable.finalY + 10,
        head: [tableColumn],
        body: tableRows,
        theme: "grid",
        headStyles: {
        fillColor: [41, 128, 185], // professional blue
        textColor: 255,
        fontStyle: "bold",
        },
        styles: {
        fontSize: 10,
        },
        columnStyles: {
        5: { halign: "right" }, // amount right aligned
        },
        didParseCell: function (data) {
        // Make Total row bold
        if (data.row.index === tableRows.length - 1) {
            data.cell.styles.fontStyle = "bold";
        }
        },
    });

    doc.save("cost-calculation.pdf");
    };

  // ==============================
  // RENDER
  // ==============================
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" mb={4}>
        Cost Calculation
      </Typography>

      {/* Project Details */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" mb={2}>
          Project Details
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <TextField
              select
              fullWidth
              label="Project"
              value={formData.project}
              onChange={(e) =>
                setFormData({ ...formData, project: e.target.value })
              }
            >
              {projects.map((p) => (
                <MenuItem key={p._id} value={p._id}>
                  {p.projectName}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
            
            <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Service Title"
              value={formData.serviceTitle}
              onChange={(e) =>
                setFormData({ ...formData, serviceTitle: e.target.value })
              }
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              select
              fullWidth
              label="Location Type"
              value={formData.locationType}
              onChange={(e) =>
                setFormData({ ...formData, locationType: e.target.value })
              }
            >
              <MenuItem value="Muscat">Muscat</MenuItem>
              <MenuItem value="Outside Muscat">Outside Muscat</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="City"
              value={formData.city}
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Add Service */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Button
          variant="contained"
          onClick={handleAddService}
          disabled={!formData.project || !formData.serviceTitle || !formData.locationType}
        >
          + Add Service
        </Button>
      </Paper>

      {/* Services Table */}
      {formData.services.length > 0 && (
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" mb={2}>
            Services
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>Rate</TableCell>
                <TableCell>Unit</TableCell>
                <TableCell>Qty</TableCell>
                <TableCell>Margin (%)</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {formData.services.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <TextField
                      select
                      fullWidth
                      value={item.type}
                      onChange={(e) =>
                        handleTypeChange(index, e.target.value)
                      }
                      InputProps={role === "admin" ? { readOnly: true } : {}}
                    >
                      {servicesMaster.map((s) => (
                        <MenuItem key={s.serviceName} value={s.serviceName}>
                          {s.serviceName}
                        </MenuItem>
                      ))}
                    </TextField>
                  </TableCell>
                  <TableCell>{item.rate}</TableCell>
                  <TableCell>{item.unit}</TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      size="small"
                      value={item.quantity}
                      InputProps={role === "admin" ? { readOnly: true } : {}}
                      onChange={(e) =>
                        handleServiceChange(
                          index,
                          "quantity",
                          Number(e.target.value)
                        )
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      size="small"
                      inputProps={{ min: 30 }}
                      value={item.margin}
                      InputProps={role === "admin" ? { readOnly: true } : {}}
                      onChange={(e) =>
                        handleServiceChange(
                          index,
                          "margin",
                          Number(e.target.value)
                        )
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <strong>{(item.amount || 0).toFixed(3)}</strong>
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleDelete(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}

      {/* Summary */}
      {formData.services.length > 0 && (
        <Paper sx={{ p: 3 }}>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="h5" mb={3}>
            Total: {calculateTotal().toFixed(3)} OMR
          </Typography>
          <Grid container spacing={2}>
            <Grid item>
              <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSave} disabled={role === "admin"} >
                Save
              </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" startIcon={<PrintIcon />} onClick={handlePrintPDF}>
                Print
              </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" startIcon={<FileDownloadIcon />} onClick={handleExport}>
                Export Excel
              </Button>
            </Grid>
          </Grid>
        </Paper>
      )}

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

export default CostCalculation;
