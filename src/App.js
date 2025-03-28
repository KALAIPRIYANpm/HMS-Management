import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserManagement from './pages/admin/user';
import AppointmentManagement from './pages/admin/appointment';
import NFTManagement from './pages/admin/nft-management';
import TransactionManagement from './pages/admin/transactions';
import Dashboard from './pages/Dashboard';
import DoctorManagement from './pages/admin/DoctorManagement';
import PharmacyAppointments from './pages/admin/pharmacistManagement';
import OutpatientManager from './pages/outPatient';
// import PharmacistForm from './pages/admin/pharmacistManagement';
import PharmacistManager from './pages/admin/pharmacistManagement';
import AdminLogin from './pages/admin/AdminLogin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/admin/appointments" element={<AppointmentManagement />} />
        <Route path="/admin/nft" element={<NFTManagement />} />
        <Route path="/admin/transactions" element={<TransactionManagement />} />
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path='/admin/doctormanagement' element={<DoctorManagement/>}/>
        <Route path='/admin/pharmacyManagement' element={<PharmacistManager/>}/>
        <Route path='/admin/outpatientManagement' element={<OutpatientManager/>}/>\
        <Route path='/' element={<AdminLogin/>}/>
      </Routes>
    </Router>
  );
}

export default App;