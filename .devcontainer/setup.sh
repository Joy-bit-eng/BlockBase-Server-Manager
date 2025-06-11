#!/bin/bash

echo "🔧 Updating system packages..."
sudo apt update

echo "🔧 Installing curl, unzip, and ping tools..."
sudo apt install -y curl unzip iputils-ping

echo "🔧 Installing Node.js and npm..."

# Add Node.js 20 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -

# Install Node.js and npm
sudo apt install -y nodejs

# Confirm installation
echo "✅ Installed versions:"
node -v
npm -v
ping -V || echo "⚠️ Ping not installed correctly."

echo "✅ All tools installed successfully!"
