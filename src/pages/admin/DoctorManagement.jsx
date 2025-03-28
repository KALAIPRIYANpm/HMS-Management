import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { motion } from "framer-motion"; // ✅ Added Framer Motion

const DoctorManagement = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    doctorID: "",
    name: "",
    specialization: "",
    contactNumber: "",
    email: "",
    address: "",
    password: "",
  });

  // Fetch doctors from the backend
  const fetchDoctors = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/doctors/all");
      setDoctors(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching doctors:", error);
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
    console.log("Form Data:", formData);
    try {
      await axios.post("http://localhost:5000/api/doctors/add", formData);
      fetchDoctors(); // Refresh doctor list
      handleClose();
      setFormData({
        doctorID: "",
        name: "",
        specialization: "",
        contactNumber: "",
        email: "",
        address: "",
        password: "",
      });
    } catch (error) {
      console.error("Error adding doctor:", error.response?.data || error.message);
    }
  };

  // Handle deleting a doctor
  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete Dr. ${name}?`)) {
      try {
        await axios.delete(`http://localhost:5000/api/doctors/${id}`);
        fetchDoctors();
      } catch (error) {
        console.error("Error deleting doctor:", error);
      }
    }
  };

  // Modal styling
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      {/* Header and Add Button */}
      <Box display="flex" justifyContent="space-between" mb={4}>
        <Typography
          variant="h4"
          fontWeight="bold"
          color="primary"
          component={motion.div}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          👩‍⚕️ Doctor Management
        </Typography>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Button variant="contained" color="secondary" onClick={handleOpen}>
            Add Doctor
          </Button>
        </motion.div>
      </Box>

      {/* Doctor List */}
      {loading ? (
        <CircularProgress style={{ marginTop: "20px" }} />
      ) : (
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {doctors.map((doctor) => (
            <Grid item xs={12} sm={6} md={4} key={doctor._id}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Card
                  sx={{
                    maxWidth: 345,
                    boxShadow: 5,
                    borderRadius: 3,
                    background:
                      "linear-gradient(to bottom right, #f1f5f9, #e0f7fa)",
                    transition: "all 0.3s ease-in-out",
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      color="text.primary"
                    >
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
              </motion.div>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Add Doctor Modal */}
      <Modal open={open} onClose={handleClose}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Box sx={modalStyle}>
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography variant="h6">➕ Add New Doctor</Typography>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Box>

            {/* Input Fields with Spacing and Animation */}
            {[
              { label: "Doctor ID", name: "doctorID" },
              { label: "Name", name: "name" },
              { label: "Specialization", name: "specialization" },
              { label: "Phone Number", name: "contactNumber" },
              { label: "Email", name: "email" },
              { label: "Address", name: "address" },
              { label: "Password", name: "password", type: "password" },
            ].map((field, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <TextField
                  fullWidth
                  label={field.label}
                  name={field.name}
                  type={field.type || "text"}
                  value={formData[field.name]}
                  onChange={handleChange}
                  margin="normal"
                  variant="outlined"
                />
              </motion.div>
            ))}

            <Box mt={3} textAlign="right">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  Add Doctor
                </Button>
              </motion.div>
            </Box>
          </Box>
        </motion.div>
      </Modal>
    </Container>
  );
};

export default DoctorManagement;
