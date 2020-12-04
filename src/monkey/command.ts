import { Callback } from './Callback';

export default class Command {
  public next: any;
  constructor(public command: string, public callback: Callback<any>) {
    this.next = null;
  }
}

// module.exports = Command;
