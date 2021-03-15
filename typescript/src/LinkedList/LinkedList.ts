import LinkedListNode from "./LinkedListNode";

export default class SinglyLinkedList<T> {
    private head: LinkedListNode<T> | null = null;

    public getAtIndex(index: number): T | null {
        let i = 0;
        let returnVal: T | null = null;
        this.forEach((node: LinkedListNode<T> | null): boolean => {
            if (node === null) {
                return false;
            } else if (i === index) {
                returnVal = node.nodeData;
            }
            ++i;
            return true;
        });
        return returnVal;
    }

    public getHeadNode(): LinkedListNode<T> | null {
        return this.head;
    }

    public getTailNode(): LinkedListNode<T> | null {
        let returnNode: LinkedListNode<T> | null = null;
        this.forEach((node: LinkedListNode<T> | null): boolean => {
            if (node === null) {
                return false;
            } else if (node.next() === null) {
                returnNode = node;
            }
            return true;
        });
        return returnNode;
    }

    public append(nodeValue: T): void {
        if (this.head === null) {
            this.head = new LinkedListNode<T>(nodeValue);
        } else {
            const lastNode = this.getTailNode();
            if (lastNode !== null) {
                lastNode.nextNode = new LinkedListNode<T>(nodeValue);
            }
        }
    }

    public prepend(nodeValue: T): void {
        if (this.head === null) {
            this.head = new LinkedListNode<T>(nodeValue);
        } else {
            const oldHead = this.head;
            this.head = new LinkedListNode<T>(nodeValue);
            this.head.nextNode = oldHead;
        }
    }

    public removeAtIndex(index: number): void {
        let i = 0;
        if (index === 0 && this.head !== null) {
            this.head = this.head.nextNode;
        } else {
            this.forEach((node: LinkedListNode<T> | null): boolean => {
                if (i === index - 1 && node !== null) {
                    const nodeToDelete = node.next();
                    node.nextNode = nodeToDelete?.next() || null;
                    return false;
                }
                ++i;
                return true;
            });
        }
    }

    public toString() {
        let i = 0;
        this.forEach((node: LinkedListNode<T> | null): boolean => {
            if (node !== null) {
                console.log(`${i}: ${node.nodeData}`);
            }
            ++i;
            return true;
        });
    }

    private forEach(fn: (node: LinkedListNode<T> | null) => boolean) {
        let node = this.head;
        if (node !== null) {
            do {
                if (!fn(node)) {
                    break;
                }
            } while (node = node.next());
        }
    }
}