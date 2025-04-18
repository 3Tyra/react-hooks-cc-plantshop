import React from "react";

function PlantCard({ plant }) {
  return (
    <div className="plant-card">
      <img src={plant.image} alt={plant.name} />
      <h3>{plant.name}</h3>
      <p>${plant.price.toFixed(2)}</p>
    </div>
  );
}

export default PlantCard;
