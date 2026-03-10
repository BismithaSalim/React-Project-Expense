// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   Tabs,
//   Tab,
//   Paper,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Button,
//   IconButton,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   TextField,
//   Checkbox,
//   FormControlLabel,
//   FormGroup,
//   Grid,
//   Snackbar,
//   Alert,
//   Collapse
// } from "@mui/material";
// import { Edit as EditIcon, Check as CheckIcon, Close as CloseIcon, KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
// import { getRole, getUser } from "../../utils/auth";
// import {
//   getUserExpense,
//   addUserExpense,
//   updateUserExpense,
//   approveExpense,
//   rejectExpense
// } from "../../services/api";

// const expenseCategories = [
//   "Fuel",
//   "Food",
//   "Transportation",
//   "Fixed Asset",
//   "Project Purchase",
//   "Office Logistics",
//   "Sanad",
//   "Sales",
//   "Marketing",
//   "Client Entertainment",
//   "Others"
// ];

// const ExpenseClaimPage = () => {
//   const role = getRole();
//   const user = getUser();
//   const userId = user._id;

//   const [tab, setTab] = useState(0);
//   const [expenses, setExpenses] = useState([]);
//   const [openForm, setOpenForm] = useState(false);
//   const [editingExpense, setEditingExpense] = useState(null);
//   const [openRows, setOpenRows] = useState({});
//   const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

//   const [formData, setFormData] = useState({
//     employeeName: "",
//     date: "",
//     expenseCategory: [],
//     otherCategory: "",
//     projectDetails: { clientName: "", projectName: "" },
//     expenseDetails: [{ description: "", amount: "", receiptAttached: false, remarks: "" }]
//   });

//   // Fetch expenses
//   const fetchExpenses = async () => {
//     try {
//       const res = await getUserExpense({ userId: role === "admin" ? undefined : userId });
//       setExpenses(res.data?.data || []);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchExpenses();
//   }, []);

//   const handleTabChange = (e, newValue) => setTab(newValue);

//   const toggleRow = (id) => {
//     setOpenRows(prev => ({ ...prev, [id]: !prev[id] }));
//   };

//   const handleOpenForm = (expense = null) => {
//     if (expense) {
//       setEditingExpense(expense);
//       setFormData({
//         employeeName: expense.employeeName,
//         date: expense.date?.split("T")[0] || "",
//         expenseCategory: expense.expenseCategory.includes("Others") ? ["Others"] : expense.expenseCategory,
//         otherCategory: expense.expenseCategory.includes("Others")
//           ? expense.expenseCategory.find(c => c !== "Others")
//           : "",
//         projectDetails: expense.projectDetails || { clientName: "", projectName: "" },
//         expenseDetails: expense.expenseDetails || [{ description: "", amount: "", receiptAttached: false, remarks: "" }]
//       });
//     } else {
//       setEditingExpense(null);
//       setFormData({
//         employeeName: "",
//         date: "",
//         expenseCategory: [],
//         otherCategory: "",
//         projectDetails: { clientName: "", projectName: "" },
//         expenseDetails: [{ description: "", amount: "", receiptAttached: false, remarks: "" }]
//       });
//     }
//     setOpenForm(true);
//   };

//   const handleChange = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));
//   const handleProjectChange = (field, value) => setFormData(prev => ({ ...prev, projectDetails: { ...prev.projectDetails, [field]: value } }));
//   const handleExpenseDetailChange = (index, field, value) => {
//     const updatedDetails = [...formData.expenseDetails];
//     updatedDetails[index][field] = value;
//     setFormData(prev => ({ ...prev, expenseDetails: updatedDetails }));
//   };
//   const handleAddExpenseDetail = () => {
//     setFormData(prev => ({ ...prev, expenseDetails: [...prev.expenseDetails, { description: "", amount: "", receiptAttached: false, remarks: "" }] }));
//   };
//   const handleRemoveExpenseDetail = (index) => {
//     const updated = [...formData.expenseDetails];
//     updated.splice(index, 1);
//     setFormData(prev => ({ ...prev, expenseDetails: updated }));
//   };

//   const handleSubmit = async () => {
//     try {
//       const payload = {
//         ...formData,
//         userId,
//         expenseCategory: formData.expenseCategory.includes("Others") && formData.otherCategory
//           ? [...formData.expenseCategory.filter(c => c !== "Others"), formData.otherCategory]
//           : formData.expenseCategory
//       };

//       if (editingExpense) {
//         await updateUserExpense(editingExpense._id, payload);
//         setSnackbar({ open: true, message: "Expense updated!", severity: "success" });
//       } else {
//         await addUserExpense(payload);
//         setSnackbar({ open: true, message: "Expense submitted!", severity: "success" });
//       }

//       setOpenForm(false);
//       setEditingExpense(null);
//       fetchExpenses();
//     } catch (err) {
//       console.error(err);
//       setSnackbar({ open: true, message: "Error submitting expense", severity: "error" });
//     }
//   };

//   const handleApprove = async (id) => {
//     try {
//         console.log("id",id)
//       await approveExpense(id);
//       setSnackbar({ open: true, message: "Expense approved", severity: "success" });
//       fetchExpenses();
//     } catch (err) { console.error(err); }
//   };

//   const handleReject = async (id) => {
//     try {
//       await rejectExpense(id);
//       setSnackbar({ open: true, message: "Expense rejected", severity: "warning" });
//       fetchExpenses();
//     } catch (err) { console.error(err); }
//   };

//   const filteredExpenses = (status) => {
//     return expenses.filter(exp =>
//       exp.status === status &&
//       (role === "admin" || exp.userId?._id === userId)
//     );
//   };

//   return (
//     <Box sx={{ p: 4 }}>
//       <Typography variant="h4" sx={{ mb: 3 }}>Expense Claim</Typography>

//       <Tabs value={tab} onChange={handleTabChange}>
//         <Tab label="Pending" />
//         <Tab label="Approved" />
//         <Tab label="Rejected" />
//       </Tabs>

//       <Box sx={{ mt: 2 }}>
//         {role !== "admin" && (
//           <Button variant="contained" sx={{ mb: 2 }} onClick={() => handleOpenForm()}>
//             Add New Expense
//           </Button>
//         )}

//         <Paper>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell />
//                 <TableCell>Employee</TableCell>
//                 <TableCell>Date</TableCell>
//                 <TableCell>Category</TableCell>
//                 <TableCell>Project</TableCell>
//                 <TableCell>Client Name</TableCell>
//                 <TableCell>Total Amount</TableCell>
//                 <TableCell>Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {filteredExpenses(["Pending","Approved","Rejected"][tab]).map(exp => {
//                 const totalAmount = exp.expenseDetails?.reduce((sum, d) => sum + Number(d.amount || 0), 0) || 0;
//                 return (
//                   <React.Fragment key={exp._id}>
//                     <TableRow>
//                       <TableCell>
//                         <IconButton size="small" onClick={() => toggleRow(exp._id)}>
//                           {openRows[exp._id] ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
//                         </IconButton>
//                       </TableCell>
//                       <TableCell>{exp.employeeName}</TableCell>
//                       <TableCell>{new Date(exp.date).toLocaleDateString()}</TableCell>
//                       <TableCell>{exp.expenseCategory?.join(", ")}</TableCell>
//                       <TableCell>{exp.projectDetails?.projectName || "-"}</TableCell>
//                       <TableCell>{exp.projectDetails?.clientName || "-"}</TableCell>
//                       <TableCell>{totalAmount.toFixed(2)}</TableCell>
//                       <TableCell>
//                         {role !== "admin" && exp.status === "Pending" && exp.userId?._id === userId && (
//                           <IconButton onClick={() => handleOpenForm(exp)}><EditIcon /></IconButton>
//                         )}
//                         {role === "admin" && exp.status === "Pending" && (
//                           <>
//                             <IconButton onClick={() => handleApprove(exp._id)}><CheckIcon color="success" /></IconButton>
//                             <IconButton onClick={() => handleReject(exp._id)}><CloseIcon color="error" /></IconButton>
//                           </>
//                         )}
//                       </TableCell>
//                     </TableRow>

//                     {/* Expandable Row */}
//                     <TableRow>
//                       <TableCell colSpan={8} sx={{ p: 0 }}>
//                         <Collapse in={openRows[exp._id]} timeout="auto" unmountOnExit>
//                           <Box sx={{ m: 2 }}>
//                             <Typography variant="subtitle1">Expense Details</Typography>
//                             <Table size="small">
//                               <TableHead>
//                                 <TableRow>
//                                   <TableCell>Description</TableCell>
//                                   <TableCell>Amount</TableCell>
//                                   <TableCell>Receipt</TableCell>
//                                   <TableCell>Remarks</TableCell>
//                                 </TableRow>
//                               </TableHead>
//                               <TableBody>
//                                 {exp.expenseDetails?.map((d, idx) => (
//                                   <TableRow key={idx}>
//                                     <TableCell>{d.description}</TableCell>
//                                     <TableCell>{d.amount}</TableCell>
//                                     <TableCell>{d.receiptAttached ? "Yes" : "No"}</TableCell>
//                                     <TableCell>{d.remarks}</TableCell>
//                                   </TableRow>
//                                 ))}
//                               </TableBody>
//                             </Table>
//                           </Box>
//                         </Collapse>
//                       </TableCell>
//                     </TableRow>
//                   </React.Fragment>
//                 );
//               })}
//             </TableBody>
//           </Table>
//         </Paper>
//       </Box>

//       {/* Form Dialog */}
//       <Dialog open={openForm} onClose={() => setOpenForm(false)} maxWidth="md" fullWidth>
//         <DialogTitle>{editingExpense ? "Edit Expense" : "New Expense"}</DialogTitle>
//         <DialogContent>
//           <Grid container spacing={2} sx={{ mt: 1 }}>
//             <Grid item xs={12} md={6}>
//               <TextField label="Employee Name" fullWidth value={formData.employeeName} onChange={e => handleChange("employeeName", e.target.value)} />
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <TextField type="date" label="Date" fullWidth InputLabelProps={{ shrink: true }} value={formData.date} onChange={e => handleChange("date", e.target.value)} />
//             </Grid>
//             <Grid item xs={12}>
//               <Typography>Expense Category</Typography>
//               <FormGroup row>
//                 {expenseCategories.map(cat => (
//                   <FormControlLabel
//                     key={cat}
//                     control={<Checkbox checked={formData.expenseCategory.includes(cat)} onChange={e => {
//                       const checked = e.target.checked;
//                       setFormData(prev => {
//                         const newCategories = checked
//                           ? [...prev.expenseCategory, cat]
//                           : prev.expenseCategory.filter(c => c !== cat);
//                         return { ...prev, expenseCategory: newCategories };
//                       });
//                     }} />}
//                     label={cat}
//                   />
//                 ))}
//               </FormGroup>
//               {formData.expenseCategory.includes("Others") && (
//                 <TextField label="Specify Other Category" fullWidth value={formData.otherCategory} onChange={e => handleChange("otherCategory", e.target.value)} sx={{ mt: 1 }} />
//               )}
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <TextField label="Client Name" fullWidth value={formData.projectDetails.clientName} onChange={e => handleProjectChange("clientName", e.target.value)} />
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <TextField label="Project Name" fullWidth value={formData.projectDetails.projectName} onChange={e => handleProjectChange("projectName", e.target.value)} />
//             </Grid>
//             <Grid item xs={12}>
//               <Typography>Expense Details</Typography>
//               {formData.expenseDetails.map((d, idx) => (
//                 <Grid container spacing={1} key={idx} alignItems="center">
//                   <Grid item xs={4}><TextField label="Description" fullWidth value={d.description} onChange={e => handleExpenseDetailChange(idx, "description", e.target.value)} /></Grid>
//                   <Grid item xs={2}><TextField type="number" label="Amount" fullWidth value={d.amount} onChange={e => handleExpenseDetailChange(idx, "amount", e.target.value)} /></Grid>
//                   <Grid item xs={2}><FormControlLabel control={<Checkbox checked={d.receiptAttached} onChange={e => handleExpenseDetailChange(idx, "receiptAttached", e.target.checked)} />} label="Receipt" /></Grid>
//                   <Grid item xs={3}><TextField label="Remarks" fullWidth value={d.remarks} onChange={e => handleExpenseDetailChange(idx, "remarks", e.target.value)} /></Grid>
//                   <Grid item xs={1}>{idx > 0 && <Button color="error" onClick={() => handleRemoveExpenseDetail(idx)}>X</Button>}</Grid>
//                 </Grid>
//               ))}
//               <Button sx={{ mt: 1 }} onClick={handleAddExpenseDetail}>Add Row</Button>
//             </Grid>
//             <Grid item xs={12}><Button variant="contained" onClick={handleSubmit}>{editingExpense ? "Update Expense" : "Submit Expense"}</Button></Grid>
//           </Grid>
//         </DialogContent>
//       </Dialog>

//       <Snackbar open={snackbar.open} autoHideDuration={2500} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
//         <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default ExpenseClaimPage;


import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Collapse,
  Dialog,
  DialogTitle,
  DialogContent,
  Tabs,
  Tab,
  Snackbar,
  Alert,
  Chip,
} from "@mui/material";

import { KeyboardArrowUp, KeyboardArrowDown, Edit as EditIcon, Check as CheckIcon, Close as CloseIcon } from "@mui/icons-material";

import { getRole, getUser } from "../../utils/auth"; // your auth utils
import { getUserExpense, addUserExpense, updateUserExpense, approveExpense, rejectExpense } from "../../services/api";

const expenseCategories = [
  "Fuel",
  "Food",
  "Transportation",
  "Fixed Asset",
  "Project Purchase",
  "Office Logistics",
  "Sanad",
  "Sales",
  "Marketing",
  "Client Entertainment",
  "Others"
];

const ExpenseClaimPage = () => {
  const role = getRole();
  const user = getUser();
  const userId = user._id;

  const [tab, setTab] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [openRows, setOpenRows] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const [formData, setFormData] = useState({
    employeeName: "",
    date: "",
    expenseCategory: [],
    otherCategory: "",
    projectDetails: { clientName: "", projectName: "" },
    expenseDetails: [{ description: "", amount: "", receiptAttached: false, remarks: "" }],
  });

  // Fetch expenses
  const fetchExpenses = async () => {
    try {
      const res = await getUserExpense({ userId: role === "admin" ? undefined : userId });
      setExpenses(res.data?.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleTabChange = (e, newValue) => setTab(newValue);

  const toggleRow = (id) => setOpenRows(prev => ({ ...prev, [id]: !prev[id] }));

  const handleOpenForm = (expense = null) => {
    if (expense) {
      setEditingExpense(expense);
      setFormData({
        employeeName: expense.employeeName,
        date: expense.date?.split("T")[0] || "",
        expenseCategory: expense.expenseCategory.includes("Others") ? ["Others"] : expense.expenseCategory,
        otherCategory: expense.expenseCategory.includes("Others")
          ? expense.expenseCategory.find(c => c !== "Others")
          : "",
        projectDetails: expense.projectDetails || { clientName: "", projectName: "" },
        expenseDetails: expense.expenseDetails || [{ description: "", amount: "", receiptAttached: false, remarks: "" }],
      });
    } else {
      setEditingExpense(null);
      setFormData({
        employeeName: "",
        date: "",
        expenseCategory: [],
        otherCategory: "",
        projectDetails: { clientName: "", projectName: "" },
        expenseDetails: [{ description: "", amount: "", receiptAttached: false, remarks: "" }],
      });
    }
    setOpenForm(true);
  };

  const handleChange = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));
  const handleProjectChange = (field, value) => setFormData(prev => ({ ...prev, projectDetails: { ...prev.projectDetails, [field]: value } }));
  const handleExpenseDetailChange = (index, field, value) => {
    const updatedDetails = [...formData.expenseDetails];
    updatedDetails[index][field] = value;
    setFormData(prev => ({ ...prev, expenseDetails: updatedDetails }));
  };
  const handleAddExpenseDetail = () => {
    setFormData(prev => ({ ...prev, expenseDetails: [...prev.expenseDetails, { description: "", amount: "", receiptAttached: false, remarks: "" }] }));
  };
  const handleRemoveExpenseDetail = (index) => {
    const updated = [...formData.expenseDetails];
    updated.splice(index, 1);
    setFormData(prev => ({ ...prev, expenseDetails: updated }));
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        ...formData,
        userId,
        expenseCategory: formData.expenseCategory.includes("Others") && formData.otherCategory
          ? [...formData.expenseCategory.filter(c => c !== "Others"), formData.otherCategory]
          : formData.expenseCategory
      };

      if (editingExpense) {
        await updateUserExpense(editingExpense._id, payload);
        setSnackbar({ open: true, message: "Expense updated!", severity: "success" });
      } else {
        await addUserExpense(payload);
        setSnackbar({ open: true, message: "Expense submitted!", severity: "success" });
      }

      setOpenForm(false);
      setEditingExpense(null);
      fetchExpenses();
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: "Error submitting expense", severity: "error" });
    }
  };

  const handleApprove = async (id) => {
    try {
      await approveExpense(id);
      setSnackbar({ open: true, message: "Expense approved", severity: "success" });
      fetchExpenses();
    } catch (err) { console.error(err); }
  };

  const handleReject = async (id) => {
    try {
      await rejectExpense(id);
      setSnackbar({ open: true, message: "Expense rejected", severity: "warning" });
      fetchExpenses();
    } catch (err) { console.error(err); }
  };

  const filteredExpenses = (status) => {
    return expenses.filter(exp =>
      exp.status === status &&
      (role === "admin" || exp.userId?._id === userId)
    );
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>Expense Claim</Typography>

      <Tabs value={tab} onChange={handleTabChange}>
        <Tab label="Pending" />
        <Tab label="Approved" />
        <Tab label="Rejected" />
      </Tabs>

      <Box sx={{ mt: 2 }}>
        {/* Show Add Expense button for all roles */}
        <Button variant="contained" sx={{ mb: 2 }} onClick={() => handleOpenForm()}>
          Add New Expense
        </Button>

        <Paper sx={{ p: 2, maxHeight: 600, overflow: "auto" }} elevation={3}>
          <Table stickyHeader>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell />
                <TableCell><Typography fontWeight="bold">Employee</Typography></TableCell>
                <TableCell><Typography fontWeight="bold">Date</Typography></TableCell>
                <TableCell><Typography fontWeight="bold">Category</Typography></TableCell>
                <TableCell><Typography fontWeight="bold">Project</Typography></TableCell>
                <TableCell><Typography fontWeight="bold">Client Name</Typography></TableCell>
                <TableCell align="right"><Typography fontWeight="bold">Total Amount</Typography></TableCell>
                <TableCell><Typography fontWeight="bold">Actions</Typography></TableCell>
                <TableCell><Typography fontWeight="bold">Status</Typography></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredExpenses(["Pending", "Approved", "Rejected"][tab]).map(exp => {
                const totalAmount = exp.expenseDetails?.reduce((sum, d) => sum + Number(d.amount || 0), 0) || 0;
                return (
                  <React.Fragment key={exp._id}>
                    <TableRow hover>
                      <TableCell>
                        <IconButton size="small" onClick={() => toggleRow(exp._id)}>
                          {openRows[exp._id] ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                        </IconButton>
                      </TableCell>
                      <TableCell>{exp.employeeName}</TableCell>
                      <TableCell>{new Date(exp.date).toLocaleDateString()}</TableCell>
                      <TableCell>{exp.expenseCategory?.join(", ")}</TableCell>
                      <TableCell>{exp.projectDetails?.projectName || "-"}</TableCell>
                      <TableCell>{exp.projectDetails?.clientName || "-"}</TableCell>
                      <TableCell align="right">{totalAmount.toFixed(2)}</TableCell>
                      <TableCell>
                        {tab === 0 && role !== "admin" && exp.status === "Pending" && exp.userId?._id === userId && (
                          <IconButton onClick={() => handleOpenForm(exp)}><EditIcon /></IconButton>
                        )}
                        {tab === 0 && role === "admin" && exp.status === "Pending" && (
                          <>
                            <IconButton onClick={() => handleApprove(exp._id)}><CheckIcon color="success" /></IconButton>
                            <IconButton onClick={() => handleReject(exp._id)}><CloseIcon color="error" /></IconButton>
                          </>
                        )}
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={exp.status} 
                          color={exp.status === "Approved" ? "success" : exp.status === "Rejected" ? "error" : "warning"} 
                          variant="outlined" 
                        />
                      </TableCell>
                    </TableRow>

                    {/* Expandable Row */}
                    <TableRow>
                      <TableCell colSpan={9} sx={{ p: 0 }}>
                        <Collapse in={openRows[exp._id]} timeout="auto" unmountOnExit>
                          <Box sx={{ m: 2 }}>
                            <Typography variant="subtitle1">Expense Details</Typography>
                            <Table size="small">
                              <TableHead>
                                <TableRow>
                                  <TableCell>Description</TableCell>
                                  <TableCell>Amount</TableCell>
                                  <TableCell>Receipt</TableCell>
                                  <TableCell>Remarks</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {exp.expenseDetails?.map((d, idx) => (
                                  <TableRow key={idx}>
                                    <TableCell>{d.description}</TableCell>
                                    <TableCell>{d.amount}</TableCell>
                                    <TableCell>{d.receiptAttached ? "Yes" : "No"}</TableCell>
                                    <TableCell>{d.remarks}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      </Box>

      {/* Form Dialog */}
      <Dialog open={openForm} onClose={() => setOpenForm(false)} maxWidth="md" fullWidth>
        <DialogTitle>{editingExpense ? "Edit Expense" : "New Expense"}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Employee & Date */}
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField label="Employee Name" fullWidth value={formData.employeeName} onChange={e => handleChange("employeeName", e.target.value)} />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField type="date" label="Date" fullWidth InputLabelProps={{ shrink: true }} value={formData.date} onChange={e => handleChange("date", e.target.value)} />
              </Grid>
            </Grid>

            {/* Expense Category */}
            <Box>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>Expense Category</Typography>
              <FormGroup row>
                {expenseCategories.map(cat => (
                  <FormControlLabel
                    key={cat}
                    control={<Checkbox checked={formData.expenseCategory.includes(cat)} onChange={e => {
                      const checked = e.target.checked;
                      setFormData(prev => {
                        const newCategories = checked
                          ? [...prev.expenseCategory, cat]
                          : prev.expenseCategory.filter(c => c !== cat);
                        return { ...prev, expenseCategory: newCategories };
                      });
                    }} />}
                    label={cat}
                  />
                ))}
              </FormGroup>
              {formData.expenseCategory.includes("Others") && (
                <TextField label="Specify Other Category" fullWidth value={formData.otherCategory} onChange={e => handleChange("otherCategory", e.target.value)} sx={{ mt: 1 }} />
              )}
            </Box>

            {/* Project Details */}
            <Box>
              {/* <Typography variant="subtitle1" sx={{ mb: 1 }}>Project Details</Typography> */}
              <Typography variant="subtitle1" sx={{ mb: 1, fontStyle: "italic" }}>
                Project Expense Details (Fill only if related to a Project)
            </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField label="Client Name" fullWidth value={formData.projectDetails.clientName} onChange={e => handleProjectChange("clientName", e.target.value)} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField label="Project Name" fullWidth value={formData.projectDetails.projectName} onChange={e => handleProjectChange("projectName", e.target.value)} />
                </Grid>
              </Grid>
            </Box>

            {/* Expense Details */}
            <Box>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>Expense Details</Typography>
              <Paper variant="outlined" sx={{ p: 2, maxHeight: 300, overflowY: "auto" }}>
                {formData.expenseDetails.map((d, idx) => (
                  <Grid container spacing={2} key={idx} alignItems="center" sx={{ mb: 1 }}>
                    <Grid item xs={4}><TextField label="Description" fullWidth value={d.description} onChange={e => handleExpenseDetailChange(idx, "description", e.target.value)} /></Grid>
                    <Grid item xs={2}><TextField type="number" label="Amount" fullWidth value={d.amount} onChange={e => handleExpenseDetailChange(idx, "amount", e.target.value)} /></Grid>
                    <Grid item xs={2}><FormControlLabel control={<Checkbox checked={d.receiptAttached} onChange={e => handleExpenseDetailChange(idx, "receiptAttached", e.target.checked)} />} label="Receipt" /></Grid>
                    <Grid item xs={3}><TextField label="Remarks" fullWidth value={d.remarks} onChange={e => handleExpenseDetailChange(idx, "remarks", e.target.value)} /></Grid>
                    <Grid item xs={1}>{idx > 0 && <Button color="error" onClick={() => handleRemoveExpenseDetail(idx)}>X</Button>}</Grid>
                  </Grid>
                ))}
                <Button sx={{ mt: 1 }} onClick={handleAddExpenseDetail}>Add Row</Button>
              </Paper>
            </Box>

            <Box>
              <Button variant="contained" fullWidth onClick={handleSubmit}>{editingExpense ? "Update Expense" : "Submit Expense"}</Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={2500} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default ExpenseClaimPage;