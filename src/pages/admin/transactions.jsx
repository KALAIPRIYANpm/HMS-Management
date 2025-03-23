import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Button,
  Modal,
  Backdrop,
  Fade,
  TextField,
} from "@mui/material";
import { motion } from "framer-motion";
import { DataGrid } from "@mui/x-data-grid";

// Dummy transaction data
const initialData = [
  { id: 1, user: "John Doe", type: "Deposit", amount: 200, date: "2024-03-20" },
  { id: 2, user: "Alice Smith", type: "Withdrawal", amount: 150, date: "2024-03-21" },
  { id: 3, user: "Bob Johnson", type: "Deposit", amount: 300, date: "2024-03-22" },
];

// Modal style
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
  outline: "none",
};

const Transactions = () => {
  const [data, setData] = useState(initialData);
  const [open, setOpen] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    user: "",
    type: "",
    amount: "",
    date: "",
  });

  // Open/Close modal handlers
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Handle change in form fields
  const handleChange = (e) => {
    setNewTransaction({ ...newTransaction, [e.target.name]: e.target.value });
  };

  // Add transaction
  const addTransaction = () => {
    const newEntry = {
      id: data.length + 1,
      ...newTransaction,
      amount: Number(newTransaction.amount),
    };
    setData([...data, newEntry]);
    handleClose();
    setNewTransaction({ user: "", type: "", amount: "", date: "" });
  };

  // Columns for DataGrid
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "user", headerName: "User", width: 150 },
    { field: "type", headerName: "Transaction Type", width: 150 },
    { field: "amount", headerName: "Amount ($)", width: 130 },
    { field: "date", headerName: "Date", width: 150 },
  ];

  return (
    <Box className="p-8 bg-gradient-to-r from-blue-50 to-purple-100 min-h-screen">
      {/* Page Title */}
      <Typography variant="h4" className="mb-6 font-bold text-blue-900">
        Transactions Management
      </Typography>

      {/* Add Transaction Button */}
      <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpen}
          className="mb-6"
        >
          Add Transaction
        </Button>
      </motion.div>

      {/* Data Grid for displaying transactions */}
      <Box className="bg-white p-6 rounded-2xl shadow-md">
        <Typography variant="h5" className="mb-4 text-blue-800 font-semibold">
          Recent Transactions
        </Typography>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          autoHeight
          className="rounded-2xl"
        />
      </Box>

      {/* Modal for Adding Transaction */}
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
          style: { backgroundColor: "rgba(0, 0, 0, 0.5)" }, // Dark backdrop
        }}
      >
        <Fade in={open}>
          <Box sx={modalStyle}>
            <Typography variant="h5" className="mb-4 text-blue-900 font-bold">
              Add New Transaction
            </Typography>
            <TextField
              label="User Name"
              name="user"
              value={newTransaction.user}
              onChange={handleChange}
              fullWidth
              className="mb-4"
            />
            <TextField
              label="Transaction Type"
              name="type"
              value={newTransaction.type}
              onChange={handleChange}
              fullWidth
              className="mb-4"
            />
            <TextField
              label="Amount"
              name="amount"
              type="number"
              value={newTransaction.amount}
              onChange={handleChange}
              fullWidth
              className="mb-4"
            />
            <TextField
              label="Date"
              name="date"
              type="date"
              value={newTransaction.date}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
              className="mb-4"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={addTransaction}
              className="mt-2"
            >
              Add Transaction
            </Button>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default Transactions;
