import React, { useEffect, useState } from 'react';
import TabelaCars from '../components/tabelaCars';

function CarManagement() {
  const [cars, setCars] = useState([]);
  const [carsFiltered, setCarsFiltered] = useState([]);
  const [tipCars, setTipCars] = useState([]);
  const [nameCars, setNameCars] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [filterName, setFilterName] = useState("");
  const [newCar, setNewCar] = useState({
    name: "",
    model: "",
    type: "",
  });
  const [editCar, setEditCar] = useState(null); // State for editing
  const [modal, setModal] = useState(false);
  const [modalFormData, setModalFormData] = useState({
    name: "",
    model: "",
    type: "",
  });

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/cars")
      .then((res) => res.json())
      .then((data) => {
        setCars(data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);


  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/name")
      .then((res) => res.json())
      .then((data) => {
        setNameCars(data.map((car) => car.name)); // Assuming 'nametip' is the property you want
      })
      .catch((error) => console.error("Error:", error));
  }, []);
  
  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/tip")
      .then((res) => res.json())
      .then((data) => {
        setTipCars(data.map((car) => car.nametip)); // Assuming 'nametip' is the property you want
      })
      .catch((error) => console.error("Error:", error));
  }, []);
  

  useEffect(() => {
    // Filter cars based on user input
    setCarsFiltered(
      cars.filter((car) => {
        if (filterType && car.type !== filterType) {
          return false;
        }
        if (filterName && car.name !== filterName) {
          return false;
        }
        return true;
      })
    );
  }, [filterType, filterName, cars]);
  const handleFilterTypeChange = (e) => {
    const { value } = e.target;
    setFilterType(value);
  };

  const handleFilterNameChange = (e) => {
    const { value } = e.target;
    setFilterName(value);
  };



  // ... (rest of the component remains unchanged)


  return (
    <>
      {(
        <TabelaCars
        filterType={filterType}
        filterName={filterName}
        handleFilterTypeChange={handleFilterTypeChange}
        handleFilterNameChange={handleFilterNameChange}
        carsFiltered={carsFiltered || []}
        typeOptions={tipCars}
        nameOptions={nameCars}
      />
      )}
    </>
  );
}

export default CarManagement;
