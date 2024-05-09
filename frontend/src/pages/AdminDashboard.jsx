import React, { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';



const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard'); // State to track active tab

  const handleNavClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className='w-full flex flex-row max-h-screen overflow-y-hidden'>
      <h1>Admin</h1>
      
    </div>
  );
};

export default AdminDashboard;
