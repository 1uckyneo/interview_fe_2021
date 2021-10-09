/**
 * 1.setTimeout 模拟实现 setInterval
 */
function mySetInterval(callback: (...arg: any) => any, ms: number = 0) {
  let timer: ReturnType<typeof setTimeout>;

  const interval = () => {
    timer = setTimeout(() => {
      callback();
      interval();
    }, ms);
  };

  interval();

  return {
    cancel: () => {
      clearTimeout(timer);
    },
  };
}

export default {
  run: () => {
    /** 1.setTimeout 模拟实现 setInterval start */
    let intervalTimeout = mySetInterval(() => {
      console.log('setTimeout 模拟实现 setInterval');
    }, 500);

    setTimeout(() => {
      intervalTimeout.cancel();
    }, 1100);
     /** 1.setTimeout 模拟实现 setInterval end */
  },
};
