import fs from 'fs';

async function main() {
  try {
    const res = await fetch('https://alsamahtech.co/');
    const html = await res.text();
    fs.writeFileSync('raw_site.html', html, 'utf8');
    console.log('Saved raw_site.html, length:', html.length);

    // Extract all image URLs
    const imgRegex = /(?:https?:)?\/\/[^\s"'>\\]+\.(?:png|jpg|jpeg|svg|webp)[^\s"'>\\]*/gi;
    const matches = html.match(imgRegex) || [];
    const unique = [...new Set(matches)];

    console.log('UNIQUE IMAGES FOUND:', unique.length);
    unique.forEach((u, i) => console.log(`${i+1}: ${u}`));

  } catch (err) {
    console.error('Error fetching raw site HTML:', err.message);
  }
}

main();
