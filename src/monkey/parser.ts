/*
 * decaffeinate suggestions:
 * DS002: Fix invalid constructor
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
import { EventEmitter } from 'events';

import Reply from './reply';

export default class Parser extends EventEmitter {
  public column = 0;
  public buffer = new Buffer('');

  constructor(options?: any) {
    super();
  }

  parse(chunk) {
    this.buffer = Buffer.concat([this.buffer, chunk]);
    while (this.column < this.buffer.length) {
      if (this.buffer[this.column] === 0x0a) {
        this._parseLine(this.buffer.slice(0, this.column));
        this.buffer = this.buffer.slice(this.column + 1);
        this.column = 0;
      }
      this.column += 1;
    }
    if (this.buffer.length) {
      this.emit('wait');
    } else {
      this.emit('drain');
    }
  }

  _parseLine(line) {
    switch (line[0]) {
      case 0x4f: // 'O'
        if (line.length === 2) { // 'OK'
          this.emit('reply', new Reply(Reply.OK, null));
        } else { // 'OK:'
          this.emit('reply', new Reply(Reply.OK, line.toString('ascii', 3)));
        }
        break;
      case 0x45: // 'E'
        if (line.length === 5) { // 'ERROR'
          this.emit('reply', new Reply(Reply.ERROR, null));
        } else { // 'ERROR:'
          this.emit('reply', new Reply(Reply.ERROR, line.toString('ascii', 6)));
        }
        break;
      default:
        this._complain(line);
    }
  }

  _complain(line) {
    this.emit('error', new SyntaxError(`Unparseable line '${line}'`));
  }
}

module.exports = Parser;
