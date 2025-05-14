const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5050;

app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome to the Yumroll API!');
}
);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}
);
