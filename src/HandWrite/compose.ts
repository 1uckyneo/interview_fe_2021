function compose<R>(...fnList: ((arg: R) => R)[]): ((arg: R) => R) {
  return (arg: R) => {
    return fnList.reduceRight((prev, curr) => {
      return curr(prev);
    }, arg);
  }
}

export default {
  run: () => {
    // 用法如下:
    function fn1(x: number) {
      return x + 1;
    }
    function fn2(x: number) {
      return x + 2;
    }
    function fn3(x: number) {
      return x + 3;
    }
    function fn4(x: number) {
      return x + 4;
    }
    const fn = compose(fn1, fn2, fn3, fn4);
    console.log(fn(1)); // 1+4+3+2+1=11
  },
};
