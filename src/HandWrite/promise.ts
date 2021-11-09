const isFunction = (value: unknown): value is Function => {
  return typeof value === 'function';
};

const isObject = (value: any): value is Object =>
  Object.prototype.toString.call(value) === '[object Object]';

const isMyPromise = (value: any): value is MyPromise =>
  value instanceof MyPromise;

const isThenable = (thenable: any): boolean =>
  (isFunction(thenable) || isObject(thenable)) && 'then' in thenable;

type ResolveFn = (value?: any) => void;
type RejectFn = (reason?: any) => void;
type FulfilledFn = (data?: any) => any;
type RejectedFn = (err?: any) => any;
type PromiseExecutor = (resolve: ResolveFn, reject: RejectFn) => void;

interface Callback {
  resolve: ResolveFn;
  reject: RejectFn;
  onFulfilled: FulfilledFn | undefined;
  onRejected: RejectedFn | undefined;
}

enum STATE {
  PENDING = 'PENDING',
  FULFILLED = 'FULFILLED',
  REJECTED = 'REJECTED',
}

class MyPromise {
  private callbacks: Callback[];
  private state: STATE;
  private result: any;

  constructor(executor: PromiseExecutor) {
    this.state = STATE.PENDING;
    this.result = null;
    this.callbacks = [];

    const onFulfilled = (value: any) => this.transform(STATE.FULFILLED, value);
    const onRejected = (reason: any) => this.transform(STATE.REJECTED, reason);

    const resolve = (value: any) => {
      this.resolvePromise(value, onFulfilled, onRejected);
    };

    const reject = (reason: any) => {
      onRejected(reason);
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  private transform(state: STATE, result: any) {
    if (this.state !== STATE.PENDING) return;

    this.state = state;
    this.result = result;

    setTimeout(() => {
      this.handleAllCallbacks.call(this);
    }, 0);
  }

  private handleCallback(callback: Callback) {
    const { onFulfilled, onRejected, reject, resolve } = callback;

    try {
      if (this.state === STATE.FULFILLED) {
        if (isFunction(onFulfilled)) {
          resolve(onFulfilled(this.result));
        } else {
          resolve(this.result);
        }
      }

      if (this.state === STATE.REJECTED) {
        if (isFunction(onRejected)) {
          resolve(this.result);
        } else {
          reject(this.result);
        }
      }
    } catch (error) {
      reject(error);
    }
  }

  private handleAllCallbacks() {
    // 执行所有的回调并清空
    this.callbacks.forEach((callback) => this.handleCallback(callback));
    this.callbacks = [];
  }

  private resolvePromise(
    value: any,
    onFulfilled: FulfilledFn,
    onRejected: RejectedFn
  ) {
    // 当 resolve 自己本身这个 Promise 时, 直接抛出 TypeError 异常
    if (value === this) {
      return onRejected(new TypeError('can not fulfill promise with it self'));
    }

    // 如果 resolve 对象是另外一个 Promise对象时，沿用该 Promise 的 state 和 result 往下面传递
    if (isMyPromise(value)) {
      return value.then(onFulfilled, onRejected);
    }

    if (isThenable(value)) {
      try {
        const then = value.then;
        if (isFunction(then)) {
          return new MyPromise(then.bind(value)).then(onFulfilled, onRejected);
        }
      } catch (error) {
        return onRejected(error);
      }
    }

    onFulfilled(value);
  }

  public then(onFulfilled?: FulfilledFn, onRejected?: RejectedFn) {
    return new MyPromise((resolve, reject) => {
      const callback: Callback = {
        onFulfilled,
        onRejected,
        resolve,
        reject,
      };

      if (this.state === STATE.PENDING) {
        this.callbacks.push(callback);
        return;
      }

      setTimeout(() => {
        this.handleCallback.call(this, callback);
      }, 0);
    });
  }

  public static resolve(value?: any) {
    return new MyPromise(resolve => resolve(value));
  }

  public static reject(reason?: any) {
    return new MyPromise((_, reject) => reject(reason));
  }

  public static all(...promises: MyPromise[]) {
    return new MyPromise((resolve, reject) => {
      const len = promises.length;
      const values: any[] = new Array(len);
      let count = 0;
      promises.forEach((prom, i) => {
        prom.then(value => {
          values[i] = value;
          count++;
          if (count === len) {
            resolve(values);
          }
        }, reject);
      });
    });
  }

  public static race(...promises: MyPromise[]) {
    return new MyPromise((resolve, reject) => {
      promises.forEach(prom => {
        prom.then(resolve, reject);
      });
    });
  }
}

export default {
  run: () => {
    console.log('第一步');
    const promise = new MyPromise((resolve, reject) => {
      console.log('第二步');

      // throw new Error('我裂开了');

      setTimeout(() => {
        resolve('这次一定');
        reject('下次一定');

        console.log('第四步');
      }, 1000);
    });

    promise
      .then(
        (value) => {
          console.log(value);
          return 123;
        },
        (reason) => {
          console.log(reason);
          return 456;
        }
      )
      .then(
        (value) => console.log(value),
        (reason) => console.log(reason)
      );

    console.log('第三步');

    // const promise1 = new MyPromise((resolve) => {
    //   resolve('1');
    // });

    // const promise2 = new MyPromise((resolve) => {
    //   resolve('2');
    // });

    // MyPromise.all([promise1, promise2]).then(
    //   (value) => console.log(value),
    //   (reason) => console.log(reason)
    // );

    // const promise3 = new MyPromise((_, reject) => {
    //   reject('3');
    // });

    // MyPromise.all([promise1, promise2, promise3]).then(
    //   (value) => console.log(value),
    //   (reason) => console.log(reason)
    // );
  },
};
