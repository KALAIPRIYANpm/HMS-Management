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
  Grid,
  IconButton,
} from '@mui/material';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { getAppointments, addAppointment, deleteAppointment } from '../../api/appointmentService';

const COLORS = ['#4CAF50', '#FFC107', '#F44336'];

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [open, setOpen] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    patientName: '',
    doctorName: '',
    date: '',
    status: 'Pending',
  });
  const [filterStatus, setFilterStatus] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch appointments on load
  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const data = await getAppointments();
      setAppointments(data);
      setFilteredAppointments(data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  // Open and close modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment({ ...newAppointment, [name]: value });
  };

  // Add new appointment
  const handleAddAppointment = async () => {
    try {
      await addAppointment(newAppointment);
      fetchAppointments();
      setNewAppointment({ patientName: '', doctorName: '', date: '', status: 'Pending' });
      handleClose();
    } catch (error) {
      console.error('Error adding appointment:', error);
    }
  };

  // Delete appointment
  const handleDeleteAppointment = async (id) => {
    try {
      await deleteAppointment(id);
      fetchAppointments();
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  };

  // Generate Pie Chart Data
  const pieData = [
    { name: 'Completed', value: appointments.filter((app) => app.status === 'Completed').length },
    { name: 'Pending', value: appointments.filter((app) => app.status === 'Pending').length },
    { name: 'Cancelled', value: appointments.filter((app) => app.status === 'Cancelled').length },
  ];

  // Filter Appointments
  useEffect(() => {
    let filtered = appointments;

    if (filterStatus) {
      filtered = filtered.filter((app) => app.status === filterStatus);
    }

    if (searchQuery) {
      filtered = filtered.filter((app) =>
        app.patientName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredAppointments(filtered);
  }, [filterStatus, searchQuery, appointments]);

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card sx={{ mb: 4, backgroundColor: '#f3f4f6', boxShadow: 3, borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#37474F' }}>
              Appointment Management
            </Typography>
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
              <Button
                variant="contained"
                startIcon={<AddCircleIcon />}
                onClick={handleOpen}
                sx={{ mb: 3, backgroundColor: '#4CAF50', '&:hover': { backgroundColor: '#388E3C' } }}
              >
                Add Appointment
              </Button>
            </motion.div>

            {/* Filters Section */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Search by Patient Name"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  select
                  fullWidth
                  label="Filter by Status"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  variant="outlined"
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                  <MenuItem value="Cancelled">Cancelled</MenuItem>
                </TextField>
              </Grid>
            </Grid>

            {/* Appointments Table */}
            <TableContainer component={Card} sx={{ boxShadow: 3 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Patient</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Doctor</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredAppointments.map((row) => (
                    <motion.tr
                      key={row._id}
                      whileHover={{ scale: 1.02, backgroundColor: '#e3f2fd' }}
                      transition={{ duration: 0.2 }}
                    >
                      <TableCell>{row.patientName}</TableCell>
                      <TableCell>{row.doctorName}</TableCell>
                      <TableCell>{row.date}</TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          sx={{
                            color:
                              row.status === 'Completed'
                                ? '#4CAF50'
                                : row.status === 'Cancelled'
                                ? '#F44336'
                                : '#FFC107',
                            fontWeight: 'bold',
                          }}
                        >
                          {row.status}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <IconButton color="error" onClick={() => handleDeleteAppointment(row._id)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>

        {/* Pie Chart for Overview */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card sx={{ boxShadow: 3, borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Appointment Overview
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    fill="#8884d8"
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Add Appointment Modal */}
      <Modal open={open} onClose={handleClose}>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
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
              borderRadius: 3,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Add New Appointment
            </Typography>
            <TextField
              fullWidth
              label="Patient Name"
              name="patientName"
              value={newAppointment.patientName}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Doctor"
              name="doctorName"
              value={newAppointment.doctorName}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Date"
              name="date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={newAppointment.date}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              select
              fullWidth
              label="Status"
              name="status"
              value={newAppointment.status}
              onChange={handleChange}
              margin="normal"
            >
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
              <MenuItem value="Cancelled">Cancelled</MenuItem>
            </TextField>
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddAppointment}
                sx={{ mt: 2, backgroundColor: '#4CAF50', '&:hover': { backgroundColor: '#388E3C' } }}
              >
                Add Appointment
              </Button>
            </motion.div>
          </Box>
        </motion.div>
      </Modal>
    </Container>
  );
};

export default Appointments;
