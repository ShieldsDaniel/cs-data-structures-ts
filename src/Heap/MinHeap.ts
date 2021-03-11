import Heap, { GetComparableFunc, CompareFunc, CompareResult } from "./Heap";

export default class MinHeap<T> extends Heap<T> {

  constructor(
    getComparableFunc: GetComparableFunc<T> | null = null,
    customCompareFunc: CompareFunc<T> | null = null
  ) {
    super(getComparableFunc, customCompareFunc);
  }

  protected shouldSwapChildWithParent(childVal: T, parentVal: T): boolean {
    if (this.customCompareFunc !== null) {
      return this.customCompareFunc(childVal, parentVal) === CompareResult.LESS_THAN;
    } else if (this.getComparableObjectProperty !== null) {
      return this.getComparableObjectProperty(childVal) < this.getComparableObjectProperty(parentVal);
    }
    return childVal < parentVal;
  }

  protected shouldSwapParentWithLeftChild(parentVal: T, leftChildVal: T, rightChildVal: T): boolean {
    if (this.customCompareFunc !== null) {
      return (
        this.customCompareFunc(leftChildVal, rightChildVal) === CompareResult.LESS_THAN &&
        this.customCompareFunc(leftChildVal, parentVal) === CompareResult.LESS_THAN
      );
    } else if (this.getComparableObjectProperty !== null) {
      return (
        (this.getComparableObjectProperty(leftChildVal) <
          this.getComparableObjectProperty(rightChildVal)) &&
        (this.getComparableObjectProperty(leftChildVal) <
          this.getComparableObjectProperty(parentVal))
      );
    }
    return (leftChildVal < rightChildVal) && (leftChildVal < parentVal);
  }

  protected shouldSwapParentWithRightChild(parentVal: T, leftChildVal: T, rightChildVal: T): boolean {
    if (this.customCompareFunc !== null) {
      return (
        this.customCompareFunc(rightChildVal, leftChildVal) === CompareResult.LESS_THAN &&
        this.customCompareFunc(rightChildVal, parentVal) === CompareResult.LESS_THAN
      );
    } else if (this.getComparableObjectProperty !== null) {
      return (
        (this.getComparableObjectProperty(leftChildVal) >
          this.getComparableObjectProperty(rightChildVal)) &&
        (this.getComparableObjectProperty(rightChildVal) <
          this.getComparableObjectProperty(parentVal))
      );
    }
    return (leftChildVal > rightChildVal) && (rightChildVal < parentVal);
  }
}
