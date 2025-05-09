import React, { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/hello")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => setMessage("Error fetching"));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Frontend + Backend</h1>
      <p>Response: {message}</p>
    </div>
  );
}

export default App;
