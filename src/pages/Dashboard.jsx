import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FaCalendarCheck, FaUserMd, FaPills, FaProcedures } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Dashboard Data
const data = [
  {
    name: "Appointments",
    value: 100,
    path: "/admin/appointments",
    icon: <FaCalendarCheck className="text-blue-500 text-3xl" />,
  },
  {
    name: "Pharmacist",
    value: 10,
    path: "/admin/pharmacyManagement",
    icon: <FaPills className="text-purple-500 text-3xl" />,
  },
  {
    name: "Outpatient Management",
    value: 10,
    path: "/admin/outpatientManagement",
    icon: <FaProcedures className="text-pink-500 text-3xl" />,
  },
  {
    name: "Doctors",
    value: 20,
    path: "/admin/doctormanagement",
    icon: <FaUserMd className="text-green-500 text-3xl" />,
  },
];

const Dashboard = () => {
  const navigate = useNavigate();

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <Box className="p-8 min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Title Section */}
      <Typography
          variant="h5"
          className="mb-4 text-blue-800 font-semibold text-center"
          style={{
            textAlign: "center",
            fontWeight: "600",
            marginBottom: "20px",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          Admin Dashboard
        </Typography>

      {/* Summary Cards */}
      <Grid container spacing={3} justifyContent="center">
        {data.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              className="shadow-xl rounded-lg bg-white hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
              onClick={() => handleCardClick(item.path)}
              style={{
                borderRadius: "16px",
                backgroundColor: "#fff",
                transition: "all 0.3s ease-in-out",
              }}
            >
              <CardContent
                className="flex flex-col items-center p-5 space-y-3"
                style={{ padding: "20px" }}
              >
                <div className="mb-2">{item.icon}</div>
                <Typography
                  variant="h6"
                  className="text-gray-700 font-semibold text-center"
                  style={{ fontWeight: "600", fontSize: "18px" }}
                >
                  {item.name}
                </Typography>
                <Typography
                  variant="h5"
                  className="text-blue-600 font-bold"
                  style={{ fontWeight: "700", fontSize: "24px" }}
                >
                  {item.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Overview Analytics Section */}
      <Box
        className="mt-12 bg-white p-8 rounded-lg shadow-md"
        style={{
          marginTop: "40px",
          backgroundColor: "#fff",
          borderRadius: "16px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
        }}
      >
        <Typography
          variant="h5"
          className="mb-4 text-blue-800 font-semibold text-center"
          style={{
            textAlign: "center",
            fontWeight: "600",
            marginBottom: "20px",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          📊 Overview Analytics
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} barSize={40}>
            <XAxis
              dataKey="name"
              stroke="#888"
              tick={{
                fill: "#4b5563",
                fontSize: 14,
                fontWeight: "500",
                fontFamily: "Poppins, sans-serif",
              }}
            />
            <YAxis
              stroke="#888"
              tick={{
                fill: "#4b5563",
                fontSize: 14,
                fontWeight: "500",
                fontFamily: "Poppins, sans-serif",
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                borderColor: "#ddd",
                padding: "10px",
                boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
              }}
            />
            <Bar
              dataKey="value"
              fill="url(#barGradient)"
              radius={[8, 8, 0, 0]}
            />
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="100%" stopColor="#c084fc" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default Dashboard;
