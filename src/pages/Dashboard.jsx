import React from "react";
import { Card, CardContent, Typography, Grid, Box } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const data = [
  { name: "Appointments", value: 240, path: "/admin/appointments" },
  { name: "Users", value: 320, path: "/admin/users" },
  { name: "NFTs", value: 180, path: "/admin/nft" },
  { name: "Transactions", value: 270, path: "/admin/transactions" },
];

const Dashboard = () => {
  const navigate = useNavigate();

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <Box className="p-8 bg-gradient-to-r from-blue-50 to-purple-100 min-h-screen">
      {/* Title */}
      <Typography variant="h4" className="mb-6 font-bold text-blue-900">
        Admin Dashboard
      </Typography>

      {/* Summary Cards with Navigation */}
      <Grid container spacing={4}>
        {data.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              onClick={() => handleCardClick(item.path)}
              className="cursor-pointer"
            >
              <Card className="shadow-lg rounded-2xl bg-white hover:bg-blue-50">
                <CardContent>
                  <Typography
                    variant="h6"
                    className="text-gray-700 font-semibold"
                  >
                    {item.name}
                  </Typography>
                  <Typography
                    variant="h4"
                    className="text-blue-600 font-bold"
                  >
                    {item.value}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Overview Analytics */}
      <Box className="mt-10 bg-white p-6 rounded-2xl shadow-md">
        <Typography
          variant="h5"
          className="mb-4 text-blue-800 font-semibold"
        >
          Overview Analytics
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} className="cursor-pointer">
            <XAxis dataKey="name" stroke="#8884d8" />
            <YAxis />
            <Tooltip cursor={{ fill: "#f5f5f5" }} />
            <Bar dataKey="value" fill="#8884d8" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default Dashboard;
