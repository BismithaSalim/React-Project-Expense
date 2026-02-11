// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   TextField,
//   Button,
//   CircularProgress,
//   Paper,
//   Stack,
// } from "@mui/material";
// import { useParams, useNavigate } from "react-router-dom";
// import { getOrganisationById, addOrganisationAdmin } from "../../services/api";

// const AddOrganisationAdmin = () => {
//   const { id } = useParams(); // organisation ID
//   const navigate = useNavigate();

//   const [loading, setLoading] = useState(false);
//   const [org, setOrg] = useState(null);
//   const [form, setForm] = useState({
//     adminName: "",
//     adminEmail: "",
//     adminMobile: "",
//   });

//   // Fetch organisation data
//   useEffect(() => {
//     const fetchOrg = async () => {
//       try {
//         setLoading(true);
//         const res = await getOrganisationById(id);
//         if (res.data.status === 100) {
//           setOrg(res.data.data[0]); // assuming data is an array
//         } else {
//           alert(res.data.message || "Failed to fetch organisation");
//         }
//       } catch (err) {
//         console.error(err);
//         alert("Error fetching organisation");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrg();
//   }, [id]);

//   // Handle form input change
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // Handle submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Simple validation
//     if (!form.adminName || !form.adminEmail || !form.adminMobile) {
//       alert("Please fill all fields");
//       return;
//     }

//     try {
//       setLoading(true);
//       const res = await addOrganisationAdmin(id, form); // API call
//       if (res.data.status === 100) {
//         alert("Admin added successfully");
//         navigate("/organisations/list"); // go back to list
//       } else {
//         alert(res.data.message || "Failed to add admin");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Error adding admin");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) return <CircularProgress />;

//   if (!org) return <Typography>Loading organisation...</Typography>;

//   return (
//     <Paper sx={{ p: 4, maxWidth: 600, margin: "20px auto" }}>
//       <Typography variant="h5" mb={3}>
//         Add Admin for {org.organisationName}
//       </Typography>

//       <Box component="form" onSubmit={handleSubmit}>
//         <Stack spacing={2}>
//           <TextField
//             label="Admin Name"
//             name="adminName"
//             value={form.adminName}
//             onChange={handleChange}
//             fullWidth
//             required
//           />
//           <TextField
//             label="Admin Email"
//             name="adminEmail"
//             value={form.adminEmail}
//             onChange={handleChange}
//             type="email"
//             fullWidth
//             required
//           />
//           <TextField
//             label="Admin Mobile"
//             name="adminMobile"
//             value={form.adminMobile}
//             onChange={handleChange}
//             fullWidth
//             required
//           />

//           <Stack direction="row" spacing={2} justifyContent="flex-end">
//             <Button variant="outlined" onClick={() => navigate("/organisations/list")}>
//               Cancel
//             </Button>
//             <Button type="submit" variant="contained">
//               Add Admin
//             </Button>
//           </Stack>
//         </Stack>
//       </Box>
//     </Paper>
//   );
// };

// export default AddOrganisationAdmin;

// import React, { useState } from "react";
// import {
//   TextField,
//   Button,
//   Paper,
//   Stack,
//   Typography,
//   CircularProgress
// } from "@mui/material";
// import { useNavigate, useParams } from "react-router-dom";
// import { addOrganisationAdmin } from "../../services/api";

// const AddOrganisationAdmin = () => {
//   const { id } = useParams(); // organisationId
//   const navigate = useNavigate();

//   const [loading, setLoading] = useState(false);
//   const [form, setForm] = useState({
//     firstName: "",
//     lastName: "",
//     userName: "",
//     email: "",
//     mobileNo: "",
//     password: ""
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!form.firstName || !form.userName || !form.email || !form.mobileNo || !form.password) {
//       alert("Please fill all required fields");
//       return;
//     }

//     try {
//       setLoading(true);
//       const res = await addOrganisationAdmin(id, form);

//       if (res.data.status === 100) {
//         alert("Admin added successfully");
//         navigate("/organisations/list");
//       } else {
//         alert(res.data.message || "Failed to add admin");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Error adding admin");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Paper sx={{ maxWidth: 600, mx: "auto", p: 4 }}>
//       <Typography variant="h5" mb={3}>
//         Add Organisation Admin
//       </Typography>

//       <form onSubmit={handleSubmit}>
//         <Stack spacing={2}>
//           <TextField
//             label="First Name"
//             name="firstName"
//             value={form.firstName}
//             onChange={handleChange}
//             required
//           />

//           <TextField
//             label="Last Name"
//             name="lastName"
//             value={form.lastName}
//             onChange={handleChange}
//           />

//           <TextField
//             label="Username"
//             name="userName"
//             value={form.userName}
//             onChange={handleChange}
//             required
//             autoComplete="off"
//           />

//           <TextField
//             label="Email"
//             name="email"
//             type="email"
//             value={form.email}
//             onChange={handleChange}
//             required
//           />

//           <TextField
//             label="Mobile Number"
//             name="mobileNo"
//             value={form.mobileNo}
//             onChange={handleChange}
//             required
//           />

//           <TextField
//             label="Password"
//             name="password"
//             type="password"
//             value={form.password}
//             onChange={handleChange}
//             required
//             autoComplete="new-password"
//           />

//           <Stack direction="row" spacing={2} justifyContent="flex-end">
//             <Button variant="outlined" onClick={() => navigate(-1)}>
//               Cancel
//             </Button>
//             <Button
//               variant="contained"
//               type="submit"
//               disabled={loading}
//             >
//               {loading ? <CircularProgress size={22} /> : "Add Admin"}
//             </Button>
//           </Stack>
//         </Stack>
//       </form>
//     </Paper>
//   );
// };

// export default AddOrganisationAdmin;


import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Paper,
  Stack,
  Typography,
  CircularProgress
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import {
  addOrganisationAdmin,
  getAdminByOrganisation,
  updateUser
} from "../../services/api";

const AddOrganisationAdmin = () => {
  const { id } = useParams(); // organisationId
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    mobileNo: "",
    password: ""
  });

  const [isExistingAdmin, setIsExistingAdmin] = useState(false);
  const [adminId, setAdminId] = useState(null);

  // Fetch existing admin when page loads
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await getAdminByOrganisation(id);
        if (res.data && res.data.status === 100 && res.data.data) {
          const admin = res.data.data;
          setForm({
            firstName: admin.firstName || "",
            lastName: admin.lastName || "",
            userName: admin.userName || "",
            email: admin.email || "",
            mobileNo: admin.mobileNo || "",
            password: "" // Leave blank for security
          });
          setIsExistingAdmin(true);
          setAdminId(admin._id);
        }
      } catch (err) {
        console.error("Error fetching admin:", err);
      }
    };

    fetchAdmin();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Required fields check
    if (
      !form.firstName ||
      !form.userName ||
      !form.email ||
      !form.mobileNo ||
      (!form.password && !isExistingAdmin)
    ) {
      alert("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      // Prepare payload
      const payload = { ...form };

      // Only include password if updating and user entered a new password
      if (isExistingAdmin && !form.password) delete payload.password;

      let res;
      if (isExistingAdmin) {
        // Update existing admin
        res = await updateUser(adminId, payload);
      } else {
        // Add new admin
        res = await addOrganisationAdmin(id, payload);
      }

      if (res.data.status === 100) {
        alert(isExistingAdmin ? "Admin updated successfully" : "Admin added successfully");
        navigate("/organisations/list");
      } else {
        alert(res.data.message || "Failed to save admin");
      }
    } catch (err) {
      console.error(err);
      alert("Error saving admin");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ maxWidth: 600, mx: "auto", p: 4 }}>
      <Typography variant="h5" mb={3}>
        {isExistingAdmin ? "Update Organisation Admin" : "Add Organisation Admin"}
      </Typography>

      <form onSubmit={handleSubmit} autoComplete="off">
        <Stack spacing={2}>
          <TextField
            label="First Name"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            required
          />

          <TextField
            label="Last Name"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
          />

          <TextField
            label="Username"
            name="userName"
            value={form.userName}
            onChange={handleChange}
            required
            autoComplete="off"
          />

          <TextField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <TextField
            label="Mobile Number"
            name="mobileNo"
            value={form.mobileNo}
            onChange={handleChange}
            required
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            autoComplete="new-password"
            placeholder={isExistingAdmin ? "Leave blank to keep current password" : ""}
            required={!isExistingAdmin} // only required for new admin
          />

          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button variant="outlined" onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <Button variant="contained" type="submit" disabled={loading}>
              {loading ? <CircularProgress size={22} /> : isExistingAdmin ? "Update Admin" : "Add Admin"}
            </Button>
          </Stack>
        </Stack>
      </form>
    </Paper>
  );
};

export default AddOrganisationAdmin;

