import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  IconButton,
  CardActions,
  Modal,
  TextField,
  CircularProgress,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

const DoctorManagement = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    doctorID: '',
    name: '',
    specialization: '',
    contactNumber: '',
    email: '',
    address: '',
  });

  // Fetch doctors from the backend
  const fetchDoctors = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/doctors/all');
      setDoctors(res.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // Handle opening/closing the modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Handle input change in modal
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle adding a new doctor
  const handleSubmit = async () => {
    console.log('Form Data:', formData); // ✅ Debug incoming data before sending
  
    try {
      await axios.post('http://localhost:5000/api/doctors/add', formData);
      fetchDoctors(); // Refresh doctor list
      handleClose(); // Close modal
      setFormData({
        doctorID: '',
        name: '',
        specialization: '',
        contactNumber: '', // ✅ Check this name
        email: '',
        address: '',
      });
    } catch (error) {
      console.error('Error adding doctor:', error.response?.data || error.message);
    }
  };
  

  // Handle deleting a doctor
  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete Dr. ${name}?`)) {
      try {
        await axios.delete(`http://localhost:5000/api/doctors/${id}`);
        fetchDoctors();
      } catch (error) {
        console.error('Error deleting doctor:', error);
      }
    }
  };

  // Modal styling
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      {/* Header and Add Button */}
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Typography variant="h4" fontWeight="bold" color="primary">
          Doctor Management
        </Typography>
        <Button variant="contained" color="secondary" onClick={handleOpen}>
          Add Doctor
        </Button>
      </Box>

      {/* Doctor List */}
      {loading ? (
        <CircularProgress style={{ marginTop: '20px' }} />
      ) : (
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {doctors.map((doctor) => (
            <Grid item xs={12} sm={6} md={4} key={doctor._id}>
              <Card sx={{ maxWidth: 345, boxShadow: 3, borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    {doctor.name}
                  </Typography>
                  <Typography color="text.secondary">
                    Specialization: {doctor.specialization}
                  </Typography>
                  <Typography color="text.secondary">
                    Phone: {doctor.contactNumber}
                  </Typography>
                  <Typography color="text.secondary">
                    Email: {doctor.email}
                  </Typography>
                  <Typography color="text.secondary">
                    Address: {doctor.address}
                  </Typography>
                </CardContent>
                <CardActions>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(doctor._id, doctor.name)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Add Doctor Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Typography variant="h6">Add New Doctor</Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          <TextField
            fullWidth
            label="Doctor ID"
            name="doctorID"
            value={formData.doctorID}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Specialization"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Phone Number"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            margin="normal"
          />
          <Box mt={2} textAlign="right">
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Add Doctor
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

export default DoctorManagement;
