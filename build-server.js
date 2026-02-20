const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

try {
  // Check if we're already in server directory
  const isServerDir = fs.existsSync('nest-cli.json') && fs.existsSync('package.json');
  const serverDir = isServerDir ? '.' : 'server';

  if (!fs.existsSync(serverDir)) {
    console.error('Error: Cannot find server directory');
    process.exit(1);
  }

  console.log(`Building from ${serverDir === '.' ? 'current' : serverDir} directory...`);
  process.chdir(serverDir);
  execSync('npm install', { stdio: 'inherit' });
  execSync('npm run build', { stdio: 'inherit' });
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}
