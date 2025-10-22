import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

const API = "http://localhost:6001/plants";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => setPlants(data))
      .catch((err) => console.error(err));
  }, []);

  const addPlant = (newPlant) => {
    fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPlant),
    })
      .then((res) => res.json())
      .then((savedPlant) => setPlants([...plants, savedPlant]))
      .catch((err) => console.error(err));
  };

  const markSoldOut = (id) => {
    setPlants(plants.map((p) => (p.id === id ? { ...p, soldOut: true } : p)));
  };

const filteredPlants = (plants || []).filter((plant) =>
  plant.name.toLowerCase().includes(searchTerm.toLowerCase())
);

  return (
    <div style={{ padding: "2rem" }}>
      <NewPlantForm addPlant={addPlant} />
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <PlantList plants={filteredPlants} markSoldOut={markSoldOut} />
    </div>
  );
}

export default PlantPage;
