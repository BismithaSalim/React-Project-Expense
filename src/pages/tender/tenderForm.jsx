// src/pages/AddTender.js
// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Card,
//   CardContent,
//   Grid,
//   TextField,
//   MenuItem,
//   Typography,
//   Button,
//   Switch,
//   FormControlLabel,
//   Snackbar,
//   Alert,
//   InputAdornment,
//   CircularProgress,
// } from "@mui/material";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   addTender,
//   updateTender,
//   getTenderById,
// } from "../../services/api";

// import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
// import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
// import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
// import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
// import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
// import FolderIcon from "@mui/icons-material/Folder";
// import LinkIcon from "@mui/icons-material/Link";
// import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

// const portalTypes = ["Etendering", "OQ", "OBB", "Omantel", "PDO", "Others"];
// const tenderActions = ["Bid", "No Bid"];

// const AddTender = () => {
//   const navigate = useNavigate();
//   const { tenderId } = useParams();

//   const [form, setForm] = useState({
//     portal: "",
//     tenderTitle: "",
//     tenderNo: "",
//     entity: "",
//     tenderSalesEndDate: "",
//     prebidClarificationEndDate: "",
//     bidClosingDate: "",
//     tenderFee: "",
//     category: "",
//     action: "",
//     actionSrc: "",
//     actionUrl: "",
//     docsFolder: "",
//     bidOpened: false,
//     tenderAction: "Bid",
//   });

//   const [loading, setLoading] = useState(false);
//   const [loadingFetch, setLoadingFetch] = useState(false);
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });

//   useEffect(() => {
//     if (tenderId) fetchTenderById();
//   }, [tenderId]);

//   // ---------------------
//   // Fetch tender for edit
//   // ---------------------
//   const fetchTenderById = async () => {
//     try {
//       setLoadingFetch(true);
//       const response = await getTenderById(tenderId);
//       if (response?.data?.status === 100) {
//         const tender = response.data.result;
//         setForm({
//           ...tender,
//           tenderSalesEndDate: tender.tenderSalesEndDate?.slice(0, 10),
//           prebidClarificationEndDate: tender.prebidClarificationEndDate?.slice(0, 10),
//           bidClosingDate: tender.bidClosingDate?.slice(0, 10),
//         });
//       } else {
//         setSnackbar({
//           open: true,
//           message: response?.data?.message || "Failed to fetch tender",
//           severity: "error",
//         });
//       }
//     } catch (err) {
//       console.error(err);
//       setSnackbar({ open: true, message: "Error fetching tender", severity: "error" });
//     } finally {
//       setLoadingFetch(false);
//     }
//   };

//   // ---------------------
//   // Handle field changes
//   // ---------------------
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//   };

//   const handleSwitch = (e) => {
//     setForm({ ...form, bidOpened: e.target.checked });
//   };

//   // ---------------------
//   // Submit form
//   // ---------------------
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validation
//     const requiredFields = ["portal", "tenderTitle", "tenderNo", "entity"];
//     for (let field of requiredFields) {
//       if (!form[field]) {
//         setSnackbar({ open: true, message: `Please fill ${field}`, severity: "error" });
//         return;
//       }
//     }

//     try {
//       setLoading(true);
//       let response;
//       if (tenderId) {
//         response = await updateTender(tenderId, form);
//       } else {
//         response = await addTender(form);
//       }

//       if (response?.data?.status === 100) {
//         setSnackbar({
//           open: true,
//           message: tenderId ? "Tender updated successfully!" : "Tender added successfully!",
//           severity: "success",
//         });
//         setTimeout(() => navigate("/tender/list"), 1000);
//       } else {
//         setSnackbar({
//           open: true,
//           message: response?.data?.message || "Failed to save tender",
//           severity: "error",
//         });
//       }
//     } catch (err) {
//       console.error(err);
//       setSnackbar({ open: true, message: "Something went wrong", severity: "error" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loadingFetch) return <CircularProgress sx={{ display: "block", mx: "auto", mt: 8 }} />;

//   return (
//     <Box sx={{ maxWidth: 1000, mx: "auto", mt: 4, mb: 4 }}>
//       <Typography variant="h5" gutterBottom fontWeight="bold">
//         {tenderId ? "Edit Tender" : "Add Tender"}
//       </Typography>
//       <form onSubmit={handleSubmit}>
//         <Card sx={{ mb: 3, p: 2 }}>
//           <CardContent>
//             <Grid container spacing={2}>
//               {/* Portal */}
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   select
//                   fullWidth
//                   label="Portal"
//                   name="portal"
//                   value={form.portal}
//                   onChange={handleChange}
//                   required
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <ReceiptLongIcon />
//                       </InputAdornment>
//                     ),
//                   }}
//                   disabled={!!tenderId} // optional: disable portal on edit
//                 >
//                   {portalTypes.map((type) => (
//                     <MenuItem key={type} value={type}>{type}</MenuItem>
//                   ))}
//                 </TextField>
//               </Grid>

//               {/* Tender Title */}
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Tender Title"
//                   name="tenderTitle"
//                   value={form.tenderTitle}
//                   onChange={handleChange}
//                   required
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <ReceiptLongIcon />
//                       </InputAdornment>
//                     ),
//                   }}
//                 />
//               </Grid>

//               {/* Tender No */}
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Tender No"
//                   name="tenderNo"
//                   value={form.tenderNo}
//                   onChange={handleChange}
//                   required
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <ConfirmationNumberIcon />
//                       </InputAdornment>
//                     ),
//                   }}
//                 />
//               </Grid>

//               {/* Entity */}
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Entity"
//                   name="entity"
//                   value={form.entity}
//                   onChange={handleChange}
//                   required
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <AccountBalanceIcon />
//                       </InputAdornment>
//                     ),
//                   }}
//                 />
//               </Grid>

//               {/* Dates */}
//               <Grid item xs={12} sm={4}>
//                 <TextField
//                   fullWidth
//                   label="Tender Sales End Date"
//                   name="tenderSalesEndDate"
//                   type="date"
//                   value={form.tenderSalesEndDate}
//                   onChange={handleChange}
//                   InputLabelProps={{ shrink: true }}
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <CalendarTodayIcon />
//                       </InputAdornment>
//                     ),
//                   }}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <TextField
//                   fullWidth
//                   label="Prebid Clarification End Date"
//                   name="prebidClarificationEndDate"
//                   type="date"
//                   value={form.prebidClarificationEndDate}
//                   onChange={handleChange}
//                   InputLabelProps={{ shrink: true }}
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <CalendarTodayIcon />
//                       </InputAdornment>
//                     ),
//                   }}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <TextField
//                   fullWidth
//                   label="Bid Closing Date"
//                   name="bidClosingDate"
//                   type="date"
//                   value={form.bidClosingDate}
//                   onChange={handleChange}
//                   InputLabelProps={{ shrink: true }}
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <CalendarTodayIcon />
//                       </InputAdornment>
//                     ),
//                   }}
//                 />
//               </Grid>

//               {/* Tender Fee */}
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   type="number"
//                   label="Tender Fee"
//                   name="tenderFee"
//                   value={form.tenderFee}
//                   onChange={handleChange}
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <MonetizationOnIcon />
//                       </InputAdornment>
//                     ),
//                   }}
//                 />
//               </Grid>

//               {/* Category */}
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Category"
//                   name="category"
//                   value={form.category}
//                   onChange={handleChange}
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <AssignmentTurnedInIcon />
//                       </InputAdornment>
//                     ),
//                   }}
//                 />
//               </Grid>

//               {/* Action / Source / URL / Docs */}
//               <Grid item xs={12} sm={6}>
//                 <TextField fullWidth label="Action" name="action" value={form.action} onChange={handleChange} />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField fullWidth label="Action Source" name="actionSrc" value={form.actionSrc} onChange={handleChange} />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Action URL"
//                   name="actionUrl"
//                   value={form.actionUrl}
//                   onChange={handleChange}
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <LinkIcon />
//                       </InputAdornment>
//                     ),
//                   }}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Docs Folder"
//                   name="docsFolder"
//                   value={form.docsFolder}
//                   onChange={handleChange}
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <FolderIcon />
//                       </InputAdornment>
//                     ),
//                   }}
//                 />
//               </Grid>

//               {/* Bid Opened */}
//               <Grid item xs={12} sm={6}>
//                 <FormControlLabel
//                   control={<Switch checked={form.bidOpened} onChange={handleSwitch} />}
//                   label="Bid Opened"
//                 />
//               </Grid>

//               {/* Tender Action */}
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   select
//                   fullWidth
//                   label="Tender Action"
//                   name="tenderAction"
//                   value={form.tenderAction}
//                   onChange={handleChange}
//                 >
//                   {tenderActions.map((ta) => (
//                     <MenuItem key={ta} value={ta}>{ta}</MenuItem>
//                   ))}
//                 </TextField>
//               </Grid>
//             </Grid>
//           </CardContent>
//         </Card>

//         {/* Submit / Cancel */}
//         <Box sx={{ display: "flex", gap: 2 }}>
//           <Button variant="contained" type="submit" disabled={loading}>
//             {loading ? <CircularProgress size={22} /> : "Submit"}
//           </Button>
//           <Button variant="outlined" color="secondary" onClick={() => navigate(-1)}>
//             Cancel
//           </Button>
//         </Box>
//       </form>

//       {/* Snackbar */}
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={3000}
//         onClose={() => setSnackbar({ ...snackbar, open: false })}
//         anchorOrigin={{ vertical: "top", horizontal: "center" }}
//       >
//         <Alert
//           onClose={() => setSnackbar({ ...snackbar, open: false })}
//           severity={snackbar.severity}
//           sx={{ width: "100%" }}
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default AddTender;


import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box, Card, CardContent, Grid, TextField, MenuItem, Typography,
  Button, Switch, FormControlLabel, Snackbar, Alert, InputAdornment
} from "@mui/material";
import {
  addTender,
  updateTender,
  getTenderById
} from "../../services/api";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import FolderIcon from "@mui/icons-material/Folder";
import LinkIcon from "@mui/icons-material/Link";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

const portalTypes = ["Etendering", "OQ", "OBB", "Omantel", "PDO", "Others"];
const tenderActions = ["Bid", "No Bid"];

const AddTender = () => {
  const navigate = useNavigate();
  const { tenderId } = useParams();
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const [form, setForm] = useState({
    portal: "",
    tenderTitle: "",
    tenderNo: "",
    entity: "",
    tenderSalesEndDate: "",
    prebidClarificationEndDate: "",
    bidClosingDate: "",
    tenderFee: "",
    category: "",
    action: "",
    actionSrc: "",
    actionUrl: "",
    docsFolder: "",
    bidOpened: false,
    tenderAction: "Bid",
  });

  useEffect(() => {
    if (tenderId) fetchTenderById();
  }, [tenderId]);

  const fetchTenderById = async () => {
    try {
      setLoading(true);
      const res = await getTenderById(tenderId);
      if (res?.data?.status === 100) {
        const t = res.data.data;
        setForm({
          portal: t.portal || "",
          tenderTitle: t.tenderTitle || "",
          tenderNo: t.tenderNo || "",
          entity: t.entity || "",
          tenderSalesEndDate: t.tenderSalesEndDate?.slice(0,10) || "",
          prebidClarificationEndDate: t.prebidClarificationEndDate?.slice(0,10) || "",
          bidClosingDate: t.bidClosingDate?.slice(0,10) || "",
          tenderFee: t.tenderFee || "",
          category: t.category || "",
          action: t.action || "",
          actionSrc: t.actionSrc || "",
          actionUrl: t.actionUrl || "",
          docsFolder: t.docsFolder || "",
          bidOpened: t.bidOpened || false,
          tenderAction: t.tenderAction || "Bid",
        });
      } else {
        setSnackbar({ open: true, message: res?.data?.message || "Failed to fetch tender", severity: "error" });
      }
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: "Error fetching tender", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSwitch = (e) => setForm({ ...form, bidOpened: e.target.checked });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let res;
      if (tenderId) res = await updateTender(tenderId, form);
      else res = await addTender(form);

      if (res?.data?.status === 100) {
        setSnackbar({ open: true, message: tenderId ? "Tender updated successfully!" : "Tender added successfully!", severity: "success" });
        setTimeout(() => navigate("/tender/list"), 1000);
      } else {
        setSnackbar({ open: true, message: res?.data?.message || "Failed", severity: "error" });
      }
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: "Something went wrong", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", mt: 4, mb: 4 }}>
      <Typography variant="h5" gutterBottom fontWeight="bold">{tenderId ? "Edit Tender" : "Add Tender"}</Typography>
      <form onSubmit={handleSubmit}>
        <Card sx={{ mb: 3, p: 2 }}>
          <CardContent>
            <Grid container spacing={2}>
              {/* Portal */}
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  label="Portal"
                  name="portal"
                  value={form.portal}
                  onChange={handleChange}
                  required
                  InputProps={{ startAdornment: <InputAdornment position="start"><ReceiptLongIcon /></InputAdornment> }}
                >
                  {portalTypes.map((p) => <MenuItem key={p} value={p}>{p}</MenuItem>)}
                </TextField>
              </Grid>

              {/* Tender Title */}
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Tender Title" name="tenderTitle" value={form.tenderTitle} onChange={handleChange} required InputProps={{ startAdornment: <InputAdornment position="start"><ReceiptLongIcon /></InputAdornment> }}/>
              </Grid>

              {/* Tender No */}
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Tender No" name="tenderNo" value={form.tenderNo} onChange={handleChange} required InputProps={{ startAdornment: <InputAdornment position="start"><ConfirmationNumberIcon /></InputAdornment> }}/>
              </Grid>

              {/* Entity */}
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Entity" name="entity" value={form.entity} onChange={handleChange} required InputProps={{ startAdornment: <InputAdornment position="start"><AccountBalanceIcon /></InputAdornment> }}/>
              </Grid>

              {/* Dates */}
              <Grid item xs={12} sm={4}>
                <TextField fullWidth label="Tender Sales End Date" name="tenderSalesEndDate" type="date" value={form.tenderSalesEndDate} onChange={handleChange} InputLabelProps={{ shrink: true }} InputProps={{ startAdornment: <InputAdornment position="start"><CalendarTodayIcon /></InputAdornment> }}/>
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField fullWidth label="Prebid Clarification End Date" name="prebidClarificationEndDate" type="date" value={form.prebidClarificationEndDate} onChange={handleChange} InputLabelProps={{ shrink: true }} InputProps={{ startAdornment: <InputAdornment position="start"><CalendarTodayIcon /></InputAdornment> }}/>
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField fullWidth label="Bid Closing Date" name="bidClosingDate" type="date" value={form.bidClosingDate} onChange={handleChange} InputLabelProps={{ shrink: true }} InputProps={{ startAdornment: <InputAdornment position="start"><CalendarTodayIcon /></InputAdornment> }}/>
              </Grid>

              {/* Tender Fee */}
              <Grid item xs={12} sm={6}>
                <TextField fullWidth type="number" label="Tender Fee" name="tenderFee" value={form.tenderFee} onChange={handleChange} InputProps={{ startAdornment: <InputAdornment position="start"><MonetizationOnIcon /></InputAdornment> }}/>
              </Grid>

              {/* Category */}
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Category" name="category" value={form.category} onChange={handleChange} InputProps={{ startAdornment: <InputAdornment position="start"><AssignmentTurnedInIcon /></InputAdornment> }}/>
              </Grid>

              {/* Action + Source */}
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Action" name="action" value={form.action} onChange={handleChange}/>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Action Source" name="actionSrc" value={form.actionSrc} onChange={handleChange}/>
              </Grid>

              {/* Action URL + Docs Folder */}
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Action URL" name="actionUrl" value={form.actionUrl} onChange={handleChange} InputProps={{ startAdornment: <InputAdornment position="start"><LinkIcon /></InputAdornment> }}/>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Docs Folder" name="docsFolder" value={form.docsFolder} onChange={handleChange} InputProps={{ startAdornment: <InputAdornment position="start"><FolderIcon /></InputAdornment> }}/>
              </Grid>

              {/* Bid Opened */}
              <Grid item xs={12} sm={6}>
                <FormControlLabel control={<Switch checked={form.bidOpened} onChange={handleSwitch}/>} label="Bid Opened"/>
              </Grid>

              {/* Tender Action */}
              <Grid item xs={12} sm={6}>
                <TextField select fullWidth label="Tender Action" name="tenderAction" value={form.tenderAction} onChange={handleChange}>
                  {tenderActions.map((ta) => <MenuItem key={ta} value={ta}>{ta}</MenuItem>)}
                </TextField>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button variant="contained" type="submit" disabled={loading}>{loading ? "Submitting..." : "Submit"}</Button>
          <Button variant="outlined" color="secondary" onClick={() => navigate(-1)}>Cancel</Button>
        </Box>
      </form>

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default AddTender;