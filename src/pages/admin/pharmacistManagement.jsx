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
  Paper,
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
    borderRadius: 3,
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <Card
          sx={{
            mb: 4,
            backgroundColor: '#f5f5f5',
            boxShadow: 5,
            borderRadius: 3,
          }}
        >
          <CardContent>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#1565c0' }}>
              Pharmacist Management
            </Typography>

            <Button
              variant="contained"
              color="primary"
              onClick={() => handleOpen()}
              sx={{
                mb: 2,
                background: 'linear-gradient(45deg, #42a5f5, #1e88e5)',
                '&:hover': { background: 'linear-gradient(45deg, #1e88e5, #0d47a1)' },
              }}
            >
              Register New Pharmacist
            </Button>

            <TableContainer
              component={Paper}
              sx={{
                boxShadow: 5,
                borderRadius: 3,
                overflow: 'hidden',
              }}
            >
              <Table>
                <TableHead sx={{ backgroundColor: '#e3f2fd' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Specialization</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Phone</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Shift</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pharmacists.map((row) => (
                    <TableRow
                      key={row._id}
                      hover
                      sx={{
                        '&:nth-of-type(odd)': { backgroundColor: '#f1f8e9' },
                        '&:hover': { backgroundColor: '#e3f2fd' },
                      }}
                    >
                      <TableCell>{row.pharmacistID}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.specialization}</TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>{row.contactNumber}</TableCell>
                      <TableCell>{row.shift}</TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          sx={{
                            color: row.status === 'Active' ? '#2e7d32' : '#d32f2f',
                            fontWeight: 'bold',
                          }}
                        >
                          {row.status}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <IconButton color="primary" onClick={() => handleOpen(row)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => handleDeletePharmacist(row._id)}
                          sx={{ ml: 1 }}
                        >
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
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Box sx={modalStyle}>
            <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 'bold', color: '#1565c0' }}>
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
                    variant="outlined"
                  />
                </Grid>
              ))}
            </Grid>
            <Box mt={2} display="flex" justifyContent="flex-end">
              <Button
                variant="contained"
                onClick={handleSavePharmacist}
                sx={{
                  mt: 2,
                  background: 'linear-gradient(45deg, #4caf50, #2e7d32)',
                  '&:hover': { background: 'linear-gradient(45deg, #2e7d32, #1b5e20)' },
                }}
              >
                {editId ? 'Update Pharmacist' : 'Register Pharmacist'}
              </Button>
            </Box>
          </Box>
        </motion.div>
      </Modal>
    </Container>
  );
};

export default PharmacistManager;
