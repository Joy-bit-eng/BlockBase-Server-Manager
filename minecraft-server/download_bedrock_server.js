const https = require('https');
const fs = require('fs');
const path = require('path');

const output = path.join(__dirname, 'bedrock-server.zip');

function download(url, dest) {
  const file = fs.createWriteStream(dest);
  https.get(url, (response) => {
    if (response.statusCode === 302 || response.statusCode === 301) {
      // Follow redirect
      download(response.headers.location, dest);
    } else if (response.statusCode === 200) {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded to ${dest}`);
      });
    } else {
      console.error(`Request failed with status code: ${response.statusCode}`);
    }
  }).on('error', (err) => {
    fs.unlink(dest, () => {});
    console.error(`Error: ${err.message}`);
  });
}

download(
  'https://minecraft.azureedge.net/bin-linux/bedrock-server-1.20.81.01.zip',
  output
);
