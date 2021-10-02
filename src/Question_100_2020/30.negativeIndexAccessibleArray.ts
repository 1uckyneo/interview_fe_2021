/**
 *
 * 使用ES6 的Proxy实现数组负索引。 （负索引：例如，可以简单地使用arr[-1]替代arr[arr.length-1]访问最后一个元素，[-2]访问倒数第二个元素，以此类推
 */
const genNegativeIndexAccessibleArray = <T>(arr: T[]) => {
  return new Proxy(arr, {
    get(target, key) {
      if (typeof key !== 'symbol') {
        const index = Number.parseInt(key, 10);

        if (index < 0) {
          const computedIndex = target.length + index;
          return Reflect.get(target, computedIndex);
        }
      }

      return Reflect.get(target, key);
    },
  });
};

export default {
  run: () => {
    const a = genNegativeIndexAccessibleArray([
      1, 2, 3, 4, 5, 6, 7, 8, 9,
    ]);

    console.log('negative index accessible array = ', a);
    console.log('index = 1, result = ', a[1]); // 2
    console.log('index = -1, result = ', a[-1]); // 9
    console.log('index = -2, result = ', a[-2]); // 8
  },
};
