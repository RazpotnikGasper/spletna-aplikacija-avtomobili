import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Car from "../components/Car";
import "../App.css";

function Home() {
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
        setNameCars(data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);
  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/tip")
      .then((res) => res.json())
      .then((data) => {
        setTipCars(data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleDelete = (carId) => {
    // Delete the car on the server
    fetch(`http://127.0.0.1:5000/api/cars/${carId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error deleting car:", error));

    // Update the local state to reflect the deletion
    setCars((prevCars) => prevCars.filter((car) => car.id !== carId));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCar((prevNewCar) => ({ ...prevNewCar, [name]: value }));
  };

  const handleAddCar = () => {
    // Add the new car on the server
    fetch("http://127.0.0.1:5000/api/cars", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newCar.name,
        model: newCar.model,
        type: newCar.type,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error adding car:", error));

    // Update the local state to reflect the addition
    setCars((prevCars) => [...prevCars, newCar]);

    // Clear the form after adding the car
    setNewCar({
      name: "",
      model: "",
      type: "",
    });
  };

  const handleEdit = (car) => {
    // Set the car data to editCar state
    setEditCar(car);

    // Set the modal form data
    setModalFormData({
      name: car.name,
      model: car.model,
      type: car.type,
    });

    // Open the modal for editing
    toogleModal();
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setModalFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const toogleModal = () => {
    // Toggle the modal state
    setModal((prevModal) => !prevModal);
  };
  const handleFilterTypeChange = (e) => {
    const { value } = e.target;
    setFilterType(value);
  };
  const handleFilterNameChange = (e) => {
    const { value } = e.target;
    setFilterName(value);
  };
  const handleUpdateCar = () => {
    // Update the car on the server
    fetch(`http://127.0.0.1:5000/api/cars/${editCar.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: modalFormData.name,
        model: modalFormData.model,
        type: modalFormData.type,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error updating car:", error));

    // Update the local state to reflect the changes
    setCars((prevCars) =>
      prevCars.map((car) =>
        car.id === editCar.id ? { ...car, ...modalFormData } : car
      )
    );

    // Close the modal
    toogleModal();

    // Reset editCar state
    setEditCar(null);
  };

  if (!cars || cars.length === 0) {
    return <div>Ni podatkov</div>;
  }
  return (
    <main>
      <div className="container" style={{ textAlign: "center" }}>
        <br />
        <h1 className="test text-center">
          Administracijska stran za prodajo avtomobilov
        </h1>
        <br />
        <form>
          <div className="mb-3">
            <label className="form-label">Name:</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={newCar.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Model:</label>
            <input
              type="text"
              className="form-control"
              name="model"
              value={newCar.model}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Type:</label>
            <select
              className="form-control"
              name="type"
              value={newCar.type}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>
                Izberi tip vozila
              </option>
              {tipCars.map((tipcar) => (
                <option key={tipcar.id} value={tipcar.nametip}>
                  {tipcar.nametip}
                </option>
              ))}
            </select>
          </div>
          <button
            className={`btn ${
              newCar.name && newCar.model && newCar.type
                ? "btn-success"
                : "btn-secondary"
            }`}
            onClick={handleAddCar}
            disabled={!newCar.name || !newCar.model || !newCar.type}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="16"
              width="14"
              viewBox="0 0 448 512"
            >
              <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
            </svg>
          </button>
        </form>
        <div className="row">
          <h2 className="text-uppercase" style={{paddingTop:"25px", paddingBottom:"10px"}}>Filtriraj podatke :</h2>
          <div className="col-6 md" style={{ paddingTop: "5px" }}>
            <select
              className="form-control"
              name="type"
              value={filterName}
              onChange={handleFilterNameChange}
            >
              <option value="">Izberi znamko vozila</option>
              {nameCars.map((namecar) => (
                <option key={namecar.id} value={namecar.name}>
                  {namecar.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-6 md" style={{ paddingTop: "5px" }}>
            <select
              className="form-control"
              name="type"
              value={filterType}
              onChange={handleFilterTypeChange}
            >
              <option value="">Izberi tip vozila</option>
              {tipCars.map((tipcar) => (
                <option key={tipcar.id} value={tipcar.nametip}>
                  {tipcar.nametip}
                </option>
              ))}
            </select>
          </div>
        </div>

        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Model</th>
              <th>Tip</th>
              <th>Akcija</th>
            </tr>
          </thead>
          <tbody>
            {carsFiltered.map((car, index) => (
              <Car
                key={index}
                car={car}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div
        className={`modal ${modal ? "open" : ""}`}
        style={{ textAlign: "center" }}
      >
        <div className="overlay">
          <br></br>
          <h2>Spremeni avtomobil</h2>
          <br></br>
          <input
            type="text"
            className="form-control"
            name="name"
            value={modalFormData.name}
            onChange={handleEditInputChange}
            required
          />
          <input
            type="text"
            className="form-control"
            name="model"
            value={modalFormData.model}
            onChange={handleEditInputChange}
            required
          />
          <select
            className="form-control"
            name="type"
            value={modalFormData.type}
            onChange={handleEditInputChange}
            required
          >
            <option value="" disabled>
              Izberi tip vozila
            </option>
            {tipCars.map((tipcar) => (
              <option key={tipcar.id} value={tipcar.nametip}>
                {tipcar.nametip}
              </option>
            ))}
          </select>
          <br></br>
          <div className="btn-group" role="group" aria-label="Basic example">
            <button className="btn btn-warning" onClick={handleUpdateCar}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="16"
                width="14"
                viewBox="0 0 448 512"
              >
                <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
              </svg>
            </button>

            <button className="btn btn-secondary" onClick={toogleModal}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="16"
                width="12"
                viewBox="0 0 384 512"
              >
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
              </svg>{" "}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home;
