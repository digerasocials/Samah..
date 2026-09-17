const fs = require('fs');

const logFile = 'C:\\Users\\jahsh\\.gemini\\antigravity\\brain\\b6f430f5-6cbf-4c75-9b64-5713e95588c7\\.system_generated\\steps\\6\\content.md';
const content = fs.readFileSync(logFile, 'utf8');

const regex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
let match;
while ((match = regex.exec(content)) !== null) {
  console.log('--- FOUND IMG ---');
  console.log(match[0]);
}
