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
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { motion } from 'framer-motion';

const PharmacistManager = () => {
  const [open, setOpen] = useState(false);

  // Dummy Pharmacists Data
  const dummyPharmacists = [
    {
      id: 1,
      name: 'Alice Smith',
      email: 'alice.pharma@example.com',
      phone: '9876543210',
      shift: 'Morning',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Bob Johnson',
      email: 'bob.johnson@example.com',
      phone: '9876509876',
      shift: 'Night',
      status: 'Inactive',
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

  // Handle Modal Open/Close
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <Card sx={{ mb: 4, backgroundColor: '#e3f2fd', boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
              Pharmacist Management
            </Typography>

            {/* Register New Pharmacist Button */}
            <Button variant="contained" color="primary" onClick={handleOpen} sx={{ mb: 2 }}>
              Register New Pharmacist
            </Button>

            {/* Pharmacist Table */}
            <TableContainer component={Card} sx={{ boxShadow: 3 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Shift</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dummyPharmacists.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>{row.phone}</TableCell>
                      <TableCell>{row.shift}</TableCell>
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

      {/* Register Pharmacist Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography variant="h6" gutterBottom>
            Register New Pharmacist
          </Typography>
          <TextField fullWidth label="Name" name="name" margin="normal" />
          <TextField fullWidth label="Email" name="email" margin="normal" />
          <TextField fullWidth label="Phone Number" name="phone" margin="normal" />
          <TextField fullWidth label="Shift (e.g., Morning/Night)" name="shift" margin="normal" />
          <TextField fullWidth label="Status (e.g., Active/Inactive)" name="status" margin="normal" />
          <Button variant="contained" color="primary" sx={{ mt: 2 }}>
            Register Pharmacist
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default PharmacistManager;
