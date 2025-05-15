import React, { useState } from "react";
import "./Dice.css";

const Dice = () => {
  const restaurants = [
    "Rakkan Ramen",
    "Torchy's Tacos",
    "Momo2Go",
    "Pizza Twist",
    "Olive Garden",
    "Blue Sushi",
  ];

  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const rollDice = () => {
    // Randomly pick a number 1 to 6
    const face = Math.floor(Math.random() * 6) + 1;

    // Determine final rotation based on face
    const faceRotation = {
      1: { x: 0, y: 0 },
      2: { x: 0, y: 90 },
      3: { x: 0, y: 180 },
      4: { x: 0, y: -90 },
      5: { x: 90, y: 0 },
      6: { x: -90, y: 0 },
    };

    const newRotation = {
      x: rotation.x + 360 + faceRotation[face].x,
      y: rotation.y + 360 + faceRotation[face].y,
    };

    setRotation(newRotation);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div className="scene">
        <div
          className="cube"
          style={{
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          }}
        >
          {restaurants.map((name, i) => (
            <div key={i} className={`face face${i + 1}`}>
              {name}
            </div>
          ))}
        </div>
      </div>
      <button onClick={rollDice}>Yumroll it! 🎲</button>
    </div>
  );
};

export default Dice;
