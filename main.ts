// One picture, one day: copies entry.png — the 18 November 2026 world-news
// front page this repository stores — to the grader's output directory,
// and refuses to hand the gate anything but a whole, valid image.
// Standard library only. Run: MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const src = new URL('./entry.png', import.meta.url);
const dst = join(out, 'entry.png');

// The gate wants a whole PNG or JPEG of at most 1 MiB and 1024x1024: check
// the bytes we are about to hand over before the grader ever sees them.
const size = statSync(src).size;
const file = readFileSync(src);

const isPng = file.subarray(0, 8).equals(
  Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
const isJpeg = file[0] === 0xff && file[1] === 0xd8 && file[2] === 0xff;
if (!isPng && !isJpeg) throw new Error('entry.png is neither a PNG nor a JPEG');
if (size > 1048576) throw new Error(`entry.png is ${size} bytes, over the 1 MiB cap`);

if (isPng) {
  // Walk every chunk: length, type, CRC. A truncated or corrupt PNG never
  // reaches the grader, and the image data must end in IEND.
  let off = 8;
  let lastType = '';
  while (off + 8 <= size) {
    const len = file.readUInt32BE(off);
    const type = file.toString('ascii', off + 4, off + 8);
    const chunkEnd = off + 12 + len;
    if (chunkEnd > size) throw new Error(`PNG chunk ${type} runs past end of file`);
    const crc = file.readUInt32BE(off + 8 + len);
    let crcSum = 0xffffffff;
    for (let i = 0; i < len + 4; i++) {
      crcSum ^= file[off + 4 + i];
      for (let b = 0; b < 8; b++) {
        crcSum = (crcSum >>> 1) ^ (0xedb88320 & -(crcSum & 1));
      }
    }
    crcSum = (crcSum ^ 0xffffffff) >>> 0;
    if (crcSum !== crc) throw new Error(`PNG chunk ${type} fails its CRC check`);
    off = chunkEnd;
    lastType = type;
  }
  if (lastType !== 'IEND') throw new Error(`file ends in ${lastType}, not IEND`);
  const width = file.readUInt32BE(16);
  const height = file.readUInt32BE(20);
  if (width > 1024 || height > 1024) throw new Error(`entry.png is ${width}x${height}, over the 1024px cap`);
  const interlace = file[28];
  if (interlace !== 0) throw new Error(`entry.png declares interlace method ${interlace}`);
} else {
  // JPEG: scan the segments to the end-of-image marker FFD9.
  let off = 2;
  let sawEnd = false;
  while (off + 4 <= size) {
    if (file[off] !== 0xff) throw new Error('JPEG marker expected but missing');
    const marker = file[off + 1];
    if (marker === 0xd9) { sawEnd = true; break; }
    if (marker === 0xd8 || (marker >= 0xd0 && marker <= 0xd7)) { off += 2; continue; }
    const segLen = file.readUInt16BE(off + 2);
    off += 2 + segLen;
  }
  if (!sawEnd) throw new Error('JPEG has no end-of-image marker');
}

copyFileSync(src, dst);
console.log(`wrote ${dst} (${size} bytes, ${isPng ? 'PNG' : 'JPEG'}, whole and valid)`);
