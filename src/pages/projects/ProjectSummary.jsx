
// import React, { useState, useEffect, useCallback } from "react";
// import {
//   Box,
//   Typography,
//   Card,
//   CardContent,
//   Grid,
//   Tabs,
//   Tab,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   CircularProgress,
//   TablePagination,
// } from "@mui/material";
// import { getProjectSummary, getProjectFinancials } from "../../services/api";

// const statusTabs = ["Ongoing", "Not Started", "Completed", "Accepted"];

// const ProjectSummary = () => {
//   const [tabIndex, setTabIndex] = useState(0);
//   const [projects, setProjects] = useState([]);
//   const [financials, setFinancials] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // Pagination
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [totalCount, setTotalCount] = useState(0);

//   const selectedStatus = statusTabs[tabIndex];

//   // Fetch projects
//   const fetchProjects = useCallback(async () => {
//     try {
//       setLoading(true);
//       const res = await getProjectSummary({
//         status: selectedStatus,
//         page: page + 1,
//         limit: rowsPerPage,
//       });
//       if (res.status === 100) {
//         setProjects(res.result || []);
//         // Ideally backend should return totalCount for pagination
//         setTotalCount(res.result?.length || 0);
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Failed to fetch projects");
//     } finally {
//       setLoading(false);
//     }
//   }, [selectedStatus, page, rowsPerPage]);

//   // Fetch financials (Completed only)
//   const fetchFinancials = useCallback(async () => {
//     if (selectedStatus !== "Completed") return;

//     try {
//       const res = await getProjectFinancials();
//       if (res.status === 100) setFinancials(res.result);
//     } catch (err) {
//       console.error(err);
//     }
//   }, [selectedStatus]);

//   // Reset page when tab changes
//   useEffect(() => {
//     setPage(0);
//   }, [tabIndex]);

//   // Fetch projects & financials
//   useEffect(() => {
//     fetchProjects();
//     fetchFinancials();
//   }, [fetchProjects, fetchFinancials]);

//   const handleTabChange = (event, newValue) => {
//     setTabIndex(newValue);
//   };

//   const handleChangePage = (event, newPage) => setPage(newPage);

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   return (
//     <Box sx={{ p: 4 }}>
//       <Typography variant="h4" mb={3}>
//         All Projects Summary
//       </Typography>

//       {/* Status Tabs */}
//       <Tabs value={tabIndex} onChange={handleTabChange} sx={{ mb: 3 }}>
//         {statusTabs.map((status) => (
//           <Tab key={status} label={status} />
//         ))}
//       </Tabs>

//       {/* Completed Projects Financials */}
//       {selectedStatus === "Completed" && financials && (
//         <Grid container spacing={3} mb={3}>
//           <Grid item xs={12} md={2.4}>
//             <Card sx={{ borderRadius: 3, background: "#E3F2FD" }}>
//               <CardContent>
//                 <Typography>Total Projects</Typography>
//                 <Typography variant="h6">{financials.noOfProjects}</Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//           <Grid item xs={12} md={2.4}>
//             <Card sx={{ borderRadius: 3, background: "#FFF3E0" }}>
//               <CardContent>
//                 <Typography>Total Project Value</Typography>
//                 <Typography variant="h6">{financials.totalProjectValue}</Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//           <Grid item xs={12} md={2.4}>
//             <Card sx={{ borderRadius: 3, background: "#E8F5E9" }}>
//               <CardContent>
//                 <Typography>Total Project Cost</Typography>
//                 <Typography variant="h6">{financials.totalProjectCost}</Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//           <Grid item xs={12} md={2.4}>
//             <Card sx={{ borderRadius: 3, background: "#E1F5FE" }}>
//               <CardContent>
//                 <Typography>Total Earnings</Typography>
//                 <Typography variant="h6">{financials.totalEarnings}</Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//           <Grid item xs={12} md={2.4}>
//             <Card sx={{ borderRadius: 3, background: "#FFF8E1" }}>
//               <CardContent>
//                 <Typography>Average Margin (%)</Typography>
//                 <Typography variant="h6">
//                   {financials.averageMargin.toFixed(2)}
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         </Grid>
//       )}

//       {/* Project Table */}
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
//                   <TableCell sx={{ color: "white" }}>Date</TableCell>
//                   <TableCell sx={{ color: "white" }}>Status</TableCell>
//                   <TableCell sx={{ color: "white" }}>Project Name</TableCell>
//                   <TableCell sx={{ color: "white" }}>Client</TableCell>
//                   <TableCell sx={{ color: "white" }}>Location</TableCell>
//                   <TableCell sx={{ color: "white" }}>Project Value</TableCell>
//                   <TableCell sx={{ color: "white" }}>Project Cost</TableCell>
//                   <TableCell sx={{ color: "white" }}>Earnings</TableCell>
//                   <TableCell sx={{ color: "white" }}>% Margin</TableCell>
//                   <TableCell sx={{ color: "white" }}>Duration (days)</TableCell>
//                 </TableRow>
//               </TableHead>

//               <TableBody>
//                 {projects.length === 0 ? (
//                   <TableRow>
//                     <TableCell colSpan={10} align="center">
//                       No projects found
//                     </TableCell>
//                   </TableRow>
//                 ) : (
//                   projects.map((p) => (
//                     <TableRow key={p._id}>
//                       <TableCell>{p.date?.split("T")[0]}</TableCell>
//                       <TableCell>{p.status}</TableCell>
//                       <TableCell>{p.projectName}</TableCell>
//                       <TableCell>{p.clientName}</TableCell>
//                       <TableCell>{p.location}</TableCell>
//                       <TableCell>{p.projectValue}</TableCell>
//                       <TableCell>{p.projectCost}</TableCell>
//                       <TableCell>{p.earnings}</TableCell>
//                       <TableCell>{p.marginPercent.toFixed(2)}</TableCell>
//                       <TableCell>{p.projectDuration}</TableCell>
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

// export default ProjectSummary;


import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  TablePagination,
} from "@mui/material";
import { getProjectSummary, getProjectFinancials } from "../../services/api";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
const statusTabs = ["Ongoing", "Not Started", "Completed", "Accepted"];

const ProjectSummary = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [projects, setProjects] = useState([]);
  const [financials, setFinancials] = useState(null);
  const [loading, setLoading] = useState(false);

  // Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const selectedStatus = statusTabs[tabIndex];
  const navigate = useNavigate();


  // Fetch projects
  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getProjectSummary({
        status: selectedStatus,
        page: page + 1,
        limit: rowsPerPage,
      });

      const { status, data } = res.data;
      if (status === 100) {
        setProjects(data || []);
        // For now, using data.length as totalCount
        setTotalCount(data?.length || 0);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  }, [selectedStatus, page, rowsPerPage]);

  // Fetch financials (Completed only)
  const fetchFinancials = useCallback(async () => {
    if (selectedStatus !== "Completed") return;

    try {
      const res = await getProjectFinancials();
      const { status, data } = res.data;

      if (status === 100) {
        setFinancials(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [selectedStatus]);

  // Reset page when tab changes
  useEffect(() => {
    setPage(0);
  }, [tabIndex]);

  // Fetch projects & financials
  useEffect(() => {
    fetchProjects();
    fetchFinancials();
  }, [fetchProjects, fetchFinancials]);

  const handleTabChange = (event, newValue) => setTabIndex(newValue);

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const formatDate = (dateStr) => (dateStr ? dateStr.split("T")[0] : "-");
  const formatNumber = (num) => (num !== null && num !== undefined ? num : "-");
  const formatPercent = (num) =>
    num !== null && num !== undefined ? num.toFixed(2) : "-";

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" mb={3}>
        All Projects Summary
      </Typography>

      {/* Status Tabs */}
      <Tabs value={tabIndex} onChange={handleTabChange} sx={{ mb: 3 }}>
        {statusTabs.map((status) => (
          <Tab key={status} label={status} />
        ))}
      </Tabs>

      {/* Completed Projects Financials */}
      {selectedStatus === "Completed" && financials && (
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} md={2.4}>
            <Card sx={{ borderRadius: 3, background: "#E3F2FD" }}>
              <CardContent>
                <Typography>Total Projects</Typography>
                <Typography variant="h6">{financials.noOfProjects}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={2.4}>
            <Card sx={{ borderRadius: 3, background: "#FFF3E0" }}>
              <CardContent>
                <Typography>Total Project Value</Typography>
                <Typography variant="h6">{financials.totalProjectValue}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={2.4}>
            <Card sx={{ borderRadius: 3, background: "#E8F5E9" }}>
              <CardContent>
                <Typography>Total Project Cost</Typography>
                <Typography variant="h6">{financials.totalProjectCost}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={2.4}>
            <Card sx={{ borderRadius: 3, background: "#E1F5FE" }}>
              <CardContent>
                <Typography>Total Earnings</Typography>
                <Typography variant="h6">{financials.totalEarnings}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={2.4}>
            <Card sx={{ borderRadius: 3, background: "#FFF8E1" }}>
              <CardContent>
                <Typography>Average Margin (%)</Typography>
                <Typography variant="h6">
                  {financials.averageMargin?.toFixed(2) || "-"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Project Table */}
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
                  <TableCell sx={{ color: "white" }}>Date</TableCell>
                  <TableCell sx={{ color: "white" }}>Status</TableCell>
                  <TableCell sx={{ color: "white" }}>Project Name</TableCell>
                  <TableCell sx={{ color: "white" }}>Client</TableCell>
                  <TableCell sx={{ color: "white" }}>Location</TableCell>
                  <TableCell sx={{ color: "white" }}>Project Value</TableCell>
                  <TableCell sx={{ color: "white" }}>Project Cost</TableCell>
                  <TableCell sx={{ color: "white" }}>Earnings</TableCell>
                  <TableCell sx={{ color: "white" }}>% Margin</TableCell>
                  <TableCell sx={{ color: "white" }}>Duration (days)</TableCell>
                  <TableCell sx={{ color: "white" }}>Action</TableCell>

                </TableRow>
              </TableHead>

              <TableBody>
                {projects.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={10} align="center">
                      No projects found
                    </TableCell>
                  </TableRow>
                ) : (
                  projects.map((p) => (
                    <TableRow key={p._id}>
                      <TableCell>{formatDate(p.date)}</TableCell>
                      <TableCell>{formatNumber(p.status)}</TableCell>
                      <TableCell>{formatNumber(p.projectName)}</TableCell>
                      <TableCell>{formatNumber(p.clientName)}</TableCell>
                      <TableCell>{formatNumber(p.location)}</TableCell>
                      <TableCell>{formatNumber(p.projectValue)}</TableCell>
                      <TableCell>{formatNumber(p.projectCost)}</TableCell>
                      <TableCell>{formatNumber(p.earnings)}</TableCell>
                      <TableCell>{formatPercent(p.marginPercent)}</TableCell>
                      <TableCell>{formatNumber(p.projectDuration)}</TableCell>
                      <TableCell>
                        <Button
                            size="small"
                            variant="outlined"
                            onClick={() =>
                            navigate(`/projects/pl-analysis/${p._id}`, {
                                state: { from: "summary" }
                            })
                            }
                        >
                            P&amp;L Analysis
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

export default ProjectSummary;
