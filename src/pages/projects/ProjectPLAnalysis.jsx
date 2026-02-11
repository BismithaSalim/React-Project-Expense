// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   Box,
//   Typography,
//   Grid,
//   Paper,
//   Divider,
//   CircularProgress,
//   Button
// } from "@mui/material";
// import {
//   getProjectPLSummary,
//   getProjectExpenses
// } from "../../services/api";

// const ProjectPLAnalysis = () => {
//   const { id: projectId } = useParams();
//   const navigate = useNavigate();

//   const [loading, setLoading] = useState(true);
//   const [summary, setSummary] = useState(null);
//   const [expenses, setExpenses] = useState([]);

// //   useEffect(() => {
// //     fetchAllData();
// //   }, [projectId]);

// //   const fetchAllData = async () => {
// //     try {
// //       setLoading(true);

// //       // 1️⃣ Fetch P&L Summary
// //       const summaryRes = await getProjectPLSummary(projectId);
// //       setSummary(summaryRes.data.result[0]);

// //       // 2️⃣ Fetch Project Expenses
// //       const expensesRes = await getProjectExpenses({ projectId });
// //       setExpenses(expensesRes.data.result);

// //     } catch (error) {
// //       console.error(error);
// //       alert("Failed to load Project P&L data");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// useEffect(() => {
//   const fetchAllData = async () => {
//     try {
//       setLoading(true);

//       const summaryRes = await getProjectPLSummary(projectId);
//       setSummary(summaryRes.data.data[0]);

//       const expensesRes = await getProjectExpenses({ projectId });
//       setExpenses(expensesRes.data.data);

//     } catch (error) {
//       console.error(error);
//       alert("Failed to load Project P&L data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchAllData();
// }, [projectId]);

//   if (loading) {
//     return (
//       <Box sx={{ textAlign: "center", mt: 6 }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (!summary) {
//     return <Typography>No data found</Typography>;
//   }

//   return (
//     <Box sx={{ p: 3 }}>
//       {/* Back Button */}
//       <Button
//         variant="outlined"
//         sx={{ mb: 2 }}
//         onClick={() => navigate("/projects/list")}
//       >
//         Back to Projects
//       </Button>

//       {/* PROJECT + CLIENT INFO */}
//       <Paper sx={{ p: 3, mb: 3 }}>
//         <Typography variant="h6">Project Details</Typography>
//         <Divider sx={{ my: 2 }} />

//         <Grid container spacing={2}>
//           <Grid item xs={6}>
//             <b>Project:</b> {summary.projectName}
//           </Grid>
//           <Grid item xs={6}>
//             <b>Client:</b> {summary.clientName}
//           </Grid>
//           <Grid item xs={6}>
//             <b>Location:</b> {summary.location}
//           </Grid>
//           <Grid item xs={6}>
//             <b>Status:</b> {summary.projectStatus}
//           </Grid>
//         </Grid>
//       </Paper>

//       {/* FINANCIAL SUMMARY */}
//       <Paper sx={{ p: 3, mb: 3 }}>
//         <Typography variant="h6">Project Financials</Typography>
//         <Divider sx={{ my: 2 }} />

//         <Grid container spacing={2}>
//           <Grid item xs={4}>Total Cost: {summary.totalCost}</Grid>
//           <Grid item xs={4}>Total VAT Paid: {summary.totalVatPaid}</Grid>
//           <Grid item xs={4}>Project Value: {summary.projectValue}</Grid>

//           <Grid item xs={4}>VAT Received: {summary.vatReceived}</Grid>
//           <Grid item xs={4}>
//             <b>P & L: {summary.profitAndLoss}</b>
//           </Grid>
//           <Grid item xs={4}>VAT to be Paid: {summary.vatToBePaid}</Grid>
//         </Grid>
//       </Paper>

//       {/* EXPENSE COUNT (Table comes next) */}
//       <Paper sx={{ p: 3 }}>
//         <Typography variant="h6">
//           Expenses ({expenses.length})
//         </Typography>
//         <Divider sx={{ my: 2 }} />

//         <Typography variant="body2">
//           Expense table with filters & sorting will appear here.
//         </Typography>
//       </Paper>
//     </Box>
//   );
// };

// export default ProjectPLAnalysis;

//ok**************************************************************
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   Box,
//   Typography,
//   Grid,
//   Card,
//   CardContent,
// //   Divider,
//   CircularProgress,
//   Button,
//   Stack,
// } from "@mui/material";
// import { getProjectPLSummary, getProjectExpenses } from "../../services/api";

// const ProjectPLAnalysis = () => {
//   const { id: projectId } = useParams();
//   const navigate = useNavigate();

//   const [loading, setLoading] = useState(true);
//   const [summary, setSummary] = useState(null);
//   const [expenses, setExpenses] = useState([]);

//   useEffect(() => {
//     fetchAllData();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [projectId]);

//   const fetchAllData = async () => {
//     try {
//       setLoading(true);
//       const summaryRes = await getProjectPLSummary(projectId);
//       const result = summaryRes?.data?.data;
//       setSummary(result && result.length ? result[0] : null);

//       const expensesRes = await getProjectExpenses({ projectId });
//       setExpenses(expensesRes?.data?.data || []);
//     } catch (error) {
//       console.error(error);
//       alert("Failed to load Project P&L data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <Box sx={{ textAlign: "center", mt: 10 }}>
//         <CircularProgress size={50} />
//         <Typography mt={2} variant="h6" color="textSecondary">
//           Loading Project P&L Analysis...
//         </Typography>
//       </Box>
//     );
//   }

//   if (!summary) {
//     return (
//       <Box sx={{ textAlign: "center", mt: 10 }}>
//         <Typography variant="h6" color="error">
//           No data found for this project.
//         </Typography>
//         <Button
//           variant="contained"
//           sx={{ mt: 3, backgroundColor: "#1976D2", "&:hover": { backgroundColor: "#115293" } }}
//           onClick={() => navigate("/projects/list")}
//         >
//           Back to Projects
//         </Button>
//       </Box>
//     );
//   }

//   const isProfitPositive = summary.profitAndLoss >= 0;

//   return (
//     <Box sx={{ p: 4, background: "#f5f7fa", minHeight: "100vh" }}>
//       <Stack direction="row" justifyContent="space-between" mb={3}>
//         <Typography variant="h4" fontWeight="bold">
//           Project P&L Analysis
//         </Typography>
//         <Button
//           variant="contained"
//           sx={{ backgroundColor: "#1976D2", "&:hover": { backgroundColor: "#115293" } }}
//           onClick={() => navigate("/projects/list")}
//         >
//           Back to Projects
//         </Button>
//       </Stack>

//       {/* Project + Client Info */}
//       <Card sx={{ mb: 3, borderRadius: 3, boxShadow: 3 }}>
//         <CardContent sx={{ background: "linear-gradient(90deg, #42A5F5, #1976D2)", color: "white" }}>
//           <Typography variant="h6">Project Details</Typography>
//         </CardContent>
//         <CardContent>
//           <Grid container spacing={2}>
//             <Grid item xs={6}><b>Project:</b> {summary.projectName}</Grid>
//             <Grid item xs={6}><b>Client:</b> {summary.clientName}</Grid>
//             <Grid item xs={6}><b>Location:</b> {summary.location}</Grid>
//             <Grid item xs={6}><b>Status:</b> {summary.projectStatus}</Grid>
//             <Grid item xs={6}><b>Start Date:</b> {summary.projectStartDate?.split("T")[0]}</Grid>
//             <Grid item xs={6}><b>End Date:</b> {summary.projectEndDate?.split("T")[0]}</Grid>
//           </Grid>
//         </CardContent>
//       </Card>

//       {/* Financial Summary */}
//       <Grid container spacing={3} mb={3}>
//         <Grid item xs={12} md={4}>
//           <Card sx={{ borderRadius: 3, boxShadow: 3, background: "#E3F2FD" }}>
//             <CardContent>
//               <Typography variant="subtitle1" color="#0D47A1">Total Cost</Typography>
//               <Typography variant="h5" fontWeight="bold">{summary.totalCost}</Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//         <Grid item xs={12} md={4}>
//           <Card sx={{ borderRadius: 3, boxShadow: 3, background: "#FFF3E0" }}>
//             <CardContent>
//               <Typography variant="subtitle1" color="#EF6C00">Total VAT Paid</Typography>
//               <Typography variant="h5" fontWeight="bold">{summary.totalVatPaid}</Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//         <Grid item xs={12} md={4}>
//           <Card sx={{ borderRadius: 3, boxShadow: 3, background: "#E8F5E9" }}>
//             <CardContent>
//               <Typography variant="subtitle1" color="#2E7D32">P & L</Typography>
//               <Typography
//                 variant="h5"
//                 fontWeight="bold"
//                 color={isProfitPositive ? "green" : "red"}
//               >
//                 {summary.profitAndLoss}
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>

//       {/* Expenses Table Placeholder */}
//       <Card sx={{ mb: 3, borderRadius: 3, boxShadow: 3 }}>
//         <CardContent sx={{ background: "linear-gradient(90deg, #42A5F5, #1976D2)", color: "white" }}>
//           <Typography variant="h6">Expenses ({expenses.length})</Typography>
//         </CardContent>
//         <CardContent>
//           <Typography variant="body2" color="textSecondary">
//             Expense table with filters & sorting will appear here.
//           </Typography>
//         </CardContent>
//       </Card>
//     </Box>
//   );
// };

// export default ProjectPLAnalysis;


// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   Box,
//   Typography,
//   Grid,
//   Card,
//   CardContent,
//   CircularProgress,
//   Button,
//   Stack,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   TableContainer,
//   Paper,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   TextField,
//   IconButton,
// } from "@mui/material";
// import { ArrowUpward, ArrowDownward } from "@mui/icons-material";
// import { getProjectPLSummary, getProjectExpenses } from "../../services/api";

// const ProjectPLAnalysis = () => {
//   const { id: projectId } = useParams();
//   const navigate = useNavigate();

//   const [loading, setLoading] = useState(true);
//   const [summary, setSummary] = useState(null);
//   const [expenses, setExpenses] = useState([]);
//   const [filters, setFilters] = useState({
//     category: "All",
//     paidTo: "",
//     paidBy: "",
//     paymentType: "All",
//   });
//   const [sortOrder, setSortOrder] = useState("desc"); // default descending

//   useEffect(() => {
//     fetchAllData();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [projectId]);

//   const fetchAllData = async () => {
//     try {
//       setLoading(true);
//       const summaryRes = await getProjectPLSummary(projectId);
//       const result = summaryRes?.data?.data;
//       setSummary(result && result.length ? result[0] : null);

//       await fetchExpenses();
//     } catch (error) {
//       console.error(error);
//       alert("Failed to load Project P&L data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchExpenses = async () => {
//     try {
//       // convert "All" to empty string for API
//       const params = {
//         projectId,
//         category: filters.category === "All" ? "" : filters.category,
//         paidTo: filters.paidTo,
//         paidBy: filters.paidBy,
//         paymentType: filters.paymentType === "All" ? "" : filters.paymentType,
//         // sortAmount: sortOrder,
//       };
//       const expensesRes = await getProjectExpenses(params);
//       setExpenses(expensesRes?.data?.data || []);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleFilterChange = (e) => {
//     setFilters({ ...filters, [e.target.name]: e.target.value });
//   };

//   const applyFilters = async () => {
//     await fetchExpenses();
//   };

//   const clearFilters = async () => {
//     setFilters({ category: "All", paidTo: "", paidBy: "", paymentType: "All" });
//     await fetchExpenses();
//   };

//   const toggleSort = async () => {
//     setSortOrder(sortOrder === "asc" ? "desc" : "asc");
//     await fetchExpenses();
//   };

//   if (loading) {
//     return (
//       <Box sx={{ textAlign: "center", mt: 10 }}>
//         <CircularProgress size={50} />
//         <Typography mt={2} variant="h6" color="textSecondary">
//           Loading Project P&L Analysis...
//         </Typography>
//       </Box>
//     );
//   }

//   if (!summary) {
//     return (
//       <Box sx={{ textAlign: "center", mt: 10 }}>
//         <Typography variant="h6" color="error">
//           No data found for this project.
//         </Typography>
//         <Button
//           variant="contained"
//           sx={{ mt: 3, backgroundColor: "#1976D2", "&:hover": { backgroundColor: "#115293" } }}
//           onClick={() => navigate("/projects/list")}
//         >
//           Back to Projects
//         </Button>
//       </Box>
//     );
//   }

//   const isProfitPositive = summary.profitAndLoss >= 0;

//   return (
//     <Box sx={{ p: 4, background: "#f5f7fa", minHeight: "100vh" }}>
//       {/* Header */}
//       <Stack direction="row" justifyContent="space-between" mb={3}>
//         <Typography variant="h4" fontWeight="bold">
//           Project P&L Analysis
//         </Typography>
//         <Button
//           variant="contained"
//           sx={{ backgroundColor: "#1976D2", "&:hover": { backgroundColor: "#115293" } }}
//           onClick={() => navigate("/projects/list")}
//         >
//           Back to Projects
//         </Button>
//       </Stack>

//       {/* Project Info */}
//       <Card sx={{ mb: 3, borderRadius: 3, boxShadow: 3 }}>
//         <CardContent sx={{ background: "linear-gradient(90deg, #42A5F5, #1976D2)", color: "white" }}>
//           <Typography variant="h6">Project Details</Typography>
//         </CardContent>
//         <CardContent>
//           <Grid container spacing={2}>
//             <Grid item xs={6}><b>Project:</b> {summary.projectName}</Grid>
//             <Grid item xs={6}><b>Client:</b> {summary.clientName}</Grid>
//             <Grid item xs={6}><b>Location:</b> {summary.location}</Grid>
//             <Grid item xs={6}><b>Status:</b> {summary.projectStatus}</Grid>
//             <Grid item xs={6}><b>Start Date:</b> {summary.projectStartDate?.split("T")[0]}</Grid>
//             <Grid item xs={6}><b>End Date:</b> {summary.projectEndDate?.split("T")[0]}</Grid>
//           </Grid>
//         </CardContent>
//       </Card>

//       {/* Financial Summary */}
//       <Grid container spacing={3} mb={3}>
//         <Grid item xs={12} md={3}>
//           <Card sx={{ borderRadius: 3, boxShadow: 3, background: "#E3F2FD" }}>
//             <CardContent>
//               <Typography variant="subtitle1" color="#0D47A1">Total Cost</Typography>
//               <Typography variant="h5" fontWeight="bold">{summary.totalCost}</Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//         <Grid item xs={12} md={3}>
//           <Card sx={{ borderRadius: 3, boxShadow: 3, background: "#FFF3E0" }}>
//             <CardContent>
//               <Typography variant="subtitle1" color="#EF6C00">Total VAT Paid</Typography>
//               <Typography variant="h5" fontWeight="bold">{summary.totalVatPaid}</Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//         <Grid item xs={12} md={3}>
//           <Card sx={{ borderRadius: 3, boxShadow: 3, background: "#E8F5E9" }}>
//             <CardContent>
//               <Typography variant="subtitle1" color="#2E7D32">Project Value</Typography>
//               <Typography variant="h5" fontWeight="bold">{summary.projectValue}</Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//         <Grid item xs={12} md={3}>
//           <Card sx={{ borderRadius: 3, boxShadow: 3, background: isProfitPositive ? "#E8F5E9" : "#FFEBEE" }}>
//             <CardContent>
//               <Typography variant="subtitle1" color={isProfitPositive ? "#2E7D32" : "#C62828"}>P & L</Typography>
//               <Typography variant="h5" fontWeight="bold" color={isProfitPositive ? "green" : "red"}>
//                 {summary.profitAndLoss}
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>

//       {/* Expense Filters */}
//       <Card sx={{ mb: 2, borderRadius: 3, boxShadow: 3, p: 2 }}>
//         <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center">
//           <FormControl sx={{ minWidth: 150 }}>
//             <InputLabel>Category</InputLabel>
//             <Select name="category" value={filters.category} onChange={handleFilterChange}>
//               <MenuItem value="All">All</MenuItem>
//               <MenuItem value="Travel">Travel</MenuItem>
//               <MenuItem value="Material">Material</MenuItem>
//               <MenuItem value="Labor">Labor</MenuItem>
//             </Select>
//           </FormControl>

//           <TextField
//             label="Paid To"
//             name="paidTo"
//             value={filters.paidTo}
//             onChange={handleFilterChange}
//           />
//           <TextField
//             label="Paid By"
//             name="paidBy"
//             value={filters.paidBy}
//             onChange={handleFilterChange}
//           />

//           <FormControl sx={{ minWidth: 150 }}>
//             <InputLabel>Payment Type</InputLabel>
//             <Select name="paymentType" value={filters.paymentType} onChange={handleFilterChange}>
//               <MenuItem value="All">All</MenuItem>
//               <MenuItem value="Cash">Cash</MenuItem>
//               <MenuItem value="Transfer - Company">Transfer - Company</MenuItem>
//               <MenuItem value="Transfer - Personal">Transfer - Personal</MenuItem>
//               <MenuItem value="Cheque - Personal">Cheque - Personal</MenuItem>
//               <MenuItem value="Cheque - Company">Cheque - Company</MenuItem>
//             </Select>
//           </FormControl>

//           <Button variant="contained" onClick={applyFilters} sx={{ backgroundColor: "#1976D2" }}>
//             Apply
//           </Button>
//           <Button variant="outlined" onClick={clearFilters}>
//             Clear
//           </Button>
//         </Stack>
//       </Card>

//       {/* Expense Table */}
//       <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 3 }}>
//         <Table>
//           <TableHead>
//             <TableRow sx={{ backgroundColor: "#42A5F5" }}>
//               <TableCell sx={{ color: "white" }}>Date</TableCell>
//               <TableCell sx={{ color: "white" }}>Category</TableCell>
//               <TableCell sx={{ color: "white" }}>
//                 Amount
//                 <IconButton size="small" onClick={toggleSort} sx={{ color: "white" }}>
//                   {sortOrder === "asc" ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />}
//                 </IconButton>
//               </TableCell>
//               <TableCell sx={{ color: "white" }}>VAT</TableCell>
//               <TableCell sx={{ color: "white" }}>Total</TableCell>
//               <TableCell sx={{ color: "white" }}>Paid To</TableCell>
//               <TableCell sx={{ color: "white" }}>Paid By</TableCell>
//               <TableCell sx={{ color: "white" }}>Payment Type</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {expenses.map((e) => (
//               <TableRow key={e._id}>
//                 <TableCell>{e.date?.split("T")[0]}</TableCell>
//                 <TableCell>{e.category || "All"}</TableCell>
//                 <TableCell>{e.amount}</TableCell>
//                 <TableCell>{e.vat}</TableCell>
//                 <TableCell>{e.totalAmount}</TableCell>
//                 <TableCell>{e.paidTo || "All"}</TableCell>
//                 <TableCell>{e.paidBy || "All"}</TableCell>
//                 <TableCell>{e.paymentType || "All"}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Box>
//   );
// };

// export default ProjectPLAnalysis;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  IconButton,
} from "@mui/material";
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";
import { getProjectPLSummary, getProjectExpenses } from "../../services/api";

const ProjectPLAnalysis = () => {
  const { id: projectId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "projects";


  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [filters, setFilters] = useState({
    category: "All",
    paidTo: "",
    paidBy: "",
    paymentType: "All",
  });
  const [sortOrder, setSortOrder] = useState(null); // null = default date sorting

  useEffect(() => {
    fetchAllData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const summaryRes = await getProjectPLSummary(projectId);
      const result = summaryRes?.data?.data;
      setSummary(result && result.length ? result[0] : null);

      await fetchExpenses();
    } catch (error) {
      console.error(error);
      alert("Failed to load Project P&L data");
    } finally {
      setLoading(false);
    }
  };

  const fetchExpenses = async (order = sortOrder) => {
    try {
      const params = {
        projectId,
        category: filters.category === "All" ? "" : filters.category,
        paidTo: filters.paidTo,
        paidBy: filters.paidBy,
        paymentType: filters.paymentType === "All" ? "" : filters.paymentType,
      };
      if (order) params.sortAmount = order;

      const expensesRes = await getProjectExpenses(params);
      setExpenses(expensesRes?.data?.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const applyFilters = async () => {
    await fetchExpenses();
  };

  const clearFilters = async () => {
    setFilters({ category: "All", paidTo: "", paidBy: "", paymentType: "All" });
    setSortOrder(null); // reset sort
    await fetchExpenses(null);
  };

  const toggleSort = async () => {
    const nextSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(nextSortOrder);
    await fetchExpenses(nextSortOrder);
  };

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", mt: 10 }}>
        <CircularProgress size={50} />
        <Typography mt={2} variant="h6" color="textSecondary">
          Loading Project P&L Analysis...
        </Typography>
      </Box>
    );
  }

  if (!summary) {
    return (
      <Box sx={{ textAlign: "center", mt: 10 }}>
        <Typography variant="h6" color="error">
          No data found for this project.
        </Typography>
        <Button
          variant="contained"
          sx={{ mt: 3, backgroundColor: "#1976D2", "&:hover": { backgroundColor: "#115293" } }}
          // onClick={() => navigate("/projects/list")}
          onClick={() =>
            navigate(from === "summary" ? "/projects/summary" : "/projects/list")
          }

        >
          Back to Projects
        </Button>
      </Box>
    );
  }

  const isProfitPositive = summary.profitAndLoss >= 0;

  return (
    <Box sx={{ p: 4, background: "#f5f7fa", minHeight: "100vh" }}>
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" mb={3}>
        <Typography variant="h4" fontWeight="bold">
          Project P&L Analysis
        </Typography>
        {/* <Button
          variant="contained"
          sx={{ backgroundColor: "#1976D2", "&:hover": { backgroundColor: "#115293" } }}
          onClick={() => navigate("/projects/list")}
        >
          Back to Projects
        </Button> */}
        <Button
          variant="contained"
          sx={{ backgroundColor: "#1976D2", "&:hover": { backgroundColor: "#115293" } }}
          onClick={() =>
            navigate(
              from === "summary" ? "/projects/summary" : "/projects/list"
            )
          }
        >
          {from === "summary" ? "Back to Summary" : "Back to Projects"}
        </Button>

      </Stack>

      {/* Project Info */}
      <Card sx={{ mb: 3, borderRadius: 3, boxShadow: 3 }}>
        <CardContent sx={{ background: "linear-gradient(90deg, #42A5F5, #1976D2)", color: "white" }}>
          <Typography variant="h6">Project Details</Typography>
        </CardContent>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={6}><b>Project:</b> {summary.projectName}</Grid>
            <Grid item xs={6}><b>Client:</b> {summary.clientName}</Grid>
            <Grid item xs={6}><b>Location:</b> {summary.location}</Grid>
            <Grid item xs={6}><b>Status:</b> {summary.projectStatus}</Grid>
            <Grid item xs={6}><b>Start Date:</b> {summary.projectStartDate?.split("T")[0]}</Grid>
            <Grid item xs={6}><b>End Date:</b> {summary.projectEndDate?.split("T")[0]}</Grid>
          </Grid>
        </CardContent>
      </Card>

{/* latest */}
      {/* Financial Summary */}
      {/* <Grid container spacing={3} mb={3}>
        <Grid item xs={12} md={3}>
          <Card sx={{ borderRadius: 3, boxShadow: 3, background: "#E3F2FD" }}>
            <CardContent>
              <Typography variant="subtitle1" color="#0D47A1">Total Cost</Typography>
              <Typography variant="h5" fontWeight="bold">{summary.totalCost}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ borderRadius: 3, boxShadow: 3, background: "#FFF3E0" }}>
            <CardContent>
              <Typography variant="subtitle1" color="#EF6C00">Total VAT Paid</Typography>
              <Typography variant="h5" fontWeight="bold">{summary.totalVatPaid}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ borderRadius: 3, boxShadow: 3, background: "#E8F5E9" }}>
            <CardContent>
              <Typography variant="subtitle1" color="#2E7D32">Project Value</Typography>
              <Typography variant="h5" fontWeight="bold">{summary.projectValue}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ borderRadius: 3, boxShadow: 3, background: isProfitPositive ? "#E8F5E9" : "#FFEBEE" }}>
            <CardContent>
              <Typography variant="subtitle1" color={isProfitPositive ? "#2E7D32" : "#C62828"}>P & L</Typography>
              <Typography variant="h5" fontWeight="bold" color={isProfitPositive ? "green" : "red"}>
                {summary.profitAndLoss}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid> */}
{/*  */}
<Grid container spacing={3} mb={3}>
  <Grid item xs={12} md={2.4}>
    <Card sx={{ borderRadius: 3, background: "#E3F2FD" }}>
      <CardContent>
        <Typography>Total Cost</Typography>
        <Typography variant="h6">{summary.totalCost}</Typography>
      </CardContent>
    </Card>
  </Grid>

  <Grid item xs={12} md={2.4}>
    <Card sx={{ borderRadius: 3, background: "#FFF3E0" }}>
      <CardContent>
        <Typography>Total VAT Paid</Typography>
        <Typography variant="h6">{summary.totalVatPaid}</Typography>
      </CardContent>
    </Card>
  </Grid>

  <Grid item xs={12} md={2.4}>
    <Card sx={{ borderRadius: 3, background: "#E8F5E9" }}>
      <CardContent>
        <Typography>Project Value</Typography>
        <Typography variant="h6">{summary.projectValue}</Typography>
      </CardContent>
    </Card>
  </Grid>

  <Grid item xs={12} md={2.4}>
    <Card sx={{ borderRadius: 3, background: "#E1F5FE" }}>
      <CardContent>
        <Typography>VAT Received</Typography>
        <Typography variant="h6">{summary.vatReceived}</Typography>
      </CardContent>
    </Card>
  </Grid>

  <Grid item xs={12} md={2.4}>
          <Card sx={{ borderRadius: 3, background: isProfitPositive ? "#E8F5E9" : "#FFEBEE" }}>
            <CardContent>
              <Typography >P & L</Typography>
              <Typography variant="h6" color={isProfitPositive ? "green" : "red"}>
                {summary.profitAndLoss}
              </Typography>
            </CardContent>
          </Card>
  </Grid>

  <Grid item xs={12} md={2.4}>
    <Card
      sx={{
        borderRadius: 3,
        background: summary.vatToBePaid >= 0 ? "#E8F5E9" : "#FFEBEE"
      }}
    >
      <CardContent>
        <Typography>VAT to be Paid</Typography>
        <Typography
          variant="h6"
          color={summary.vatToBePaid >= 0 ? "green" : "red"}
        >
          {summary.vatToBePaid}
        </Typography>
      </CardContent>
    </Card>
  </Grid>
</Grid>


      {/* Expense Filters */}
      <Card sx={{ mb: 2, borderRadius: 3, boxShadow: 3, p: 2 }}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center">
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Category</InputLabel>
            <Select name="category" value={filters.category} onChange={handleFilterChange}>
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Cameras">Cameras</MenuItem>
              <MenuItem value="Access Control">Access Control</MenuItem>
              <MenuItem value="NVR">NVR</MenuItem>
              <MenuItem value="Switch">Switch</MenuItem>
              <MenuItem value="TV">TV</MenuItem>
              <MenuItem value="Computer">Computer</MenuItem>
              <MenuItem value="HDD">HDD</MenuItem>
              <MenuItem value="Cable">Cable</MenuItem>
              <MenuItem value="Accessories">Accessories</MenuItem>
              <MenuItem value="Tools">Tools</MenuItem>
              <MenuItem value="IT Equipment">IT Equipment</MenuItem>
              <MenuItem value="Software">Software</MenuItem>
              <MenuItem value="Product - Others">Product - Others</MenuItem>
              <MenuItem value="Services - Rental">Services - Rental</MenuItem>
              <MenuItem value="Services - Wages">Services - Wages</MenuItem>
              <MenuItem value="Services - Civil Work">Services - Civil Work</MenuItem>
              <MenuItem value="Services - Others">Services - Others</MenuItem>
              <MenuItem value="Logistics - Food">Logistics - Food</MenuItem>
              <MenuItem value="Logistics - Travel">Logistics - Travel</MenuItem>
              <MenuItem value="Logistics - Others">Logistics - Others</MenuItem>
              <MenuItem value="Overheads - Bonus">Overheads - Bonus</MenuItem>
              <MenuItem value="Overheads - Business">Overheads - Business</MenuItem>
            </Select>
          </FormControl>

          <TextField label="Paid To" name="paidTo" value={filters.paidTo} onChange={handleFilterChange} />
          <TextField label="Paid By" name="paidBy" value={filters.paidBy} onChange={handleFilterChange} />

          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Payment Type</InputLabel>
            <Select name="paymentType" value={filters.paymentType} onChange={handleFilterChange}>
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Cash">Cash</MenuItem>
              <MenuItem value="Transfer - Company">Transfer - Company</MenuItem>
              <MenuItem value="Transfer - Personal">Transfer - Personal</MenuItem>
              <MenuItem value="Cheque - Personal">Cheque - Personal</MenuItem>
              <MenuItem value="Cheque - Company">Cheque - Company</MenuItem>
            </Select>
          </FormControl>

          <Button variant="contained" onClick={applyFilters} sx={{ backgroundColor: "#1976D2" }}>Apply</Button>
          <Button variant="outlined" onClick={clearFilters}>Clear</Button>
        </Stack>
      </Card>

      {/* Expense Table */}
      <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#42A5F5" }}>
              <TableCell sx={{ color: "white" }}>Date</TableCell>
              <TableCell sx={{ color: "white" }}>Category</TableCell>
              <TableCell sx={{ color: "white" }}> Amount</TableCell>
              <TableCell sx={{ color: "white" }}>VAT</TableCell>
              <TableCell sx={{ color: "white" }}>Total
                <IconButton size="small" onClick={toggleSort} sx={{ color: "white" }}>
                  {sortOrder === "asc" ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />}
                </IconButton>
              </TableCell>
              <TableCell sx={{ color: "white" }}>Paid To</TableCell>
              <TableCell sx={{ color: "white" }}>Paid By</TableCell>
              <TableCell sx={{ color: "white" }}>Payment Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.map((e) => (
              <TableRow key={e._id}>
                <TableCell>{e.date?.split("T")[0]}</TableCell>
                <TableCell>{e.category || "All"}</TableCell>
                <TableCell>{e.amount}</TableCell>
                <TableCell>{e.vat}</TableCell>
                <TableCell>{e.totalAmount}</TableCell>
                <TableCell>{e.paidTo || "All"}</TableCell>
                <TableCell>{e.paidBy || "All"}</TableCell>
                <TableCell>{e.paymentType || "All"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ProjectPLAnalysis;
