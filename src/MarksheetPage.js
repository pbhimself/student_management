import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, TextField, InputAdornment, Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import "./MarksheetPage.css"; // ✅ Import the new CSS file

const MarksheetPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!location.state) {
      alert("No data received! Redirecting...");
      navigate("/");
      return;
    }
    setData(location.state.marksheetData || []);
  }, [location.state, navigate]);

  if (!location.state) return null;

  const { teacherName, className, division, subject } = location.state;

  const columns = data.length > 0
    ? Object.keys(data[0]).map((key) => ({
        field: key,
        headerName: key.charAt(0).toUpperCase() + key.slice(1),
        minWidth: 120,
        flex: 1,
        headerClassName: "grey-header",
      }))
    : [];

  const filteredRows = data
    .filter((row) =>
      Object.values(row).some((value) =>
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    )
    .map((row, index) => ({
      id: index + 1,
      ...row,
    }));

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 5, textAlign: 'center' }}>
        <Typography variant="h4">Marks Sheet - {subject} ({className} {division})</Typography>
        <Typography variant="h6">Teacher: {teacherName}</Typography>
      </Box>

      <Box className="search-box">
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search students..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Paper className="table-container">
        <div style={{ height: '65vh', width: '100%' }}>
          <DataGrid 
            rows={filteredRows} 
            columns={columns} 
            pageSizeOptions={[5, 10, 20]} 
            autoPageSize
            sx={{
              '& .grey-header': { backgroundColor: '#d3d3d3', color: '#000', fontWeight: 'bold' },
              '& .MuiDataGrid-row:nth-of-type(even)': { backgroundColor: '#f5f5f5' },
            }}
          />
        </div>
      </Paper>
    </Container>
  );
};

export default MarksheetPage;
