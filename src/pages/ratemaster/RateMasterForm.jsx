import React, { useState } from "react";
import {
  TextField,
  Button,
  Paper,
  Stack,
  Typography,
  Snackbar,
  Alert,
  Box
} from "@mui/material";

const RateMasterForm = ({ initialValues, onSubmit, isEdit }) => {
  const [type, setType] = useState(initialValues?.type || "");
  const [rateMuscat, setRateMuscat] = useState(initialValues?.rateMuscat || "");
  const [rateOutside, setRateOutside] = useState(initialValues?.rateOutside || "");
  const [unit, setUnit] = useState(initialValues?.unit || "");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleSubmit = async () => {
    const newErrors = {};
    if (!type.trim()) newErrors.type = "Type is required";
    if (!rateMuscat.trim()) newErrors.rateMuscat = "Rate Muscat is required";
    if (!rateOutside.trim()) newErrors.rateOutside = "Rate Outside is required";
    if (!unit.trim()) newErrors.unit = "Unit is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      await onSubmit({ type: type.trim(), rateMuscat, rateOutside, unit: unit.trim() });

      setSnackbarMessage(isEdit ? "Rate updated successfully" : "Rate added successfully");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (err) {
      setSnackbarMessage("Failed to save rate");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="flex-start"
      minHeight="100vh"
      py={5}
    >
      <Paper
        sx={{
          p: 3,
          width: { xs: "90%", sm: 360, md: 400 },
          boxShadow: 3
        }}
      >
        <Stack spacing={2}>
          <Typography variant="h6" textAlign="center">
            {isEdit ? "Edit Rate" : "Add Rate"}
          </Typography>

          <TextField
            label="Type"
            value={type}
            onChange={(e) => {
              setType(e.target.value);
              setErrors(prev => ({ ...prev, type: "" }));
            }}
            error={!!errors.type}
            helperText={errors.type}
            size="small"
            fullWidth
          />

          <TextField
            label="Rate - Muscat"
            value={rateMuscat}
            onChange={(e) => {
              const val = e.target.value;
              if (/^\d*\.?\d*$/.test(val)) setRateMuscat(val);
              setErrors(prev => ({ ...prev, rateMuscat: "" }));
            }}
            error={!!errors.rateMuscat}
            helperText={errors.rateMuscat}
            size="small"
            fullWidth
          />

          <TextField
            label="Rate - Outside"
            value={rateOutside}
            onChange={(e) => {
              const val = e.target.value;
              if (/^\d*\.?\d*$/.test(val)) setRateOutside(val);
              setErrors(prev => ({ ...prev, rateOutside: "" }));
            }}
            error={!!errors.rateOutside}
            helperText={errors.rateOutside}
            size="small"
            fullWidth
          />

          <TextField
            label="Unit"
            value={unit}
            onChange={(e) => {
              setUnit(e.target.value);
              setErrors(prev => ({ ...prev, unit: "" }));
            }}
            error={!!errors.unit}
            helperText={errors.unit}
            size="small"
            fullWidth
          />

          <Button
            variant="contained"
            size="small"
            onClick={handleSubmit}
            disabled={loading}
            fullWidth
          >
            {loading ? "Saving..." : isEdit ? "Update" : "Create"}
          </Button>
        </Stack>

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

export default RateMasterForm;