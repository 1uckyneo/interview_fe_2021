/**
 * 模拟 Object.is
 * 1 * 严格相当 0 === -0  * 同值相等 Object.is(0, -0) => false
 * 2 * 严格相等 NaN !== NaN * 同值相等 Object.is(NaN, NaN) => true
 */
function myObjectIs(left: any, right: any) {
  if(left === right) {
    // left !== 0 排除比较 0 和 -0的 情况
    // 1 / left 和 1 / right, 如果一个为 0，另一个为 -0，那就是 Infinity !== -Infinity
    return left !== 0 || 1 / left === 1 / right;
  }

  // Object.is(NaN, NaN) => true
  return left !== left && right !== right;
}

export default {
  run: () => {
    console.log(myObjectIs(0, -0));
    console.log(myObjectIs(NaN, NaN));
    console.log(myObjectIs(1, 1));
    console.log(myObjectIs([], []));
  },
}