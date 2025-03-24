import React, { useState, useEffect } from 'react';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Modal,
  Box,
  TextField,
  MenuItem,
} from '@mui/material';
import { addDoctor, getAllDoctors, deleteDoctor } from '../../api/doctorService';

const DoctorManagement = () => {
  const [doctors, setDoctors] = useState([]);
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [newDoctor, setNewDoctor] = useState({
    name: '',
    specialization: '',
    email: '',
    phone: '',
    availableDays: [],
  });

  // Open/Close Modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  // Open/Close Confirmation Modal
  const handleConfirmOpen = (doctor) => {
    setSelectedDoctor(doctor);
    setConfirmOpen(true);
  };

  const handleConfirmClose = () => {
    setSelectedDoctor(null);
    setConfirmOpen(false);
  };

  // Fetch All Doctors
  const fetchDoctors = async () => {
    try {
      const res = await getAllDoctors();
      setDoctors(res.data);
    } catch (err) {
      console.error('Error fetching doctors:', err);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDoctor({ ...newDoctor, [name]: value });
  };

  // Add New Doctor
  const handleAddDoctor = async () => {
    try {
      // ✅ Ensure availableDays is an array (trim whitespace)
      const formattedDoctor = {
        ...newDoctor,
        availableDays: newDoctor.availableDays.map(day => day.trim())
      };
  
      await addDoctor(formattedDoctor);
      fetchDoctors();
      setNewDoctor({ name: '', specialization: '', email: '', phone: '', availableDays: [] });
      handleClose();
    } catch (err) {
      console.error("Error adding doctor:", err);
    }
  };
  

  // Delete Doctor
  const handleDeleteDoctor = async (id) => {
    try {
      await deleteDoctor(id);
      fetchDoctors(); // Refresh the list after deletion
    } catch (err) {
      console.error('Error deleting doctor:', err);
    }
  };
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Card sx={{ mb: 4, backgroundColor: '#e3f2fd', boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
            Doctor Management
          </Typography>
          <Button variant="contained" color="primary" onClick={handleOpen} sx={{ mb: 2 }}>
            Add New Doctor
          </Button>

          {/* Doctor List Table */}
          <TableContainer component={Card} sx={{ boxShadow: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Specialization</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Available Days</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {doctors.map((doc) => (
                  <TableRow key={doc._id}>
                    <TableCell>{doc.name}</TableCell>
                    <TableCell>{doc.specialization}</TableCell>
                    <TableCell>{doc.email}</TableCell>
                    <TableCell>{doc.phone}</TableCell>
                    <TableCell>{doc.availableDays.join(', ')}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleConfirmOpen(doc)}
                        sx={{ mr: 1 }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Add Doctor Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Add New Doctor
          </Typography>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={newDoctor.name}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Specialization"
            name="specialization"
            value={newDoctor.specialization}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={newDoctor.email}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Phone"
            name="phone"
            value={newDoctor.phone}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Available Days (Comma-separated)"
            name="availableDays"
            value={newDoctor.availableDays}
            onChange={(e) => setNewDoctor({ ...newDoctor, availableDays: e.target.value.split(',') })}
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={handleAddDoctor} sx={{ mt: 2 }}>
            Add Doctor
          </Button>
        </Box>
      </Modal>

      {/* Confirmation Modal */}
      <Modal open={confirmOpen} onClose={handleConfirmClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 300,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Are you sure you want to remove this doctor?
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button variant="contained" color="error" onClick={handleDeleteDoctor}>
              Yes, Remove
            </Button>
            <Button variant="outlined" onClick={handleConfirmClose}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

export default DoctorManagement;