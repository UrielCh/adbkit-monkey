import Command from "./command";

export default class Queue {
  public head: Command | null = null;
  public tail: Command | null = null;

  constructor() {
  }

  enqueue(item: Command) {
    if (this.tail) {
      this.tail.next = item;
    } else {
      this.head = item;
    }
    this.tail = item;
  }

  dequeue() {
    const item = this.head;
    if (item) {
      if (item === this.tail) {
        this.tail = null;
      }
      this.head = item.next;
      item.next = null;
    }
    return item;
  }
}

// module.exports = Queue;
