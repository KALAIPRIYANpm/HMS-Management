import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className='w-64 bg-gray-900 h-screen text-white'>
      <nav className='p-4'>
        <Link to='/dashboard' className='block py-2'>Dashboard</Link>
        <Link to='/admin/users' className='block py-2'>User Management</Link>
        <Link to='/admin/appointments' className='block py-2'>Appointment Management</Link>
        <Link to='/admin/nft' className='block py-2'>NFT Management</Link>
        <Link to='/admin/transactions' className='block py-2'>Transaction Management</Link>
      </nav>
    </div>
  );
};

export default Sidebar;