const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const fs = require('fs');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Start the Minecraft server
app.post('/api/start', (req, res) => {
  const { id } = req.body;
  exec(`cd servers/${id} && ./bedrock_server`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Start error: ${error.message}`);
      return res.status(500).send('Failed to start server');
    }
    res.send('Server started');
  });
});

// Stop the Minecraft server (assumes screen or tmux)
app.post('/api/stop', (req, res) => {
  const { id } = req.body;
  exec(`pkill -f "servers/${id}/bedrock_server"`, (error) => {
    if (error) {
      console.error(`Stop error: ${error.message}`);
      return res.status(500).send('Failed to stop server');
    }
    res.send('Server stopped');
  });
});

// Create a backup
app.post('/api/backup', (req, res) => {
  const { id } = req.body;
  const source = `servers/${id}/worlds`;
  const backup = `backups/${id}-${Date.now()}.zip`;
  exec(`zip -r ${backup} ${source}`, (error) => {
    if (error) {
      console.error(`Backup error: ${error.message}`);
      return res.status(500).send('Failed to create backup');
    }
    res.send('Backup created');
  });
});

// Restore a backup (example - use a known backup name)
app.post('/api/restore', (req, res) => {
  const { id, backupName } = req.body;
  exec(`unzip -o backups/${backupName} -d servers/${id}`, (error) => {
    if (error) {
      console.error(`Restore error: ${error.message}`);
      return res.status(500).send('Failed to restore backup');
    }
    res.send('Backup restored');
  });
});

app.listen(PORT, () => {
  console.log(`Backend API running on http://localhost:${PORT}`);
});
