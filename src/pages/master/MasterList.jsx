import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  CircularProgress,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { getMasterData, deleteMasterData } from "../../services/api";
import { useNavigate } from "react-router-dom";

const MasterDataList = () => {
  const [masterData, setMasterData] = useState([]);
  const [loading, setLoading] = useState(false);
//   const [types] = useState(["clientType", "status", "category"]); // predefined types
  const navigate = useNavigate();

  // Fetch master data
  const fetchMasterData = async () => {
    try {
      setLoading(true);
      const res = await getMasterData();
      if (res.data.status === 100) {
        setMasterData(res.data.data); // expected [{ _id, type, name, isActive }]
      } else {
        alert(res.data.message || "Failed to fetch master data");
      }
    } catch (err) {
      console.error(err);
      alert("Error fetching master data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMasterData();
  }, []);

  // Handle delete (soft delete)
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      const res = await deleteMasterData(id);
      if (res.data.status === 100) {
        alert("Deleted successfully");
        fetchMasterData(); // refresh the list
      } else {
        alert(res.data.message || "Delete failed");
      }
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  // Handle edit
  const handleEdit = (id) => {
    navigate(`/master-data/edit/${id}`);
  };

  // Handle add
  const handleAdd = () => {
    navigate("/master-data/add");
  };

  if (loading) return <CircularProgress />;

  return (
    <TableContainer component={Paper}>
      <Stack direction="row" justifyContent="space-between" mb={3}>
        <Typography variant="h4">Master Data</Typography>
        <Button variant="contained" onClick={handleAdd}>
          Add New Value
        </Button>
      </Stack>

      <Table>
        <TableHead sx={{ bgcolor: "primary.main" }}>
          <TableRow>
            <TableCell sx={{ color: "white" }}>Type</TableCell>
            <TableCell sx={{ color: "white" }}>Name</TableCell>
            <TableCell sx={{ color: "white" }} align="center">Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {masterData.length > 0 ? (
            masterData.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell align="center">
                  <IconButton color="primary" onClick={() => handleEdit(item._id)} title="Edit">
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(item._id)} title="Delete">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} align="center">
                No master data found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MasterDataList;