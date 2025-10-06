
/*

- TextEncoder#encodeInto does not support resizable ArrayBuffers on Chrome 141.
- Resizing an ArrayBuffer is much more expensive than simply allocating a new buffer through TextEncoder#encode.
- Resizing an ArrayBuffer is generally surprisingly slow.

*/

function ta() {
  const start = performance.now();
  const te = new TextEncoder();
  const buf = new ArrayBuffer(0, {
    maxByteLength: 1024 * 1024 * 1024,
  });
  const arr = new Uint8Array(buf);
  let pos = 0;
  for (let i = 0; i < 1_000_000; i++) {
    const value = "abc";
    buf.resize(pos + value.length * 3);
    const res = te.encodeInto(value, arr.subarray(pos));
    if (res.written === 0) {
      throw new Error("TODO");
    }
    pos += value.length * 2;
  }
  console.log(`ta: ${performance.now() - start} ms`);
}

function tb() {
  const start = performance.now();
  const te = new TextEncoder();
  const bufs = [];
  let size = 0;
  for (let i = 0; i < 1_000_000; i++) {
    const value = "abc";
    const bytes = te.encode(value);
    size += bytes.length;
    bufs.push(bytes);
  }
  const arr = new Uint8Array(size);
  let pos = 0;
  for (const bytes of bufs) {
    arr.set(bytes, pos);
    pos += bytes.length;
  }
  console.log(`tb: ${performance.now() - start} ms`);
}
