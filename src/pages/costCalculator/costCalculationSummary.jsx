import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Grid,
  TextField,
  MenuItem,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Collapse,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  FileDownload as FileDownloadIcon,
  Print as PrintIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
} from "@mui/icons-material";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  getProject,
  getAllCostCalculations
} from "../../services/api";

const ProjectSummary = () => {
  const [projects, setProjects] = useState([]);
  const [filters, setFilters] = useState({
    project: "",
    serviceTitle: "",
    locationType: "",
  });
  const [filteredData, setFilteredData] = useState([]);
  const [expandedRows, setExpandedRows] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // Load projects
  useEffect(() => {
    getProject()
      .then((res) => setProjects(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  // Load filtered data
  useEffect(() => {
    const { project, serviceTitle, locationType } = filters;
    getAllCostCalculations({ project, serviceTitle, locationType })
      .then((res) => setFilteredData(res.data.data))
      .catch((err) => console.error(err));
  }, [filters]);

  const calculateTotals = (services) => {
    const totalCost = services.reduce((sum, s) => sum + (s.cost || 0), 0);
    const totalAmount = services.reduce((sum, s) => sum + (s.amount || 0), 0);
    const totalMargin = totalAmount - totalCost;
    return { totalCost, totalMargin, totalAmount };
  };

  const handleExportCSV = () => {
    if (!filteredData.length) {
      setSnackbarMessage("No data to export");
      setSnackbarSeverity("warning");
      setSnackbarOpen(true);
      return;
    }

        let csv = "Project,Service Title,Location Type,Total Cost,Total Margin,Total Amount\n";
        filteredData.forEach((record) => {
        const totals = {
            totalCost: record.totalCost || 0,
            totalMargin: record.totalMargin || 0,
            totalAmount: record.totalAmount || 0,
        };
        csv += `${record.projectName},${record.serviceTitle},${record.locationType},${totals.totalCost.toFixed(2)},${totals.totalMargin.toFixed(2)},${totals.totalAmount.toFixed(2)}\n`;
        });

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "project-summary.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

 const handlePrintPDF = () => {
  if (!filteredData.length) return;

  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text("Project Cost Summary Report", 105, 15, { align: "center" });
  doc.line(14, 18, 196, 18);

  const tableBody = filteredData.map(record => {
    return [
      record.projectName,
      record.serviceTitle,
      record.locationType,
      (record.totalCost || 0).toFixed(2),
      (record.totalMargin || 0).toFixed(2),
      (record.totalAmount || 0).toFixed(2),
    ];
  });

  autoTable(doc, {
    startY: 25,
    head: [["Project", "Service Title", "Location", "Total Cost", "Total Margin", "Total Amount"]],
    body: tableBody,
    theme: "grid",
    styles: { fontSize: 10 },
    headStyles: { fillColor: [41, 128, 185], textColor: 255, fontStyle: "bold" },
    columnStyles: { 3: { halign: "right" }, 4: { halign: "right" }, 5: { halign: "right" } },
  });

  doc.save("project-summary.pdf");
};

  return (
    <Box sx={{ p: 4, backgroundColor: "#f5f7fa", minHeight: "100vh" }}>
      <Typography variant="h4" mb={4} sx={{ fontWeight: "bold", color: "#344767" }}>
        Project Cost Summary
      </Typography>

      {/* Filters */}
      <Paper sx={{ p: 3, mb: 4, borderRadius: 3, boxShadow: 3, backgroundColor: "#fff" }}>
        <Typography variant="h6" mb={2} sx={{ color: "#1976D2", fontWeight: 600 }}>
          Filters
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <TextField
              select
              fullWidth
              label="Project"
              value={filters.project}
              onChange={(e) => setFilters({ ...filters, project: e.target.value })}
              InputLabelProps={{ shrink: true }}
              SelectProps={{ displayEmpty: true }}
              sx={{ "& .MuiSelect-select": { padding: "16.5px 14px" }, backgroundColor: "#f0f3ff" }}
            >
              <MenuItem value="">
                <em>All Projects</em>
              </MenuItem>
              {projects.map((p) => (
                <MenuItem key={p._id} value={p._id}>
                  {p.projectName}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Service Title"
              value={filters.serviceTitle}
              onChange={(e) => setFilters({ ...filters, serviceTitle: e.target.value })}
              sx={{ backgroundColor: "#f0f3ff" }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              select
              fullWidth
              label="Location Type"
              value={filters.locationType}
              onChange={(e) => setFilters({ ...filters, locationType: e.target.value })}
              InputLabelProps={{ shrink: true }}
              SelectProps={{ displayEmpty: true }}
              sx={{ "& .MuiSelect-select": { padding: "16.5px 14px" }, backgroundColor: "#f0f3ff" }}
            >
              <MenuItem value="">
                <em>All Locations</em>
              </MenuItem>
              <MenuItem value="Muscat">Muscat</MenuItem>
              <MenuItem value="Outside Muscat">Outside Muscat</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </Paper>

      {/* Table */}
      {filteredData.length > 0 && (
        <Paper sx={{ p: 3, mb: 4, borderRadius: 3, boxShadow: 3, backgroundColor: "#fff" }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#e8f0fe" }}>
                <TableCell />
                <TableCell>Project</TableCell>
                <TableCell>Service Title</TableCell>
                <TableCell>Location Type</TableCell>
                <TableCell>Total Cost</TableCell>
                <TableCell>Total Margin</TableCell>
                <TableCell>Total Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((record) => {
                const totals = calculateTotals(record.services);
                const isExpanded = expandedRows[record._id] || false;

                return (
                  <React.Fragment key={record._id}>
                    <TableRow hover>
                      <TableCell>
                        <IconButton
                          size="small"
                          onClick={() =>
                            setExpandedRows((prev) => ({ ...prev, [record._id]: !isExpanded }))
                          }
                        >
                          {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                      </TableCell>
                      <TableCell>{record.projectName}</TableCell>
                      <TableCell>{record.serviceTitle}</TableCell>
                      <TableCell>{record.locationType}</TableCell>
                      <TableCell>{totals.totalCost.toFixed(2)}</TableCell>
                      <TableCell>{totals.totalMargin.toFixed(2)}</TableCell>
                      <TableCell>{totals.totalAmount.toFixed(2)}</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                          <Box sx={{ margin: 2 }}>
                            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
                              Services
                            </Typography>
                            <Table size="small">
                              <TableHead>
                                <TableRow>
                                  <TableCell>Type</TableCell>
                                  <TableCell>Unit</TableCell>
                                  <TableCell>Rate</TableCell>
                                  <TableCell>Qty</TableCell>
                                  <TableCell>Cost</TableCell>
                                  <TableCell>Margin</TableCell>
                                  <TableCell>Amount</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {record.services.map((s, idx) => (
                                  <TableRow key={idx}>
                                    <TableCell>{s.type}</TableCell>
                                    <TableCell>{s.unit}</TableCell>
                                    <TableCell>{s.rate}</TableCell>
                                    <TableCell>{s.quantity}</TableCell>
                                    <TableCell>{(s.cost  || 0).toFixed(2)}</TableCell>
                                    <TableCell>{s.margin}</TableCell>
                                    <TableCell>{s.amount.toFixed(2)}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                );
              })}
            </TableBody>
          </Table>

          {/* Action Buttons */}
          <Box sx={{ mt: 3, display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Button
              variant="outlined"
              startIcon={<FileDownloadIcon />}
              onClick={handleExportCSV}
              sx={{ borderColor: "#43a1ff", color: "#43a1ff", "&:hover": { backgroundColor: "#e6f0ff" } }}
            >
              Export CSV
            </Button>
            <Button
              variant="outlined"
              startIcon={<PrintIcon />}
              onClick={handlePrintPDF}
              sx={{ borderColor: "#38a1db", color: "#38a1db", "&:hover": { backgroundColor: "#e3f2fb" } }}
            >
              Print PDF
            </Button>
          </Box>
        </Paper>
      )}

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2500}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity={snackbarSeverity}
          onClose={() => setSnackbarOpen(false)}
          sx={{
            fontSize: "16px",
            fontWeight: 600,
            px: 4,
            py: 1.5,
            boxShadow: 6,
            minWidth: "300px",
            justifyContent: "center",
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProjectSummary;