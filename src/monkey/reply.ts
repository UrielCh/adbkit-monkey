/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
export default class Reply {
  static ERROR = 'ERROR';
  static OK = 'OK';

  constructor(public type: string, public value: string) {
  }

  isError() {
    return this.type === Reply.ERROR;
  }

  toError() {
    if (!this.isError()) {
      throw new Error('toError() cannot be called for non-errors');
    }
    return new Error(this.value);
  }
}

// module.exports = Reply;
