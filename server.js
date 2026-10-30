const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Mock Database Tier (can be swapped with MongoDB/Postgres later)
let events = [
  { id: 1, sport: '100m Sprint', captain: 'Ali Khan', department: 'Computer Science' },
  { id: 2, sport: 'Futsal', captain: 'Ahmed Raza', department: 'Software Engineering' }
];

// API Endpoints (Logic Tier)
app.get('/api/events', (req, res) => {
  res.json(events);
});

app.post('/api/events', (req, res) => {
  const { sport, captain, department } = req.body;
  constnewEvent = { id: events.length + 1, sport, captain, department };
  events.push(newEvent);
  res.status(201).json({ message: 'Team registered successfully!', event: newEvent });
});

app.listen(PORT, () => {
  console.log(`Sports Week app running on port ${PORT}`);
});