// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Paper,
//   Typography,
//   TextField,
//   Button,
//   Stack,
//   Snackbar,
//   Alert,
// } from "@mui/material";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   getRateMasterById,
//   createRateMaster,
//   updateRateMaster,
// } from "../../services/api";

// const AddEditRateMaster = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const isEdit = Boolean(id);
//   const [, setLoading] = useState(false);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState("");
//   const [snackbarSeverity, setSnackbarSeverity] = useState("success");

//   const [formValues, setFormValues] = useState({
//     serviceName: "",
//     muscatRate: "",
//     outsideRate: "",
//     unit: "",
//   });

//   useEffect(() => {
//     if (isEdit) fetchData();
//   }, [id]);

//   const fetchData = async () => {
//     try {
//       const res = await getRateMasterById(id);
//       if (res.data && res.data.data) {
//         setFormValues(res.data.data);
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Failed to load data");
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     // Numeric fields validation
//     if ((name === "muscatRate" || name === "outsideRate") && value && !/^\d*\.?\d*$/.test(value)) {
//       return;
//     }

//     setFormValues((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { serviceName, muscatRate, outsideRate, unit } = formValues;

//     if (!serviceName || !muscatRate || !outsideRate || !unit) {
//       alert("Please fill all required fields");
//       return;
//     }

//     try {
//       if (isEdit) {
//         await updateRateMaster(id, formValues);
//         setSnackbarMessage("Updated successfully");
//         setSnackbarSeverity("success");
//         setSnackbarOpen(true);
//       } else {
//         await createRateMaster(formValues);
//         setSnackbarMessage("Created successfully");
//         setSnackbarSeverity("success");
//         setSnackbarOpen(true);
//       }
//       setTimeout(() => {
//         navigate("/ratemaster/list");
//   }, 1000);
//     }  catch (err) {
//         setSnackbarMessage(err.response.data.errorDetails ||  "Failed to add client");
//         setSnackbarSeverity("error");
//         setSnackbarOpen(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         justifyContent: "center",
//         py: 5,
//       }}
//     >
//       <Paper
//         sx={{
//           p: 4,
//           width: { xs: "90%", sm: 500, md: 550 },
//         }}
//       >
//         <Typography variant="h5" mb={3} textAlign="center">
//           {isEdit ? "Edit Rate Master" : "Add Rate Master"}
//         </Typography>

//         <form onSubmit={handleSubmit}>
//           <Stack spacing={3}>
//             <TextField
//               fullWidth
//               label="Type"
//               name="serviceName"
//               value={formValues.serviceName}
//               onChange={handleChange}
//               size="medium"
//               required
//             />

//             <TextField
//               fullWidth
//               label="Rate - Muscat"
//               name="muscatRate"
//               value={formValues.muscatRate}
//               onChange={handleChange}
//               size="medium"
//               required
//             />

//             <TextField
//               fullWidth
//               label="Rate - Outside"
//               name="outsideRate"
//               value={formValues.outsideRate}
//               onChange={handleChange}
//               size="medium"
//                 required
//             />

//             <TextField
//               fullWidth
//               label="Unit"
//               name="unit"
//               value={formValues.unit}
//               onChange={handleChange}
//               size="medium"
//               required
//             />

//             {/* Button at the bottom */}
//             <Button
//               type="submit"
//               variant="contained"
//               color="primary"
//               size="medium"
//             >
//               {isEdit ? "Update" : "Create"}
//             </Button>
//           </Stack>
//         </form>

//         <Snackbar
//                 open={snackbarOpen}
//                 autoHideDuration={3000}
//                 onClose={() => setSnackbarOpen(false)}
//                 anchorOrigin={{ vertical: "top", horizontal: "center" }}
//               >
//                 <Alert
//                   onClose={() => setSnackbarOpen(false)}
//                   severity={snackbarSeverity}
//                   sx={{ width: "100%" }}
//                 >
//                   {snackbarMessage}
//                 </Alert>
//               </Snackbar>
//       </Paper>
//     </Box>
//   );
// };

// export default AddEditRateMaster;


import React, { useEffect, useState, useCallback } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import {
  getRateMasterById,
  createRateMaster,
  updateRateMaster,
} from "../../services/api";

const AddEditRateMaster = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [loading, setLoading] = useState(false); // ✅ proper loading state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const [formValues, setFormValues] = useState({
    serviceName: "",
    muscatRate: "",
    outsideRate: "",
    unit: "",
  });

  // ✅ fetchData wrapped in useCallback
  const fetchData = useCallback(async () => {
    setLoading(true); // start loader
    try {
      const res = await getRateMasterById(id);
      if (res.data && res.data.data) {
        setFormValues(res.data.data);
      }
    } catch (err) {
      console.error(err);
      setSnackbarMessage("Failed to load data");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setLoading(false); // stop loader
    }
  }, [id]);

  useEffect(() => {
    if (isEdit) fetchData();
  }, [isEdit, fetchData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Numeric fields validation
    if ((name === "muscatRate" || name === "outsideRate") && value && !/^\d*\.?\d*$/.test(value)) {
      return;
    }
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { serviceName, muscatRate, outsideRate, unit } = formValues;

    if (!serviceName || !muscatRate || !outsideRate || !unit) {
      setSnackbarMessage("Please fill all required fields");
      setSnackbarSeverity("warning");
      setSnackbarOpen(true);
      return;
    }

    setLoading(true); // start loader for submit
    try {
      if (isEdit) {
        await updateRateMaster(id, formValues);
        setSnackbarMessage("Updated successfully");
        setSnackbarSeverity("success");
      } else {
        await createRateMaster(formValues);
        setSnackbarMessage("Created successfully");
        setSnackbarSeverity("success");
      }
      setSnackbarOpen(true);

      // Navigate after short delay to show snackbar
      setTimeout(() => {
        navigate("/ratemaster/list");
      }, 1000);
    } catch (err) {
      console.error(err);
      setSnackbarMessage(err.response?.data?.message || "Failed to save data");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setLoading(false); // stop loader
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
      <Paper sx={{ p: 4, width: { xs: "90%", sm: 500, md: 550 }, position: "relative" }}>
        {loading && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "rgba(255,255,255,0.6)",
              zIndex: 10,
            }}
          >
            <CircularProgress />
          </Box>
        )}

        <Typography variant="h5" mb={3} textAlign="center">
          {isEdit ? "Edit Rate Master" : "Add Rate Master"}
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Type"
              name="serviceName"
              value={formValues.serviceName}
              onChange={handleChange}
              size="medium"
              required
            />

            <TextField
              fullWidth
              label="Rate - Muscat"
              name="muscatRate"
              value={formValues.muscatRate}
              onChange={handleChange}
              size="medium"
              required
            />

            <TextField
              fullWidth
              label="Rate - Outside"
              name="outsideRate"
              value={formValues.outsideRate}
              onChange={handleChange}
              size="medium"
              required
            />

            <TextField
              fullWidth
              label="Unit"
              name="unit"
              value={formValues.unit}
              onChange={handleChange}
              size="medium"
              required
            />

            <Button type="submit" variant="contained" color="primary" size="medium">
              {isEdit ? "Update" : "Create"}
            </Button>
          </Stack>
        </form>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: "100%" }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Paper>
    </Box>
  );
};

export default AddEditRateMaster;