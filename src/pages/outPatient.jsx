import React, { useState } from 'react';
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
  Select,
  InputLabel,
  FormControl,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { motion } from 'framer-motion';

const OutpatientManager = () => {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState({
    doctor: '',
    date: '',
    status: '',
  });

  // Handle Modal Open/Close
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Handle Filter Change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  // Dummy Outpatients Data
  const dummyOutpatients = [
    {
      id: 1,
      name: 'John Doe',
      age: 45,
      gender: 'Male',
      doctor: 'Dr. Jane Smith',
      date: '2025-03-25',
      status: 'Pending',
    },
    {
      id: 2,
      name: 'Emily Johnson',
      age: 32,
      gender: 'Female',
      doctor: 'Dr. John Doe',
      date: '2025-03-26',
      status: 'Completed',
    },
  ];

  // Modal Styling
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <Card sx={{ mb: 4, backgroundColor: '#e8f5e9', boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
              Outpatient Management
            </Typography>
            <Button variant="contained" color="primary" onClick={handleOpen} sx={{ mb: 2 }}>
              Register Outpatient
            </Button>

            {/* Filters */}
            <Box display="flex" gap={2} mb={3}>
              <FormControl fullWidth>
                <InputLabel>Filter by Doctor</InputLabel>
                <Select name="doctor" value={filters.doctor} onChange={handleFilterChange}>
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="Dr. John Doe">Dr. John Doe</MenuItem>
                  <MenuItem value="Dr. Jane Smith">Dr. Jane Smith</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="Filter by Date"
                name="date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={filters.date}
                onChange={handleFilterChange}
              />
              <FormControl fullWidth>
                <InputLabel>Filter by Status</InputLabel>
                <Select name="status" value={filters.status} onChange={handleFilterChange}>
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                  <MenuItem value="Cancelled">Cancelled</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* Outpatient Table */}
            <TableContainer component={Card} sx={{ boxShadow: 3 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Age</TableCell>
                    <TableCell>Gender</TableCell>
                    <TableCell>Doctor</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dummyOutpatients.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.age}</TableCell>
                      <TableCell>{row.gender}</TableCell>
                      <TableCell>{row.doctor}</TableCell>
                      <TableCell>{row.date}</TableCell>
                      <TableCell>{row.status}</TableCell>
                      <TableCell>
                        <IconButton color="error">
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

      {/* Add Outpatient Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography variant="h6" gutterBottom>
            Register New Outpatient
          </Typography>
          <TextField fullWidth label="Name" name="name" margin="normal" />
          <TextField fullWidth label="Age" name="age" type="number" margin="normal" />
          <FormControl fullWidth margin="normal">
            <InputLabel>Gender</InputLabel>
            <Select name="gender">
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
          <TextField fullWidth label="Assigned Doctor" name="doctor" margin="normal" />
          <TextField fullWidth label="Symptoms" name="symptoms" margin="normal" />
          <TextField
            fullWidth
            label="Date"
            name="date"
            type="date"
            InputLabelProps={{ shrink: true }}
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select name="status" defaultValue="Pending">
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
              <MenuItem value="Cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" sx={{ mt: 2 }}>
            Register Outpatient
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default OutpatientManager;
