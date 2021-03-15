
export default class LinkedListNode<T> {
    private _nodeData: T;
    private _nextNode: LinkedListNode<T> | null;

    public constructor(nodeData: T) {
        this._nodeData = nodeData;
        this._nextNode = null;
    }

    public next(): LinkedListNode<T> | null {
        return this._nextNode;
    }

    get nodeData(): T {
        return this._nodeData;
    }

    set nextNode(node: LinkedListNode<T> | null) {
        this._nextNode = node;
    }

    get nextNode() {
        return this._nextNode;
    }
}
