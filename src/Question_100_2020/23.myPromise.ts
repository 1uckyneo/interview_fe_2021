class MyPromise<T> {
  state: 'pending' | 'fulfilled' | 'rejected' = 'pending';
  reason?: unknown;
  value?: T;


  constructor(executor: (resolve: (value: T) => void, reject: (reason?: unknown) => void) => void) {
    let resolve = (value: T) => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
      }
    };
    let reject = (reason: unknown) => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.reason = reason;
      }
    };
    try {
      // 立即执行函数
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }
  then(onFulfilled: (value: T) => MyPromise<T>, onRejected: (reason?: unknown) => MyPromise<T>) {
    return new MyPromise((resolve, reject) => {
      if (this.state === 'fulfilled') {
        let x = onFulfilled(this.value as T);
        resolve(x);
      };

      if (this.state === 'rejected') {
        let x = onRejected(this.reason);
        reject(x);
      };
    }) 
  }
}

export default {
  run: () => {
    console.log('暂未正确实现');
  },
}