import React, { useState } from "react";
import { Box, TextField, Button, FormControl, InputLabel, Select, MenuItem, Typography, Grid } from "@mui/material";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();
  const [teacherName, setTeacherName] = useState("");
  const [teacherEmail, setTeacherEmail] = useState(""); // ✅ New email field
  const [className, setClassName] = useState("");
  const [division, setDivision] = useState("");
  const [subject, setSubject] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(""); // ✅ Track file name

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name); // ✅ Show file name
    }
  };

  const handleSubmit = () => {
    if (!teacherName || !teacherEmail || !className || !division || !subject || !file) {
      alert("Please fill all fields and upload an Excel file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);

      if (jsonData.length === 0) {
        alert("Uploaded file is empty!");
        return;
      }

      navigate(`/marksheet/${className}-${division}/${subject}`, {
        state: {
          teacherName,
          teacherEmail, // ✅ Send teacher email
          className,
          division,
          subject,
          fileName, // ✅ Send uploaded file name
          marksheetData: jsonData,
        },
      });
    };

    reader.readAsBinaryString(file);
  };

  return (
    <Box className="landing-container">
      <Typography variant="h4" className="heading">Upload Marks</Typography>
      <Box className="form-container">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField label="Teacher Name" fullWidth value={teacherName} onChange={(e) => setTeacherName(e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Teacher Email" fullWidth value={teacherEmail} onChange={(e) => setTeacherEmail(e.target.value)} />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Class</InputLabel>
              <Select value={className} onChange={(e) => setClassName(e.target.value)}>
                {["Class 6", "Class 7", "Class 8"].map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Division</InputLabel>
              <Select value={division} onChange={(e) => setDivision(e.target.value)}>
                {["A", "B", "C"].map((d) => <MenuItem key={d} value={d}>{d}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Subject</InputLabel>
              <Select value={subject} onChange={(e) => setSubject(e.target.value)}>
                {["Math", "Science", "English"].map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" component="label" className="upload-button">
              Upload Excel File
              <input type="file" hidden onChange={handleFileChange} />
            </Button>
            {fileName && <Typography className="file-name">Selected File: {fileName}</Typography>}
          </Grid>
          <Grid item xs={12} className="button-container">
            <Button variant="contained" className="submit-button" onClick={handleSubmit}>Submit</Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default LandingPage;
