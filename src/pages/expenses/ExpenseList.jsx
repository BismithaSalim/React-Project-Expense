// import React, { useState, useEffect, useCallback } from "react";
// import {
//   Box,
//   Typography,
//   Paper,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   CircularProgress,
//   Stack,
//   TablePagination
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { getExpenses } from "../../services/api";

// const ExpenseList = () => {
//   const navigate = useNavigate();

//   const [expenses, setExpenses] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);

//   const totalCount = expenses.length + page * rowsPerPage; // temp, ideally backend returns total

//   const fetchExpenses = useCallback(async () => {
//     try {
//       setLoading(true);
//       const res = await getExpenses(page + 1, rowsPerPage);
//       setExpenses(res.data.data || []);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to fetch expenses");
//     } finally {
//       setLoading(false);
//     }
//   }, [page, rowsPerPage]);

//   useEffect(() => {
//     fetchExpenses();
//   }, [fetchExpenses]);

//   return (
//     <Box sx={{ p: 5 }}>
//       <Stack direction="row" justifyContent="space-between" mb={3}>
//         <Typography variant="h4">Expenses</Typography>
//         <Button variant="contained" onClick={() => navigate("/expenses/add")}>
//           Add Expense
//         </Button>
//       </Stack>

//       {loading ? (
//         <Box sx={{ textAlign: "center", mt: 5 }}>
//           <CircularProgress />
//         </Box>
//       ) : (
//         <Paper sx={{ boxShadow: 6 }}>
//           <TableContainer>
//             <Table>
//               <TableHead sx={{ bgcolor: "primary.main" }}>
//                 <TableRow>
//                   <TableCell sx={{ color: "white" }}>Date</TableCell>
//                   <TableCell sx={{ color: "white" }}>Client</TableCell>
//                   <TableCell sx={{ color: "white" }}>Project</TableCell>
//                   <TableCell sx={{ color: "white" }}>Category</TableCell>
//                   <TableCell sx={{ color: "white" }}>Total Amount</TableCell>
//                   <TableCell sx={{ color: "white" }}>Payment Type</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {expenses.length === 0 ? (
//                   <TableRow>
//                     <TableCell colSpan={6} align="center">
//                       No expenses found
//                     </TableCell>
//                   </TableRow>
//                 ) : (
//                   expenses.map((e) => (
//                     <TableRow key={e._id}>
//                       <TableCell>{new Date(e.date).toLocaleDateString()}</TableCell>
//                       <TableCell>{e.clientRefId.clientName}</TableCell>
//                       <TableCell>{e.projectRefId.projectName}</TableCell>
//                       <TableCell>{e.category}</TableCell>
//                       <TableCell>{e.totalAmount}</TableCell>
//                       <TableCell>{e.paymentType}</TableCell>
//                     </TableRow>
//                   ))
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           <TablePagination
//             component="div"
//             count={totalCount}
//             page={page}
//             onPageChange={(e, newPage) => setPage(newPage)}
//             rowsPerPage={rowsPerPage}
//             onRowsPerPageChange={(e) => {
//               setRowsPerPage(parseInt(e.target.value, 10));
//               setPage(0);
//             }}
//             rowsPerPageOptions={[5, 10, 20]}
//           />
//         </Paper>
//       )}
//     </Box>
//   );
// };

// export default ExpenseList;

////latest//////////////////////////////////////////////////////////

// import React, { useState, useEffect, useCallback } from "react";
// import {
//   Box,
//   Typography,
//   Paper,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   CircularProgress,
//   Stack,
//   TablePagination,
//   IconButton
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import EditIcon from "@mui/icons-material/Edit";
// // import HomeIcon from "@mui/icons-material/Home";
// import { getExpenses } from "../../services/api";

// const ExpenseList = () => {
//   const navigate = useNavigate();

//   const [expenses, setExpenses] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);

//   const totalCount = expenses.length + page * rowsPerPage; // temp, ideally backend returns total

//   const fetchExpenses = useCallback(async () => {
//     try {
//       setLoading(true);
//       const res = await getExpenses(page + 1, rowsPerPage);
//       setExpenses(res.data.data || []);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to fetch expenses");
//     } finally {
//       setLoading(false);
//     }
//   }, [page, rowsPerPage]);

//   useEffect(() => {
//     fetchExpenses();
//   }, [fetchExpenses]);

//   return (
//     <Box sx={{ p: 5 }}>
//       <Stack direction="row" justifyContent="space-between" mb={3}>
//         <Typography variant="h4">Expenses</Typography>

//         <Stack direction="row" spacing={2}>
//           {/* <Button
//             variant="contained"
//             color="secondary"
//             startIcon={<HomeIcon />}
//             onClick={() => navigate("/")}
//           >
//             Home
//           </Button> */}

//           <Button
//             variant="contained"
//             color="primary"
//             onClick={() => navigate("/expenses/add")}
//           >
//             Add Expense
//           </Button>
//         </Stack>
//       </Stack>

//       {loading ? (
//         <Box sx={{ textAlign: "center", mt: 5 }}>
//           <CircularProgress />
//         </Box>
//       ) : (
//         <Paper sx={{ boxShadow: 6 }}>
//           <TableContainer>
//             <Table>
//               <TableHead sx={{ bgcolor: "primary.main" }}>
//                 <TableRow>
//                   <TableCell sx={{ color: "white" }}>Date</TableCell>
//                   <TableCell sx={{ color: "white" }}>Client</TableCell>
//                   <TableCell sx={{ color: "white" }}>Project</TableCell>
//                   <TableCell sx={{ color: "white" }}>Category</TableCell>
//                   <TableCell sx={{ color: "white" }}>Amount(w/o VAT)</TableCell>
//                   <TableCell sx={{ color: "white" }}>VAT</TableCell>
//                   <TableCell sx={{ color: "white" }}>Total Amount</TableCell>
//                   <TableCell sx={{ color: "white" }}>Payment Type</TableCell>
//                   <TableCell sx={{ color: "white" }}>Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {expenses.length === 0 ? (
//                   <TableRow>
//                     <TableCell colSpan={7} align="center">
//                       No expenses found
//                     </TableCell>
//                   </TableRow>
//                 ) : (
//                   expenses.map((e) => (
//                     <TableRow key={e._id}>
//                       <TableCell>{new Date(e.date).toLocaleDateString()}</TableCell>
//                       <TableCell>{e.clientRefId.clientName}</TableCell>
//                       <TableCell>{e.projectRefId.projectName}</TableCell>
//                       <TableCell>{e.category}</TableCell>
//                       <TableCell>{e.amount}</TableCell>
//                       <TableCell>{e.vat}</TableCell>
//                       <TableCell>{e.totalAmount}</TableCell>
//                       <TableCell>{e.paymentType}</TableCell>
//                       <TableCell>
//                         <IconButton
//                           color="primary"
//                           onClick={() => navigate(`/expenses/edit?id=${e._id}`)}
//                         >
//                           <EditIcon />
//                         </IconButton>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           <TablePagination
//             component="div"
//             count={totalCount}
//             page={page}
//             onPageChange={(e, newPage) => setPage(newPage)}
//             rowsPerPage={rowsPerPage}
//             onRowsPerPageChange={(e) => {
//               setRowsPerPage(parseInt(e.target.value, 10));
//               setPage(0);
//             }}
//             rowsPerPageOptions={[5, 10, 20]}
//           />
//         </Paper>
//       )}
//     </Box>
//   );
// };

// export default ExpenseList;

/////////////////////////////1st Deployment///////////////////////////////////////////
// import React, { useState, useEffect, useCallback } from "react";
// import {
//   Box,
//   Typography,
//   Paper,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   CircularProgress,
//   Stack,
//   TablePagination,
//   IconButton
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import EditIcon from "@mui/icons-material/Edit";
// import { getExpenses } from "../../services/api";

// const ExpenseList = () => {
//   const navigate = useNavigate();

//   const [expenses, setExpenses] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);

//   const totalCount = expenses.length + page * rowsPerPage;

//   const fetchExpenses = useCallback(async () => {
//     try {
//       setLoading(true);
//       const res = await getExpenses(page + 1, rowsPerPage);
//       setExpenses(res.data.data || []);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to fetch expenses");
//     } finally {
//       setLoading(false);
//     }
//   }, [page, rowsPerPage]);

//   useEffect(() => {
//     fetchExpenses();
//   }, [fetchExpenses]);

//   // const formatCurrency = (value) =>
//   //   new Intl.NumberFormat("en-OM", {
//   //     style: "currency",
//   //     currency: "OMR"
//   //   }).format(value || 0);

//   const th = (width) => ({
//     width: `${width}%`,
//     bgcolor: "primary.main",
//     color: "white",
//     fontWeight: 600,
//     whiteSpace: "nowrap"
//   });

//   const td = {
//     whiteSpace: "nowrap",
//     overflow: "hidden",
//     textOverflow: "ellipsis"
//   };

//   return (
//     <Box sx={{ p: 5 }}>
//       <Stack direction="row" justifyContent="space-between" mb={3}>
//         <Typography variant="h4">Expenses</Typography>

//         <Button
//           variant="contained"
//           color="primary"
//           onClick={() => navigate("/expenses/add")}
//         >
//           Add Expense
//         </Button>
//       </Stack>

//       {loading ? (
//         <Box sx={{ textAlign: "center", mt: 5 }}>
//           <CircularProgress />
//         </Box>
//       ) : (
//         <Paper sx={{ boxShadow: 6 }}>
//           <TableContainer sx={{ maxHeight: 500 }}>
//             <Table stickyHeader sx={{ tableLayout: "fixed" }}>
//               <TableHead>
//                 <TableRow>
//                   <TableCell sx={th(10)}>Date</TableCell>
//                   <TableCell sx={th(15)}>Client</TableCell>
//                   <TableCell sx={th(15)}>Project</TableCell>
//                   <TableCell sx={th(15)}>Category</TableCell>
//                   <TableCell sx={th(8)} align="right">
//                     Amount
//                   </TableCell>
//                   <TableCell sx={th(8)} align="right">
//                     VAT
//                   </TableCell>
//                   <TableCell sx={th(10)} align="right">
//                     Total
//                   </TableCell>
//                   {/* <TableCell sx={th(17)}>Payment</TableCell> */}
//                   <TableCell sx={th(8)} align="center">
//                     Actions
//                   </TableCell>
//                 </TableRow>
//               </TableHead>

//               <TableBody>
//                 {expenses.length === 0 ? (
//                   <TableRow>
//                     <TableCell colSpan={9} align="center">
//                       No expenses found
//                     </TableCell>
//                   </TableRow>
//                 ) : (
//                   expenses.map((e) => (
//                     <TableRow
//                       key={e._id}
//                       hover
//                       sx={{ "&:last-child td": { borderBottom: 0 } }}
//                     >
//                       <TableCell sx={td}>
//                         {new Date(e.date).toLocaleDateString()}
//                       </TableCell>
//                       <TableCell sx={td}>
//                         {e.clientRefId?.clientName}
//                       </TableCell>
//                       <TableCell sx={td}>
//                         {e.projectRefId?.projectName}
//                       </TableCell>
//                       <TableCell sx={td}>{e.category}</TableCell>
//                       <TableCell sx={td} align="right">
//                         {e.amount}
//                       </TableCell>
//                       <TableCell sx={td} align="right">
//                         {e.vat}
//                       </TableCell>
//                       <TableCell sx={td} align="right">
//                         {e.totalAmount}
//                       </TableCell>
//                       {/* <TableCell sx={td}>{e.paymentType}</TableCell> */}
//                       <TableCell align="center">
//                         <IconButton
//                           size="small"
//                           color="primary"
//                           onClick={() =>
//                             navigate(`/expenses/edit?id=${e._id}`)
//                           }
//                         >
//                           <EditIcon fontSize="small" />
//                         </IconButton>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           <TablePagination
//             component="div"
//             count={totalCount}
//             page={page}
//             onPageChange={(e, newPage) => setPage(newPage)}
//             rowsPerPage={rowsPerPage}
//             onRowsPerPageChange={(e) => {
//               setRowsPerPage(parseInt(e.target.value, 10));
//               setPage(0);
//             }}
//             rowsPerPageOptions={[5, 10, 20]}
//           />
//         </Paper>
//       )}
//     </Box>
//   );
// };

// export default ExpenseList;

/////////////////////////////////////////SUGGESTED CHANGES///////////////////////

// import React, { useState, useEffect, useCallback } from "react";
// import {
//   Box,
//   Typography,
//   Paper,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   CircularProgress,
//   Stack,
//   TablePagination,
//   IconButton
// } from "@mui/material";
// import { useNavigate, useLocation } from "react-router-dom";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { getExpenses, deleteExpense } from "../../services/api";

// const ExpenseList = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Read initial showDeleted from query param
//   const query = new URLSearchParams(location.search);
//   const initialShowDeleted = query.get("showDeleted") === "true";

//   const [expenses, setExpenses] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [showDeleted, setShowDeleted] = useState(initialShowDeleted);

//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [totalCount, setTotalCount] = useState(0);

//   // Fetch expenses with pagination & showDeleted
//   const fetchExpenses = useCallback(async () => {
//     try {
//       setLoading(true);
//       const res = await getExpenses(showDeleted, page + 1, rowsPerPage);
//       setExpenses(res.data.data || []);
//       setTotalCount(res.data.pagination?.totalRecords || res.data.data.length || 0);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to fetch expenses");
//     } finally {
//       setLoading(false);
//     }
//   }, [page, rowsPerPage, showDeleted]);

//   useEffect(() => {
//     fetchExpenses();
//   }, [fetchExpenses]);

//   const handleChangePage = (event, newPage) => setPage(newPage);
//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   // Delete or Restore expense
//   const handleDeleteRestore = async (id) => {
//     if (!window.confirm("Are you sure you want to delete/restore this expense?")) return;
//     try {
//       const res = await deleteExpense(id);
//       if (res.data.status === 100) {
//         fetchExpenses();
//       } else {
//         alert(res.data.message || "Action failed");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Action failed");
//     }
//   };

//   const th = (width) => ({
//     width: `${width}%`,
//     bgcolor: "primary.main",
//     color: "white",
//     fontWeight: 600,
//     whiteSpace: "nowrap"
//   });

//   const td = {
//     whiteSpace: "nowrap",
//     overflow: "hidden",
//     textOverflow: "ellipsis"
//   };

//   return (
//     <Box sx={{ p: 5 }}>
//       <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
//         <Typography variant="h4">Expenses</Typography>

//         <Stack direction="row" spacing={2}>
//           {/* Show Deleted / Show Active Toggle */}
//           <Button
//             variant="outlined"
//             color={showDeleted ? "success" : "secondary"}
//             onClick={() => {
//               setShowDeleted(!showDeleted);
//               setPage(0); // Reset to first page
//             }}
//           >
//             {showDeleted ? "Show Active" : "Show Deleted"}
//           </Button>

//           <Button
//             variant="contained"
//             color="primary"
//             onClick={() => navigate("/expenses/add")}
//           >
//             Add Expense
//           </Button>
//         </Stack>
//       </Stack>

//       {loading ? (
//         <Box sx={{ textAlign: "center", mt: 5 }}>
//           <CircularProgress />
//         </Box>
//       ) : (
//         <Paper sx={{ boxShadow: 6 }}>
//           <TableContainer sx={{ maxHeight: 500 }}>
//             <Table stickyHeader sx={{ tableLayout: "fixed" }}>
//               <TableHead>
//                 <TableRow>
//                   <TableCell sx={th(10)}>Date</TableCell>
//                   <TableCell sx={th(15)}>Client</TableCell>
//                   <TableCell sx={th(15)}>Project</TableCell>
//                   <TableCell sx={th(15)}>Category</TableCell>
//                   <TableCell sx={th(8)} align="right">Amount</TableCell>
//                   <TableCell sx={th(8)} align="right">VAT</TableCell>
//                   <TableCell sx={th(10)} align="right">Total</TableCell>
//                   <TableCell sx={th(8)} align="center">Actions</TableCell>
//                 </TableRow>
//               </TableHead>

//               <TableBody>
//                 {expenses.length === 0 ? (
//                   <TableRow>
//                     <TableCell colSpan={9} align="center">
//                       No expenses found
//                     </TableCell>
//                   </TableRow>
//                 ) : (
//                   expenses.map((e) => (
//                     <TableRow key={e._id} hover sx={{ "&:last-child td": { borderBottom: 0 } }}>
//                       <TableCell sx={td}>{new Date(e.date).toLocaleDateString()}</TableCell>
//                       <TableCell sx={td}>{e.clientRefId?.clientName}</TableCell>
//                       <TableCell sx={td}>{e.projectRefId?.projectName}</TableCell>
//                       <TableCell sx={td}>{e.category}</TableCell>
//                       <TableCell sx={td} align="right">{e.amount}</TableCell>
//                       <TableCell sx={td} align="right">{e.vat}</TableCell>
//                       <TableCell sx={td} align="right">{e.totalAmount}</TableCell>
//                       <TableCell align="center">
//                         <IconButton
//                           size="small"
//                           color="primary"
//                           onClick={() => navigate(`/expenses/edit?id=${e._id}`)}
//                         >
//                           <EditIcon fontSize="small" />
//                         </IconButton>

//                         <IconButton
//                           size="small"
//                           color={e.isActive ? "error" : "success"}
//                           onClick={() => handleDeleteRestore(e._id)}
//                           title={e.isActive ? "Delete Expense" : "Restore Expense"}
//                         >
//                           <DeleteIcon fontSize="small" />
//                         </IconButton>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           <TablePagination
//             component="div"
//             count={totalCount}
//             page={page}
//             onPageChange={handleChangePage}
//             rowsPerPage={rowsPerPage}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//             rowsPerPageOptions={[5, 10, 20]}
//           />
//         </Paper>
//       )}
//     </Box>
//   );
// };

// export default ExpenseList;


import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Stack,
  TablePagination,
  IconButton,
  FormControlLabel,
  Switch
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { getExpenses, deleteExpense } from "../../services/api";

const ExpenseList = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Read initial showDeleted from query param
  const query = new URLSearchParams(location.search);
  const initialShowDeleted = query.get("showDeleted") === "true";

  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDeleted, setShowDeleted] = useState(initialShowDeleted);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalCount, setTotalCount] = useState(0);

  // Fetch expenses
  const fetchExpenses = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getExpenses(page + 1, rowsPerPage, showDeleted);
      setExpenses(res.data.data || []);
      setTotalCount(res.data.pagination?.totalRecords || res.data.data.length || 0);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch expenses");
    } finally {
      setLoading(false);
    }
  }, [page, rowsPerPage, showDeleted]);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Delete / Restore
  const handleDeleteRestore = async (id) => {
    if (!window.confirm("Are you sure you want to delete/restore this expense?")) return;
    try {
      const res = await deleteExpense(id);
      if (res.data.status === 100) {
        fetchExpenses();
      } else {
        alert(res.data.message || "Action failed");
      }
    } catch (err) {
      console.error(err);
      alert("Action failed");
    }
  };

  const th = (width) => ({
    width: `${width}%`,
    bgcolor: "primary.main",
    color: "white",
    fontWeight: 600,
    whiteSpace: "nowrap"
  });

  const td = {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  };

  return (
    <Box sx={{ p: 5 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Expenses</Typography>

        <Stack direction="row" spacing={2} alignItems="center">
          {/* Toggle Switch */}
          <FormControlLabel
            control={
              <Switch
                checked={showDeleted}
                onChange={() => {
                  setShowDeleted(!showDeleted);
                  setPage(0); // reset page
                }}
                color="secondary"
              />
            }
            label={showDeleted ? "Showing Deleted" : "Showing Active"}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/expenses/add")}
          >
            Add Expense
          </Button>
        </Stack>
      </Stack>

      {loading ? (
        <Box sx={{ textAlign: "center", mt: 5 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Paper sx={{ boxShadow: 6 }}>
          <TableContainer sx={{ maxHeight: 500 }}>
            <Table stickyHeader sx={{ tableLayout: "fixed" }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={th(10)}>Date</TableCell>
                  <TableCell sx={th(15)}>Client</TableCell>
                  <TableCell sx={th(15)}>Project</TableCell>
                  <TableCell sx={th(15)}>Category</TableCell>
                  <TableCell sx={th(8)} align="right">Amount</TableCell>
                  <TableCell sx={th(8)} align="right">VAT</TableCell>
                  <TableCell sx={th(10)} align="right">Total</TableCell>
                  <TableCell sx={th(8)} align="center">Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {expenses.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} align="center">
                      No expenses found
                    </TableCell>
                  </TableRow>
                ) : (
                  expenses.map((e) => (
                    <TableRow key={e._id} hover sx={{ "&:last-child td": { borderBottom: 0 } }}>
                      <TableCell sx={td}>{new Date(e.date).toLocaleDateString()}</TableCell>
                      <TableCell sx={td}>{e.clientRefId?.clientName}</TableCell>
                      <TableCell sx={td}>{e.projectRefId?.projectName}</TableCell>
                      <TableCell sx={td}>{e.category}</TableCell>
                      <TableCell sx={td} align="right">{e.amount}</TableCell>
                      <TableCell sx={td} align="right">{e.vat}</TableCell>
                      <TableCell sx={td} align="right">{e.totalAmount}</TableCell>
                      <TableCell align="center">
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => navigate(`/expenses/edit?id=${e._id}`)}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>

                        <IconButton
                          size="small"
                          color={e.isActive ? "error" : "success"}
                          onClick={() => handleDeleteRestore(e._id)}
                          title={e.isActive ? "Delete Expense" : "Restore Expense"}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            component="div"
            count={totalCount}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 20]}
          />
        </Paper>
      )}
    </Box>
  );
};

export default ExpenseList;
