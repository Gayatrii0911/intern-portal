// backend/server.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

const user = {
  name: "Gayatri Mahajan",
  referralCode: "gayatri2025",
  donations: 7200
};

const leaderboard = [
  { name: "Gayatri Mahajan", donations: 7200 },
  { name: "Arjun Patel", donations: 6000 },
  { name: "Sneha Verma", donations: 5500 }
];

app.get('/api/user', (req, res) => res.json(user));
app.get('/api/leaderboard', (req, res) => res.json(leaderboard));

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
