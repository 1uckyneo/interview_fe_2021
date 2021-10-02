/*
 *示例：
 *给定数组：[2,6,3,8,10,9]
 *返回数组：[6,8,8,10,-1,-1]
 */
function findBiggerRight(source: number[]): number[] {
  const result: number[] = [];
  const lastIdx = source.length - 1;

  // 跳过最后一项
  for (let slow = 0; slow < lastIdx; slow++) {
    // 从当前元素的右边开始找起
    for (let fast = slow + 1; fast < source.length; fast++) {
      if (source[fast]! > source[slow]!) {
        result.push(source[fast]!);
        break;
      }

      // 最后一项也不大于 slow 对应的数
      if (fast === lastIdx) {
        result.push(-1);
      }
    }
  }

  result.push(-1); // 最后一项后面没有元素了，需要补充一位

  return result;
}

export default {
  run: () => {
    const source = [2, 6, 3, 8, 10, 9];
    const result = findBiggerRight(source);

    console.log('给定数组：', source);
    console.log('返回数组：', result);
  },
};
