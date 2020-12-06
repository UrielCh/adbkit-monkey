const Stream = require('stream');

export default class MockDuplex extends Stream.Duplex {
  _read(size) {}

  _write(chunk, encoding: string, callback) {
    this.emit('write', chunk, encoding, callback);
    callback(null);
  }

  causeRead(chunk: Buffer| string) {
    if (!Buffer.isBuffer(chunk)) {
      chunk = new Buffer(chunk);
    }
    this.push(chunk);
    this.push(null);
  }
}
