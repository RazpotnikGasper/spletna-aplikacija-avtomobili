import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import CarManagement from '../container/CarManagement';
import '../App.css';

function Admin() {
  // Use the useNavigate hook to get the navigate function
  const navigate = useNavigate();

  // Function to handle navigation to Home.js
  const goToHome = () => {
    navigate('/admin'); // Use the path of Home.js here
  };

  return (
    <main>
      <div className="container" style={{ textAlign: 'center' }}>
        <CarManagement />
          <button  className="btn btn-info" onClick={goToHome}>Go to Admin</button>
      </div>
    </main>
  );
}

export default Admin;
