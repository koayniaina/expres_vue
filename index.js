const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv')
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); 

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});