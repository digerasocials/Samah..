import fs from 'fs';

const filePath = 'C:/Users/jahsh/.gemini/antigravity/brain/b6f430f5-6cbf-4c75-9b64-5713e95588c7/.system_generated/steps/274/content.md';
const content = fs.readFileSync(filePath, 'utf8');

// Find all script tags content
const scripts = content.match(/<script[^>]*>([\s\S]*?)<\/script>/gi) || [];
console.log(`Total script tags found: ${scripts.length}`);

scripts.forEach((s, idx) => {
  if (s.includes('1685d6bc-4f0f-422c-9a87-f0c269dbcfb4') || s.includes('img1.wsimg.com') || s.includes('initialState') || s.includes('gallery')) {
    console.log(`Script ${idx + 1} contains target assets/data! Length: ${s.length}`);
    // Extract image URLs in this script
    const imgs = s.match(/(?:https?:)?\/\/[^\s"'>]+\.(?:png|jpg|jpeg|svg|webp)[^\s"'>]*/gi) || [];
    console.log(`  Found ${imgs.length} image URLs in script ${idx + 1}`);
    imgs.forEach(img => console.log('   -', img));
  }
});
