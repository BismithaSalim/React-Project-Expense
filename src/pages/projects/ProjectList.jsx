// import React, { useEffect, useState, useCallback } from "react";
// import {
//   Box,
//   Typography,
//   Paper,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   CircularProgress,
//   Stack,
//   TablePagination,
//   IconButton
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import { useNavigate } from "react-router-dom";
// import { getProjects } from "../../services/api";

// const ProjectList = () => {
//   const navigate = useNavigate();

//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // pagination
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);

//   // backend does NOT return total count yet
//   const totalCount = projects.length + page * rowsPerPage;

// //   const fetchProjects = useCallback(async () => {
// //     try {
// //       setLoading(true);

// //       const response = await getProjects({
// //         page: page + 1,
// //         limit: rowsPerPage
// //       });

// //       // ✅ EXACT MATCH WITH YOUR RESPONSE
// //       setProjects(response.data.data || []);

// //     } catch (err) {
// //       console.error(err);
// //       alert("Failed to fetch projects");
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, [page, rowsPerPage]);

// const fetchProjects = useCallback(async () => {
//   try {
//     setLoading(true);
//     // Pass page+1 and rowsPerPage as separate numbers
//     const response = await getProjects(page + 1, rowsPerPage);
//     setProjects(response.data.data || []);
//   } catch (err) {
//     console.error(err);
//     alert("Failed to fetch projects");
//   } finally {
//     setLoading(false);
//   }
// }, [page, rowsPerPage]);

//   useEffect(() => {
//     fetchProjects();
//   }, [fetchProjects]);

//   return (
//     <Box sx={{ p: 5 }}>
//       <Stack direction="row" justifyContent="space-between" mb={3}>
//         <Typography variant="h4">Projects</Typography>
//         <Button variant="contained" onClick={() => navigate("/projects/add")}>
//           Add Project
//         </Button>
//       </Stack>

//       {loading ? (
//         <Box sx={{ textAlign: "center", mt: 5 }}>
//           <CircularProgress />
//         </Box>
//       ) : (
//         <Paper sx={{ boxShadow: 6 }}>
//           <TableContainer>
//             <Table>
//               <TableHead sx={{ bgcolor: "primary.main" }}>
//                 <TableRow>
//                   <TableCell sx={{ color: "white" }}>Project Name</TableCell>
//                   <TableCell sx={{ color: "white" }}>Client</TableCell>
//                   <TableCell sx={{ color: "white" }}>Status</TableCell>
//                   <TableCell sx={{ color: "white" }}>Total Amount</TableCell>
//                 </TableRow>
//               </TableHead>

//               <TableBody>
//                 {projects.length === 0 ? (
//                   <TableRow>
//                     <TableCell colSpan={4} align="center">
//                       No projects found
//                     </TableCell>
//                   </TableRow>
//                 ) : (
//                   projects.map((project) => (
//                     <TableRow key={project._id}>
//                       <TableCell>{project.projectName}</TableCell>

//                       {/* clientName is actually clientId */}
//                       <TableCell>{project.clientName}</TableCell>

//                       <TableCell>{project.projectStatus}</TableCell>
//                       <TableCell>{project.totalProjectAmount}</TableCell>
//                       <TableCell>
//                         <IconButton
//                           color="primary"
//                           onClick={() => navigate(`/projects/edit?id=${project._id}`)}

//                         >
//                           <EditIcon />
//                         </IconButton>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           <TablePagination
//             component="div"
//             count={totalCount}
//             page={page}
//             onPageChange={(e, newPage) => setPage(newPage)}
//             rowsPerPage={rowsPerPage}
//             onRowsPerPageChange={(e) => {
//               setRowsPerPage(parseInt(e.target.value, 10));
//               setPage(0);
//             }}
//             rowsPerPageOptions={[5, 10, 20]}
//           />
//         </Paper>
//       )}
//     </Box>
//   );
// };

// export default ProjectList;


//////////////////////////////////////NEW/////////////////////////////////////
// import React, { useEffect, useState, useCallback } from "react";
// import {
//   Box,
//   Typography,
//   Paper,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   CircularProgress,
//   Stack,
//   TablePagination,
//   IconButton
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import { useNavigate } from "react-router-dom";
// import { getProjects } from "../../services/api";

// const ProjectList = () => {
//   const navigate = useNavigate();
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Pagination
//   const [page, setPage] = useState(0); // 0-based
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [totalCount, setTotalCount] = useState(0);

//   // Fetch projects from API
//   const fetchProjects = useCallback(async () => {
//     try {
//       setLoading(true);
//       const response = await getProjects(page + 1, rowsPerPage); // API expects page starting from 1
//       setProjects(response.data.data || []);
//       setTotalCount(response.data.totalCount || (response.data.data?.length || 0));
//     } catch (err) {
//       console.error(err);
//       alert("Failed to fetch projects");
//     } finally {
//       setLoading(false);
//     }
//   }, [page, rowsPerPage]);

//   useEffect(() => {
//     fetchProjects();
//   }, [fetchProjects]);

//   const handleChangePage = (event, newPage) => setPage(newPage);
//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   return (
//     <Box sx={{ p: 5 }}>
//       <Stack direction="row" justifyContent="space-between" mb={3}>
//         <Typography variant="h4">Projects</Typography>
//         <Button variant="contained" onClick={() => navigate("/projects/add")}>
//           Add Project
//         </Button>
//       </Stack>

//       {loading ? (
//         <Box sx={{ textAlign: "center", mt: 5 }}>
//           <CircularProgress />
//         </Box>
//       ) : (
//         <Paper sx={{ boxShadow: 6 }}>
//           <TableContainer>
//             <Table>

//                   <TableHead sx={{ bgcolor: "primary.main" }}>
//                     <TableRow>
//                       <TableCell sx={{ color: "white" }}>Project Name</TableCell>
//                       <TableCell sx={{ color: "white" }}>Client</TableCell>
//                       <TableCell sx={{ color: "white" }}>Status</TableCell>
//                       <TableCell sx={{ color: "white" }}>Project Value</TableCell>
//                       <TableCell sx={{ color: "white" }}>VAT Amount</TableCell>
//                       <TableCell sx={{ color: "white" }}>Deductions</TableCell>
//                       <TableCell sx={{ color: "white" }}>Total Project Amount</TableCell>
//                       <TableCell sx={{ color: "white" }} align="center">Actions</TableCell>
//                       <TableCell sx={{ color: "white" }} align="center">P&L Analysis</TableCell>
//                     </TableRow>
//                   </TableHead>

//                   <TableBody>
//                     {projects.length === 0 ? (
//                       <TableRow>
//                         <TableCell colSpan={11} align="center">No projects found</TableCell>
//                       </TableRow>
//                     ) : (
//                       projects.map((project) => (
//                         <TableRow key={project._id}>
//                           <TableCell>{project.projectName}</TableCell>
//                           <TableCell>{project.clientRefId.clientName}</TableCell>
//                           <TableCell>{project.projectStatus}</TableCell>
//                           <TableCell>{project.projectValue}</TableCell>
//                           <TableCell>{project.vatAmount}</TableCell>
//                           <TableCell>{project.deductions}</TableCell>
//                           <TableCell>{project.totalProjectAmount}</TableCell>
//                           <TableCell align="center">
//                             <IconButton
//                               color="primary"
//                               onClick={() => navigate(`/projects/edit?id=${project._id}`)}
//                             >
//                               <EditIcon fontSize="small" />
//                             </IconButton>
//                           </TableCell>
//                           <TableCell align="center">
//                             <Button
//                               variant="outlined"
//                               size="small"
//                               onClick={() => navigate(`/projects/pl-analysis/${project._id}`)}
//                             >
//                               P&L Analysis
//                             </Button>
//                           </TableCell>
//                         </TableRow>
//                       ))
//                     )}
//                   </TableBody>

//             </Table>
//           </TableContainer>

//           <TablePagination
//             component="div"
//             count={totalCount}
//             page={page}
//             onPageChange={handleChangePage}
//             rowsPerPage={rowsPerPage}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//             rowsPerPageOptions={[5, 10, 20, 50]}
//           />
//         </Paper>
//       )}
//     </Box>
//   );
// };

// export default ProjectList;


/////////////////////////////////SUGGESTED CHANGES//////////////////////////////////////
import React, { useEffect, useState, useCallback } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Stack,
  TablePagination,
  IconButton,
  FormControlLabel,
  Switch,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { getProjects, deleteProject } from "../../services/api";
import { getRole } from "../../utils/auth";

const ProjectList = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(0); // 0-based
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalCount, setTotalCount] = useState(0);
  const [showDeleted, setShowDeleted] = useState(false); // new

  const role = getRole();

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getProjects(page + 1, rowsPerPage, showDeleted);
      setProjects(response.data.data || []);
      setTotalCount(response.data.pagination?.totalRecords || 0);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  }, [page, rowsPerPage, showDeleted]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Delete or restore project
  const handleDeleteRestore = async (projectId) => {
    if (!window.confirm("Are you sure you want to delete/restore this project?")) return;
    try {
      const res = await deleteProject(projectId);
      if (res.data.status === 100) {
        alert("Project updated successfully");
        fetchProjects(); // refresh list
      } else {
        alert(res.data.message || "Delete/Restore failed");
      }
    } catch (err) {
      console.error(err);
      alert("Delete/Restore failed");
    }
  };

  return (
    <Box sx={{ p: 5 }}>
      <Stack direction="row" justifyContent="space-between" mb={3}>
        <Typography variant="h4">Projects</Typography>
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

          {role !== "viewer" && role !== "expenseEditor" && (
          <Button variant="contained" onClick={() => navigate("/projects/add")}>
            Add Project
          </Button>
          )}
        </Stack>
      </Stack>

      {loading ? (
        <Box sx={{ textAlign: "center", mt: 5 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Paper sx={{ boxShadow: 6 }}>
          <TableContainer>
            <Table>
              <TableHead sx={{ bgcolor: "primary.main" }}>
                <TableRow>
                  <TableCell sx={{ color: "white" }}>Project Name</TableCell>
                  <TableCell sx={{ color: "white" }}>Client</TableCell>
                  <TableCell sx={{ color: "white" }}>Status</TableCell>
                  <TableCell sx={{ color: "white" }}>Project Value</TableCell>
                  <TableCell sx={{ color: "white" }}>VAT Amount</TableCell>
                  <TableCell sx={{ color: "white" }}>Deductions</TableCell>
                  <TableCell sx={{ color: "white" }}>Total Project Amount</TableCell>
                  <TableCell sx={{ color: "white" }} align="center">Actions</TableCell>
                  <TableCell sx={{ color: "white" }} align="center">P&L Analysis</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {projects.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={11} align="center">No projects found</TableCell>
                  </TableRow>
                ) : (
                  projects.map((project) => (
                    <TableRow key={project._id}>
                      <TableCell>{project.projectName}</TableCell>
                      <TableCell>{project.clientRefId?.clientName || "-"}</TableCell>
                      <TableCell>{project.projectStatus}</TableCell>
                      <TableCell>{project.projectValue}</TableCell>
                      <TableCell>{project.vatAmount}</TableCell>
                      <TableCell>{project.deductions}</TableCell>
                      <TableCell>{project.totalProjectAmount}</TableCell>
                      <TableCell align="center">
                        {/* Edit icon */}
                        <IconButton
                          color="primary"
                          onClick={() => navigate(`/projects/edit?id=${project._id}`)}
                          title="Edit Project"
                          disabled={role === "viewer" || role === "expenseEditor"}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>

                        {/* Delete/Restore icon */}
                        <IconButton
                          color={project.isActive ? "error" : "success"}
                          onClick={() => handleDeleteRestore(project._id)}
                          title={project.isActive ? "Delete Project" : "Restore Project"}
                          disabled={role === "viewer" || role === "expenseEditor"}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </TableCell>

                      <TableCell align="center">
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => navigate(`/projects/pl-analysis/${project._id}`)}
                        >
                          P&L Analysis
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            component="div"
            count={totalCount}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 20, 50]}
          />
        </Paper>
      )}
    </Box>
  );
};

export default ProjectList;

