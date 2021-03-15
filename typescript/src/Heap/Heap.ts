export type Comparable = number | boolean;
export type GetComparableFunc<T> = (obj: T) => Comparable;

export enum CompareResult {
  LESS_THAN = -1,
  EQUALS = 0,
  GREATER_THAN = 1,
};
export type CompareFunc<T> = (objA: T, objB: T) => CompareResult;

export default abstract class Heap<T> {
  protected getComparableObjectProperty: GetComparableFunc<T> | null;
  protected customCompareFunc: CompareFunc<T> | null;
  private heapData: T[] = [];

  public constructor(
    getComparableObjectProperty: GetComparableFunc<T> | null = null,
    customCompareFunc: CompareFunc<T> | null = null
  ) {
    this.getComparableObjectProperty = getComparableObjectProperty;
    this.customCompareFunc = customCompareFunc;
  }

  public initFromArray(values: T[]): void {
    for (const val of values) {
      this.insert(val);
    }
  }

  public insert(newVal: T): void {
    this.heapData.push(newVal);
    if (this.heapData.length > 1) {
      const insertIndex = this.heapData.length - 1;
      this.bubbleUp(insertIndex, newVal);
    }
  }

  public extractRoot(): T | null {
    const lastVal = this.heapData.pop();
    if (this.heapData.length < 1) {
      return lastVal || null;
    } else {
      const rootVal = this.heapData[0] || null;
      if (typeof lastVal !== "undefined") {
        this.heapData[0] = lastVal;
        const leftChildIndex = this.leftChildNodeIndex(0);
        const rightChildIndex = this.rightChildNodeIndex(0);
        this.rippleDown(
          0,
          lastVal,
          leftChildIndex,
          this.heapData[leftChildIndex],
          rightChildIndex,
          this.heapData[rightChildIndex]
        );
      }
      return rootVal;
    }
  }

  public get heap(): T[] {
    return this.heapData;
  }

  protected abstract shouldSwapChildWithParent(childVal: T, parentVal: T): boolean;

  private bubbleUp(childIndex: number, childVal: T): void {
    const parentIndex = this.parentNodeIndex(childIndex);
    const parentVal = this.heapData[parentIndex];
    if (this.shouldSwapChildWithParent(childVal, parentVal)) {
      this.heapData[childIndex] = parentVal;
      this.heapData[parentIndex] = childVal;
      this.bubbleUp(parentIndex, this.heapData[parentIndex]);
    }
  }

  protected abstract shouldSwapParentWithLeftChild(parentVal: T, leftChildVal: T, rightChildVal: T): boolean;

  protected abstract shouldSwapParentWithRightChild(parentVal: T, leftChildVal: T, rightChildVal: T): boolean;

  private rippleDown(
    parentIndex: number,
    parentVal: T,
    leftChildIndex: number,
    leftChildVal: T | null,
    rightChildIndex: number,
    rightChildVal: T | null
  ): void {
    if (leftChildVal !== null && rightChildVal !== null) {
      if (this.shouldSwapParentWithLeftChild(parentVal, leftChildVal, rightChildVal)) {
        this.heapData[parentIndex] = leftChildVal;
        this.heapData[leftChildIndex] = parentVal;
        const newLeftChildIndex = this.leftChildNodeIndex(leftChildIndex);
        const newRightChildIndex = this.rightChildNodeIndex(leftChildIndex);
        this.rippleDown(
          leftChildIndex,
          parentVal,
          newLeftChildIndex,
          this.heapData[newLeftChildIndex] || null,
          newRightChildIndex,
          this.heapData[newRightChildIndex] || null
        );
      } else if (this.shouldSwapParentWithRightChild(parentVal, leftChildVal, rightChildVal)) {
        this.heapData[parentIndex] = rightChildVal;
        this.heapData[rightChildIndex] = parentVal;
        const newLeftChildIndex = this.leftChildNodeIndex(rightChildIndex);
        const newRightChildIndex = this.rightChildNodeIndex(rightChildIndex);
        this.rippleDown(
          rightChildIndex,
          parentVal,
          newLeftChildIndex,
          this.heapData[newLeftChildIndex] || null,
          newRightChildIndex,
          this.heapData[newRightChildIndex] || null
        );
      }
    }
  }

  private leftChildNodeIndex(currentParentNodeIndex: number): number {
    return this.childNodeIndex(currentParentNodeIndex) + 1;
  }

  private rightChildNodeIndex(currentParentNodeIndex: number): number {
    return this.childNodeIndex(currentParentNodeIndex) + 2;
  }

  private childNodeIndex(currentParentNodeIndex: number): number {
    return currentParentNodeIndex * 2;
  }

  private parentNodeIndex(currentChildNodeIndex: number): number {
    return Math.floor((currentChildNodeIndex - 1) / 2);
  }
}
