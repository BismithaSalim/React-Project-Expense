import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getClients, getProjectsByClient, addExpense } from "../../services/api";

const AddExpense = () => {
  const navigate = useNavigate();

  const [clients, setClients] = useState([]);
  const [projects, setProjects] = useState([]);
  
  const categories = [
    "Cameras",
    "Access Control",
    "NVR",
    "Switch",
    "TV",
    "Computer",
    "HDD",
    "Cable",
    "Accessories",
    "Tools",
    "IT Equipment",
    "Software",
    "Product - Others",
    "Services - Rental",
    "Services - Wages",
    "Services - Civil Work",
    "Services - Others",
    "Logistics - Food",
    "Logistics - Travel",
    "Logistics - Others",
    "Overheads - Bonus",
    "Overheads - Business"
  ];

  const paymentTypes = [
    "Cash",
    "Transfer - Company",
    "Transfer - Personal",
    "Cheque - Personal",
    "Cheque - Company"
  ];

  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    clientRefId: "",
    projectRefId: "",
    category: "",
    model:"",
    amount: "",
    vat: "",
    totalAmount: 0,
    paidTo: "",
    paidBy: "",
    paymentType: ""
  });

  // Fetch clients
  useEffect(() => {
    const fetchClients = async () => {
      const res = await getClients(1, 100);
      setClients(res.data.data || []);
    };
    fetchClients();
  }, []);

  // Fetch projects when client changes
  useEffect(() => {
    if (!formData.clientRefId) return;
    const fetchProjects = async () => {
      const res = await getProjectsByClient(formData.clientRefId);
      setProjects(res.data.data || []);
    };
    fetchProjects();
  }, [formData.clientRefId]);

  // Update totalAmount whenever amount or VAT changes
  useEffect(() => {
    const amount = Number(formData.amount) || 0;
    const vat = Number(formData.vat) || 0;
    // console.log("amount",amount)
    // console.log("vat",vat)
    setFormData((prev) => ({ ...prev, totalAmount: amount + vat }));
  }, [formData.amount, formData.vat]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await addExpense(formData);
      alert("Expense added successfully!");
      navigate("/expenses/list");
    } catch (err) {
      console.error(err);
      alert("Failed to add expense");
    }
  };

  return (
    <Box sx={{ p: 5 }}>
      <Paper sx={{ p: 4, maxWidth: 800, mx: "auto" }}>
        <Typography variant="h5" mb={3}>
          Add Expense
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="Date"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            select
            label="Client Name"
            name="clientRefId"
            value={formData.clientRefId}
            onChange={handleChange}
          >
            {clients.map((c) => (
              <MenuItem key={c._id} value={c._id}>
                {c.clientName}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Project Name"
            name="projectRefId"
            value={formData.projectRefId}
            onChange={handleChange}
          >
            {projects.map((p) => (
              <MenuItem key={p._id} value={p._id}>
                {p.projectName}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            {categories.map((c) => (
              <MenuItem key={c} value={c}>{c}</MenuItem>
            ))}
          </TextField>

          <TextField
            label="Model"
            name="model"
            value={formData.model}
            onChange={handleChange}
          />

          <TextField
            label="Amount (w/o VAT)"
            name="amount"
            type="number"
            value={formData.amount}
            onChange={handleChange}
          />

          <TextField
            label="VAT"
            name="vat"
            type="number"
            value={formData.vat}
            onChange={handleChange}
          />

          <TextField
            label="Total Amount"
            name="totalAmount"
            value={formData.totalAmount}
            disabled
          />

          <TextField
            label="Paid To"
            name="paidTo"
            value={formData.paidTo}
            onChange={handleChange}
          />

          <TextField
            label="Paid By"
            name="paidBy"
            value={formData.paidBy}
            onChange={handleChange}
          />

          <TextField
            select
            label="Payment Type"
            name="paymentType"
            value={formData.paymentType}
            onChange={handleChange}
          >
            {paymentTypes.map((p) => (
              <MenuItem key={p} value={p}>{p}</MenuItem>
            ))}
          </TextField>

          <Button variant="contained" onClick={handleSubmit}>
            Save Expense
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default AddExpense;