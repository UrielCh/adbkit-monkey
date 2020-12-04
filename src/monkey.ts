/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
import { Duplex } from 'stream';
import Client from './monkey/client';
import Connection from './monkey/connection';

class Monkey {
  public Connection = Connection;
  public Client = Client;
  
  static connect(options) {
    return new Connection().connect(options);
  }

  static connectStream(stream: Duplex) {
    return new Client().connect(stream);
  }
}

module.exports = Monkey;
