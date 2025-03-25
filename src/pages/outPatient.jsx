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
  Fade,
  Collapse,
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
    status: 'Active',
  });
  const [editing, setEditing] = useState(false);
  const [editID, setEditID] = useState('');
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false); // New state for toggling form visibility
  const itemsPerPage = 5;

  // Fetch all outpatients
  const fetchOutpatients = async () => {
    setLoading(true);
    try {
      const data = await getOutpatients();
      setOutpatients(data);
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
        showSnackbar('Outpatient updated successfully!');
        setEditing(false);
      } else {
        await addOutpatient(form);
        showSnackbar('Outpatient added successfully!');
      }
      resetForm();
      fetchOutpatients();
    } catch (err) {
      showSnackbar('Error saving outpatient.');
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
      status: 'Active',
    });
    setShowForm(false); // Hide form after submission
  };

  // Edit outpatient
  const handleEdit = (outpatient) => {
    setForm(outpatient);
    setEditing(true);
    setEditID(outpatient.outpatientID);
    setShowForm(true); // Show form when editing
  };

  // Delete outpatient
  const handleDelete = async (id) => {
    try {
      await deleteOutpatient(id);
      showSnackbar('Outpatient deleted successfully!');
      fetchOutpatients();
    } catch (err) {
      showSnackbar('Error deleting outpatient.');
      console.error('Error deleting outpatient:', err);
    }
  };

  // Toggle status
  const handleStatusToggle = async (outpatient) => {
    try {
      const updatedStatus = outpatient.status === 'Active' ? 'Inactive' : 'Active';
      await toggleOutpatientStatus(outpatient.outpatientID, {
        ...outpatient,
        status: updatedStatus,
      });
      fetchOutpatients();
      showSnackbar('Status updated successfully!');
    } catch (err) {
      showSnackbar('Error updating status.');
      console.error('Error toggling outpatient status:', err);
    }
  };

  // Show snackbar
  const showSnackbar = (message) => {
    setSnackbar({ open: true, message });
  };

  // Filter by search
  const filteredOutpatients = outpatients.filter((outpatient) =>
    outpatient.name.toLowerCase().includes(search.toLowerCase()) ||
    outpatient.email.toLowerCase().includes(search.toLowerCase())
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
      <Typography variant="h4" gutterBottom align="center" sx={{ mb: 3 }}>
        🏥 Outpatient Management System
      </Typography>

      {/* Search Section */}
      <TextField
        fullWidth
        label="Search by Name or Email"
        variant="outlined"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 2 }}
      />

      {/* New Registration Button */}
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          variant="contained"
          color="success"
          startIcon={<Add />}
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Hide Form' : 'New Registration'}
        </Button>
      </Box>

      {/* Form Section */}
      <Collapse in={showForm} timeout={500}>
        <Paper sx={{ p: 3, mb: 4, boxShadow: 3 }}>
          <Typography variant="h6">{editing ? 'Edit Outpatient' : 'Add New Outpatient'}</Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'grid', gap: 2, mt: 2 }}>
            <TextField
              name="outpatientID"
              label="Outpatient ID"
              value={form.outpatientID}
              onChange={handleChange}
              required
              disabled={editing}
            />
            <TextField name="name" label="Name" value={form.name} onChange={handleChange} required />
            <TextField name="age" label="Age" type="number" value={form.age} onChange={handleChange} required />
            <TextField name="gender" label="Gender" value={form.gender} onChange={handleChange} required />
            <TextField name="shift" label="Shift" value={form.shift} onChange={handleChange} required />
            <TextField name="email" label="Email" value={form.email} onChange={handleChange} required />
            <TextField
              name="phoneNumber"
              label="Phone"
              value={form.phoneNumber}
              onChange={handleChange}
              required
            />
            <Button variant="contained" color="primary" type="submit">
              {editing ? 'Update Outpatient' : 'Add Outpatient'}
            </Button>
          </Box>
        </Paper>
      </Collapse>

      {/* Loading Animation */}
      {loading ? (
        <Box display="flex" justifyContent="center" my={5}>
          <CircularProgress />
        </Box>
      ) : (
        <Fade in={!loading} timeout={500}>
          {/* Outpatient List Section */}
          <TableContainer component={Paper} elevation={3}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Outpatient ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Age</TableCell>
                  <TableCell>Gender</TableCell>
                  <TableCell>Shift</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentItems.map((outpatient) => (
                  <TableRow key={outpatient.outpatientID} hover>
                    <TableCell>{outpatient.outpatientID}</TableCell>
                    <TableCell>{outpatient.name}</TableCell>
                    <TableCell>{outpatient.age}</TableCell>
                    <TableCell>{outpatient.gender}</TableCell>
                    <TableCell>{outpatient.shift}</TableCell>
                    <TableCell>{outpatient.email}</TableCell>
                    <TableCell>{outpatient.phoneNumber}</TableCell>
                    <TableCell>
                      <Switch
                        checked={outpatient.status === 'Active'}
                        onChange={() => handleStatusToggle(outpatient)}
                      />
                      {outpatient.status}
                    </TableCell>
                    <TableCell>
                      <IconButton color="primary" onClick={() => handleEdit(outpatient)}>
                        <Edit />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleDelete(outpatient.outpatientID)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Fade>
      )}

      {/* Pagination */}
      <Box display="flex" justifyContent="center" mt={3}>
        <Pagination
          count={Math.ceil(filteredOutpatients.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />
    </Container>
  );
};

export default App;
