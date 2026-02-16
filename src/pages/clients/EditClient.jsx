// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { getClientById, updateClient } from "../../services/api";

// const EditClient = () => {
//   const { id: clientId } = useParams();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     clientName: "",
//     type: "",
//     status: ""
//   });

//   useEffect(() => {
//     const fetchClient = async () => {
//       try {
//         const res = await getClientById(clientId);
//         const c = res.data?.data?.[0]; // ✅ IMPORTANT

//         if (!c) return;

//         setFormData({
//           clientName: c.clientName,
//           type: c.type,
//           status: c.status
//         });
//       } catch (err) {
//         console.error(err);
//         alert("Failed to fetch client");
//       }
//     };

//     fetchClient();
//   }, [clientId]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await updateClient(clientId, formData);
//       alert("Client updated successfully");
//       navigate("/clients");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to update client");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Edit Client</h2>

//       <input
//         name="clientName"
//         value={formData.clientName}
//         onChange={handleChange}
//         placeholder="Client Name"
//         required
//       />

//       <select name="type" value={formData.type} onChange={handleChange}>
//         <option value="Ministry">Ministry</option>
//         <option value="Government">Government</option>
//         <option value="Semi Government">Semi Government</option>
//         <option value="Private">Private</option>
//       </select>

//       <select name="status" value={formData.status} onChange={handleChange}>
//         <option value="Existing">Existing</option>
//         <option value="Potential">Potential</option>
//       </select>

//       <button type="submit">Update Client</button>
//     </form>
//   );
// };

// export default EditClient;

/////////////////////////////////First deployment//////////////////////
// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Button,
//   Paper,
//   Stack,
//   TextField,
//   Typography,
//   MenuItem,
//   CircularProgress
// } from "@mui/material";
// import { useNavigate, useLocation } from "react-router-dom";
// import { getClientById, updateClient } from "../../services/api";

// const EditClient = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Get clientId from query string: /clients/edit?id=123
//   const queryParams = new URLSearchParams(location.search);
//   const clientId = queryParams.get("id");


//   const [formData, setFormData] = useState({
//     clientName: "",
//     type: "",
//     status: ""
//   });
//   const [loading, setLoading] = useState(true);

//   // Fetch client data
//   useEffect(() => {
//     const fetchClient = async () => {
//       try {
//         if (!clientId) return;
//         const res = await getClientById(clientId);
//         const c = res.data?.data?.[0];
//         console.log("c1",c.clientName)
//         console.log("c2",c.type)
//         if (c) {
//           setFormData({
//             clientName: c.clientName || "",
//             type: c.type || "",
//             status: c.status || ""
//           });
//         }
//       } catch (err) {
//         console.error(err);
//         alert("Failed to fetch client data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchClient();
//   }, [clientId]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleUpdate = async () => {
//     try {
//       await updateClient(clientId, formData);
//       alert("Client updated successfully!");
//       navigate("/clients/list");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to update client");
//     }
//   };

//   if (loading) {
//     return (
//       <Box sx={{ textAlign: "center", mt: 5 }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ p: 5 }}>
//       <Paper sx={{ p: 4, maxWidth: 600, mx: "auto" }}>
//         <Typography variant="h5" mb={3}>
//           Edit Client
//         </Typography>

//         <Stack spacing={2}>
//           <TextField
//             label="Client Name"
//             name="clientName"
//             value={formData.clientName}
//             onChange={handleChange}
//             fullWidth
//           />

//           <TextField
//             select
//             label="Type"
//             name="type"
//             value={formData.type}
//             onChange={handleChange}
//             fullWidth
//           >
//             {["Ministry", "Government", "Semi Government", "Private - Large Enterprise","SM - Enterprise","Retail"].map((t) => (
//               <MenuItem key={t} value={t}>
//                 {t}
//               </MenuItem>
//             ))}
//           </TextField>

//           <TextField
//             select
//             label="Status"
//             name="status"
//             value={formData.status}
//             onChange={handleChange}
//             fullWidth
//           >
//             {["Existing", "Potential"].map((s) => (
//               <MenuItem key={s} value={s}>
//                 {s}
//               </MenuItem>
//             ))}
//           </TextField>

//           <Button variant="contained" onClick={handleUpdate}>
//             Update Client
//           </Button>
//         </Stack>
//       </Paper>
//     </Box>
//   );
// };

// export default EditClient;

import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Stack,
  Typography,
  TextField,
  MenuItem,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  Snackbar,
  Alert
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { getClientById, updateClient } from "../../services/api";

const EditClient = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get clientId from query string: /clients/edit?id=123
  const queryParams = new URLSearchParams(location.search);
  const clientId = queryParams.get("id");

  const [formData, setFormData] = useState({
    clientName: "",
    type: "",
    otherType: "", // for "Others"
    status: ""
  });
  const [loading, setLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // Fetch client data
  useEffect(() => {
    const fetchClient = async () => {
      try {
        if (!clientId) return;
        const res = await getClientById(clientId);
        const c = res.data?.data?.[0];

        if (c) {
          setFormData({
            clientName: c.clientName || "",
            type: ["Ministry", "Government", "Semi Government", "Private - Large Enterprise","SM - Enterprise","Retail"].includes(c.type)
              ? c.type
              : "Others", // if not in predefined, show "Others"
            otherType: ["Ministry", "Government", "Semi Government", "Private - Large Enterprise","SM - Enterprise","Retail"].includes(c.type)
              ? ""
              : c.type, // store custom type
            status: c.status || ""
          });
        }
      } catch (err) {
        console.error(err);
        alert("Failed to fetch client data");
      } finally {
        setLoading(false);
      }
    };

    fetchClient();
  }, [clientId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    const finalType = formData.type === "Others" ? formData.otherType.trim() : formData.type;

    if (!formData.clientName || !finalType || !formData.status) {
      setSnackbarMessage("Please fill all fields");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    try {
      await updateClient(clientId, { ...formData, type: finalType });
      setSnackbarMessage("Client updated successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setTimeout(() => navigate("/clients/list"), 1000);
    } catch (err) {
      console.error(err);
      setSnackbarMessage("Failed to update client");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 5 }}>
      <Paper sx={{ p: 4, maxWidth: 600, mx: "auto" }}>
        <Typography variant="h5" mb={3}>
          Edit Client
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="Client Name"
            name="clientName"
            value={formData.clientName}
            onChange={handleChange}
            fullWidth
          />

          <FormControl fullWidth>
            <InputLabel>Type</InputLabel>
            <Select
              name="type"
              value={formData.type}
              label="Type"
              onChange={handleChange}
            >
              {["Ministry", "Government", "Semi Government", "Private - Large Enterprise","SM - Enterprise","Retail", "Others"].map((t) => (
                <MenuItem key={t} value={t}>
                  {t}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {formData.type === "Others" && (
            <TextField
              label="Specify Type"
              name="otherType"
              value={formData.otherType}
              onChange={handleChange}
              fullWidth
            />
          )}

          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={formData.status}
              label="Status"
              onChange={handleChange}
            >
              {["Existing", "Potential"].map((s) => (
                <MenuItem key={s} value={s}>
                  {s}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button variant="contained" onClick={handleUpdate}>
            Update Client
          </Button>
        </Stack>

        {/* Snackbar */}
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
    </Box>
  );
};

export default EditClient;

