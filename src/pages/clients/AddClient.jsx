// import { useState } from "react";
// import {
//   Button,
//   Stack,
//   TextField,
//   Typography,
//   Paper,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Box,
//   Divider
// } from "@mui/material";
// import { addClient } from "../../services/api";

// const AddClient = () => {
//   const [clientName, setClientName] = useState("");
//   const [type, setClientType] = useState("");
//   const [status, setStatus] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async () => {
//     if (!clientName || !type || !status) {
//       return alert("Please fill all fields");
//     }

//     try {
//       setLoading(true);
//       await addClient({ clientName, type, status });
//       alert("Client added successfully");
//       setClientName("");
//       setClientType("");
//       setStatus("");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to add client");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         justifyContent: "center",
//         mt: 5,
//         mb: 5
//       }}
//     >
//       <Paper
//         elevation={8}
//         sx={{
//           p: 5,
//           maxWidth: 550,
//           width: "100%",
//           borderRadius: 3,
//           background: "linear-gradient(to right, #f0f4f8, #d9e2ec)"
//         }}
//       >
//         <Stack spacing={3}>
//           {/* Header */}
//           <Box textAlign="center">
//             <Typography variant="h4" fontWeight={600} gutterBottom>
//               Add New Client
//             </Typography>
//             <Typography variant="body1" color="text.secondary">
//               Fill out the client details below
//             </Typography>
//           </Box>

//           <Divider sx={{ borderColor: "gray.300" }} />

//           {/* Client Name */}
//           <TextField
//             label="Client Name"
//             value={clientName}
//             onChange={(e) => setClientName(e.target.value)}
//             fullWidth
//             variant="outlined"
//           />

//           {/* Client Type */}
//           <FormControl fullWidth variant="outlined">
//             <InputLabel>Type</InputLabel>
//             <Select
//               value={type}
//               label="Type"
//               onChange={(e) => setClientType(e.target.value)}
//             >
//               <MenuItem value="Ministry">Ministry</MenuItem>
//               <MenuItem value="Government">Government</MenuItem>
//               <MenuItem value="Semi Government">Semi Government</MenuItem>
//               <MenuItem value="Privat - Large Enterprise">Privat - Large Enterprise</MenuItem>
//               <MenuItem value="SM - Enterprise">SM - Enterprise</MenuItem>
//               <MenuItem value="Retail">Retail</MenuItem>
//             </Select>
//           </FormControl>

//           {/* Status */}
//           <FormControl fullWidth variant="outlined">
//             <InputLabel>Status</InputLabel>
//             <Select
//               value={status}
//               label="Status"
//               onChange={(e) => setStatus(e.target.value)}
//             >
//               <MenuItem value="Existing">Existing</MenuItem>
//               <MenuItem value="Potential">Potential</MenuItem>
//             </Select>
//           </FormControl>

//           {/* Submit Button */}
//           <Button
//             variant="contained"
//             size="large"
//             color="primary"
//             sx={{
//               py: 1.5,
//               fontWeight: 600,
//               borderRadius: 2,
//               textTransform: "none"
//             }}
//             onClick={handleSubmit}
//             disabled={loading}
//           >
//             {loading ? "Saving..." : "Save Client"}
//           </Button>
//         </Stack>
//       </Paper>
//     </Box>
//   );
// };

// export default AddClient;

/////////////////////////////////////////First deployment//////////////////
// import { useState } from "react";
// import {
//   Button,
//   Stack,
//   TextField,
//   Typography,
//   Paper,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Snackbar,
//   Alert
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { addClient } from "../../services/api";

// const AddClient = () => {
//   const navigate = useNavigate();

//   const [clientName, setClientName] = useState("");
//   const [type, setClientType] = useState("");
//   const [status, setStatus] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Snackbar state
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState("");
//   const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // success | error

//   const handleSubmit = async () => {
//     if (!clientName || !type || !status) {
//       setSnackbarMessage("Please fill all fields");
//       setSnackbarSeverity("error");
//       setSnackbarOpen(true);
//       return;
//     }

//     try {
//       setLoading(true);
//       await addClient({ clientName, type, status });

//       // Show success toast
//       setSnackbarMessage("Client added successfully");
//       setSnackbarSeverity("success");
//       setSnackbarOpen(true);

//       // Redirect after a short delay (to show the toast)
//       setTimeout(() => {
//         navigate("/clients/list");
//       }, 1000);
      
//     } catch (err) {
//       console.error(err);
//       setSnackbarMessage("Failed to add client");
//       setSnackbarSeverity("error");
//       setSnackbarOpen(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Paper sx={{ p: 4, maxWidth: 500, margin: "50px auto" }}>
//       <Stack spacing={3}>
//         <Typography variant="h4">Add Client</Typography>

//         {/* Client Name */}
//         <TextField
//           label="Client Name"
//           value={clientName}
//           onChange={(e) => setClientName(e.target.value)}
//           fullWidth
//         />

//         {/* Client Type */}
//         <FormControl fullWidth>
//           <InputLabel>Type</InputLabel>
//           <Select
//             value={type}
//             label="Type"
//             onChange={(e) => setClientType(e.target.value)}
//           >
//             <MenuItem value="Ministry">Ministry</MenuItem>
//             <MenuItem value="Government">Government</MenuItem>
//             <MenuItem value="Semi Government">Semi Government</MenuItem>
//             <MenuItem value="Private - Large Enterprise">Private - Large Enterprise</MenuItem>
//             <MenuItem value="SM - Enterprise">SM - Enterprise</MenuItem>
//             <MenuItem value="Retail">Retail</MenuItem>
//             <MenuItem value="Villa">Villa</MenuItem>
//             <MenuItem value="Others">Others</MenuItem>
//           </Select>
//         </FormControl>

//         {/* Status */}
//         <FormControl fullWidth>
//           <InputLabel>Status</InputLabel>
//           <Select
//             value={status}
//             label="Status"
//             onChange={(e) => setStatus(e.target.value)}
//           >
//             <MenuItem value="Existing">Existing</MenuItem>
//             <MenuItem value="Potential">Potential</MenuItem>
//           </Select>
//         </FormControl>

//         <Button
//           variant="contained"
//           onClick={handleSubmit}
//           disabled={loading}
//         >
//           {loading ? "Saving..." : "Save Client"}
//         </Button>
//       </Stack>

//       {/* Snackbar for notifications */}
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={3000}
//         onClose={() => setSnackbarOpen(false)}
//         anchorOrigin={{ vertical: "top", horizontal: "center" }}
//       >
//         <Alert
//           onClose={() => setSnackbarOpen(false)}
//           severity={snackbarSeverity}
//           sx={{ width: "100%" }}
//         >
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
//     </Paper>
//   );
// };

// export default AddClient;


import React, { useState } from "react";
import {
  TextField,
  Button,
  Paper,
  Stack,
  Typography,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { addClient } from "../../services/api";

const AddClient = () => {
  const navigate = useNavigate();

  const [clientName, setClientName] = useState("");
  const [type, setClientType] = useState("");
  const [otherType, setOtherType] = useState(""); // new state for "Other"
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleSubmit = async () => {
    let finalType = type;
    if (type === "Others") {
      if (!otherType.trim()) {
        setSnackbarMessage("Please specify the type");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        return;
      }
      finalType = otherType.trim(); // use the user-provided type
    }

    if (!clientName || !finalType || !status) {
      setSnackbarMessage("Please fill all fields");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    try {
      setLoading(true);
      await addClient({ clientName, type: finalType, status });

      setSnackbarMessage("Client added successfully");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      setTimeout(() => {
        navigate("/clients/list");
      }, 1000);
      
    } catch (err) {

      // console.error(err);
    
        if (err.response?.data?.status === 102) {
          setSnackbarMessage("Client already exists");
        } else if (err.response?.data?.errorDetails) {
          setSnackbarMessage(err.response.data.errorDetails);
        } else {
          setSnackbarMessage("Failed to add client");
        }

        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      // console.error(err);
      // setSnackbarMessage("Failed to add client");
      // setSnackbarSeverity("error");
      // setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 500, margin: "50px auto" }}>
      <Stack spacing={3}>
        <Typography variant="h4">Add Client</Typography>

        {/* Client Name */}
        <TextField
          label="Client Name"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          fullWidth
        />

        {/* Client Type */}
        <FormControl fullWidth>
          <InputLabel>Type</InputLabel>
          <Select
            value={type}
            label="Type"
            onChange={(e) => setClientType(e.target.value)}
          >
            <MenuItem value="Ministry">Ministry</MenuItem>
            <MenuItem value="Government">Government</MenuItem>
            <MenuItem value="Semi Government">Semi Government</MenuItem>
            <MenuItem value="Private - Large Enterprise">Private - Large Enterprise</MenuItem>
            <MenuItem value="SM - Enterprise">SM - Enterprise</MenuItem>
            <MenuItem value="Retail">Retail</MenuItem>
            <MenuItem value="Villa">Villa</MenuItem>
            <MenuItem value="Others">Others</MenuItem>
          </Select>
        </FormControl>

        {/* Show input only if "Others" is selected */}
        {type === "Others" && (
          <TextField
            label="Specify Type"
            value={otherType}
            onChange={(e) => setOtherType(e.target.value)}
            fullWidth
          />
        )}

        {/* Status */}
        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select
            value={status}
            label="Status"
            onChange={(e) => setStatus(e.target.value)}
          >
            <MenuItem value="Existing">Existing</MenuItem>
            <MenuItem value="Potential">Potential</MenuItem>
          </Select>
        </FormControl>

        <Button variant="contained" onClick={handleSubmit} disabled={loading}>
          {loading ? "Saving..." : "Save Client"}
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
  );
};

export default AddClient;