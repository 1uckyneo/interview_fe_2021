function merge(arr1: number[], arr2: number[]) {
  const r: number[] = [];

  while(arr1.length && arr2.length) {
    if(arr1[0]! <= arr2[0]!) {
      r.push(arr1.shift() as number);
    } else {
      r.push(arr2.shift() as number);
    }
  }

  return r.concat(arr1).concat(arr2);
}


function mergedSort(arr: number[][]) {
  while(arr.length > 1) {
    const mergedArr = merge(arr.shift() as number[], arr.shift() as number[]);
    arr.push(mergedArr);
  }

  return arr[0]!;
}

export default {
  /**
   * 2.合并二维有序数组成一维有序数组，归并排序的思路
   */
  run: () => {
    const arr1 = [[1,2,3],[4,5,6],[7,8,9],[1,2,3],[4,5,6]];
    const arr2 = [[1,4,6],[7,8,10],[2,6,9],[3,7,13],[1,5,12]];
    const mergedArr1 = mergedSort(arr1);
    const mergedArr2 = mergedSort(arr2);

    console.log('arr1 -> ', arr1);
    console.log('mergedArr1 -> ', mergedArr1);
    console.log('arr2 -> ', arr2);
    console.log('mergedArr2 -> ', mergedArr2);    
  }
}