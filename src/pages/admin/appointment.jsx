import React, { useState } from 'react';
import { Container, Card, CardContent, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Modal, Box, TextField, MenuItem } from '@mui/material';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Completed', value: 60 },
  { name: 'Pending', value: 30 },
  { name: 'Cancelled', value: 10 },
];

const COLORS = ['#4CAF50', '#FFC107', '#F44336'];

const AppointmentPage = () => {
  const [appointments, setAppointments] = useState([
    { id: 1, patient: 'John Doe', doctor: 'Dr. Smith', date: '2025-04-01', status: 'Completed' },
    { id: 2, patient: 'Jane Smith', doctor: 'Dr. Brown', date: '2025-04-05', status: 'Pending' },
  ]);

  const [open, setOpen] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    patient: '',
    doctor: '',
    date: '',
    status: 'Pending',
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment({ ...newAppointment, [name]: value });
  };

  const handleAddAppointment = () => {
    const newApp = { ...newAppointment, id: appointments.length + 1 };
    setAppointments([...appointments, newApp]);
    setNewAppointment({ patient: '', doctor: '', date: '', status: 'Pending' });
    handleClose();
  };

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
                  </TableRow>
                </TableHead>
                <TableBody>
                  {appointments.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.patient}</TableCell>
                      <TableCell>{row.doctor}</TableCell>
                      <TableCell>{row.date}</TableCell>
                      <TableCell>{row.status}</TableCell>
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
                  <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} label>
                    {data.map((entry, index) => (
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
            name="patient"
            value={newAppointment.patient}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Doctor"
            name="doctor"
            value={newAppointment.doctor}
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

export default AppointmentPage;
