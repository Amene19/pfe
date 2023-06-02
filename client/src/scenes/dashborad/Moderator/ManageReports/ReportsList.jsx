import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import { Box, styled } from "@mui/system";
import { Table, TableHead, TableCell, TableRow, TableBody } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import axios from "axios";
import { useEffect } from "react";
import GeneratePdf from "../../../global/GeneratePdf";

const StyledTable = styled(Table)`
  width: 100%;
  margin: 30px 0 0 30px;
`;

const THead = styled(TableRow)`
  & > th {
    font-size: 20px;
    background: #118ab2;
    color: #ffffff;
  }
`;

const TRow = styled(TableRow)`
  & > td {
    font-size: 18px;
  }
`;

const ReportsList = () => {
    const [reports, setReports] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedReportId, setSelectedReportId] = useState(null);
  const [comment, setComment] = useState("");

  useEffect(() => {
    getAllReports();
  }, []);

  const getAllReports = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/dashboard/mederator/manageReports/allReports",
        { withCredentials: true }
      );
      const data = response.data.report;
      setReports(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenDialog = (reportId) => {
    setSelectedReportId(reportId);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedReportId(null);
    setOpen(false);
    setComment("");
  };

  const handleApprove = async (reportId) => {
    try {
      await axios.put(
        `http://localhost:3000/api/dashboard/mederator/manageReports/approve/${reportId}`,
        { approved: true },
        { withCredentials: true }
      );
      getAllReports();
      handleCloseDialog();
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = async (reportId) => {
    try {
      await axios.put(
        `http://localhost:3000/api/dashboard/mederator/manageReports/reject/${reportId}`,
        { rejected: true, comment },
        { withCredentials: true }
      );
      getAllReports();
      handleCloseDialog();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };
  return (
    <Box>
      <StyledTable>
        <TableHead>
          <THead>
            <TableCell>Logo</TableCell>
            <TableCell>Company Name</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </THead>
        </TableHead>
        <TableBody>
          {reports?.map((report, i) => (
            <TRow key={report._id}>
              <TableCell>
                <Avatar src={report.image.url} />
              </TableCell>
              <TableCell>{report.companyName}</TableCell>
              <TableCell>{report.date}</TableCell>
              <TableCell>
                {report.rejected ? (
                  <p style={{ backgroundColor: "#F44336", color: "white", padding: "4px 8px", borderRadius: "4px" }}>
                    Rejected
                  </p>
                ) : report.approved ? (
                  <p style={{ backgroundColor: "#4CAF50", color: "white", padding: "4px 8px", borderRadius: "4px" }}>
                    Approved
                  </p>
                ) : (
                  <p style={{ backgroundColor: "#FFC107", color: "black", padding: "4px 8px", borderRadius: "4px" }}>
                    Waiting
                  </p>
                )}
              </TableCell>
              <TableCell>
                <Box sx={{ display: "flex", gap: "5px" }}>
                  <div>
                   {!report.rejected && !report.approved ? (<Button
                      variant="contained"
                      startIcon={<RemoveRedEyeIcon />}
                     
                      sx={{ backgroundColor: "#118ab2" }}
                      onClick={() => handleOpenDialog(report._id)}
                    >
                      Review Report
                    </Button>) : (<Button
                      variant="contained"
                      startIcon={<RemoveRedEyeIcon />}
                      disabled
                      sx={{ backgroundColor: "#118ab2" }}
                      onClick={() => handleOpenDialog(report._id)}
                    >
                      Review Report
                    </Button>)}
                    

                    <Dialog open={open && selectedReportId === report._id} onClose={handleCloseDialog} maxWidth="md" fullWidth>
                      <DialogTitle>Review Report</DialogTitle>
                      <DialogContent>
                        <TextField
                          label="Comment"
                          value={comment}
                          onChange={handleCommentChange}
                          fullWidth
                          margin="normal"
                        />
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={() => handleReject(report._id)} color="error">
                          Reject
                        </Button>
                        <Button onClick={() => handleApprove(report._id)} variant="contained">
                          Approve
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </div>
                  {report && <GeneratePdf data={report} />}
                </Box>
              </TableCell>
            </TRow>
          ))}
        </TableBody>
      </StyledTable>
    </Box>
  );
};

export default ReportsList;
