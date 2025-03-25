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
  IconButton,
  Grid,
  useMediaQuery,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { motion } from 'framer-motion';
import axios from 'axios';

const PharmacistManager = () => {
  const [open, setOpen] = useState(false);
  const [pharmacists, setPharmacists] = useState([]);
  const [formData, setFormData] = useState({
    pharmacistID: '',
    name: '',
    specialization: '',
    email: '',
    contactNumber: '',
    shift: '',
    status: '',
    address: '',
  });
  const [editId, setEditId] = useState(null);

  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    fetchPharmacists();
  }, []);

  const fetchPharmacists = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/pharmacists');
      setPharmacists(data);
    } catch (error) {
      console.error('Error fetching pharmacists:', error);
    }
  };

  const handleOpen = (pharmacist = null) => {
    if (pharmacist) {
      setFormData(pharmacist);
      setEditId(pharmacist._id);
    } else {
      setFormData({
        pharmacistID: '',
        name: '',
        specialization: '',
        email: '',
        contactNumber: '',
        shift: '',
        status: '',
        address: '',
      });
      setEditId(null);
    }
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSavePharmacist = async () => {
    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/pharmacists/${editId}`, formData);
      } else {
        await axios.post('http://localhost:5000/api/pharmacists', formData);
      }
      fetchPharmacists();
      handleClose();
    } catch (error) {
      console.error('Error saving pharmacist:', error);
    }
  };

  const handleDeletePharmacist = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/pharmacists/${id}`);
      fetchPharmacists();
    } catch (error) {
      console.error('Error deleting pharmacist:', error);
    }
  };

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: isMobile ? '90%' : 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <Card sx={{ mb: 4, backgroundColor: '#e3f2fd', boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
              Pharmacist Management
            </Typography>

            <Button variant="contained" color="primary" onClick={() => handleOpen()} sx={{ mb: 2 }}>
              Register New Pharmacist
            </Button>

            <TableContainer component={Card} sx={{ boxShadow: 3 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Specialization</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Shift</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pharmacists.map((row) => (
                    <TableRow key={row._id}>
                      <TableCell>{row.pharmacistID}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.specialization}</TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>{row.contactNumber}</TableCell>
                      <TableCell>{row.shift}</TableCell>
                      <TableCell>{row.status}</TableCell>
                      <TableCell>
                        <IconButton color="primary" onClick={() => handleOpen(row)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton color="error" onClick={() => handleDeletePharmacist(row._id)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Modal for Adding/Editing Pharmacist */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography variant="h6" gutterBottom>
            {editId ? 'Edit Pharmacist' : 'Register New Pharmacist'}
          </Typography>
          <Grid container spacing={2}>
            {[
              { label: 'Pharmacist ID', name: 'pharmacistID' },
              { label: 'Name', name: 'name' },
              { label: 'Specialization', name: 'specialization' },
              { label: 'Email', name: 'email' },
              { label: 'Phone Number', name: 'contactNumber' },
              { label: 'Shift (e.g., Morning/Night)', name: 'shift' },
              { label: 'Status (e.g., Active/Inactive)', name: 'status' },
              { label: 'Address', name: 'address' },
            ].map((field, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <TextField
                  fullWidth
                  label={field.label}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  margin="normal"
                />
              </Grid>
            ))}
          </Grid>
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              onClick={handleSavePharmacist}
              sx={{ mt: 2 }}
            >
              {editId ? 'Update Pharmacist' : 'Register Pharmacist'}
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

export default PharmacistManager;
