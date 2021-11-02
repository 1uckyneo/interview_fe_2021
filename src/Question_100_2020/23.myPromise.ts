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
      const onFulfilled =
        typeof onfulfilled === 'function'
          ? onfulfilled
          : () => {
              return this.value;
            };
      const onRejected =
        typeof onrejected === 'function'
          ? onrejected
          : () => {
              return this.value;
            };

      this.resolveCallbacks.push((value) => {
        const res = onFulfilled(value);
        resolve(res);
      });

      this.rejectCallbacks.push((value) => {
        const res = onRejected(value);
        resolve(res);
      });
    });
  }

  static all<T>(promises: MyPromise<T>[]) {
    return new MyPromise((resolve, reject) => {
      const resolveList: T[] = [];

      promises.forEach(promise => {
        promise.then(
          value => {
            resolveList.push(value);

            if(resolveList.length === promises.length) {
              resolve(resolveList);
            }
          },
          reason => {
            reject(reason)
          }
        )
      });
    })
  }

  static race<T>(promises: MyPromise<T>[]) {
    return new MyPromise((resolve, reject) => {

      promises.forEach(promise => {
        promise.then(
          value => {
            resolve(value);
          },
          reason => {
            reject(reason);
          }
        )
      });
    })
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


    const promise1 = new MyPromise<string>((resolve) => {
      resolve('1');
    });

    const promise2 = new MyPromise<string>((resolve) => {
      resolve('2');
    });

    MyPromise.all([promise1, promise2]).then(
      (value) => console.log(value),
      (reason) => console.log(reason)
    );

    const promise3 = new MyPromise<string>((_, reject) => {
      reject('3');
    });

    MyPromise.all([promise1, promise2, promise3]).then(
      (value) => console.log(value),
      (reason) => console.log(reason)
    );
  },
};
