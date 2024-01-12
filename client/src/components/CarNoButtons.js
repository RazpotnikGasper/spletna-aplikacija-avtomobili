// CarNoButtons.js
import React from "react";

const CarNoButtons = ({ car }) => {
  return (
    <tr>
      <td>{car.name}</td>
      <td>{car.model}</td>
      <td>{car.type}</td>
    </tr>
  );
};

export default CarNoButtons;
