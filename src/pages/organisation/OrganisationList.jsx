
////////////////////////////////NEW//////////////////////////////////////////////
// import React, { useEffect, useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   IconButton,
//   CircularProgress,
//   Typography,
//   Stack,
//   Button
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { getOrganisations, deleteOrganisation } from "../../services/api";
// import { useNavigate } from "react-router-dom";
// import PersonAddIcon from "@mui/icons-material/PersonAdd";

// const OrganisationList = () => {
//   const [organisations, setOrganisations] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   // Fetch organisations
//   const fetchOrganisations = async () => {
//     try {
//       setLoading(true);
//       const res = await getOrganisations();
//       if (res.data.status === 100) {
//         setOrganisations(res.data.data); // Use data from API
//       } else {
//         alert(res.data.message || "Failed to fetch organisations");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Error fetching organisations");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrganisations();
//   }, []);

//   // Handle delete
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this organisation?")) return;
//     try {
//       const res = await deleteOrganisation(id);
//       if (res.data.status === 100) {
//         alert("Deleted successfully");
//         fetchOrganisations(); // refresh the list
//       } else {
//         alert(res.data.message || "Delete failed");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Delete failed");
//     }
//   };

//   // Handle edit
//   const handleEdit = (id) => {
//     navigate(`/organisations/edit/${id}`);
//   };

//   const handleAddAdmin = (id) => {
//     navigate(`/organisations/${id}/add-admin`);
//   };


//   if (loading) return <CircularProgress />;

//   return (
    
//     <TableContainer component={Paper}>
//         <Stack direction="row" justifyContent="space-between" mb={3}>
//         <Typography variant="h4">Organisations</Typography>
//         <Button variant="contained" onClick={() => navigate("/organisations/add")}>
//           Add Organisation
//         </Button>
//       </Stack>
//       <Table>
//         <TableHead sx={{ bgcolor: "primary.main" }}>
//                 <TableRow>
//                         <TableCell sx={{ color: "white" }}>Organisation Name</TableCell>
//                         <TableCell sx={{ color: "white" }}>Address</TableCell>
//                         <TableCell sx={{ color: "white" }}>Email</TableCell>
//                         <TableCell sx={{ color: "white" }}>Mobile No</TableCell>
//                         <TableCell sx={{ color: "white" }} align="center">Actions</TableCell>
//                 </TableRow>
//         </TableHead>

//         <TableBody>
//           {organisations.length > 0 ? (
//             organisations.map((org) => (
//               <TableRow key={org._id}>
//                 <TableCell>{org.organisationName}</TableCell>
//                 <TableCell>{org.address}</TableCell>
//                 <TableCell>{org.email}</TableCell>
//                 <TableCell>{org.mobileNo}</TableCell>
//                 <TableCell align="center">
//                     <IconButton
//                         color="primary"
//                         onClick={() => handleEdit(org._id)}
//                         title="Edit Organisation"
//                     >
//                         <EditIcon />
//                     </IconButton>

//                     <IconButton
//                         color="secondary"
//                         onClick={() => handleAddAdmin(org._id)}
//                         title="Add Admin"
//                     >
//                         <PersonAddIcon />
//                     </IconButton>

//                     <IconButton
//                         color="error"
//                         onClick={() => handleDelete(org._id)}
//                         title="Delete Organisation"
//                     >
//                         <DeleteIcon />
//                     </IconButton>
//                 </TableCell>

//               </TableRow>
//             ))
//           ) : (
//             <TableRow>
//               <TableCell colSpan={6} align="center">
//                 No organisations found
//               </TableCell>
//             </TableRow>
//           )}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// export default OrganisationList;

// import React, { useEffect, useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   IconButton,
//   CircularProgress,
//   Typography,
//   Stack,
//   Button,
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import PersonAddIcon from "@mui/icons-material/PersonAdd";
// import { 
//   getOrganisations, 
//   deleteOrganisation, 
//   getAdminByOrganisation, 
//   deleteUser 
// } from "../../services/api";
// import { useNavigate } from "react-router-dom";

// const OrganisationList = () => {
//   const [organisations, setOrganisations] = useState([]);
//   const [organisationAdmins, setOrganisationAdmins] = useState({});
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   // Fetch organisations
//   const fetchOrganisations = async () => {
//     try {
//       setLoading(true);
//       const res = await getOrganisations();
//       if (res.data.status === 100) {
//         setOrganisations(res.data.data);
//         await fetchOrganisationAdmins(res.data.data);
//       } else {
//         alert(res.data.message || "Failed to fetch organisations");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Error fetching organisations");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch active admin for each organisation
//   const fetchOrganisationAdmins = async (orgs) => {
//     const adminMap = {};
//     for (const org of orgs) {
//       try {
//         const res = await getAdminByOrganisation(org._id); // API call
//         if (res.status === 100 && res.hasAdmin) {
//           adminMap[org._id] = res.result;
//         } else {
//           adminMap[org._id] = null;
//         }
//       } catch (err) {
//         console.error(err);
//         adminMap[org._id] = null;
//       }
//     }
//     setOrganisationAdmins(adminMap);
//   };

//   useEffect(() => {
//     fetchOrganisations();
//   }, []);

//   // Handle edit organisation
//   const handleEdit = (id) => {
//     navigate(`/organisations/edit/${id}`);
//   };

//   // Handle delete organisation
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this organisation?")) return;
//     try {
//       const res = await deleteOrganisation(id);
//       if (res.data.status === 100) {
//         alert("Organisation deleted successfully");
//         fetchOrganisations();
//       } else {
//         alert(res.data.message || "Delete failed");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Delete failed");
//     }
//   };

//   // Navigate to add admin page
//   const handleAddAdmin = (id) => {
//     navigate(`/organisations/${id}/add-admin`);
//   };

//   // Handle delete admin
//   const handleDeleteAdmin = async (adminId, orgId) => {
//     if (!window.confirm("Are you sure you want to delete this admin?")) return;
//     try {
//       const res = await deleteUser(adminId);
//       if (res.status === 100) {
//         alert("Admin deleted successfully");
//         fetchOrganisationAdmins(organisations);
//       } else {
//         alert(res.message || "Failed to delete admin");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Error deleting admin");
//     }
//   };

//   if (loading) return <CircularProgress />;

//   return (
//     <TableContainer component={Paper} sx={{ p: 2 }}>
//       <Stack direction="row" justifyContent="space-between" mb={3}>
//         <Typography variant="h4">Organisations</Typography>
//         <Button variant="contained" onClick={() => navigate("/organisations/add")}>
//           Add Organisation
//         </Button>
//       </Stack>

//       <Table>
//         <TableHead sx={{ bgcolor: "primary.main" }}>
//           <TableRow>
//             <TableCell sx={{ color: "white" }}>Organisation Name</TableCell>
//             <TableCell sx={{ color: "white" }}>Address</TableCell>
//             <TableCell sx={{ color: "white" }}>Email</TableCell>
//             <TableCell sx={{ color: "white" }}>Mobile No</TableCell>
//             <TableCell sx={{ color: "white" }} align="center">Admin</TableCell>
//             <TableCell sx={{ color: "white" }} align="center">Actions</TableCell>
//           </TableRow>
//         </TableHead>

//         <TableBody>
//           {organisations.length > 0 ? (
//             organisations.map((org) => (
//               <TableRow key={org._id}>
//                 <TableCell>{org.organisationName}</TableCell>
//                 <TableCell>{org.address}</TableCell>
//                 <TableCell>{org.email}</TableCell>
//                 <TableCell>{org.mobileNo}</TableCell>

//                 {/* Admin Column */}
//                 <TableCell align="center">
//                   {organisationAdmins[org._id] ? (
//                     <>
//                       <span>{organisationAdmins[org._id].firstName} {organisationAdmins[org._id].lastName}</span>
//                       <IconButton
//                         color="secondary"
//                         onClick={() => handleDeleteAdmin(organisationAdmins[org._id]._id, org._id)}
//                         title="Delete Admin"
//                         size="small"
//                       >
//                         <DeleteIcon fontSize="small"/>
//                       </IconButton>
//                     </>
//                   ) : (
//                     <Button
//                       variant="outlined"
//                       size="small"
//                       startIcon={<PersonAddIcon />}
//                       onClick={() => handleAddAdmin(org._id)}
//                     >
//                       Add Admin
//                     </Button>
//                   )}
//                 </TableCell>

//                 {/* Actions Column */}
//                 <TableCell align="center">
//                   <IconButton color="primary" onClick={() => handleEdit(org._id)} title="Edit Organisation">
//                     <EditIcon />
//                   </IconButton>

//                   <IconButton
//                     color="error"
//                     onClick={() => handleDelete(org._id)}
//                     title="Delete Organisation"
//                     disabled={!!organisationAdmins[org._id]} // disable if active admin exists
//                   >
//                     <DeleteIcon />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))
//           ) : (
//             <TableRow>
//               <TableCell colSpan={6} align="center">
//                 No organisations found
//               </TableCell>
//             </TableRow>
//           )}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// export default OrganisationList;



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
  Switch,
  FormControlLabel,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { 
  getOrganisations, 
  deleteOrganisation, 
  getAdminByOrganisation, 
  deleteUser 
} from "../../services/api";
import { useNavigate } from "react-router-dom";

const OrganisationList = () => {
  const [organisations, setOrganisations] = useState([]);
  const [organisationAdmins, setOrganisationAdmins] = useState({});
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [showDeleted, setShowDeleted] = useState(false);

  const navigate = useNavigate();

  // Fetch organisations
  const fetchOrganisations = async () => {
    try {
      setLoading(true);
      const res = await getOrganisations(showDeleted, page, limit);
      if (res.data.status === 100) {
        const orgs = res.data.data || [];
        setOrganisations(orgs);
        setTotalCount(res.data.totalCount || 0);
        await fetchOrganisationAdmins(orgs);
      } else {
        alert(res.data.message || "Failed to fetch organisations");
      }
    } catch (err) {
      console.error(err);
      alert("Error fetching organisations");
    } finally {
      setLoading(false);
    }
  };

  // Fetch admin for each organisation
  const fetchOrganisationAdmins = async (orgs) => {
    const adminMap = {};
    for (const org of orgs) {
      try {
        const res = await getAdminByOrganisation(org._id);
        if (res.data.status === 100 && res.data.admin) {
          adminMap[org._id] = res.data.admin;
        } else {
          adminMap[org._id] = null;
        }
      } catch (err) {
        console.error(err);
        adminMap[org._id] = null;
      }
    }
    setOrganisationAdmins(adminMap);
  };

  useEffect(() => {
    fetchOrganisations();
  }, [page, showDeleted]);

  // Navigate handlers
  const handleEdit = (id) => navigate(`/organisations/edit/${id}`);
  const handleAddAdmin = (id) => navigate(`/organisations/${id}/add-admin`);

  // Delete / Restore Organisation
  const handleDeleteOrganisation = async (id) => {
    if (!window.confirm("Are you sure you want to delete/restore this organisation?")) return;
    try {
      const res = await deleteOrganisation(id);
      if (res.data.status === 100) {
        alert("Organisation updated successfully");
        fetchOrganisations();
      } else {
        alert(res.data.message || "Delete/Restore failed");
      }
    } catch (err) {
      console.error(err);
      alert("Delete/Restore failed");
    }
  };

  // Delete Admin
  const handleDeleteAdmin = async (adminId) => {
    if (!window.confirm("Are you sure you want to delete this admin?")) return;
    try {
      const res = await deleteUser(adminId);
      if (res.data.status === 100) {
        alert("Admin deleted successfully");
        fetchOrganisations(); // refresh list
      } else {
        alert(res.data.message || "Failed to delete admin");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting admin");
    }
  };

  if (loading) return <CircularProgress sx={{ display: "block", mx: "auto", mt: 5 }} />;

  return (
    <Paper sx={{ p: 2 }}>
      <Stack direction="row" justifyContent="space-between" mb={3} alignItems="center">
        <Typography variant="h4">Organisations</Typography>
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
          <Button variant="contained" onClick={() => navigate("/organisations/add")}>
            Add Organisation
          </Button>
        </Stack>
      </Stack>

      <TableContainer>
        <Table>
          <TableHead sx={{ bgcolor: "primary.main" }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}>Organisation Name</TableCell>
              <TableCell sx={{ color: "white" }}>Address</TableCell>
              <TableCell sx={{ color: "white" }}>Email</TableCell>
              <TableCell sx={{ color: "white" }}>Mobile No</TableCell>
              <TableCell sx={{ color: "white" }} align="center">Admin</TableCell>
              <TableCell sx={{ color: "white" }} align="center">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {(organisations || []).length > 0 ? (
              (organisations || []).map((org) => (
                <TableRow key={org._id}>
                  <TableCell>{org.organisationName}</TableCell>
                  <TableCell>{org.address}</TableCell>
                  <TableCell>{org.email}</TableCell>
                  <TableCell>{org.mobileNo}</TableCell>

                  {/* Admin */}
                  <TableCell align="center">
                    {organisationAdmins[org._id] ? (
                      <Stack direction="row" alignItems="center" spacing={1} justifyContent="center">
                        <span>{organisationAdmins[org._id].firstName} {organisationAdmins[org._id].lastName}</span>
                        <IconButton
                          color="secondary"
                          onClick={() => handleDeleteAdmin(organisationAdmins[org._id]._id)}
                          title="Delete Admin"
                          size="small"
                        >
                          <DeleteIcon fontSize="small"/>
                        </IconButton>
                      </Stack>
                    ) : (
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<PersonAddIcon />}
                        onClick={() => handleAddAdmin(org._id)}
                      >
                        Add Admin
                      </Button>
                    )}
                  </TableCell>

                  {/* Actions */}
                  <TableCell align="center">
                    <IconButton color="primary" onClick={() => handleEdit(org._id)} title="Edit Organisation">
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color={org.isActive ? "error" : "success"}
                      onClick={() => handleDeleteOrganisation(org._id)}
                      title={org.isActive ? "Delete Organisation" : "Restore Organisation"}
                      disabled={!!organisationAdmins[org._id]}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No organisations found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Stack direction="row" justifyContent="center" spacing={2} mt={2}>
        <Button disabled={page === 1} onClick={() => setPage((prev) => prev - 1)}>
          Previous
        </Button>
        <Typography variant="body1" align="center">
          Page {page}
        </Typography>
        <Button disabled={page * limit >= totalCount} onClick={() => setPage((prev) => prev + 1)}>
          Next
        </Button>
      </Stack>
    </Paper>
  );
};

export default OrganisationList;

