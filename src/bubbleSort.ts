import { bubbleSortImperative, bubbleSortFunctional } from './SortingAlgorithms/BubbleSortModule';

const main = () => {
    const unsortedArray: number[] = [];
    for (let i = 0; i < 1000; ++i) {
        const randNum = Math.ceil(Math.random() * 1000);
        if (!unsortedArray.includes(randNum)) {
            unsortedArray.push(randNum);
        }
    }

    console.log('original array length: ' + unsortedArray.length);
    console.log('original array: ' + unsortedArray);

    const imperativeStartTime = new Date().getTime()
    const sortedArray = bubbleSortImperative(unsortedArray);
    const imperativeEndTime = new Date().getTime();
    console.log('sorted array length: ' + sortedArray.length);
    console.log('sorted array: ' + sortedArray);
    console.log('took ' + (imperativeEndTime - imperativeStartTime) + 'milliseconds');

    console.log();

    const functionalStartTime = new Date().getTime();
    const sortedArray2 = bubbleSortFunctional(unsortedArray);
    const functionalEndTime = new Date().getTime();
    console.log('sorted array length: ' + sortedArray2.length);
    console.log('sorted array: ' + sortedArray2);
    console.log('took ' + (functionalEndTime - functionalStartTime) + 'milliseconds');
};

(() => {
    main();
})();
