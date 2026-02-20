const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

try {
  // Get the directory where this script is located
  const scriptDir = __dirname;
  const rootDir = path.resolve(scriptDir);

  // Check if we're in root (has server subdirectory) or already in server directory
  const serverPath = path.join(rootDir, 'server');
  const isServerDir = fs.existsSync('nest-cli.json') && fs.existsSync('package.json');
  const isRootDir = fs.existsSync('server') && fs.existsSync('package.json');

  let serverDir;
  if (isServerDir) {
    // Already in server directory
    serverDir = '.';
  } else if (isRootDir) {
    // In root directory, server is a subdirectory
    serverDir = 'server';
  } else if (fs.existsSync(serverPath)) {
    // Try absolute path
    serverDir = serverPath;
  } else {
    console.error('Error: Cannot find server directory');
    console.error('Current directory:', process.cwd());
    console.error('Script directory:', scriptDir);
    process.exit(1);
  }

  console.log(`Building from ${serverDir} directory...`);
  const finalServerDir = path.resolve(serverDir);
  process.chdir(finalServerDir);
  execSync('npm install', { stdio: 'inherit' });
  execSync('npm run build', { stdio: 'inherit' });
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}
