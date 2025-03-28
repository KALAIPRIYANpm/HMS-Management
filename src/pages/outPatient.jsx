// src/App.js
import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Switch,
  Box,
  CircularProgress,
  Snackbar,
  Pagination,
  Collapse,
  Grid,
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import {
  getOutpatients,
  addOutpatient,
  updateOutpatient,
  deleteOutpatient,
  toggleOutpatientStatus,
} from '../api/outpatientAPI';

const App = () => {
  const [outpatients, setOutpatients] = useState([]);
  const [form, setForm] = useState({
    outpatientID: '',
    name: '',
    age: '',
    gender: '',
    shift: '',
    email: '',
    phoneNumber: '',
    password: '',
    status: 'Active',
  });
  const [editing, setEditing] = useState(false);
  const [editID, setEditID] = useState('');
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const itemsPerPage = 5;

  // Fetch all outpatients
  const fetchOutpatients = async () => {
    setLoading(true);
    try {
      const data = await getOutpatients();
      setOutpatients(data || []);
    } catch (err) {
      console.error('Error fetching outpatients:', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOutpatients();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or update outpatient
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await updateOutpatient(editID, form);
        showSnackbar('Outpatient updated successfully! 🎉');
        setEditing(false);
      } else {
        await addOutpatient(form);
        showSnackbar('Outpatient added successfully! ✅');
      }
      resetForm();
      fetchOutpatients();
    } catch (err) {
      showSnackbar('Error saving outpatient. ❗');
      console.error('Error saving outpatient:', err);
    }
  };

  // Reset form
  const resetForm = () => {
    setForm({
      outpatientID: '',
      name: '',
      age: '',
      gender: '',
      shift: '',
      email: '',
      phoneNumber: '',
      password: '',
      status: 'Active',
    });
    setEditing(false);
    setEditID('');
    setShowForm(false);
  };

  // Edit outpatient
  const handleEdit = (outpatient) => {
    setForm(outpatient);
    setEditing(true);
    setEditID(outpatient.outpatientID);
    setShowForm(true);
  };

  // Delete outpatient
  const handleDelete = async (id) => {
    console.log('Deleting Outpatient with ID:', id); // ✅ Check the ID being passed
    try {
      await deleteOutpatient(id);
      showSnackbar('Outpatient deleted successfully! ❌');
      fetchOutpatients();
    } catch (err) {
      showSnackbar('Error deleting outpatient.');
      console.error('Error deleting outpatient:', err.response?.data || err.message);
    }
  };
  

  // Toggle status
  const handleStatusToggle = async (outpatient) => {
    console.log('Toggling status for:', outpatient.outpatientID); // ✅ Check the ID
    try {
      const updatedStatus = outpatient.status === 'Active' ? 'Inactive' : 'Active';
      await toggleOutpatientStatus(outpatient.outpatientID, {
        ...outpatient,
        status: updatedStatus,
      });
      fetchOutpatients();
      showSnackbar('Status updated successfully! ⚡');
    } catch (err) {
      showSnackbar('Error updating status.');
      console.error('Error toggling outpatient status:', err.response?.data || err.message);
    }
  };
  

  // Show snackbar
  const showSnackbar = (message) => {
    setSnackbar({ open: true, message });
  };

  // Filter by search
  const filteredOutpatients = outpatients.filter(
    (outpatient) =>
      (outpatient.name?.toLowerCase() || '').includes(search.toLowerCase()) ||
      (outpatient.email?.toLowerCase() || '').includes(search.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredOutpatients.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      {/* Title Section */}
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{
          mb: 3,
          fontWeight: 'bold',
          background: 'linear-gradient(90deg, #ff8a00, #e52e71)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        ✨ Outpatient Management System
      </Typography>

      {/* Search and New Registration Button */}
      <Grid container spacing={2} mb={2}>
        <Grid item xs={8}>
          <TextField
            fullWidth
            label="🔍 Search by Name or Email"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: '#FF5733',
                  boxShadow: '0 0 8px #FF5733',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#FF5733',
                  boxShadow: '0 0 12px #FF5733',
                },
              },
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <Button
            fullWidth
            variant="contained"
            sx={{
              background: 'linear-gradient(90deg, #00c6ff, #0072ff)',
              color: 'white',
              height: '100%',
              '&:hover': {
                transform: 'scale(1.05)',
                transition: 'all 0.2s',
                boxShadow: '0 4px 15px rgba(0, 114, 255, 0.5)',
              },
            }}
            startIcon={<Add />}
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Hide Form' : 'New Registration'}
          </Button>
        </Grid>
      </Grid>

      {/* Form Section */}
      <Collapse in={showForm} timeout={500}>
        <Box
          component={Paper}
          sx={{
            p: 3,
            mb: 4,
            boxShadow: '0px 5px 20px rgba(0, 0, 0, 0.15)',
            background: 'linear-gradient(135deg, white, #grey)',
            borderRadius: 4,
          }}
        >
          <Typography variant="h6" gutterBottom>
            {editing ? '✏️ Edit Outpatient' : '➕ Add New Outpatient'}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'grid', gap: 2, mt: 2 }}>
            {['outpatientID', 'name', 'age', 'gender', 'shift', 'email', 'phoneNumber', 'password'].map((field) => (
              <TextField
                key={field}
                name={field}
                label={field.replace(/([A-Z])/g, ' $1')}
                type={field === 'age' ? 'number' : field === 'password' ? 'password' : 'text'}
                value={form[field]}
                onChange={handleChange}
                required={field !== 'password' || !editing}
                disabled={editing && field === 'outpatientID'}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: '#e52e71',
                      boxShadow: '0 0 8px #e52e71',
                    },
                  },
                }}
              />
            ))}
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{
                background: editing ? '#blue' : '#4caf50',
                '&:hover': { transform: 'scale(1.05)', transition: 'all 0.2s' },
              }}
            >
              {editing ? 'Update Outpatient' : 'Add Outpatient'}
            </Button>
          </Box>
        </Box>
      </Collapse>

      {/* Loading Animation */}
      {loading ? (
        <Box display="flex" justifyContent="center" my={5}>
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          {/* Outpatient List Section */}
          <TableContainer component={Paper} elevation={3} sx={{ boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.2)' }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#6200ea' }}>
                  {['Outpatient ID', 'Name', 'Age', 'Gender', 'Shift', 'Email', 'Phone', 'Status', 'Actions'].map(
                    (head) => (
                      <TableCell key={head} sx={{ color: 'white', fontWeight: 'bold' }}>
                        {head}
                      </TableCell>
                    )
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {currentItems.map((outpatient) => (
                  <TableRow key={outpatient.outpatientID}>
                    {[
                      outpatient.outpatientID,
                      outpatient.name,
                      outpatient.age,
                      outpatient.gender,
                      outpatient.shift,
                      outpatient.email,
                      outpatient.phoneNumber,
                      <Switch
                        checked={outpatient.status === 'Active'}
                        onChange={() => handleStatusToggle(outpatient)}
                        color="success"
                      />,
                      <Box>
                        <IconButton color="primary" onClick={() => handleEdit(outpatient)}>
                          <Edit />
                        </IconButton>
                        <IconButton color="error" onClick={() => handleDelete(outpatient.outpatientID)}>
                          <Delete />
                        </IconButton>
                      </Box>,
                    ].map((cell, index) => (
                      <TableCell key={index}>{cell}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <Box display="flex" justifyContent="center" my={3}>
            <Pagination
              count={Math.ceil(filteredOutpatients.length / itemsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </Box>
      )}

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />
    </Container>
  );
};

export default App;
