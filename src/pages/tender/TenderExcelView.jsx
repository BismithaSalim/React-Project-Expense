import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Paper, Table, TableHead, TableRow, TableCell, TableBody, Typography, Button } from "@mui/material";

const TenderExcelView = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const tenders = state?.tenders || [];

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h5">Tender Excel View</Typography>
        <Button variant="contained" onClick={() => navigate(-1)}>Back</Button>
      </Box>

      <Paper sx={{ overflow: "auto", maxHeight: "80vh" }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell><b>Title</b></TableCell>
              <TableCell><b>No</b></TableCell>
              <TableCell><b>Portal</b></TableCell>
              <TableCell><b>Entity</b></TableCell>
              <TableCell><b>Category</b></TableCell>
              <TableCell><b>Fee</b></TableCell>
              <TableCell><b>Sales End</b></TableCell>
              <TableCell><b>Prebid End</b></TableCell>
              <TableCell><b>Bid Closing</b></TableCell>
              <TableCell><b>Action</b></TableCell>
              <TableCell><b>URL</b></TableCell>
              <TableCell><b>Opened</b></TableCell>
              <TableCell><b>Created</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tenders.map((t) => (
              <TableRow key={t._id}>
                <TableCell>{t.tenderTitle}</TableCell>
                <TableCell>{t.tenderNo}</TableCell>
                <TableCell>{t.portal}</TableCell>
                <TableCell>{t.entity}</TableCell>
                <TableCell>{t.category}</TableCell>
                <TableCell>{t.tenderFee}</TableCell>
                <TableCell>{new Date(t.tenderSalesEndDate).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(t.prebidClarificationEndDate).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(t.bidClosingDate).toLocaleDateString()}</TableCell>
                <TableCell>{t.tenderAction}</TableCell>
                <TableCell>{t.actionUrl}</TableCell>
                <TableCell>{t.bidOpened ? "Yes" : "No"}</TableCell>
                <TableCell>{new Date(t.createdAt).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default TenderExcelView;