// import React, { useState, useEffect } from "react";
// import {
//   Box, Typography, Paper, Table, TableHead, TableRow, TableCell,
//   TableBody, IconButton, CircularProgress, Snackbar, Alert, Tooltip,
//   Dialog, DialogTitle, DialogContent, DialogActions, Grid, Button
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { getTenders, deleteTender } from "../../services/api";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";

// const TenderList = () => {
//   const [tenders, setTenders] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
//   const [detailsDialog, setDetailsDialog] = useState({ open: false, tender: null });

//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchTenders();
//   }, []);

//   const fetchTenders = async () => {
//     try {
//       setLoading(true);
//       const response = await getTenders();
//       if (response?.data?.status === 100) {
//         setTenders(response.data.data);
//       } else {
//         setSnackbar({ open: true, message: response?.data?.message || "Failed to fetch tenders", severity: "error" });
//       }
//     } catch (err) {
//       console.error(err);
//       setSnackbar({ open: true, message: "Error fetching tenders", severity: "error" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this tender?")) return;
//     try {
//       const response = await deleteTender(id);
//       if (response?.data?.status === 100) {
//         setSnackbar({ open: true, message: "Tender deleted successfully!", severity: "success" });
//         fetchTenders();
//       } else {
//         setSnackbar({ open: true, message: response?.data?.message || "Failed to delete", severity: "error" });
//       }
//     } catch (err) {
//       console.error(err);
//       setSnackbar({ open: true, message: "Error deleting tender", severity: "error" });
//     }
//   };

// //   const handleViewDetails = (tender) => {
// //     setDetailsDialog({ open: true, tender });
// //   };

//   return (
//     <Box sx={{ maxWidth: 1200, mx: "auto", mt: 4, mb: 4 }}>
//       <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
//         <Typography variant="h5" fontWeight="bold">Tender List</Typography>
//         <Button variant="contained" color="primary" onClick={() => navigate("/tender/add")}>Add Tender</Button>
//       </Box>

//       {loading ? (
//         <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}><CircularProgress /></Box>
//       ) : (
//         <Paper>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell><b>Tender Title</b></TableCell>
//                 <TableCell><b>Tender No</b></TableCell>
//                 <TableCell><b>Entity</b></TableCell>
//                 <TableCell><b>Bid Opened</b></TableCell>
//                 <TableCell><b>Tender Action</b></TableCell>
//                 <TableCell><b>Actions</b></TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {tenders.length === 0 ? (
//                 <TableRow>
//                   <TableCell colSpan={6} align="center">No tenders found</TableCell>
//                 </TableRow>
//               ) : (
//                 tenders.map((t) => (
//                   <TableRow key={t._id}>
//                     <TableCell>{t.tenderTitle}</TableCell>
//                     <TableCell>{t.tenderNo}</TableCell>
//                     <TableCell>{t.entity}</TableCell>
//                     <TableCell>{t.bidOpened ? "Yes" : "No"}</TableCell>
//                     <TableCell>{t.tenderAction}</TableCell>
//                     <TableCell>
//                       {/* <Tooltip title="View Details">
//                         <IconButton color="primary" onClick={() => handleViewDetails(t)}><VisibilityIcon /></IconButton>
//                       </Tooltip> */}
//                       <Tooltip title="Edit">
//                         <IconButton color="success" onClick={() => navigate(`/tender/edit/${t._id}`)}><EditIcon /></IconButton>
//                       </Tooltip>
//                       <Tooltip title="Delete">
//                         <IconButton color="error" onClick={() => handleDelete(t._id)}><DeleteIcon /></IconButton>
//                       </Tooltip>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               )}
//             </TableBody>
//           </Table>
//         </Paper>
//       )}

//       {/* Details Dialog */}
//       <Dialog open={detailsDialog.open} onClose={() => setDetailsDialog({ open: false, tender: null })} maxWidth="md" fullWidth>
//         <DialogTitle>Tender Details</DialogTitle>
//         <DialogContent dividers>
//           {detailsDialog.tender && (
//             <Grid container spacing={2}>
//               {Object.entries(detailsDialog.tender).map(([key, value]) => (
//                 <Grid item xs={12} sm={6} key={key}>
//                   <Typography variant="subtitle2">{key}</Typography>
//                   <Typography variant="body2">{String(value)}</Typography>
//                 </Grid>
//               ))}
//             </Grid>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setDetailsDialog({ open: false, tender: null })}>Close</Button>
//         </DialogActions>
//       </Dialog>

//       <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
//         <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>{snackbar.message}</Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default TenderList;

// src/pages/TenderList.js
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
//   TextField,
  Tooltip,
  CircularProgress,
  Snackbar,
  Alert,
  Switch,
  FormControlLabel,
//   Grid,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
  Button
} from "@mui/material";
import { useNavigate } from "react-router-dom";
// import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RestoreIcon from "@mui/icons-material/Restore";

import { getTenders, deleteTender } from "../../services/api";
import { getRole } from "../../utils/auth";

const TenderList = () => {
  const [tenders, setTenders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
//   const [detailsDialog, setDetailsDialog] = useState({ open: false, tender: null });
//   const [search, setSearch] = useState("");
  const [showDeleted, setShowDeleted] = useState(false);

  const navigate = useNavigate();
  const role = getRole();

  useEffect(() => {
    fetchTenders();
  }, [showDeleted]); // re-fetch when showDeleted changes

  const fetchTenders = async () => {
        try {
            setLoading(true);
            const response = await getTenders(showDeleted); // pass values directly
            if (response?.data?.status === 100) {
            setTenders(response.data.data); // API returns 'result'
            } else {
            setSnackbar({ open: true, message: response?.data?.message || "Failed to fetch tenders", severity: "error" });
            }
        } catch (err) {
            console.error(err);
            setSnackbar({ open: true, message: "Error fetching tenders", severity: "error" });
        } finally {
            setLoading(false);
        }
  };


    const handleDelete = async (id) => {
        try {

            const confirmMessage = showDeleted
            ? "Do you want to restore this tender?"
            : "Are you sure you want to delete this tender?";

            if (!window.confirm(confirmMessage)) return;

            const response = await deleteTender(id);

            if (response?.data?.status === 100) {
            setSnackbar({
                open: true,
                message: showDeleted
                ? "Tender restored successfully!"
                : "Tender deleted successfully!",
                severity: "success"
            });

            fetchTenders();
            } else {
            setSnackbar({
                open: true,
                message: response?.data?.message || "Action failed",
                severity: "error"
            });
            }

        } catch (err) {
            console.error(err);
            setSnackbar({
            open: true,
            message: "Error performing action",
            severity: "error"
            });
        }
    };
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this tender?")) return;
//     try {
//       const response = await deleteTender(id);
//       if (response?.data?.status === 100) {
//         setSnackbar({ open: true, message: "Tender deleted successfully!", severity: "success" });
//         fetchTenders();
//       } else {
//         setSnackbar({ open: true, message: response?.data?.message || "Failed to delete", severity: "error" });
//       }
//     } catch (err) {
//       console.error(err);
//       setSnackbar({ open: true, message: "Error deleting tender", severity: "error" });
//     }
//   };

//   const handleViewDetails = (tender) => {
//     setDetailsDialog({ open: true, tender });
//   };

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", mt: 4, mb: 4 }}>
      {/* Top toolbar */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
        <Typography variant="h5" fontWeight="bold">Tender List</Typography>

        {/* Search */}
        {/* <TextField
          label="Search Tender"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchTenders()}
        /> */}

        {/* Show Deleted Switch */}
        <FormControlLabel
          control={
            <Switch
              checked={showDeleted}
              onChange={(e) => setShowDeleted(e.target.checked)}
            />
          }
          label="Show Deleted"
        />

        <Button variant="contained" color="primary" onClick={() => navigate("/tender/add") } disabled={role === "viewer" || role === "editor"}>
          Add Tender
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>Tender Title</b></TableCell>
                <TableCell><b>Tender No</b></TableCell>
                <TableCell><b>Entity</b></TableCell>
                <TableCell><b>Bid Opened</b></TableCell>
                <TableCell><b>Tender Action</b></TableCell>
                <TableCell><b>Actions</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tenders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">No tenders found</TableCell>
                </TableRow>
              ) : (
                tenders.map((t) => (
                  <TableRow key={t._id}>
                    <TableCell>{t.tenderTitle}</TableCell>
                    <TableCell>{t.tenderNo}</TableCell>
                    <TableCell>{t.entity}</TableCell>
                    <TableCell>{t.bidOpened ? "Yes" : "No"}</TableCell>
                    <TableCell>{t.tenderAction}</TableCell>
                    <TableCell>
                      {/* <Tooltip title="View Details">
                        <IconButton color="primary" onClick={() => handleViewDetails(t)}>
                          <VisibilityIcon />
                        </IconButton>
                      </Tooltip> */}
                      {!showDeleted && (
                        <Tooltip title="Edit">
                          <IconButton color="success" onClick={() => navigate(`/tender/edit/${t._id}`)}
                            disabled={role === "viewer"}>
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                      {/* {!showDeleted && (
                        <Tooltip title="Delete">
                          <IconButton color="error" onClick={() => handleDelete(t._id)}>
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      )} */}
                      {showDeleted ? (
                            <Tooltip title="Restore">
                                <IconButton color="success" onClick={() => handleDelete(t._id)}
                                    disabled={role === "viewer"}>
                                <RestoreIcon />
                                </IconButton>
                            </Tooltip>
                            ) : (
                            <Tooltip title="Delete">
                                <IconButton color="error" onClick={() => handleDelete(t._id)}
                                    disabled={role === "viewer"}>
                                <DeleteIcon />
                                </IconButton>
                            </Tooltip>
                        )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Paper>
      )}

      {/* Tender Details Dialog */}
      {/* <Dialog open={detailsDialog.open} onClose={() => setDetailsDialog({ open: false, tender: null })} maxWidth="md" fullWidth>
        <DialogTitle>Tender Details</DialogTitle>
        <DialogContent dividers>
          {detailsDialog.tender && (
            <Grid container spacing={2}>
              {Object.entries(detailsDialog.tender).map(([key, value]) => (
                <Grid item xs={12} sm={6} key={key}>
                  <Typography variant="subtitle2">{key}</Typography>
                  <Typography variant="body2">{String(value)}</Typography>
                </Grid>
              ))}
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDetailsDialog({ open: false, tender: null })}>Close</Button>
        </DialogActions>
      </Dialog> */}

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TenderList;