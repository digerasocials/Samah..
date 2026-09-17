const fs = require('fs');

const file = 'C:\\Users\\jahsh\\.gemini\\antigravity\\brain\\b6f430f5-6cbf-4c75-9b64-5713e95588c7\\.system_generated\\steps\\79\\content.md';
let content = fs.readFileSync(file, 'utf8');

// Strip metadata header if present
const jsonStart = content.indexOf('{');
if (jsonStart !== -1) {
  content = content.substring(jsonStart);
}

try {
  const data = JSON.parse(content);
  console.log('JSON parsed successfully!');
  
  function scan(obj, context = '') {
    if (!obj) return;
    if (typeof obj === 'object') {
      if (obj.image || obj.src || obj.url) {
        const img = obj.image || obj.src || obj.url;
        const title = obj.title || obj.heading || obj.caption || obj.alt || '';
        console.log('ITEM:', title, '-->', JSON.stringify(img));
      }
      Object.keys(obj).forEach(k => scan(obj[k], context + '.' + k));
    }
  }

  scan(data);
} catch (e) {
  console.error('JSON Error:', e.message);
}
