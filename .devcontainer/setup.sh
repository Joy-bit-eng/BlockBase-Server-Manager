#!/bin/bash

echo "🔧 Installing Node.js and npm..."

# Update system
sudo apt update

# Install curl
sudo apt install -y curl

# Add Node.js 20 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -

# Install Node.js + npm
sudo apt install -y nodejs

# Confirm installation
node -v
npm -v

echo "✅ Node.js and npm installed successfully!"
