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
  Snackbar,
  Alert,
  FormControlLabel
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { getRateMasters, deleteRateMaster } from "../../services/api";
import { getRole } from "../../utils/auth";

const RateMasterList = () => {
  const navigate = useNavigate();
  const role = getRole();

  const [rateMasters, setRateMasters] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [total, setTotal] = useState(0);

  const [showDeleted, setShowDeleted] = useState(false);
  const [search, setSearch] = useState("");

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const fetchRateMasters = useCallback(
    async (pageNumber = page, pageSize = rowsPerPage) => {
      try {
        setLoading(true);
        const res = await getRateMasters(pageNumber + 1, pageSize, showDeleted, search);

        setRateMasters(res.data.data || []);
        setTotal(res.data.totalCount || 0);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch rate masters");
      } finally {
        setLoading(false);
      }
    },
    [page, rowsPerPage, showDeleted, search]
  );

  useEffect(() => {
    fetchRateMasters();
  }, [fetchRateMasters]);

//   const handleDeleteRestore = async (id, isActive) => {
//     const action = isActive ? "delete" : "restore";
//     if (!window.confirm(`Are you sure you want to ${action} this rate?`)) return;

//     try {
//       const res = await deleteRateMaster(id);
//       if (res.data.status === 100) {
//         alert(`Rate ${action}d successfully`);
//         fetchRateMasters();
//       } else {
//         alert(res.data.message || `${action} failed`);
//       }
//     } catch (err) {
//       console.error(err);
//       alert(`${action} failed`);
//     }
//   };

    const handleDeleteRestore = async (id, isActive) => {
    const action = isActive ? "delete" : "restore";
    //   if (!window.confirm(`Are you sure you want to ${action} this rate?`)) return;

    try {
        const res = await deleteRateMaster(id);
        if (res.data.status === 100) {
        setSnackbarMessage(`Rate ${action}d successfully`);
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        fetchRateMasters();
        } else {
        setSnackbarMessage(res.data.message || `${action} failed`);
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        }
    } catch (err) {
        console.error(err);
        setSnackbarMessage(`${action} failed`);
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
    }
    };

  return (
    <Box sx={{ p: 5 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Rate Master</Typography>

        <Stack direction="row" spacing={2} alignItems="center">
          <TextField
            size="small"
            placeholder="Search..."
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
              />
            }
            label="Show Deleted"
          />

          {role !== "viewer" && (
            <Button
              variant="contained"
              onClick={() => navigate("/ratemaster/add")}
            >
              Add Rate
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
          <TableContainer>
            <Table>
              <TableHead sx={{ bgcolor: "primary.main" }}>
                <TableRow>
                  <TableCell sx={{ color: "white" }}>Type</TableCell>
                  <TableCell sx={{ color: "white" }}>Rate-Muscat</TableCell>
                  <TableCell sx={{ color: "white" }}>Rate-Outside</TableCell>
                  <TableCell sx={{ color: "white" }}>Unit</TableCell>
                  <TableCell sx={{ color: "white" }}>Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {rateMasters.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      No records found
                    </TableCell>
                  </TableRow>
                ) : (
                  rateMasters.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell>{item.serviceName}</TableCell>
                      <TableCell>{item.muscatRate}</TableCell>
                      <TableCell>{item.outsideRate}</TableCell>
                      <TableCell>{item.unit}</TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1}>
                          <IconButton
                            color="primary"
                            onClick={() => navigate(`/ratemaster/edit/${item._id}`)}
                            disabled={role === "viewer"}
                          >
                            <EditIcon />
                          </IconButton>

                          <IconButton
                            color={item.isActive ? "error" : "success"}
                            onClick={() =>
                              handleDeleteRestore(item._id, item.isActive)
                            }
                            disabled={role === "viewer"}
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
            count={total}
            page={page}
            onPageChange={(e, newPage) => setPage(newPage)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10));
              setPage(0);
            }}
            rowsPerPageOptions={[10, 25, 50]}
          />

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
        </Paper>
      )}
    </Box>
  );
};

export default RateMasterList;