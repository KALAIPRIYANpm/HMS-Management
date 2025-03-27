import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// Sample NFT Data
const nftData = [
  {
    id: 1,
    name: "CryptoPunk #001",
    price: "12 ETH",
    image: "/images/nft1.png",
  },
  {
    id: 2,
    name: "Bored Ape #23",
    price: "20 ETH",
    image: "/images/nft2.png",
  },
  {
    id: 3,
    name: "Doodle #11",
    price: "8 ETH",
    image: "/images/nft3.png",
  },
];

// NFT Price Chart Data
const nftChartData = [
  { name: "Jan", value: 10 },
  { name: "Feb", value: 15 },
  { name: "Mar", value: 8 },
  { name: "Apr", value: 12 },
];

//the NFT consist of the Unique id for the Each data 

const NFTManagement = () => {
  const [showForm, setShowForm] = useState(false);
  const [nftList, setNftList] = useState(nftData);
  const [newNft, setNewNft] = useState({
    name: "",
    price: "",
    image: "",
  });

  // Toggle Add NFT Form
  const toggleForm = () => setShowForm(!showForm);

  // Handle Form Change
  const handleChange = (e) => {
    setNewNft({ ...newNft, [e.target.name]: e.target.value });
  };

  // Add New NFT
  const handleAddNft = () => {
    if (newNft.name && newNft.price && newNft.image) {
      setNftList([...nftList, { ...newNft, id: nftList.length + 1 }]);
      setNewNft({ name: "", price: "", image: "" });
      setShowForm(false);
    }
  };

  return (
    <Box
      sx={{
        p: 4,
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="h4"
        component={motion.div}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        sx={{
          mb: 3,
          textAlign: "center",
          color: "#4A148C",
          fontWeight: "bold",
        }}
      >
        NFT Management
      </Typography>

      {/* Add NFT Button */}
      <Button
        variant="contained"
        startIcon={<AddCircleIcon />}
        onClick={toggleForm}
        sx={{
          backgroundColor: "#6200EA",
          mb: 3,
          "&:hover": { backgroundColor: "#4A148C" },
        }}
      >
        {showForm ? "Cancel" : "Add New NFT"}
      </Button>

      {/* Add NFT Form */}
      {showForm && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: "20px" }}
        >
          <Card
            sx={{
              p: 3,
              backgroundColor: "#EDE7F6",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="NFT Name"
                  name="name"
                  value={newNft.name}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Price (ETH)"
                  name="price"
                  value={newNft.price}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Image URL"
                  name="image"
                  value={newNft.image}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Button
              variant="contained"
              onClick={handleAddNft}
              sx={{ mt: 2, backgroundColor: "#6200EA", "&:hover": { backgroundColor: "#4A148C" } }}
            >
              Add NFT
            </Button>
          </Card>
        </motion.div>
      )}

      {/* NFT List */}
      <Grid container spacing={3}>
        {nftList.map((nft) => (
          <Grid item xs={12} sm={6} md={4} key={nft.id}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card
                sx={{
                  backgroundColor: "#EDE7F6",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                  borderRadius: 4,
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={nft.image}
                  alt={nft.name}
                />
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" color="#4A148C">
                    {nft.name}
                  </Typography>
                  <Typography variant="body1" color="#6200EA">
                    Price: {nft.price}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* NFT Price Chart */}
      <Box mt={5}>
        <Typography variant="h5" sx={{ mb: 2, color: "#4A148C" }}>
          NFT Price Trends
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={nftChartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#6200EA" />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default NFTManagement;
