import React, { useEffect, useState } from "react";
import PlantList from "./PlantList";

function App() {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((res) => res.json())
      .then((data) => setPlants(data))
      .catch((err) => console.error("Error fetching plants:", err));
  }, []);

  return (
    <div className="App">
      <h1>Plantsy 🌿</h1>
      <PlantList plants={plants} />
    </div>
  );
}

export default App;
