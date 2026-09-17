import fs from 'fs';
import path from 'path';

const dir = 'assets/images/client';
const files = fs.readdirSync(dir);

let html = `<!DOCTYPE html><html><head><title>Client Images Gallery</title><style>
body { font-family: sans-serif; background: #111; color: #fff; padding: 20px; }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; }
.card { background: #222; padding: 10px; border-radius: 8px; text-align: center; }
img { width: 100%; height: 200px; object-fit: cover; border-radius: 4px; }
h4 { margin: 10px 0 0; word-break: break-all; }
</style></head><body><h1>AlSamahCo Real Client Images Gallery</h1><div class="grid">`;

files.forEach(f => {
  html += `<div class="card"><img src="assets/images/client/${f}" /><h4>${f}</h4></div>`;
});

html += `</div></body></html>`;

fs.writeFileSync('gallery.html', html);
console.log('Gallery written to gallery.html');
