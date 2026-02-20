#!/bin/bash
set -e

# Check if we're already in server directory
if [ -f "package.json" ] && [ -f "nest-cli.json" ]; then
  echo "Already in server directory, building..."
  npm install
  npm run build
elif [ -d "server" ]; then
  echo "Found server directory, entering and building..."
  cd server
  npm install
  npm run build
else
  echo "Error: Cannot find server directory"
  exit 1
fi
