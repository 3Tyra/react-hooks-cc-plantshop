import React, { useState, useEffect } from "react";
import Header from "./Header";
import PlantPage from "./PlantPage";

function App() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((r) => r.json())
      .then((data) => {
        setPlants(data);
      })
      .catch((error) => console.error("Error fetching plants:", error));
  }, []);

  const handleAddPlant = (newPlant) => {
    // Ensure price is a number
    const plantToAdd = {
      ...newPlant,
      price: Number(newPlant.price)
    };

    // Optimistic UI update
    setPlants([...plants, plantToAdd]);

    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(plantToAdd)
    })
      .then((r) => r.json())
      .then((newPlantFromServer) => {
        // Update plant with ID from server
        setPlants((prevPlants) =>
          prevPlants.map((plant) =>
            plant.id === newPlantFromServer.id ? newPlantFromServer : plant
          )
        );
      })
      .catch((error) => {
        console.error("Error adding new plant:", error);
        // Revert optimistic update on error
        setPlants((prevPlants) =>
          prevPlants.filter((plant) => plant !== plantToAdd)
        );
      });
  };

  const handleUpdateStock = (plantId, newInStockStatus) => {
    const updatedPlants = plants.map((plant) =>
      plant.id === plantId ? { ...plant, inStock: newInStockStatus } : plant
    );

    setPlants(updatedPlants);

    fetch(`http://localhost:6001/plants/${plantId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ inStock: newInStockStatus })
    })
      .then((r) => r.json())
      .then((updatedPlantFromServer) => {
        setPlants((prevPlants) =>
          prevPlants.map((plant) =>
            plant.id === updatedPlantFromServer.id
              ? updatedPlantFromServer
              : plant
          )
        );
      })
      .catch((error) => {
        console.error("Error updating plant stock:", error);
      });
  };

  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <Header />
      <PlantPage
        plants={filteredPlants}
        onAddPlant={handleAddPlant}
        onUpdateStock={handleUpdateStock}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
    </div>
  );
}

export default App;
