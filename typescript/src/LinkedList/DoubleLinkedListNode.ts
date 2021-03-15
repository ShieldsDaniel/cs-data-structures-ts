export default class DoubleLinkedListNode<T> {
  public nextNode: DoubleLinkedListNode<T>|null = null;
  public prevNode: DoubleLinkedListNode<T>|null = null;
  private _nodeValue: T;

  constructor(nodeValue: T) {
    this._nodeValue = nodeValue;
  }

  get nodeValue(): T {
    return this._nodeValue;
  }
}