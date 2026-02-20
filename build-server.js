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
  const originalDir = process.cwd();
  process.chdir(finalServerDir);
  execSync('npm install', { stdio: 'inherit' });
  execSync('npm run build', { stdio: 'inherit' });

  // Return to original directory and ensure public directory exists
  process.chdir(originalDir);
  const publicDir = path.join(originalDir, 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
    // Create a simple index.html if it doesn't exist
    const indexHtml = path.join(publicDir, 'index.html');
    if (!fs.existsSync(indexHtml)) {
      fs.writeFileSync(
        indexHtml,
        '<!DOCTYPE html><html><head><title>HabitArena API</title></head><body><h1>HabitArena API Server</h1><p>API endpoints at /api/v1/*</p></body></html>'
      );
    }
  }
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}
