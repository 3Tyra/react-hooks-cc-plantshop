import React from "react";
import PlantCard from "./PlantCard";

function PlantList({plants, onUpdateStock}) {
  return (
    <ul className="cards">
      {plants.map((plant) => (
          <PlantCard key={plant.id} plant={plant} onUpdateStock={onUpdateStock} />
        ))}
    </ul>
  );
}

export default PlantList;