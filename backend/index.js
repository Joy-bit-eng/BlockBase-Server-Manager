const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const servers = {}; // Store running processes

app.post('/start', (req, res) => {
  const { id, ip, port: mcPort } = req.body;
  if (servers[id]) return res.status(400).send('Server already running');

  const command = `echo Starting server ${id} on ${ip}:${mcPort}`; // Replace with actual command
  servers[id] = exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error starting server ${id}:`, error);
      return;
    }
    console.log(`Server ${id} output:`, stdout);
  });

  res.send(`Server ${id} starting...`);
});

app.post('/stop', (req, res) => {
  const { id } = req.body;
  if (!servers[id]) return res.status(400).send('Server not running');

  servers[id].kill();
  delete servers[id];
  res.send(`Server ${id} stopped.`);
});

app.listen(port, () => {
  console.log(`Backend API running at http://localhost:${port}`);
});
