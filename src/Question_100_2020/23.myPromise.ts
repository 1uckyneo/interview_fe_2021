class MyPromise<T> {
  private status: 'pending' | 'fulfilled' | 'rejected';
  private value: T | null;
  private resolveCallbacks: ((value: T) => void)[];
  private rejectCallbacks: ((reason: any) => void)[];

  constructor(
    executor: (
      resolve: (value: T) => void,
      reject: (reason?: any) => void
    ) => void
  ) {
    this.status = 'pending';
    this.value = null;
    this.resolveCallbacks = [];
    this.rejectCallbacks = [];

    const resolve = (value: T) => {
      setTimeout(() => {
        if (this.status === 'pending') {
          this.status = 'fulfilled';
          this.value = value;

          this.resolveCallbacks.forEach((callback) => {
            callback(this.value as T);
          });
        }
      });
    };

    const reject = (reason: any) => {
      setTimeout(() => {
        if (this.status === 'pending') {
          this.status = 'rejected';
          this.value = reason;

          this.rejectCallbacks.forEach((callback) => {
            callback(this.value);
          });
        }
      });
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onfulfilled?: (value: T) => void, onrejected?: (reason: any) => void) {
    return new MyPromise((resolve) => {
      setTimeout(() => {
        const onFulfilled =
          typeof onfulfilled === 'function' ? onfulfilled : () => {};
        const onRejected =
          typeof onrejected === 'function' ? onrejected : () => {};

        this.resolveCallbacks.push(onFulfilled);
        this.rejectCallbacks.push(onRejected);
        resolve(undefined);
      });
    });
  }
}

export default {
  run: () => {
    console.log('第一步');
    const promise = new MyPromise<string>((resolve, reject) => {
      console.log('第二步');

      // throw new Error('我裂开了');

      setTimeout(() => {
        resolve('这次一定');
        reject('下次一定');

        console.log('第四步');
      });
    });

    promise
      .then(
        (value) => console.log(value),
        (reason) => console.log(reason?.message ?? reason)
      )
      .then(
        (value) => console.log(value),
        (reason) => console.log(reason?.message ?? reason)
      );

    console.log('第三步');
  },
};
