/**
 * 递归版 斐波那契数列
 */
function fibRec(n: number): number {
  if (n < 2) {
    return n;
  }

  return fibRec(n - 1) + fibRec(n - 2);
}

/**
 * 非递归版 斐波那契数列
 */
function fib(n: number) {
  if (n < 2) {
    return n;
  }

  let p = 0, q = 0, r = 1;

  for (let i = 2; i <= n; i++) {
    p = q;
    q = r;
    r = p + q;
  }

  return r;
}

export default {
  /**
   * 多种方式实现斐波那契数列
   */
  run: () => {
    const n1 = fibRec(5);
    console.log('n = 5, 递归版', n1);
    const n2 = fib(10);
    console.log('n = 10, 递归版', n2);
  },
};
