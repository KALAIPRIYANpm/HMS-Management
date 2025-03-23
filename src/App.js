import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserManagement from './pages/admin/user';
import AppointmentManagement from './pages/admin/appointment';
import NFTManagement from './pages/admin/nft-management';
import TransactionManagement from './pages/admin/transactions';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/admin/appointments" element={<AppointmentManagement />} />
        <Route path="/admin/nft" element={<NFTManagement />} />
        <Route path="/admin/transactions" element={<TransactionManagement />} />
        <Route path="/" element={<Dashboard/>}/>
      </Routes>
    </Router>
  );
}

export default App;