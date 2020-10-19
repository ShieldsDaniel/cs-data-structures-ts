import DoubleLinkedListNode from "./DoubleLinkedListNode";

export interface IsQueue<T> {
  queue(value: T): void;
  dequeue(): T|null;
}

export default class Queue<T> implements IsQueue<T> {
  private head: DoubleLinkedListNode<T>|null = null;
  private tail: DoubleLinkedListNode<T>|null = null;

  constructor(private doubleLinkedListNodeFactory: (v: T) => DoubleLinkedListNode<T>) {}

  public queue(value: T): void {
    const newNode = this.doubleLinkedListNodeFactory(value);
    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else if (this.tail !== null) {
      this.head.prevNode = newNode;
      newNode.nextNode = this.head;
      this.head = newNode;
    }
  }

  public dequeue(): T|null {
    if (this.tail !== null) {
      const tailValue = this.tail.nodeValue;
      if (this.tail.prevNode !== null) {
        this.tail.prevNode.nextNode = null;
        this.tail = this.tail.prevNode;
      } else if (this.tail === this.head) {
        this.tail = null;
        this.head = null;
      }
      return tailValue;
    }
    return null;
  }

  get queueHead(): DoubleLinkedListNode<T>|null {
    return this.head;
  }

  get queueTail(): DoubleLinkedListNode<T>|null {
    return this.tail;
  }
}