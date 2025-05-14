const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5050;

app.use(cors());
app.use(express.json()); // Add this middleware to parse JSON payloads

app.get('/', (req, res) => {
  res.send('Welcome to the Yumroll API!');
}
);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}
);

app.post('/api/signup', (req, res) => {
  const { username, password } = req.body;

  // Simulate a successful signup
  if (username && password) {
    res.status(200).json({ message: 'Signup successful!' });
  } else {
    res.status(400).json({ error: 'Invalid input' });
  }
}
);
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // Simulate a successful login
  if (username === 'testuser' && password === 'password') {
    res.status(200).json({ message: 'Login successful!' });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
}
);