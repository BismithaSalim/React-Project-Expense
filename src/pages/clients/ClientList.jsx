// import React, { useEffect, useState } from "react";
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
//   Stack
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { getClients } from "../../services/api";

// const ClientList = () => {
//   const navigate = useNavigate();
//   const [clients, setClients] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch clients from backend
// //   const fetchClients = async () => {
// //     try {
// //       setLoading(true);
// //       const response = await getClients();
// //       setClients(response.data || []); // Adjust if your API wraps in data.result
// //     } catch (err) {
// //       console.error(err);
// //       alert("Failed to fetch clients");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// const fetchClients = async () => {
//   try {
//     setLoading(true);
//     const response = await getClients();
//     // pick the array from backend's result property
//     setClients(response.data.data || []);
//   } catch (err) {
//     console.error(err);
//     alert("Failed to fetch clients");
//   } finally {
//     setLoading(false);
//   }
// };


//   useEffect(() => {
//     fetchClients();
//   }, []);

//   return (
//     <Box sx={{ p: 5 }}>
//       <Stack
//         direction="row"
//         justifyContent="space-between"
//         alignItems="center"
//         mb={3}
//       >
//         <Typography variant="h4">Clients</Typography>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={() => navigate("/clients/add")}
//         >
//           Add Client
//         </Button>
//       </Stack>

//       {loading ? (
//         <Box sx={{ textAlign: "center", mt: 5 }}>
//           <CircularProgress />
//         </Box>
//       ) : (
//         <TableContainer component={Paper} sx={{ boxShadow: 6 }}>
//           <Table>
//             <TableHead sx={{ bgcolor: "primary.main" }}>
//               <TableRow>
//                 <TableCell sx={{ color: "white" }}>Client Name</TableCell>
//                 <TableCell sx={{ color: "white" }}>Type</TableCell>
//                 <TableCell sx={{ color: "white" }}>Status</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {clients.length === 0 ? (
//                 <TableRow>
//                   <TableCell colSpan={3} align="center">
//                     No clients found.
//                   </TableCell>
//                 </TableRow>
//               ) : (
//                 clients.map((client) => (
//                   <TableRow key={client._id || client.id}>
//                     <TableCell>{client.clientName}</TableCell>
//                     <TableCell>{client.type}</TableCell>
//                     <TableCell>{client.status}</TableCell>
//                   </TableRow>
//                 ))
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}
//     </Box>
//   );
// };

// export default ClientList;

// import React, { useEffect, useState } from "react";
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
// import EditIcon from "@mui/icons-material/Edit";
// import { useNavigate } from "react-router-dom";
// import { getClients } from "../../services/api";


// const ClientList = () => {
//   const navigate = useNavigate();
//   const [clients, setClients] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [page, setPage] = useState(0); // TablePagination is 0-based
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [totalClients, setTotalClients] = useState(0);

//   const fetchClients = async (pageNumber = page, pageSize = rowsPerPage) => {
//     try {
//       setLoading(true);

//       // Backend expects page starting from 1
//       const response = await getClients(pageNumber + 1, pageSize);

//       setClients(response.data.data || []); // your current API uses "data.data"
//       setTotalClients(response.data.totalCount || response.data.data.length); // fallback if totalCount not provided
//     } catch (err) {
//       console.error(err);
//       alert("Failed to fetch clients");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchClients();
//   }, [page, rowsPerPage]);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0); // reset to first page
//   };

//   return (
//     <Box sx={{ p: 5 }}>
//       <Stack
//         direction="row"
//         justifyContent="space-between"
//         alignItems="center"
//         mb={3}
//       >
//         <Typography variant="h4">Clients</Typography>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={() => navigate("/clients/add")}
//         >
//           Add Client
//         </Button>
//       </Stack>

//       {loading ? (
//         <Box sx={{ textAlign: "center", mt: 5 }}>
//           <CircularProgress />
//         </Box>
//       ) : (
//         <Paper>
//           <TableContainer sx={{ boxShadow: 6 }}>
//             <Table>
//               <TableHead sx={{ bgcolor: "primary.main" }}>
//                 <TableRow>
//                   <TableCell sx={{ color: "white" }}>Client Name</TableCell>
//                   <TableCell sx={{ color: "white" }}>Type</TableCell>
//                   <TableCell sx={{ color: "white" }}>Status</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {clients.length === 0 ? (
//                   <TableRow>
//                     <TableCell colSpan={3} align="center">
//                       No clients found.
//                     </TableCell>
//                   </TableRow>
//                 ) : (
//                   clients.map((client) => (
//                     <TableRow key={client._id || client.id}>
//                       <TableCell>{client.clientName}</TableCell>
//                       <TableCell>{client.type || "-"}</TableCell>
//                       <TableCell>{client.status || "-"}</TableCell>
//                       <TableCell>
//                             <IconButton
//                                 color="primary"
//                                 onClick={() => navigate(`/clients/edit/${client._id}`)}
//                                 >
//                                 <EditIcon />
//                             </IconButton>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           <TablePagination
//             component="div"
//             count={totalClients}
//             page={page}
//             onPageChange={handleChangePage}
//             rowsPerPage={rowsPerPage}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//             rowsPerPageOptions={[5, 10, 25, 50]}
//           />
//         </Paper>
//       )}
//     </Box>
//   );
// };

// export default ClientList;

//////////////////////////////////////1st Deployment/////////////////////////////////////////
// import React, { useEffect, useState, useCallback } from "react";
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
// import EditIcon from "@mui/icons-material/Edit";
// import { useNavigate } from "react-router-dom";
// import { getClients } from "../../services/api";

// const ClientList = () => {
//   const navigate = useNavigate();
//   const [clients, setClients] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [totalClients, setTotalClients] = useState(0);

//   // Wrap in useCallback
//   const fetchClients = useCallback(
//     async (pageNumber = page, pageSize = rowsPerPage) => {
//       try {
//         setLoading(true);
//         const response = await getClients(pageNumber + 1, pageSize);
//         setClients(response.data.data || []);
//         setTotalClients(
//           response.data.totalCount || response.data.data.length || 0
//         );
//       } catch (err) {
//         console.error(err);
//         alert("Failed to fetch clients");
//       } finally {
//         setLoading(false);
//       }
//     },
//     [page, rowsPerPage]
//   );

//   // Now use fetchClients as dependency
//   useEffect(() => {
//     fetchClients();
//   }, [fetchClients]);

//   const handleChangePage = (event, newPage) => setPage(newPage);
//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   return (
//     <Box sx={{ p: 5 }}>
//       <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
//         <Typography variant="h4">Clients</Typography>
//         <Button variant="contained" color="primary" onClick={() => navigate("/clients/add")}>
//           Add Client
//         </Button>
//       </Stack>

//       {loading ? (
//         <Box sx={{ textAlign: "center", mt: 5 }}>
//           <CircularProgress />
//         </Box>
//       ) : (
//         <Paper>
//           <TableContainer sx={{ boxShadow: 6 }}>
//             <Table>
//               <TableHead sx={{ bgcolor: "primary.main" }}>
//                 <TableRow>
//                   <TableCell sx={{ color: "white" }}>Client Name</TableCell>
//                   <TableCell sx={{ color: "white" }}>Type</TableCell>
//                   <TableCell sx={{ color: "white" }}>Status</TableCell>
//                   <TableCell sx={{ color: "white" }}>Edit</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {clients.length === 0 ? (
//                   <TableRow>
//                     <TableCell colSpan={4} align="center">No clients found.</TableCell>
//                   </TableRow>
//                 ) : (
//                   clients.map((client) => (
//                     <TableRow key={client._id || client.id}>
//                       <TableCell>{client.clientName}</TableCell>
//                       <TableCell>{client.type || "-"}</TableCell>
//                       <TableCell>{client.status || "-"}</TableCell>
//                       <TableCell>
//                         <IconButton
//                           color="primary"
//                           onClick={() => navigate(`/clients/edit?id=${client._id}`)}
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
//             count={totalClients}
//             page={page}
//             onPageChange={handleChangePage}
//             rowsPerPage={rowsPerPage}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//             rowsPerPageOptions={[5, 10, 25, 50]}
//           />
//         </Paper>
//       )}
//     </Box>
//   );
// };

// export default ClientList;


////////////////////////////Suggested Changes////////////////////////////////////////////
import React, { useEffect, useState, useCallback } from "react";
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
  TextField,
  Switch,
  FormControlLabel
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { getClients, deleteClient } from "../../services/api";
import { getRole } from "../../utils/auth";

const ClientList = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalClients, setTotalClients] = useState(0);

  const [showDeleted, setShowDeleted] = useState(false);

  const [search, setSearch] = useState("");

  const role = getRole();

  // Fetch clients
  const fetchClients = useCallback(
    async (pageNumber = page, pageSize = rowsPerPage) => {
      try {
        setLoading(true);
        const response = await getClients(pageNumber + 1, pageSize, showDeleted,search);

        setClients(response.data.data || []);
        setTotalClients(response.data?.totalCount || response.data.data.length || 0);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch clients");
      } finally {
        setLoading(false);
      }
    },
    [page, rowsPerPage, showDeleted,search]
  );

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  // Delete / Restore client
  const handleDeleteRestoreClient = async (clientId, isActive) => {
    const action = isActive ? "delete" : "restore";
    if (!window.confirm(`Are you sure you want to ${action} this client?`)) return;

    try {
      const res = await deleteClient(clientId); // your backend handles toggle isActive
      if (res.data.status === 100) {
        alert(`Client ${action}d successfully`);
        fetchClients();
      } else {
        alert(res.data.message || `${action} failed`);
      }
    } catch (err) {
      console.error(err);
      alert(`${action} failed`);
    }
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ p: 5 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Clients</Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <TextField
                        size="small"
                        placeholder="Search clients..."
                        value={search}
                        onChange={(e) => {
                          setSearch(e.target.value);
                          setPage(0);
                        }}
                      />
          <FormControlLabel
            control={
              <Switch
                checked={showDeleted}
                onChange={(e) => {
                  setShowDeleted(e.target.checked);
                  setPage(0);
                }}
                color="primary"
              />
            }
            label="Show Deleted"
          />
          {role !== "viewer" && role !== "expenseEditor" && (
          <Button variant="contained" color="primary" onClick={() => navigate("/clients/add")}>
            Add Client
          </Button>
          )}
        </Stack>
      </Stack>

      {loading ? (
        <Box sx={{ textAlign: "center", mt: 5 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Paper>
          <TableContainer sx={{ boxShadow: 6 }}>
            <Table>
              <TableHead sx={{ bgcolor: "primary.main" }}>
                <TableRow>
                  <TableCell sx={{ color: "white" }}>Client Name</TableCell>
                  <TableCell sx={{ color: "white" }}>Type</TableCell>
                  <TableCell sx={{ color: "white" }}>Status</TableCell>
                  <TableCell sx={{ color: "white" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {clients.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center">No clients found.</TableCell>
                  </TableRow>
                ) : (
                  clients.map((client) => (
                    <TableRow key={client._id || client.id}>
                      <TableCell>{client.clientName}</TableCell>
                      <TableCell>{client.type || "-"}</TableCell>
                      <TableCell>{client.status || "-"}</TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1}>
                          <IconButton
                            color="primary"
                            onClick={() => navigate(`/clients/edit?id=${client._id}`)}
                            disabled={role === "viewer" || role === "expenseEditor"}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            color={client.isActive ? "error" : "success"}
                            onClick={() => handleDeleteRestoreClient(client._id, client.isActive)}
                            disabled={role === "viewer" || role === "expenseEditor"}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            component="div"
            count={totalClients}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[10, 25, 50, 100]}
          />
        </Paper>
      )}
    </Box>
  );
};

export default ClientList;




