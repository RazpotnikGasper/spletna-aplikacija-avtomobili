// tabelaCars.js
import React from 'react';
import CarNoButtons from './CarNoButtons';

function TabelaCars({ filterType, filterName, handleFilterTypeChange, handleFilterNameChange, carsFiltered ,typeOptions, nameOptions }) {
  return (
    <div>
      <div className="row">
        <h2 className="text-uppercase" style={{ paddingTop: '25px', paddingBottom: '10px' }}>
          Filtriraj podatke :
        </h2>
        <div className="col-6 md" style={{ paddingTop: '5px' }}>
          <select
            className="form-control"
            name="name"
            value={filterName}
            onChange={handleFilterNameChange}
          >
            {/* 
              Add your options here based on available car names.
              Example:
            */}
            <option value="">Izberi znamko....</option>
            {nameOptions.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="col-6 md" style={{ paddingTop: '5px' }}>
          <select
            className="form-control"
            name="type" // Change the name attribute to 'type'
            value={filterType}
            onChange={handleFilterTypeChange}
          >
            {/* 
              Add your options here based on available car types.
              Example:
            */}
            <option value="">Izberi tip ...</option>
            {typeOptions.map((type) => (
              <option key={type} value={type}>
                {type}
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
          </tr>
        </thead>
        <tbody>
          {carsFiltered.length === 0 ? (
            <tr>
              <td colSpan="3">Nobeden avto se ne ujema z trenutnim filtrom.</td>
            </tr>
          ) : (
            carsFiltered.map((car, index) => <CarNoButtons key={index} car={car} />)
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TabelaCars;
