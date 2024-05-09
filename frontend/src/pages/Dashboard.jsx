import React, { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';




const Dashboard = () => {
  const [activeComponent, setActiveComponent] = useState('dashboard'); // Default active component

  const handleNavClick = (component) => {
    setActiveComponent(component);
  };

  return (
    <div className='max-h-screen flex flex-row'>
      <h1>User</h1>

     
    </div>
  );
};

export default Dashboard;
