// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Button,
//   MenuItem,
//   Paper,
//   Stack,
//   TextField,
//   Typography
// } from "@mui/material";
// import { useNavigate, useLocation } from "react-router-dom";
// import { getClients, getProjectsByClient, getExpenseById, updateExpense } from "../../services/api";

// const EditExpense = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // assume ?id=expenseId in query string
//   const queryParams = new URLSearchParams(location.search);
//   const expenseId = queryParams.get("id");

//   const [clients, setClients] = useState([]);
//   const [projects, setProjects] = useState([]);

//   const [formData, setFormData] = useState({
//     date: new Date().toISOString().substr(0, 10),
//     clientRefId: "",
//     projectRefId: "",
//     category: "",
//     amount: "",
//     vatAmount: "",
//     totalAmount: 0,
//     paidTo: "",
//     paidBy: "",
//     paymentType: ""
//   });

//   useEffect(() => {
//     fetchClients();
//     if (expenseId) fetchExpense();
//   }, [expenseId]);

//   useEffect(() => {
//     if (formData.clientRefId) fetchProjects(formData.clientRefId);
//   }, [formData.clientRefId]);

//   useEffect(() => {
//     const amount = Number(formData.amount) || 0;
//     const vat = Number(formData.vatAmount) || 0;
//     setFormData(prev => ({ ...prev, totalAmount: amount + vat }));
//   }, [formData.amount, formData.vatAmount]);

//   const fetchClients = async () => {
//     const res = await getClients(1, 100);
//     setClients(res.data.data || []);
//   };

//   const fetchProjects = async (clientId) => {
//     const res = await getProjectsByClient(clientId);
//     setProjects(res.data.data || []);
//   };

//   const fetchExpense = async () => {
//     const res = await getExpenseById({ id: expenseId }); // send ID in query
//     if (res.data && res.data.data) {
//       const e = res.data.data;
//       setFormData({
//         date: e.date.substr(0, 10),
//         clientRefId: e.clientRefId._id,
//         projectRefId: e.projectRefId._id,
//         category: e.category,
//         amount: e.amount,
//         vatAmount: e.vatAmount,
//         totalAmount: e.totalAmount,
//         paidTo: e.paidTo,
//         paidBy: e.paidBy,
//         paymentType: e.paymentType
//       });
//       fetchProjects(e.clientRefId._id);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleUpdate = async () => {
//     try {
//       await updateExpense({ id: expenseId }, formData);
//       alert("Expense updated successfully!");
//       navigate("/expenses/list");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to update expense");
//     }
//   };

//   return (
//     <Box sx={{ p: 5 }}>
//       <Paper sx={{ p: 4, maxWidth: 800, mx: "auto" }}>
//         <Typography variant="h5" mb={3}>
//           Edit Expense
//         </Typography>

//         <Stack spacing={2}>
//           <TextField
//             type="date"
//             label="Date"
//             name="date"
//             value={formData.date}
//             onChange={handleChange}
//             InputLabelProps={{ shrink: true }}
//           />

//           <TextField
//             select
//             label="Client Name"
//             name="clientRefId"
//             value={formData.clientRefId}
//             onChange={handleChange}
//             fullWidth
//           >
//             {clients.map(c => (
//               <MenuItem key={c._id} value={c._id}>
//                 {c.clientName}
//               </MenuItem>
//             ))}
//           </TextField>

//           <TextField
//             select
//             label="Project Name"
//             name="projectRefId"
//             value={formData.projectRefId}
//             onChange={handleChange}
//             fullWidth
//           >
//             {projects.map(p => (
//               <MenuItem key={p._id} value={p._id}>
//                 {p.projectName}
//               </MenuItem>
//             ))}
//           </TextField>

//           <TextField
//             label="Category"
//             name="category"
//             value={formData.category}
//             onChange={handleChange}
//             fullWidth
//           />

//           <TextField
//             label="Amount (w/o VAT)"
//             name="amount"
//             type="number"
//             value={formData.amount}
//             onChange={handleChange}
//             fullWidth
//           />

//           <TextField
//             label="VAT"
//             name="vatAmount"
//             type="number"
//             value={formData.vatAmount}
//             onChange={handleChange}
//             fullWidth
//           />

//           <TextField
//             label="Total Amount"
//             name="totalAmount"
//             value={formData.totalAmount}
//             disabled
//             fullWidth
//           />

//           <TextField
//             label="Paid To"
//             name="paidTo"
//             value={formData.paidTo}
//             onChange={handleChange}
//             fullWidth
//           />

//           <TextField
//             label="Paid By"
//             name="paidBy"
//             value={formData.paidBy}
//             onChange={handleChange}
//             fullWidth
//           />

//           <TextField
//             select
//             label="Payment Type"
//             name="paymentType"
//             value={formData.paymentType}
//             onChange={handleChange}
//             fullWidth
//           >
//             {[
//               "Cash",
//               "Transfer - Company",
//               "Transfer - Personal",
//               "Cheque - Personal",
//               "Cheque - Company"
//             ].map(pt => (
//               <MenuItem key={pt} value={pt}>
//                 {pt}
//               </MenuItem>
//             ))}
//           </TextField>

//           <Button variant="contained" onClick={handleUpdate}>
//             Update Expense
//           </Button>
//         </Stack>
//       </Paper>
//     </Box>
//   );
// };

// export default EditExpense;


import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { getClients, getProjectsByClient, getExpenseById, updateExpense } from "../../services/api";

const EditExpense = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get expenseId from query string
  const queryParams = new URLSearchParams(location.search);
  const expenseId = queryParams.get("id");

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

  const [formData, setFormData] = useState({
    date: new Date().toISOString().substr(0, 10),
    clientRefId: "",
    projectRefId: "",
    category: "",
    model:"",
    amount: "",
    vatAmount: "",
    totalAmount: 0,
    paidTo: "",
    paidBy: "",
    paymentType: ""
  });

  // Fetch clients and expense data
 useEffect(() => {
  const fetchData = async () => {
    try {
      const clientsRes = await getClients(1, 100);
      setClients(clientsRes.data.data || []);

      if (expenseId) {
        const expenseRes = await getExpenseById(expenseId);
        const e = expenseRes.data?.data?.[0]; // ✅ FIX

        if (!e) return;

        setFormData({
          date: e.date.substring(0, 10),
          clientRefId: e.clientRefId._id,
          projectRefId: e.projectRefId._id,
          category: e.category,
          model:e.model,
          amount: e.amount,
          vatAmount: e.vat,
          totalAmount: e.totalAmount,
          paidTo: e.paidTo,
          paidBy: e.paidBy,
          paymentType: e.paymentType
        });

        const projectsRes = await getProjectsByClient(e.clientRefId._id);
        setProjects(projectsRes.data.data || []);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to fetch data");
    }
  };

  fetchData();
}, [expenseId]);


  // Fetch projects whenever client changes
  useEffect(() => {
    const fetchClientProjects = async () => {
      if (!formData.clientRefId) return;
      try {
        const res = await getProjectsByClient(formData.clientRefId);
        setProjects(res.data.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchClientProjects();
  }, [formData.clientRefId]);

  // Calculate totalAmount whenever amount or vat changes
  useEffect(() => {
    const amount = Number(formData.amount) || 0;
    const vat = Number(formData.vatAmount) || 0;
    // console.log("amount",amount)
    // console.log("vat",vat)
    setFormData(prev => ({ ...prev, totalAmount: amount + vat }));
  }, [formData.amount, formData.vatAmount]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await updateExpense(expenseId, formData);
      alert("Expense updated successfully!");
      navigate("/expenses/list");
    } catch (err) {
      console.error(err);
      alert("Failed to update expense");
    }
  };

  return (
    <Box sx={{ p: 5 }}>
      <Paper sx={{ p: 4, maxWidth: 800, mx: "auto" }}>
        <Typography variant="h5" mb={3}>
          Edit Expense
        </Typography>

        <Stack spacing={2}>
          <TextField
            type="date"
            label="Date"
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
            fullWidth
          >
            {clients.map(c => (
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
            fullWidth
          >
            {projects.map(p => (
              <MenuItem key={p._id} value={p._id}>
                {p.projectName}
              </MenuItem>
            ))}
          </TextField>

          {/* <TextField
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            fullWidth
          /> */}

          <TextField
            select
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            fullWidth
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Model"
            name="model"
            value={formData.model}
            onChange={handleChange}
            fullWidth
          />


          <TextField
            label="Amount (w/o VAT)"
            name="amount"
            type="number"
            value={formData.amount}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="VAT"
            name="vatAmount"
            type="number"
            value={formData.vatAmount}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Total Amount"
            name="totalAmount"
            value={formData.totalAmount}
            disabled
            fullWidth
          />

          <TextField
            label="Paid To"
            name="paidTo"
            value={formData.paidTo}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Paid By"
            name="paidBy"
            value={formData.paidBy}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            select
            label="Payment Type"
            name="paymentType"
            value={formData.paymentType}
            onChange={handleChange}
            fullWidth
          >
            {[
              "Cash",
              "Transfer - Company",
              "Transfer - Personal",
              "Cheque - Personal",
              "Cheque - Company"
            ].map(pt => (
              <MenuItem key={pt} value={pt}>
                {pt}
              </MenuItem>
            ))}
          </TextField>

          <Button variant="contained" onClick={handleUpdate}>
            Update Expense
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default EditExpense;
