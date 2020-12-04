/*
 * decaffeinate suggestions:
 * DS002: Fix invalid constructor
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
import Api from './api';
import Client from './client';
import Command from './command';
import { Callback } from './Callback';

export default class Multi extends Api {
  public commands = [];
  public replies = [];
  public errors = [];
  public sent = false;
  public callback: Callback<any> = null;
  public counter = 0;
  public collector = (err: Error, result: string, cmd: string) => {
    if (err) { this.errors.push(`${cmd}: ${err.message}`); }
    this.replies.push(result);
    this.counter -= 1;
    return this._maybeFinish();
  };

  constructor(public monkey: Client) {
    super();
  }

  _maybeFinish() {
    if (this.counter === 0) {
      if (this.errors.length) {
        setImmediate(() => {
          return this.callback(new Error(this.errors.join(', ')));
        });
      } else {
        setImmediate(() => {
          return this.callback(null, this.replies);
        });
      }
    }
  }

  _forbidReuse() {
    if (this.sent) {
      throw new Error("Reuse not supported");
    }
  }

  send(command: string) {
    this._forbidReuse();
    this.commands.push(new Command(command, this.collector));
  }

  execute(callback) {
    this._forbidReuse();
    this.counter = this.commands.length;
    this.sent = true;
    this.callback = callback;
    if (this.counter === 0) {
      return;
    }
    const parts = [];
    for (let command of Array.from(this.commands)) {
      this.monkey.commandQueue.enqueue(command);
      parts.push(command.command);
    }
    parts.push('');
    this.commands = [];
    this.monkey.stream.write(parts.join('\n'));
  }
}

// module.exports = Multi;
