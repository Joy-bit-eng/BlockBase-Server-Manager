const express = require('express');
const cors = require('cors');
const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const SERVERS_DIR = path.join(__dirname, 'servers');
if (!fs.existsSync(SERVERS_DIR)) {
  fs.mkdirSync(SERVERS_DIR);
}

const getServerPath = (id) => path.join(SERVERS_DIR, `server-${id}`);

app.post('/start/:id', (req, res) => {
  const id = req.params.id;
  const serverPath = getServerPath(id);
  if (!fs.existsSync(serverPath)) {
    return res.status(404).json({ error: 'Server not found' });
  }

  const startCommand = `cd ${serverPath} && LD_LIBRARY_PATH=. ./bedrock_server`;
  const child = exec(startCommand, (err) => {
    if (err) console.error(err);
  });

  res.json({ message: `Server ${id} starting...` });
});

app.post('/stop/:id', (req, res) => {
  // In production, use better process management
  res.json({ message: `Stop server not implemented directly.` });
});

app.post('/backup/:id', (req, res) => {
  const id = req.params.id;
  const serverPath = getServerPath(id);
  const backupPath = path.join(serverPath, `backup-${Date.now()}.zip`);

  if (!fs.existsSync(serverPath)) {
    return res.status(404).json({ error: 'Server not found' });
  }

  exec(`zip -r ${backupPath} ${serverPath}`, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Backup failed' });
    }
    res.json({ message: 'Backup created', path: backupPath });
  });
});

app.post('/restore/:id', (req, res) => {
  res.json({ message: 'Restore not implemented yet' });
});

app.listen(PORT, () => {
  console.log(`BlockBase backend API running at http://localhost:${PORT}`);
});
