const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Universal Vercel build script: works whether running from repo root or client directory
if (fs.existsSync('client') && fs.existsSync(path.join('client', 'package.json'))) {
  console.log('[Vercel Build] Detected workspace root. Building client subfolder...');
  execSync('npm --prefix client run build', { stdio: 'inherit' });
  
  const clientDist = path.join('client', 'dist');
  if (fs.existsSync(clientDist)) {
    if (!fs.existsSync('dist')) {
      fs.cpSync(clientDist, 'dist', { recursive: true });
    }
  }
} else {
  console.log('[Vercel Build] Detected client directory. Running Vite build...');
  execSync('npm run build', { stdio: 'inherit' });
}
