const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Sample in-memory server list (replace with DB later)
let servers = [
  {
    id: 1,
    name: 'Survival Base',
    status: 'Offline',
    ip: '192.168.1.1',
    port: '19132'
  },
  {
    id: 2,
    name: 'Creative Lab',
    status: 'Offline',
    ip: '192.168.1.2',
    port: '19133'
  }
];

// List servers
app.get('/api/servers', (req, res) => {
  res.json(servers);
});

// Start/Stop server
app.post('/api/servers/:id/toggle', (req, res) => {
  const serverId = parseInt(req.params.id);
  const server = servers.find(s => s.id === serverId);
  if (!server) return res.status(404).json({ error: 'Server not found' });

  // This is where actual start/stop logic goes (placeholder)
  server.status = server.status === 'Online' ? 'Offline' : 'Online';

  res.json({ message: `Server ${server.status.toLowerCase()}ed.`, server });
});

// Create backup
app.post('/api/servers/:id/backup', (req, res) => {
  const serverId = parseInt(req.params.id);
  const server = servers.find(s => s.id === serverId);
  if (!server) return res.status(404).json({ error: 'Server not found' });

  // Placeholder logic for backup
  res.json({ message: `Backup created for server ${server.name}` });
});

// Restore backup
app.post('/api/servers/:id/restore', (req, res) => {
  const serverId = parseInt(req.params.id);
  const server = servers.find(s => s.id === serverId);
  if (!server) return res.status(404).json({ error: 'Server not found' });

  // Placeholder logic for restore
  res.json({ message: `Backup restored for server ${server.name}` });
});

app.listen(port, () => {
  console.log(`BlockBase backend API running at http://localhost:${port}`);
});
