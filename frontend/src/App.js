import { Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import Signup from './components/Signup';
import Login from './components/Login';
import AdminDashboard from './pages/AdminDashboard';
import Dashboard from './pages/Dashboard';


function App() {
  const [userRole, setUserRole] = useState(localStorage.getItem('role'));

  useEffect(() => {
    const interval = setInterval(() => {
      const role = localStorage.getItem('role');
      console.log('Role stored in localStorage:', role);

      setUserRole(role);
    }, 1); // Check every 1 second

    return () => clearInterval(interval); // Clean up interval on unmount
  }, []);

  return (

    <BrowserRouter>
      <Routes>
        {/* For Admin */}
        {userRole === 'admin' && (
          <Route path='/admindashboard' element={<AdminDashboard />} />
        )}

        {/* For User */}
        {userRole === 'user' && (
          <>
            <Route path='/userdashboard' element={<Dashboard />} />
          </>
        )}

        {/* Common Routes */}
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />

        {/* Redirect to login for unauthorized access */}
        <Route path='*' element={<Navigate replace to='/login' />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
