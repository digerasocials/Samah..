import fs from 'fs';

const filePath = 'C:/Users/jahsh/.gemini/antigravity/brain/b6f430f5-6cbf-4c75-9b64-5713e95588c7/.system_generated/steps/300/content.md';
let raw = fs.readFileSync(filePath, 'utf8');

// Search for any occurence of "logo", "partner", "client", "hospital", "ministry", "company", "saudi"
const terms = ['logo', 'partner', 'client', 'hospital', 'ministry', 'company', 'saudi', 'brand'];
terms.forEach(term => {
  const reg = new RegExp(`[^"{}\\[\\]]{0,30}${term}[^"{}\\[\\]]{0,30}`, 'gi');
  const m = raw.match(reg) || [];
  console.log(`=== Matches for "${term}": ${m.length} ===`);
  [...new Set(m)].slice(0, 5).forEach(x => console.log('  ', x.trim()));
});
