
export const bubbleSortFunctional = (
    numArray: number[]
): number[] => {
    return outerLoop(numArray, 0);
};

const outerLoop = (
    numArray: number[],
    index: number
): number[] => {
    const sortedArray = innerLoop(
        numArray.slice(0, numArray.length - index),
        0
    );
    if (index === numArray.length) {
        return numArray;
    }
    return outerLoop(
        sortedArray.concat(
            numArray.slice(numArray.length - index)
        ),
        index + 1
    );
};

const innerLoop = (
    numArray: number[],
    index: number
): number[] => {
    if (index >= numArray.length - 1) {
        return numArray;
    } else {
        return innerLoop([
            ...headSection(numArray, index),
            ...sortSection(numArray, index),
            ...tailSection(numArray, index)
        ], index + 1);
    }
};

const headSection = (
    numArray: number[],
    index: number
): number[] => {
    if (index < 1) {
        return [];
    }
    return numArray.slice(0, index);
};

const sortSection = (
    numArray: number[],
    index: number
): number[] => {
    const section = numArray.slice(index, index + 2);
    if (section[0] > section[1]) {
        return section.reverse();
    }
    return section;
};

const tailSection = (
    numArray: number[],
    index: number
): number[] => {
    if (index > numArray.length - 2) {
        return [];
    }
    return numArray.slice(index + 2);
};

// -------------------------- //

export const bubbleSortImperative = (
    numArray: number[]
): number[] => {
    for (let i = numArray.length; i >= 0; --i) {
        for (let j = 0; j <= i; ++j) {
            const comparator1 = numArray[j];
            const comparator2 = numArray[j + 1];
            if (comparator1 > comparator2) {
                numArray[j] = comparator2;
                numArray[j + 1] = comparator1;
            }
        }
    }
    return numArray;
};