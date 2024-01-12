import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import CarManagement from '../container/CarManagement';
import '../App.css';

function Admin() {

  return (
    <main>
      <div className="container" style={{ textAlign: 'center' }}>
        <CarManagement />
      </div>
    </main>
  );
}

export default Admin;
