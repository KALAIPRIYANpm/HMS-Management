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
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import {
  getAppointments,
  addAppointment,
  deleteAppointment,
} from '../../api/appointmentService';

const COLORS = ['#4CAF50', '#FFC107', '#F44336'];

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [open, setOpen] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    patient: '',
    doctor: '',
    date: '',
    status: 'Pending',
  });

  // Fetch appointments on page load
  useEffect(() => {
    fetchAppointments();
  }, []);

  // Fetch Appointments from API
  const fetchAppointments = async () => {
    try {
      const data = await getAppointments();
      setAppointments(data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  // Handle Modal Open/Close
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Handle Form Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment({ ...newAppointment, [name]: value });
  };

  // Add New Appointment
  const handleAddAppointment = async () => {
    try {
      await addAppointment(newAppointment);
      fetchAppointments();
      setNewAppointment({ patient: '', doctor: '', date: '', status: 'Pending' });
      handleClose();
    } catch (error) {
      console.error('Error adding appointment:', error);
    }
  };

  // Delete Appointment
  const handleDeleteAppointment = async (id) => {
    try {
      await deleteAppointment(id);
      fetchAppointments();
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  };

  // Generate Pie Chart Data Based on Appointments
  const pieData = [
    {
      name: 'Completed',
      value: appointments.filter((app) => app.status === 'Completed').length,
    },
    {
      name: 'Pending',
      value: appointments.filter((app) => app.status === 'Pending').length,
    },
    {
      name: 'Cancelled',
      value: appointments.filter((app) => app.status === 'Cancelled').length,
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <Card sx={{ mb: 4, backgroundColor: '#fff8e1', boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
              Appointment Management
            </Typography>
            <Button variant="contained" color="primary" onClick={handleOpen} sx={{ mb: 2 }}>
              Add Appointment
            </Button>

            <TableContainer component={Card} sx={{ boxShadow: 3 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Patient</TableCell>
                    <TableCell>Doctor</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {appointments.map((row) => (
                    <TableRow key={row._id}>
                      <TableCell>{row.patientName}</TableCell>
                      <TableCell>{row.doctorName}</TableCell>
                      <TableCell>{row.date}</TableCell>
                      <TableCell>{row.status}</TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          color="secondary"
                          onClick={() => handleDeleteAppointment(row._id)}
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

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card sx={{ boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Appointment Overview
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} label>
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
          <Button variant="contained" color="primary" onClick={handleAddAppointment} sx={{ mt: 2 }}>
            Add Appointment
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default Appointments;
