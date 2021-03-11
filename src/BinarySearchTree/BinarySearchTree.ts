import { IsQueue } from "../LinkedList/Queue";

export enum TraversalOrder {
  IN_ORDER,
  PRE_ORDER,
  POST_ODRER,
}

export default class BinarySearchTree<T> {
  readonly value: T;
  public leftNode: BinarySearchTree<T> | null = null;
  public rightNode: BinarySearchTree<T> | null = null;

  constructor(nodeValue: T) {
    this.value = nodeValue;
  }

  insert(value: T): void {
    if (value <= this.value) {
      if (this.leftNode === null) {
        this.leftNode = new BinarySearchTree<T>(value);
      } else {
        this.leftNode.insert(value);
      }
    } else if (value > this.value) {
      if (this.rightNode === null) {
        this.rightNode = new BinarySearchTree<T>(value);
      } else {
        this.rightNode.insert(value);
      }
    }
  }

  contains(searchValue: T): boolean {
    if (searchValue === this.value) {
      return true;
    } else if (searchValue < this.value && this.leftNode !== null) {
      return this.leftNode.contains(searchValue);
    } else if (searchValue > this.value && this.rightNode !== null) {
      return this.rightNode.contains(searchValue);
    }
    return false;
  }

  depthFirstTraversal(iterator: (v: T) => void, order: TraversalOrder): void {
    if (order === TraversalOrder.PRE_ORDER) {
      iterator(this.value);
    }
    if (this.leftNode !== null) {
      this.leftNode.depthFirstTraversal(iterator, order);
    }
    if (order === TraversalOrder.IN_ORDER) {
      iterator(this.value);
    }
    if (this.rightNode !== null) {
      this.rightNode.depthFirstTraversal(iterator, order);
    }
    if (order === TraversalOrder.POST_ODRER) {
      iterator(this.value);
    }
  }

  breadthFirstTraversal(
    iterator: (v: BinarySearchTree<T>) => void,
    queue: IsQueue<BinarySearchTree<T>>
  ): void {
    queue.queue(this);
    let node: BinarySearchTree<T> | null;
    while ((node = queue.dequeue())) {
      iterator(node);
      if (node.leftNode !== null) {
        queue.queue(node.leftNode);
      }
      if (node.rightNode !== null) {
        queue.queue(node.rightNode);
      }
    }
  }
}

