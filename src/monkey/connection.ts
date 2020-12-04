/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
import Net from 'net';
import Client from './client'

export default class Connection extends Client {
  connect(options: Net.NetConnectOpts) {
    const stream = Net.connect(options);
    stream.setNoDelay(true);
    return super.connect(stream);
  }

  _hook() {
    this.stream.on('connect', () => {
      return this.emit('connect');
    });
    this.stream.on('close', hadError => {
      return this.emit('close', hadError);
    });
    return super._hook();
  }
}

module.exports = Connection;
