const fs = require('fs');
const path = require('path');

const buildDir = path.join(__dirname, '..', '.next');
const scriptTag = '<script src="/dashboard-console-capture.js"></script>';

function injectScript(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      injectScript(filePath);
    } else if (file.endsWith('.html')) {
      let content = fs.readFileSync(filePath, 'utf8');
      
      if (!content.includes('dashboard-console-capture.js')) {
        content = content.replace('</head>', `${scriptTag}</head>`);
        fs.writeFileSync(filePath, content);
        console.log(`Injected console capture into ${filePath}`);
      }
    }
  });
}

if (fs.existsSync(buildDir)) {
  injectScript(buildDir);
  console.log('Console capture script injection complete!');
} else {
  console.log('Build directory not found. Run build first.');
}