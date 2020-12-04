/*
 * decaffeinate suggestions:
 * DS002: Fix invalid constructor
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
import Api from './api';
import Net from 'net';
import Command from './command';
import Reply from './reply';
import Queue from './queue';
import Multi from './multi';
import Parser from './parser';
import { Duplex } from 'stream';

export default class Client extends Api {
  public commandQueue = new Queue()
  public parser = new Parser();
  public stream: Duplex | null = null;

  constructor() {
    super();
  }

  _hook() {
    this.stream.on('data', (data: any) => {
      return this.parser.parse(data);
    });
    this.stream.on('error', (err: Error) => {
      return this.emit('error', err);
    });
    this.stream.on('end', () => {
      return this.emit('end');
    });
    this.stream.on('finish', () => {
      return this.emit('finish');
    });
    this.parser.on('reply', (reply: Reply) => {
      return this._consume(reply);
    });
    this.parser.on('error', (err: Error) => {
      return this.emit('error', err);
    });
  }

  _consume(reply: Reply) {
    let command;
    if (command = this.commandQueue.dequeue()) {
      if (reply.isError()) {
        command.callback(reply.toError(), null, command.command);
      } else {
        command.callback(null, reply.value, command.command);
      }
    } else {
      throw new Error("Command queue depleted, but replies still coming in");
    }
  }

  connect(stream: Duplex | Net.NetConnectOpts) {
    if (stream instanceof Duplex)
    this.stream = stream;
    this._hook();
    return this;
  }

  end() {
    this.stream.end();
    return this;
  }

  send(commands, callback) {
    if (Array.isArray(commands)) {
      for (let command of Array.from(commands)) {
        this.commandQueue.enqueue(new Command(command, callback));
      }
      this.stream.write(`${commands.join('\n')}\n`);
    } else {
      this.commandQueue.enqueue(new Command(commands, callback));
      this.stream.write(`${commands}\n`);
    }
    return this;
  }

  multi() {
    return new Multi(this);
  }
}

// module.exports = Client;
