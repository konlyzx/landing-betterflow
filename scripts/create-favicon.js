const fs = require('fs');
const path = require('path');

// Create a simple 32x32 PNG programmatically
// PNG signature
const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);

function crc32(buf) {
  let crc = -1;
  const table = new Int32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) {
      c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[i] = c;
  }
  for (let i = 0; i < buf.length; i++) {
    crc = table[(crc ^ buf[i]) & 0xFF] ^ (crc >>> 8);
  }
  return (crc ^ -1) >>> 0;
}

function createChunk(type, data) {
  const typeBuf = Buffer.from(type, 'ascii');
  const lenBuf = Buffer.alloc(4);
  lenBuf.writeUInt32BE(data.length, 0);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([lenBuf, typeBuf, data, crcBuf]);
}

function createPNG(width, height, color) {
  const [r, g, b, a] = color;
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr.writeUInt8(8, 8); // bit depth
  ihdr.writeUInt8(6, 9); // color type: RGBA
  ihdr.writeUInt8(0, 10); // compression
  ihdr.writeUInt8(0, 11); // filter
  ihdr.writeUInt8(0, 12); // interlace

  const rowSize = 1 + width * 4;
  const imgData = Buffer.alloc(height * rowSize);
  for (let y = 0; y < height; y++) {
    imgData[y * rowSize] = 0; // filter byte
    for (let x = 0; x < width; x++) {
      const i = y * rowSize + 1 + x * 4;
      imgData[i] = r;
      imgData[i + 1] = g;
      imgData[i + 2] = b;
      imgData[i + 3] = a;
    }
  }

  const zlib = require('zlib');
  const compressed = zlib.deflateSync(imgData);

  return Buffer.concat([
    PNG_SIGNATURE,
    createChunk('IHDR', ihdr),
    createChunk('IDAT', compressed),
    createChunk('IEND', Buffer.alloc(0))
  ]);
}

// ICO format: https://en.wikipedia.org/wiki/ICO_(file_format)
function createICO(pngBuffer, width, height) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // Type: ICO
  header.writeUInt16LE(1, 4); // Count: 1 image

  const entry = Buffer.alloc(16);
  entry.writeUInt8(width > 255 ? 0 : width, 0);
  entry.writeUInt8(height > 255 ? 0 : height, 1);
  entry.writeUInt8(0, 2); // Colors
  entry.writeUInt8(0, 3); // Reserved
  entry.writeUInt16LE(1, 4); // Color planes
  entry.writeUInt16LE(32, 6); // Bits per pixel
  entry.writeUInt32LE(pngBuffer.length, 8); // Size
  entry.writeUInt32LE(22, 12); // Offset

  return Buffer.concat([header, entry, pngBuffer]);
}

// Create favicon with brand color (#ff7e40 - orange)
const png32 = createPNG(32, 32, [255, 126, 64, 255]);
const ico = createICO(png32, 32, 32);

fs.writeFileSync(path.join(__dirname, '../public/favicon.ico'), ico);
console.log('Created favicon.ico (32x32)');

// Also create apple touch icon (180x180 PNG)
const png180 = createPNG(180, 180, [255, 126, 64, 255]);
fs.writeFileSync(path.join(__dirname, '../public/apple-touch-icon.png'), png180);
console.log('Created apple-touch-icon.png (180x180)');

// Copy logo.svg as icon.svg for modern browsers
const svgContent = fs.readFileSync(path.join(__dirname, '../public/logo.svg'));
fs.writeFileSync(path.join(__dirname, '../public/icon.svg'), svgContent);
console.log('Created icon.svg');
