// download_bedrock_server.js
const https = require('https');
const fs = require('fs');
const path = require('path');

const downloadURL = 'https://minecraft.azureedge.net/bin-linux/bedrock-server-1.20.80.02.zip'; // ✅ Latest as of June 2025
const outputPath = path.join(__dirname, 'bedrock-server.zip');

console.log('⬇️ Downloading Minecraft Bedrock Server from: ' + downloadURL);

https.get(downloadURL, (res) => {
  if (res.statusCode !== 200) {
    console.error(`❌ Download failed. Status Code: ${res.statusCode}`);
    return;
  }

  const file = fs.createWriteStream(outputPath);
  res.pipe(file);

  file.on('finish', () => {
    file.close();
    console.log(`✅ Download complete: ${outputPath}`);
    console.log('📦 You can now unzip the file using:');
    console.log(`    unzip ${outputPath} -d ./server`);
  });
}).on('error', (err) => {
  console.error(`❌ Error: ${err.message}`);
});
