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
  FormControlLabel,
  Switch,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { getUsers, deleteUser } from "../../services/api";
import { getRole } from "../../utils/auth";

const UserList = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(0); // 0-based
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalCount, setTotalCount] = useState(0);
  const [showDeleted, setShowDeleted] = useState(false); // new

  const role = getRole();

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getUsers(page + 1, rowsPerPage, showDeleted);
      setUsers(response.data.data || []);
      setTotalCount(response.data.pagination?.totalRecords || 0);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  }, [page, rowsPerPage, showDeleted]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteRestore = async (userId) => {
    if (!window.confirm("Are you sure you want to delete/restore this user?")) return;
    try {
      const res = await deleteUser(userId);
      if (res.data.status === 100) {
        alert("User updated successfully");
        fetchUsers(); // refresh list
      } else {
        alert(res.data.message || "Delete/Restore failed");
      }
    } catch (err) {
      console.error(err);
      alert("Delete/Restore failed");
    }
  };

  return (
    <Box sx={{ p: 5 }}>
      <Stack direction="row" justifyContent="space-between" mb={3}>
        <Typography variant="h4">Users</Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <FormControlLabel
            control={
              <Switch
                checked={showDeleted}
                onChange={(e) => setShowDeleted(e.target.checked)}
                color="primary"
              />
            }
            label="Show Deleted"
          />

          {role !== "viewer" && role !== "expenseEditor" && (
          <Button variant="contained" onClick={() => navigate("/users/add")}>
            Add User
          </Button>
          )}
        </Stack>
      </Stack>

      {loading ? (
        <Box sx={{ textAlign: "center", mt: 5 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Paper sx={{ boxShadow: 6 }}>
          <TableContainer>
            <Table>
              <TableHead sx={{ bgcolor: "primary.main" }}>
                <TableRow>
                  <TableCell sx={{ color: "white" }}>First Name</TableCell>
                  <TableCell sx={{ color: "white" }}>Last Name</TableCell>
                  <TableCell sx={{ color: "white" }}>Username</TableCell>
                  <TableCell sx={{ color: "white" }}>Email Id</TableCell>
                  <TableCell sx={{ color: "white" }}>Mobile No</TableCell>
                  <TableCell sx={{ color: "white" }}>Role</TableCell>
                  <TableCell sx={{ color: "white" }} align="center">Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {users.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={11} align="center">No users found</TableCell>
                  </TableRow>
                ) : (
                  users.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell>{user.firstName}</TableCell>
                      <TableCell>{user.lastName}</TableCell>
                      <TableCell>{user.userName}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.mobileNo}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell align="center">
                        {/* Edit icon */}
                        <IconButton
                          color="primary"
                          onClick={() => navigate(`/users/edit?id=${user._id}`)}
                          title="Edit User"
                          disabled={role === "viewer" || role === "expenseEditor" }
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>

                        {/* Delete/Restore icon */}
                        <IconButton
                          color={user.isActive ? "error" : "success"}
                          onClick={() => handleDeleteRestore(user._id)}
                          title={user.isActive ? "Delete User" : "Restore User"}
                          disabled={role === "viewer" || role === "expenseEditor"}
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
            rowsPerPageOptions={[5, 10, 20, 50]}
          />
        </Paper>
      )}
    </Box>
  );
};

export default UserList;