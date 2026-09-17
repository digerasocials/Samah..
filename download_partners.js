import fs from 'fs';
import path from 'path';

const partnerUrls = [
  'https://img1.wsimg.com/isteam/ip/1685d6bc-4f0f-422c-9a87-f0c269dbcfb4/IMG_5979.jpg/:/rs=h:120,cg:true,m',
  'https://img1.wsimg.com/isteam/ip/1685d6bc-4f0f-422c-9a87-f0c269dbcfb4/IMG_5982.jpg/:/rs=h:120,cg:true,m',
  'https://img1.wsimg.com/isteam/ip/1685d6bc-4f0f-422c-9a87-f0c269dbcfb4/IMG_5981.jpg/:/rs=h:120,cg:true,m',
  'https://img1.wsimg.com/isteam/ip/1685d6bc-4f0f-422c-9a87-f0c269dbcfb4/IMG_5983.jpg/:/rs=h:120,cg:true,m',
  'https://img1.wsimg.com/isteam/ip/1685d6bc-4f0f-422c-9a87-f0c269dbcfb4/D00482AC-9FCE-4278-912C-8F9C3DD05BAE.PNG/:/rs=h:120,cg:true,m',
  'https://img1.wsimg.com/isteam/ip/1685d6bc-4f0f-422c-9a87-f0c269dbcfb4/IMG_5984.jpg/:/rs=h:120,cg:true,m',
  'https://img1.wsimg.com/isteam/ip/1685d6bc-4f0f-422c-9a87-f0c269dbcfb4/IMG_5977.jpg/:/rs=h:120,cg:true,m',
  'https://img1.wsimg.com/isteam/ip/1685d6bc-4f0f-422c-9a87-f0c269dbcfb4/IMG_5976.jpg/:/rs=h:120,cg:true,m'
];

const dir = 'assets/images/partners';
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

async function downloadImages() {
  console.log('Downloading authentic AlSamahCo partner logos...');
  for (let i = 0; i < partnerUrls.length; i++) {
    const url = partnerUrls[i];
    try {
      const res = await fetch(url);
      const arrayBuffer = await res.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const ext = url.includes('.PNG') || url.includes('.png') ? 'png' : 'jpg';
      const outPath = path.join(dir, `partner_${i + 1}.${ext}`);
      fs.writeFileSync(outPath, buffer);
      console.log(`Saved: ${outPath} (${buffer.length} bytes)`);
    } catch (err) {
      console.error(`Failed to download ${url}:`, err.message);
    }
  }
}

downloadImages();
