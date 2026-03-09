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
////////////////////////////////////////////////////////////////
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
//   Snackbar,
//   Alert
// } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// import PrintIcon from "@mui/icons-material/Print";
// import SaveIcon from "@mui/icons-material/Save";
// import FileDownloadIcon from "@mui/icons-material/FileDownload";
// import { getRole, getUser } from "../../utils/auth";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";


// // Import your API functions
// import {
//   getProject,
//   getServices,
//   getCostCalculation,
//   createCostCalculation,
//   updateCostCalculation,
// } from "../../services/api";

// const CostCalculation = () => {
//   // ==============================
//   // STATE
//   // ==============================
//   const [formData, setFormData] = useState({
//     project: "",
//     serviceTitle:"",
//     locationType: "",
//     city: "",
//     services: [],
//   });
//   const [existingRecordId, setExistingRecordId] = useState(null);
//   const [projects, setProjects] = useState([]);
//   const [servicesMaster, setServicesMaster] = useState([]);
//   const showDeleted = false;
//   const role = getRole();
//   const user = getUser()
//   const organisation = user?.organisationRefId?.organisationName || "";
//   const [serviceErrors, setServiceErrors] = useState({});

//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState("");
//   const [snackbarSeverity, setSnackbarSeverity] = useState("success");
//   // Determine if user is demo / not logged in
//    console.log("role",role)
//   const isDemo = !role || role === "demo";
//     console.log("isDemo",isDemo)
//   // ==============================
//   // HELPER FUNCTION TO SHOW SNACKBAR
//   // ==============================
//   const showSnackbar = (message, severity = "success") => {
//     setSnackbarMessage(message);
//     setSnackbarSeverity(severity);
//     setSnackbarOpen(true);
//   };

//   // ==============================
//   // LOAD PROJECTS
//   // ==============================
//   useEffect(() => {
//     getProject()
//       .then((res) => setProjects(res.data.data))
//       .catch((err) => console.error(err));
//   }, []);

//   // ==============================
//   // LOAD SERVICES BASED ON LOCATION
//   // ==============================
// //   useEffect(() => {
// //     if (!formData.locationType) return;

// //     getServices(showDeleted, formData.locationType)
// //       .then((res) => setServicesMaster(res.data.data))
// //       .catch((err) => console.error(err));

// //     // If user already selected services, update rates when locationType changes
// //     setFormData((prev) => {
// //       const updatedServices = prev.services.map((s) => {
// //         const master = servicesMaster.find((m) => m.serviceName === s.type);
// //         if (master) {
// //           const rate =
// //             formData.locationType === "Outside Muscat"
// //               ? master.outsideRate
// //               : master.muscatRate;
// //           return { ...s, rate, amount: (rate * s.quantity) * (1 + s.margin / 100) };
// //         }
// //         return s;
// //       });
// //       return { ...prev, services: updatedServices };
// //     });

// //     // Reset existing record if locationType changes
// //     setExistingRecordId(null);
// //   }, [formData.locationType]);

//     useEffect(() => {
//         if (!formData.locationType) return;

//         getServices(showDeleted, formData.locationType)
//             .then((res) => setServicesMaster(res.data.data))
//             .catch((err) => console.error(err));

//         setExistingRecordId(null);
//         }, [formData.locationType, showDeleted]);

//     useEffect(() => {
//     if (!servicesMaster.length) return;

//     setFormData((prev) => {
//         const updatedServices = prev.services.map((s) => {
//         const master = servicesMaster.find(
//             (m) => m.serviceName === s.type
//         );

//         if (!master) return s;

//         const rate =
//             prev.locationType === "Outside Muscat"
//             ? master.outsideRate
//             : master.muscatRate;

//         return {
//             ...s,
//             rate,
//             amount: rate * s.quantity * (1 + s.margin / 100),
//         };
//         });

//         return { ...prev, services: updatedServices };
//     });
//     }, [servicesMaster]);

//   // ==============================
//   // LOAD EXISTING SERVICES IF PROJECT + LOCATION SELECTED
//   // ==============================
//   useEffect(() => {
//     const { project,serviceTitle, locationType } = formData;
//     if (!project || !serviceTitle || !locationType) {
//       setFormData((prev) => ({ ...prev, services: [] }));
//       setExistingRecordId(null);
//       return;
//     }

//     getCostCalculation(project,serviceTitle,locationType)
//       .then((res) => {
//         if (res.data.data && res.data.data.length) {
//           const record = res.data.data[0];
//           setExistingRecordId(record._id);
//           setFormData((prev) => ({
//             ...prev,
//             city: record.city,
//             services: record.services.map((s) => ({
//               ...s,
//               quantity: s.quantity || 1,
//               margin: s.margin || 30,
//               amount: s.amount || 0,
//             })),
//           }));
//         } else {
//           setExistingRecordId(null);
//           setFormData((prev) => ({ ...prev, services: [] }));
//         }
//       })
//       .catch((err) => console.error(err));
//   }, [formData.project,formData.serviceTitle,formData.locationType]);

//   // ==============================
//   // CALCULATION FUNCTIONS
//   // ==============================
// //   const calculateAmount = (rate, quantity, margin) => (rate * quantity) * (1 + margin / 100);
//     const calculateCost = (rate, quantity) =>
//     rate * quantity;

//     const calculateAmount = (cost, margin) =>
//     cost * (1 + margin / 100);

//     const calculateTotal = () =>
//     formData.services.reduce((sum, item) => sum + (item.amount || 0), 0);

//   // ==============================
//   // ADD SERVICE
//   // ==============================
//   const handleAddService = () => {
//     if (!formData.project ||!formData.serviceTitle || !formData.locationType) {
//       showSnackbar("Select project and service title and location first", "warning");
//       return;
//     }

//     setFormData((prev) => ({
//       ...prev,
//       services: [
//         ...prev.services,
//         // { type: "", rate: 0, unit: "", quantity: 1, margin: 30, amount: 0 },
//         { type: "", rate: 0, unit: "", quantity: 1, margin: 30, cost: 0, amount: 0 }
//       ],
//     }));
//   };

//   // ==============================
//   // HANDLE SERVICE TYPE CHANGE
//   // ==============================
// //   const handleTypeChange = (index, value) => {
// //     const selected = servicesMaster.find((s) => s.serviceName === value);
// //     if (!selected) return;

// //     const rate =
// //       formData.locationType === "Outside Muscat"
// //         ? selected.outsideRate
// //         : selected.muscatRate;

// //     const updated = [...formData.services];
// //     updated[index] = {
// //       ...updated[index],
// //       type: value,
// //       rate,
// //       unit: selected.unit,
// //       quantity: 1,
// //       margin: 30,
// //       amount: calculateAmount(rate, 1, 30),
// //     };
// //     setFormData({ ...formData, services: updated });
// //   };

//     const handleTypeChange = (index, value) => {
//     const selected = servicesMaster.find((s) => s.serviceName === value);
//     if (!selected) return;

//     const rate =
//         formData.locationType === "Outside Muscat"
//         ? selected.outsideRate
//         : selected.muscatRate;

//     const cost = calculateCost(rate, 1);
//     const amount = calculateAmount(cost, 30);

//     const updated = [...formData.services];
//     updated[index] = {
//         ...updated[index],
//         type: value,
//         rate,
//         unit: selected.unit,
//         quantity: 1,
//         margin: 30,
//         cost,
//         amount,
//     };

//     setFormData({ ...formData, services: updated });
//     };

//   // ==============================
//   // HANDLE QTY / MARGIN CHANGE
//   // ==============================
// //   const handleServiceChange = (index, field, value) => {
// //     const updated = [...formData.services];
// //     if (field === "margin" && value < 30) value = 30;
// //     updated[index][field] = value;

// //     const { rate, quantity, margin } = updated[index];
// //     updated[index].amount = calculateAmount(rate, Number(quantity), Number(margin));
// //     setFormData({ ...formData, services: updated });
// //   };

// // const handleServiceChange = (index, field, value) => {
// //   const updated = [...formData.services];

// //   // just update the value, no forced 30 here
// //   updated[index][field] = value;

// //   const qty = updated[index].quantity === "" ? 0 : Number(updated[index].quantity);
// //   const mgn = updated[index].margin === "" ? 30 : Number(updated[index].margin);
// //   const rate = updated[index].rate || 0;

// //   updated[index].amount = calculateAmount(rate, qty, mgn);

// //   setFormData({ ...formData, services: updated });
// // };

//     const handleServiceChange = (index, field, value) => {
//     const updated = [...formData.services];
//     updated[index][field] = value;

//     const qty = updated[index].quantity === "" ? 0 : Number(updated[index].quantity);
//     const mgn = updated[index].margin === "" ? 0 : Number(updated[index].margin);
//     const rate = updated[index].rate || 0;

//     const cost = calculateCost(rate, qty);
//     const amount = calculateAmount(cost, mgn);

//     updated[index].cost = cost;
//     updated[index].amount = amount;

//     setFormData({ ...formData, services: updated });

//     if (field === "margin") {
//         setServiceErrors((prev) => ({
//         ...prev,
//         [index]: {
//             ...prev[index],
//             margin: mgn < 30 ? "Margin must be at least 30" : "",
//         },
//         }));
//     }
//     };

// // const handleServiceChange = (index, field, value) => {
// //   const updated = [...formData.services];
// //   updated[index][field] = value;

// //   const qty = updated[index].quantity === "" ? 0 : Number(updated[index].quantity);
// //   const mgn = updated[index].margin === "" ? 0 : Number(updated[index].margin);
// //   const rate = updated[index].rate || 0;

// //   updated[index].amount = calculateAmount(rate, qty, mgn);

// //   setFormData({ ...formData, services: updated });

// //   // Validate margin
// //   if (field === "margin") {
// //     setServiceErrors((prev) => ({
// //       ...prev,
// //       [index]: {
// //         ...prev[index],
// //         margin: mgn < 30 ? "Margin must be at least 30" : "",
// //       },
// //     }));
// //   }
// // };

//   // ==============================
//   // DELETE SERVICE
//   // ==============================
//   const handleDelete = (index) => {
//     const updated = formData.services.filter((_, i) => i !== index);
//     setFormData({ ...formData, services: updated });
//   };

//   // ==============================
//   // SAVE / UPDATE COST CALCULATION
//   // ==============================
//   const handleSave = async () => {
//     if (!formData.project || !formData.serviceTitle || !formData.locationType || !formData.city) {
//       showSnackbar("Fill all project details first", "warning")
//       return;
//     }

//     try {
//       const payload = {
//         _id: existingRecordId, // if exists, update
//         projectId: formData.project,
//         serviceTitle: formData.serviceTitle,
//         locationType: formData.locationType,
//         city: formData.city,
//         services: formData.services,
//         totalAmount: calculateTotal(),
//       };

//       const res = existingRecordId
//         ? await updateCostCalculation(payload)
//         : await createCostCalculation(payload);

//       showSnackbar("Saved successfully!", "success");

//       // update services with latest saved data (no refresh)
//       if (res.data.data && res.data.data.services) {
//         setFormData((prev) => ({ ...prev, services: res.data.data.services }));
//         setExistingRecordId(res.data.data._id);
//       }
//     } catch (err) {
//       console.error(err);
//       showSnackbar("Failed to save", "error");
//     }
//   };

//   // ==============================
//   // EXPORT CSV
//   // ==============================

//     const handleExport = () => {
//     if (!formData.services.length) return showSnackbar("No services to export", "warning");

//     // ==============================
//     // 1. Add Project Info at top
//     // ==============================
//     let csv = "";
//     csv += `Project Name,${projects.find(p => p._id === formData.project)?.projectName || ""}\n`;
//     csv += `Service Title,${formData.serviceTitle}\n`;
//     csv += `Location Type,${formData.locationType}\n`;
//     csv += `City,${formData.city}\n\n`;

//     // ==============================
//     // 2. Services Table Header
//     // ==============================
//     csv += "Service,Unit,Rate,Quantity,Margin,Amount\n";

//     // ==============================
//     // 3. Services Data
//     // ==============================
//     formData.services.forEach((item) => {
//         csv += `${item.type},${item.unit},${item.rate},${item.quantity},${item.margin},${(item.amount || 0).toFixed(3)}\n`;
//     });

//     // ==============================
//     // 4. Total
//     // ==============================
//     csv += `,,,,Total,${calculateTotal().toFixed(3)}\n`;

//     // ==============================
//     // 5. Download CSV
//     // ==============================
//     const blob = new Blob([csv], { type: "text/csv" });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "cost-calculation.csv";
//     a.click();
//     window.URL.revokeObjectURL(url);
//     };

//     const handlePrintPDF = () => {
//     if (!formData.services.length) return showSnackbar("No services to print", "warning");

//     const doc = new jsPDF();

//     const organizationName = organisation; // <-- change this
//     const projectName =
//         projects.find(p => p._id === formData.project)?.projectName || "";

//     // ==============================
//     // 1️⃣ Organization Header
//     // ==============================
//     doc.setFontSize(18);
//     doc.setFont(undefined, "bold");
//     doc.text(organizationName, 105, 15, { align: "center" });

//     doc.setFontSize(14);
//     doc.setFont(undefined, "normal");
//     doc.text("Cost Calculation Report", 105, 23, { align: "center" });

//     // Divider line
//     doc.line(14, 28, 196, 28);

//     // ==============================
//     // 2️⃣ Project Details Box (Table Style)
//     // ==============================
//     autoTable(doc, {
//         startY: 35,
//         theme: "grid",
//         body: [
//         ["Project Name", projectName],
//         ["Service Title", formData.serviceTitle],
//         ["Location Type", formData.locationType],
//         ["City", formData.city],
//         ],
//         styles: {
//         fontSize: 11,
//         },
//         columnStyles: {
//         0: { fontStyle: "bold", cellWidth: 50 },
//         1: { cellWidth: 120 },
//         },
//         headStyles: { fillColor: [240, 240, 240] },
//     });

//     // ==============================
//     // 3️⃣ Services Table
//     // ==============================
//     const tableColumn = [
//         "Service",
//         "Unit",
//         "Rate",
//         "Quantity",
//         "Margin",
//         "Amount",
//     ];

//     const tableRows = formData.services.map(item => [
//         item.type,
//         item.unit,
//         item.rate,
//         item.quantity,
//         item.margin,
//         (item.amount || 0).toFixed(3),
//     ]);

//     // Add Total row
//     tableRows.push([
//         "",
//         "",
//         "",
//         "",
//         "Total",
//         calculateTotal().toFixed(3),
//     ]);

//     autoTable(doc, {
//         startY: doc.lastAutoTable.finalY + 10,
//         head: [tableColumn],
//         body: tableRows,
//         theme: "grid",
//         headStyles: {
//         fillColor: [41, 128, 185], // professional blue
//         textColor: 255,
//         fontStyle: "bold",
//         },
//         styles: {
//         fontSize: 10,
//         },
//         columnStyles: {
//         5: { halign: "right" }, // amount right aligned
//         },
//         didParseCell: function (data) {
//         // Make Total row bold
//         if (data.row.index === tableRows.length - 1) {
//             data.cell.styles.fontStyle = "bold";
//         }
//         },
//     });

//     doc.save("cost-calculation.pdf");
//     };

//   // ==============================
//   // RENDER
//   // ==============================
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
//           {/* <Grid item xs={12} md={4}> */}
//             {/* <TextField
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
//             </TextField> */}

//             {/* <TextField
//                 select
//                 fullWidth
//                 label="Project"
//                 value={formData.project}
//                 onChange={(e) =>
//                     setFormData({ ...formData, project: e.target.value })
//                 }
//                 InputLabelProps={{ shrink: true }}
//                 SelectProps={{
//                     displayEmpty: true,
//                 }}
//                 sx={{
//                     "& .MuiSelect-select": {
//                     padding: "16.5px 14px", // makes it look like normal textfield
//                     },
//                 }}
//             >
//                 <MenuItem value="">
//                     <em>Select Project</em>
//                 </MenuItem>
                
//                 {projects.map((p) => (
//                     // console.log(projects)
//                     <MenuItem key={p._id} value={p._id}>
//                     {p.projectName}
//                     </MenuItem>
//                 ))}
//             </TextField>
//           </Grid> */}

//           <Grid item xs={12} md={4}>
//             {isDemo ? (
//                 <TextField
//                 fullWidth
//                 label="Project"
//                 value={formData.project}
//                 onChange={(e) =>
//                     setFormData({ ...formData, project: e.target.value })
//                 }
//                 />
//             ) : (
//                 <TextField
//                 select
//                 fullWidth
//                 label="Project"
//                 value={formData.project}
//                 onChange={(e) =>
//                     setFormData({ ...formData, project: e.target.value })
//                 }
//                 InputLabelProps={{ shrink: true }}
//                 SelectProps={{ displayEmpty: true }}
//                 sx={{
//                     "& .MuiSelect-select": { padding: "16.5px 14px" },
//                 }}
//                 >
//                 <MenuItem value="">
//                     <em>Select Project</em>
//                 </MenuItem>
//                 {projects.map((p) => (
//                     <MenuItem key={p._id} value={p._id}>
//                     {p.projectName}
//                     </MenuItem>
//                 ))}
//                 </TextField>
//             )}
//         </Grid>
            
//             <Grid item xs={12} md={4}>
//             <TextField
//               fullWidth
//               label="Service Title"
//               value={formData.serviceTitle}
//               onChange={(e) =>
//                 setFormData({ ...formData, serviceTitle: e.target.value })
//               }
//             />
//           </Grid>

//           <Grid item xs={12} md={4}>
//             {/* <TextField
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
//             </TextField> */}

//             <TextField
//                 select
//                 fullWidth
//                 label="Location Type"
//                 value={formData.locationType}
//                 onChange={(e) =>
//                     setFormData({ ...formData, locationType: e.target.value })
//                 }
//                 InputLabelProps={{ shrink: true }}   // 👈 add it here
//                 SelectProps={{
//                     displayEmpty: true,
//                 }}
//                 sx={{
//                     "& .MuiSelect-select": {
//                     padding: "16.5px 14px",
//                     },
//                 }}
//             >
//             <MenuItem value="">
//                 <em>Select Location Type</em>
//             </MenuItem>

//             <MenuItem value="Muscat">Muscat</MenuItem>
//             <MenuItem value="Outside Muscat">Outside Muscat</MenuItem>
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
//           disabled={!formData.project || !formData.serviceTitle || !formData.locationType}
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
//                 <TableCell>Cost</TableCell>
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
//                     //    InputProps={role === "admin" ? { readOnly: true } : {}}
//                        InputLabelProps={{ shrink: true }}   // 👈 add it here
//                        SelectProps={{
//                             displayEmpty: true,
//                         }}
//                         sx={{
//                             "& .MuiSelect-select": {
//                             padding: "16.5px 14px",
//                             },
//                         }}
//                     >
//                     <MenuItem value="">
//                         <em>Select Service Type</em>
//                     </MenuItem>
                    
//                       {servicesMaster.map((s) => (
//                         <MenuItem key={s.serviceName} value={s.serviceName}>
//                           {s.serviceName}
//                         </MenuItem>
//                       ))}
//                     </TextField>
//                   </TableCell>
//                   <TableCell>{item.rate}</TableCell>
//                   <TableCell>{item.unit}</TableCell>
//                   <TableCell>
//                     {/* <TextField
//                       type="number"
//                       size="small"
//                       value={item.quantity}
//                       InputProps={role === "admin" ? { readOnly: true } : {}}
//                       onChange={(e) =>
//                         handleServiceChange(
//                           index,
//                           "quantity",
//                           Number(e.target.value)
//                         )
//                       }
//                     /> */}

//                     <TextField
//                         type="number"
//                         size="small"
//                         value={item.quantity}
//                         // InputProps={role === "admin" ? { readOnly: true } : {}}
//                         inputProps={{
//                             inputMode: "numeric",
//                             pattern: "[0-9]*",
//                         }}
//                         sx={{
//                             "& input[type=number]::-webkit-outer-spin-button": {
//                             WebkitAppearance: "none",
//                             margin: 0,
//                             },
//                             "& input[type=number]::-webkit-inner-spin-button": {
//                             WebkitAppearance: "none",
//                             margin: 0,
//                             },
//                             "& input[type=number]": {
//                             MozAppearance: "textfield",
//                             },
//                         }}
//                         onChange={(e) =>
//                             handleServiceChange(
//                             index,
//                             "quantity",
//                             e.target.value // <-- pass value as string, not Number()
//                             )
//                         }
//                         />


//                   </TableCell>
//                   <TableCell>
//                     <strong>{(item.cost || 0).toFixed(3)}</strong>
//                   </TableCell>
//                   <TableCell>
//                     <TextField
//                     // type="number"
//                     // size="small"
//                     // value={item.margin}
//                     // inputProps={{
//                     //     inputMode: "numeric",
//                     //     pattern: "[0-9]*",
//                     //     min: 0, // temporarily allow typing below 30
//                     // }}
//                     // InputProps={role === "admin" ? { readOnly: true } : {}}
//                     // sx={{
//                     //     "& input[type=number]::-webkit-outer-spin-button": { WebkitAppearance: "none", margin: 0 },
//                     //     "& input[type=number]::-webkit-inner-spin-button": { WebkitAppearance: "none", margin: 0 },
//                     //     "& input[type=number]": { MozAppearance: "textfield" },
//                     // }}
//                     // onChange={(e) =>
//                     //     handleServiceChange(index, "margin", e.target.value)
//                     // }
//                     // onBlur={(e) => {
//                     //     // enforce minimum 30 when user leaves the field
//                     //     if (!e.target.value || Number(e.target.value) < 30) {
//                     //     handleServiceChange(index, "margin", 30);
//                     //     }
//                     // }}
//                         type="number"
//                         size="small"
//                         value={item.margin}
//                         inputProps={{
//                             inputMode: "numeric",
//                             pattern: "[0-9]*",
//                             min: 0,
//                         }}
//                         // InputProps={role === "admin" ? { readOnly: true } : {}}
//                         error={!!serviceErrors[index]?.margin}   // show red outline
//                         helperText={serviceErrors[index]?.margin || ""}
//                         sx={{
//                             "& input[type=number]::-webkit-outer-spin-button": { WebkitAppearance: "none", margin: 0 },
//                             "& input[type=number]::-webkit-inner-spin-button": { WebkitAppearance: "none", margin: 0 },
//                             "& input[type=number]": { MozAppearance: "textfield" },
//                         }}
//                         onChange={(e) =>
//                             handleServiceChange(index, "margin", e.target.value)
//                         }
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
//               {/* <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSave} >
//                 Save
//               </Button> */}
//               <Button
//                     variant="contained"
//                     startIcon={<SaveIcon />}
//                     onClick={handleSave}
//                     disabled={isDemo}
//                     >
//                     Save
//               </Button>
//             </Grid>
//             <Grid item>
//               <Button variant="outlined" startIcon={<PrintIcon />} onClick={handlePrintPDF}>
//                 Print
//               </Button>
//             </Grid>
//             <Grid item>
//               <Button variant="outlined" startIcon={<FileDownloadIcon />} onClick={handleExport}>
//                 Export Excel
//               </Button>
//             </Grid>
//           </Grid>
//         </Paper>
//       )}

//       <Snackbar
//             open={snackbarOpen}
//             autoHideDuration={3000}
//             onClose={() => setSnackbarOpen(false)}
//             anchorOrigin={{ vertical: "top", horizontal: "center" }}
//             >
//             <Alert
//                 onClose={() => setSnackbarOpen(false)}
//                 severity={snackbarSeverity}
//                 sx={{ width: "100%" }}
//             >
//                 {snackbarMessage}
//             </Alert>
//         </Snackbar>
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
//   Divider,
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
  createCostCalculation,
  getCostCalculation,
  updateCostCalculation,
} from "../../services/api";

const CostCalculation = () => {
  // ==============================
  // STATE
  // ==============================
  const [formData, setFormData] = useState({
    project: "",
    serviceTitle: "",
    locationType: "",
    city: "",
    services: [],
  });
  const [existingRecordId, setExistingRecordId] = useState(null);
  const [projects, setProjects] = useState([]);
  const [servicesMaster, setServicesMaster] = useState([]);
  const showDeleted = false;

  const role = getRole();
  const user = getUser();
  const organisation = user?.organisationRefId?.organisationName || "";
  const [serviceErrors, setServiceErrors] = useState({});

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const isDemo = !role || role === "demo";

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
        const master = servicesMaster.find((m) => m.serviceName === s.type);
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
    const { project, serviceTitle, locationType } = formData;

    if (!project || !serviceTitle || !locationType) {
      setFormData((prev) => ({ ...prev, services: [] }));
      setExistingRecordId(null);
      return;
    }

    if (isDemo) {
      // Demo users don't fetch existing services
      setFormData((prev) => ({ ...prev, services: [] }));
      setExistingRecordId(null);
      return;
    }

    // Normal users fetch cost calculation
    getCostCalculation(project, serviceTitle, locationType)
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
  }, [formData.project, formData.serviceTitle, formData.locationType, isDemo]);

  // ==============================
  // CALCULATION FUNCTIONS
  // ==============================
  const calculateCost = (rate, quantity) => rate * quantity;
  const calculateAmount = (cost, margin) => cost * (1 + margin / 100);
  const calculateTotal = () =>formData.services.reduce((sum, item) => sum + (item.amount || 0), 0);
  const calculateTotalCost = () =>formData.services.reduce((sum, item) => sum + (item.cost || 0), 0);
  const calculateTotalMargin = () => calculateTotal() - calculateTotalCost();

  // ==============================
  // ADD SERVICE
  // ==============================
  const handleAddService = () => {
    if (!formData.project || !formData.serviceTitle || !formData.locationType) {
      showSnackbar("Select project and service title and location first", "warning");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      services: [
        ...prev.services,
        { type: "", rate: 0, unit: "", quantity: 1, margin: 30, cost: 0, amount: 0 }
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

    const cost = calculateCost(rate, 1);
    const amount = calculateAmount(cost, 30);

    const updated = [...formData.services];
    updated[index] = {
      ...updated[index],
      type: value,
      rate,
      unit: selected.unit,
      quantity: 1,
      margin: 30,
      cost,
      amount,
    };

    setFormData({ ...formData, services: updated });
  };

  // ==============================
  // HANDLE QTY / MARGIN CHANGE
  // ==============================
  const handleServiceChange = (index, field, value) => {
    const updated = [...formData.services];
    updated[index][field] = value;

    const qty = updated[index].quantity === "" ? 0 : Number(updated[index].quantity);
    const mgn = updated[index].margin === "" ? 0 : Number(updated[index].margin);
    const rate = updated[index].rate || 0;

    const cost = calculateCost(rate, qty);
    const amount = calculateAmount(cost, mgn);

    updated[index].cost = cost;
    updated[index].amount = amount;

    setFormData({ ...formData, services: updated });

    if (field === "margin") {
      setServiceErrors((prev) => ({
        ...prev,
        [index]: {
          ...prev[index],
          margin: mgn < 30 ? "Margin must be at least 30" : "",
        },
      }));
    }
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
      showSnackbar("Fill all project details first", "warning");
      return;
    }

    try {
      const payload = {
        _id: existingRecordId,
        projectId: formData.project,
        serviceTitle: formData.serviceTitle,
        locationType: formData.locationType,
        city: formData.city,
        services: formData.services,
        totalAmount: calculateTotal(),
        totalCost:calculateTotalCost(),
        totalMargin:calculateTotalMargin()
      };

      const res = existingRecordId
        ? await updateCostCalculation(payload)
        : await createCostCalculation(payload);

      showSnackbar("Saved successfully!", "success");

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

    let csv = "";
    csv += `Project Name,${projects.find(p => p._id === formData.project)?.projectName || ""}\n`;
    csv += `Service Title,${formData.serviceTitle}\n`;
    csv += `Location Type,${formData.locationType}\n`;
    csv += `City,${formData.city}\n\n`;

    csv += "Service,Unit,Rate,Quantity,Margin,Amount\n";

    formData.services.forEach((item) => {
      csv += `${item.type},${item.unit},${item.rate},${item.quantity},${item.margin},${(item.amount || 0).toFixed(3)}\n`;
    });

    // csv += `,,,,Total,${calculateTotal().toFixed(3)}\n`;
    csv += `,,,,Total Cost,${calculateTotalCost().toFixed(3)}\n`;
    csv += `,,,,Total Margin,${calculateTotalMargin().toFixed(3)}\n`;
    csv += `,,,,Total Amount,${calculateTotal().toFixed(3)}\n`;

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cost-calculation.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // ==============================
  // PRINT PDF
  // ==============================
  const handlePrintPDF = () => {
    if (!formData.services.length) return showSnackbar("No services to print", "warning");

    const doc = new jsPDF();

    const organizationName = organisation;
    const projectName = projects.find(p => p._id === formData.project)?.projectName || "";

    doc.setFontSize(18);
    doc.setFont(undefined, "bold");
    doc.text(organizationName, 105, 15, { align: "center" });

    doc.setFontSize(14);
    doc.setFont(undefined, "normal");
    doc.text("Cost Calculation Report", 105, 23, { align: "center" });

    doc.line(14, 28, 196, 28);

    autoTable(doc, {
      startY: 35,
      theme: "grid",
      body: [
        ["Project Name", projectName],
        ["Service Title", formData.serviceTitle],
        ["Location Type", formData.locationType],
        ["City", formData.city],
      ],
      styles: { fontSize: 11 },
      columnStyles: { 0: { fontStyle: "bold", cellWidth: 50 }, 1: { cellWidth: 120 } },
      headStyles: { fillColor: [240, 240, 240] },
    });

    const tableColumn = ["Service", "Unit", "Rate", "Quantity", "Margin", "Amount"];
    const tableRows = formData.services.map(item => [
      item.type, item.unit, item.rate, item.quantity, item.margin, (item.amount || 0).toFixed(3)
    ]);

    // tableRows.push(["", "", "", "", "Total", calculateTotal().toFixed(3)]);
    tableRows.push(
        ["", "", "", "", "Total Cost", calculateTotalCost().toFixed(3)],
        ["", "", "", "", "Total Margin", calculateTotalMargin().toFixed(3)],
        ["", "", "", "", "Total Amount", calculateTotal().toFixed(3)]
    );

    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 10,
      head: [tableColumn],
      body: tableRows,
      theme: "grid",
      headStyles: { fillColor: [41, 128, 185], textColor: 255, fontStyle: "bold" },
      styles: { fontSize: 10 },
      columnStyles: { 5: { halign: "right" } },
      didParseCell: (data) => {
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
//   return (
//     <Box sx={{ p: 4 }}>
//       {isDemo && (
//         <Button variant="contained" sx={{ mb: 3,backgroundColor: "#1976D2", "&:hover": { backgroundColor: "#115293" }}} onClick={() => window.history.back()}>
//           Back
//         </Button>
//       )}

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
//             {isDemo ? (
//               <TextField
//                 fullWidth
//                 label="Project"
//                 value={formData.project}
//                 onChange={(e) => setFormData({ ...formData, project: e.target.value })}
//               />
//             ) : (
//               <TextField
//                 select
//                 fullWidth
//                 label="Project"
//                 value={formData.project}
//                 onChange={(e) => setFormData({ ...formData, project: e.target.value })}
//                 InputLabelProps={{ shrink: true }}
//                 SelectProps={{ displayEmpty: true }}
//                 sx={{ "& .MuiSelect-select": { padding: "16.5px 14px" } }}
//               >
//                 <MenuItem value="">
//                   <em>Select Project</em>
//                 </MenuItem>
//                 {projects.map((p) => (
//                   <MenuItem key={p._id} value={p._id}>
//                     {p.projectName}
//                   </MenuItem>
//                 ))}
//               </TextField>
//             )}
//           </Grid>

//           <Grid item xs={12} md={4}>
//             <TextField
//               fullWidth
//               label="Service Title"
//               value={formData.serviceTitle}
//               onChange={(e) => setFormData({ ...formData, serviceTitle: e.target.value })}
//             />
//           </Grid>

//           <Grid item xs={12} md={4}>
//             <TextField
//               select
//               fullWidth
//               label="Location Type"
//               value={formData.locationType}
//               onChange={(e) => setFormData({ ...formData, locationType: e.target.value })}
//               InputLabelProps={{ shrink: true }}
//               SelectProps={{ displayEmpty: true }}
//               sx={{ "& .MuiSelect-select": { padding: "16.5px 14px" } }}
//             >
//               <MenuItem value="">
//                 <em>Select Location Type</em>
//               </MenuItem>
//               <MenuItem value="Muscat">Muscat</MenuItem>
//               <MenuItem value="Outside Muscat">Outside Muscat</MenuItem>
//             </TextField>
//           </Grid>

//           <Grid item xs={12} md={4}>
//             <TextField
//               fullWidth
//               label="City"
//               value={formData.city}
//               onChange={(e) => setFormData({ ...formData, city: e.target.value })}
//             />
//           </Grid>
//         </Grid>
//       </Paper>

//       {/* Add Service */}
//       <Paper sx={{ p: 3, mb: 4 }}>
//         <Button
//           variant="contained"
//           onClick={handleAddService}
//           disabled={!formData.project || !formData.serviceTitle || !formData.locationType}
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
//                 <TableCell>Cost</TableCell>
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
//                       onChange={(e) => handleTypeChange(index, e.target.value)}
//                       InputLabelProps={{ shrink: true }}
//                       SelectProps={{ displayEmpty: true }}
//                       sx={{ "& .MuiSelect-select": { padding: "16.5px 14px" } }}
//                     >
//                       <MenuItem value="">
//                         <em>Select Service Type</em>
//                       </MenuItem>
//                       {servicesMaster.map((s) => (
//                         <MenuItem key={s.serviceName} value={s.serviceName}>
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
//                       value={item.quantity}
//                       inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
//                       sx={{
//                         "& input[type=number]::-webkit-outer-spin-button": { WebkitAppearance: "none", margin: 0 },
//                         "& input[type=number]::-webkit-inner-spin-button": { WebkitAppearance: "none", margin: 0 },
//                         "& input[type=number]": { MozAppearance: "textfield" },
//                       }}
//                       onChange={(e) => handleServiceChange(index, "quantity", e.target.value)}
//                     />
//                   </TableCell>
//                   <TableCell><strong>{(item.cost || 0).toFixed(3)}</strong></TableCell>
//                   <TableCell>
//                     <TextField
//                       type="number"
//                       size="small"
//                       value={item.margin}
//                       inputProps={{ min: 30 }}
//                       onChange={(e) => handleServiceChange(index, "margin", e.target.value)}
//                       error={!!serviceErrors[index]?.margin}
//                       helperText={serviceErrors[index]?.margin || ""}
//                     />
//                   </TableCell>
//                   <TableCell><strong>{(item.amount || 0).toFixed(3)}</strong></TableCell>
//                   <TableCell>
//                     <IconButton onClick={() => handleDelete(index)}>
//                       <DeleteIcon />
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>

//           <Divider sx={{ my: 2 }} />
//           {/* <Typography variant="subtitle1" sx={{ textAlign: "right", mr: 2 }}>
//             Total: {calculateTotal().toFixed(3)}
//           </Typography> */}
//           <Box
//             sx={{
//                 mt: 2,
//                 display: "flex",
//                 justifyContent: "flex-end",
//             }}
//             >
//             <Typography
//                 variant="subtitle1"
//                 sx={{
//                 fontWeight: 600,
//                 display: "flex",
//                 gap: 4,
//                 flexWrap: "wrap",
//                 }}
//             >
//                 <span>
//                 Total Cost: {calculateTotalCost().toFixed(3)}
//                 </span>

//                 <span>
//                 Total Margin: {calculateTotalMargin().toFixed(3)}
//                 </span>

//                 <span>
//                 Total Amount: {calculateTotal().toFixed(3)}
//                 </span>
//             </Typography>
//          </Box>

//           <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
//             <Button
//               variant="contained"
//               startIcon={<SaveIcon />}
//               onClick={handleSave}
//               disabled={isDemo}
//             >
//               Save
//             </Button>
//             <Button
//               variant="outlined"
//               startIcon={<FileDownloadIcon />}
//               onClick={handleExport}
//             >
//               Export CSV
//             </Button>
//             <Button
//               variant="outlined"
//               startIcon={<PrintIcon />}
//               onClick={handlePrintPDF}
//             >
//               Print PDF
//             </Button>
//           </Box>
//         </Paper>
//       )}

//         <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={2500}
//         onClose={() => setSnackbarOpen(false)}
//         anchorOrigin={{ vertical: "top", horizontal: "center" }}
//         >
//         <Alert
//             severity={snackbarSeverity}
//             onClose={() => setSnackbarOpen(false)}
//             sx={{
//             fontSize: "16px",
//             fontWeight: 600,
//             px: 4,
//             py: 1.5,
//             boxShadow: 6,
//             minWidth: "300px",
//             justifyContent: "center",
//             }}
//         >
//             {snackbarMessage}
//         </Alert>
//         </Snackbar>
//       {/* <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={3000}
//         onClose={() => setSnackbarOpen(false)}
//         anchorOrigin={{ vertical: "top", horizontal: "right" }}
//       >
//         <Alert severity={snackbarSeverity} onClose={() => setSnackbarOpen(false)}>
//           {snackbarMessage}
//         </Alert>
//       </Snackbar> */}
//     </Box>
//   );
  return (
    <Box sx={{ p: { xs: 2, md: 4 }, backgroundColor: "#f5f7fa", minHeight: "100vh" }}>
      {/* Back Button for Demo */}
      {isDemo && (
        <Button
          variant="contained"
          sx={{
            mb: 3,
            background: "linear-gradient(90deg, #4facfe, #00f2fe)",
            color: "#fff",
            "&:hover": { background: "linear-gradient(90deg, #00c6ff, #0072ff)" },
            boxShadow: 3,
          }}
          onClick={() => window.history.back()}
        >
          Back
        </Button>
      )}

      <Typography variant="h4" mb={4} sx={{ fontWeight: "bold", color: "#344767" }}>
        Cost Calculation
      </Typography>

      {/* Project Details */}
      <Paper sx={{ p: 3, mb: 4, borderRadius: 3, boxShadow: 3, backgroundColor: "#ffffff" }}>
        <Typography variant="h6" mb={2} sx={{ color: "#1976D2", fontWeight: 600 }}>
          Project Details
        </Typography>
        <Grid container spacing={3}>
          {/* Project */}
          <Grid item xs={12} md={4}>
            {isDemo ? (
              <TextField
                fullWidth
                label="Project"
                value={formData.project}
                onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                sx={{ "& .MuiInputBase-root": { backgroundColor: "#f0f3ff" } }}
              />
            ) : (
              <TextField
                select
                fullWidth
                label="Project"
                value={formData.project}
                onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                InputLabelProps={{ shrink: true }}
                SelectProps={{ displayEmpty: true }}
                sx={{
                  "& .MuiSelect-select": { padding: "16.5px 14px" },
                  "& .MuiInputBase-root": { backgroundColor: "#f0f3ff" },
                }}
              >
                <MenuItem value="">
                  <em>Select Project</em>
                </MenuItem>
                {projects.map((p) => (
                  <MenuItem key={p._id} value={p._id}>
                    {p.projectName}
                  </MenuItem>
                ))}
              </TextField>
            )}
          </Grid>

          {/* Service Title */}
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Service Title"
              value={formData.serviceTitle}
              onChange={(e) => setFormData({ ...formData, serviceTitle: e.target.value })}
              sx={{ "& .MuiInputBase-root": { backgroundColor: "#f0f3ff" } }}
            />
          </Grid>

          {/* Location Type */}
          <Grid item xs={12} md={4}>
            <TextField
              select
              fullWidth
              label="Location Type"
              value={formData.locationType}
              onChange={(e) => setFormData({ ...formData, locationType: e.target.value })}
              InputLabelProps={{ shrink: true }}
              SelectProps={{ displayEmpty: true }}
              sx={{
                "& .MuiSelect-select": { padding: "16.5px 14px" },
                "& .MuiInputBase-root": { backgroundColor: "#f0f3ff" },
              }}
            >
              <MenuItem value="">
                <em>Select Location Type</em>
              </MenuItem>
              <MenuItem value="Muscat">Muscat</MenuItem>
              <MenuItem value="Outside Muscat">Outside Muscat</MenuItem>
            </TextField>
          </Grid>

          {/* City */}
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="City"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              sx={{ "& .MuiInputBase-root": { backgroundColor: "#f0f3ff" } }}
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Add Service */}
      <Paper sx={{ p: 3, mb: 4, borderRadius: 3, boxShadow: 3, backgroundColor: "#ffffff" }}>
        <Button
            variant="contained"
            onClick={handleAddService}
            disabled={!formData.project || !formData.serviceTitle || !formData.locationType}
            sx={{
                background: "linear-gradient(90deg, #6ba6ff, #4a8cff)",
                color: "#fff",
                "&:hover": { background: "linear-gradient(90deg, #5a95ff, #3b7fe6)" },
                boxShadow: 3,
            }}
            >
            + Add Service
        </Button>
      </Paper>

      {/* Services Table */}
      {formData.services.length > 0 && (
        <Paper sx={{ p: 3, mb: 4, borderRadius: 3, boxShadow: 3, backgroundColor: "#ffffff" }}>
          <Typography variant="h6" mb={2} sx={{ color: "#1976D2", fontWeight: 600 }}>
            Services
          </Typography>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#e8f0fe" }}>
                <TableCell>Type</TableCell>
                <TableCell>Rate</TableCell>
                <TableCell>Unit</TableCell>
                <TableCell>Qty</TableCell>
                <TableCell>Cost</TableCell>
                <TableCell>Margin (%)</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {formData.services.map((item, index) => (
                <TableRow key={index} hover>
                  <TableCell>
                    <TextField
                      select
                      fullWidth
                      value={item.type}
                      onChange={(e) => handleTypeChange(index, e.target.value)}
                      InputLabelProps={{ shrink: true }}
                      SelectProps={{ displayEmpty: true }}
                      sx={{ "& .MuiSelect-select": { padding: "14px 12px" }, backgroundColor: "#f7f9fc" }}
                    >
                      <MenuItem value="">
                        <em>Select Service Type</em>
                      </MenuItem>
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
                      inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                      sx={{
                        width: 80,
                        "& input[type=number]::-webkit-outer-spin-button": { WebkitAppearance: "none", margin: 0 },
                        "& input[type=number]::-webkit-inner-spin-button": { WebkitAppearance: "none", margin: 0 },
                        "& input[type=number]": { MozAppearance: "textfield" },
                        backgroundColor: "#f7f9fc",
                      }}
                      onChange={(e) => handleServiceChange(index, "quantity", e.target.value)}
                    />
                  </TableCell>
                  <TableCell><strong>{(item.cost || 0).toFixed(3)}</strong></TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      size="small"
                      value={item.margin}
                      inputProps={{ min: 30 }}
                      onChange={(e) => handleServiceChange(index, "margin", e.target.value)}
                      error={!!serviceErrors[index]?.margin}
                      helperText={serviceErrors[index]?.margin || ""}
                      sx={{ width: 80, backgroundColor: "#f7f9fc" }}
                    />
                  </TableCell>
                  <TableCell><strong>{(item.amount || 0).toFixed(3)}</strong></TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleDelete(index)} sx={{ color: "#e74c3c" }}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Totals */}
          <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end", flexWrap: "wrap", gap: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#344767" }}>
              Total Cost: <strong>{calculateTotalCost().toFixed(3)}</strong>
            </Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#344767" }}>
              Total Margin: <strong>{calculateTotalMargin().toFixed(3)}</strong>
            </Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#344767" }}>
              Total Amount: <strong>{calculateTotal().toFixed(3)}</strong>
            </Typography>
          </Box>

          {/* Action Buttons */}
          <Box sx={{ mt: 3, display: "flex", gap: 2, flexWrap: "wrap" }}>
            {/* <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleSave}
              disabled={isDemo}
              sx={{
                background: "linear-gradient(90deg, #8996d0ff, #764ba2)",
                "&:hover": { background: "linear-gradient(90deg, #5a67d8, #6b46c1)" },
              }}
            >
              Save
            </Button> */}
            <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSave}
                disabled={isDemo}
                sx={{
                    background: "linear-gradient(90deg, #8996d0, #764ba2)",
                    color: "#fff",
                    "&:hover": {
                    background: "linear-gradient(90deg, #5a67d8, #6b46c1)",
                    },
                    "&.Mui-disabled": {
                    background: "linear-gradient(90deg, #d1d1d1, #b5b5b5)",
                    color: "#888",
                    },
                }}
                >
                Save
            </Button>
            <Button
              variant="outlined"
              startIcon={<FileDownloadIcon />}
              onClick={handleExport}
              sx={{ borderColor: "#43e97b", color: "#43e97b", "&:hover": { backgroundColor: "#e6f7f1" } }}
            >
              Export CSV
            </Button>
            <Button
              variant="outlined"
              startIcon={<PrintIcon />}
              onClick={handlePrintPDF}
              sx={{ borderColor: "#38a1db", color: "#38a1db", "&:hover": { backgroundColor: "#e3f2fb" } }}
            >
              Print PDF
            </Button>
          </Box>
        </Paper>
      )}

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2500}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity={snackbarSeverity}
          onClose={() => setSnackbarOpen(false)}
          sx={{
            fontSize: "16px",
            fontWeight: 600,
            px: 4,
            py: 1.5,
            boxShadow: 6,
            minWidth: "300px",
            justifyContent: "center",
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CostCalculation;