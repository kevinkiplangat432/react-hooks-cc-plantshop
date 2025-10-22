import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ plants, markSoldOut }) {
  if (!plants || !Array.isArray(plants)) return <p>No plants found</p>;

  return (
    <ul className="cards">
      {plants.map((plant) => (
        <PlantCard key={plant.id} plant={plant} markSoldOut={markSoldOut} />
      ))}
    </ul>
  );
}

export default PlantList;
