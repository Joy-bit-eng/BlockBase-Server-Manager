const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Start a Minecraft Bedrock server
app.post('/start', (req, res) => {
  const { ip, port } = req.body;
  // replace this with your own script logic
  exec(`bedrock_server`, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).send(`Error: ${stderr}`);
    }
    res.send(`Server started:\n${stdout}`);
  });
});

// Stop server (your own logic here)
app.post('/stop', (req, res) => {
  res.send('Stop command triggered. Add your logic here.');
});

app.listen(PORT, () => {
  console.log(`BlockBase backend running at http://localhost:${PORT}`);
});
