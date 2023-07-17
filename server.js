const express = require('express');
const fs = require ('fs');
const path = require('path');
// const api = require('./routes/index.js');
const notes_routes = require('./routes/notes');

const PORT = process.env.port || 3005;
const app = express();


// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/api', api);

app.use(express.static('public'));
app.use(notes_routes);

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// wildcard Route
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);



app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
