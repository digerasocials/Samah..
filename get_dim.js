import fs from 'fs';
import path from 'path';

const dir = 'assets/images/client';
const files = fs.readdirSync(dir);

function getJpegDimensions(buffer) {
  let offset = 2;
  while (offset < buffer.length) {
    const marker = buffer.readUInt16BE(offset);
    offset += 2;
    if (marker === 0xFFC0 || marker === 0xFFC2) {
      const height = buffer.readUInt16BE(offset + 3);
      const width = buffer.readUInt16BE(offset + 5);
      return { width, height };
    }
    const length = buffer.readUInt16BE(offset);
    offset += length;
  }
  return { width: 0, height: 0 };
}

files.forEach(f => {
  const filePath = path.join(dir, f);
  const buf = fs.readFileSync(filePath);
  const dim = getJpegDimensions(buf);
  console.log(`${f}: ${dim.width}x${dim.height}`);
});
