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

/* 1.setInterval 模拟实现 setTimeout
 */
function mySetTimeout(callback: (...arg: any) => any, ms: number = 0) {
  const timer: ReturnType<typeof setInterval> = setInterval(() => {
    clearInterval(timer);
    callback();
  }, ms);
}

export default {
  /**
   * 第二题 setTimeout 模拟实现 setInterval（setInterval 模拟实现 setTimeout）
   */
  run: () => {
    /** 1.setTimeout 模拟实现 setInterval start */
    const intervalTimeout = mySetInterval(() => {
      console.log('setTimeout 模拟实现 setInterval');
    }, 500);

    setTimeout(() => {
      intervalTimeout.cancel();
    }, 1100);
    /** 1.setTimeout 模拟实现 setInterval end */

    /** 2.setInterval 模拟实现 setTimeout start */
    mySetTimeout(() => {
      console.log('setInterval 模拟实现 setTimeout');
    }, 1000);
    /** 2.setInterval 模拟实现 setTimeout start */
  },
};
