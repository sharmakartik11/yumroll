import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import "./SwipeGame.css";

const cuisines = [
  { name: "Italian" },
  { name: "Chinese"},
  { name: "Mexican"},
  { name: "Thai" },
  { name: "Japanese" },
  { name: "Indian"},
];

const SwipeGame = () => {
  const [current, setCurrent] = useState(0);
  const [likes, setLikes] = useState([]);
  const controls = useAnimation();
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    // Load liked cuisines if user returns
    const savedLikes = localStorage.getItem("likedCuisines");
    if (savedLikes) {
      setLikes(JSON.parse(savedLikes));
    }
  }, []);

  const handleSwipe = async (direction) => {
    const cuisine = cuisines[current];

    if (direction === "right") {
      const newLikes = [...likes, cuisine];
      setLikes(newLikes);
      localStorage.setItem("likedCuisines", JSON.stringify(newLikes));
    }

    await controls.start({
      x: direction === "right" ? 500 : -500,
      opacity: 0,
      transition: { duration: 0.3 },
    });

    const nextIndex = current + 1;
    if (nextIndex >= cuisines.length) {
      setShowResults(true);
    } else {
      setCurrent(nextIndex);
      controls.set({ x: 0, opacity: 1 });
    }
  };

  const handlePlayAgain = () => {
    localStorage.removeItem("likedCuisines"); // Clear liked cuisines from storage
    setLikes([]); // Reset likes state
    setCurrent(0); // Reset current index
    setShowResults(false); // Hide results
  };
  if (showResults) {
    return (
      <div className="results-container">
        <h2>Your Taste Buds Say...</h2>
        {likes.length > 0 ? (
          <ul>
            {likes.map((item, idx) => (
              <li key={idx}>
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>You didn’t like any cuisine 😢</p>
        )}
        <button onClick={handlePlayAgain}>Play Again</button>
        </div>
    );
  }

  const cuisine = cuisines[current];

  return (
    <div className="swipe-container">
      <motion.div
        className="swipe-card"
        animate={controls}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={(event, info) => {
          if (info.offset.x > 100) handleSwipe("right");
          else if (info.offset.x < -100) handleSwipe("left");
        }}
      >
        <h2>{cuisine.name}</h2>
      </motion.div>
      <p>Swipe right to like, left to skip</p>
    </div>
  );
};

export default SwipeGame;
