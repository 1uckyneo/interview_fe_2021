function promiseAll(promises: unknown[]) {
  return new Promise((resolve, reject) => {
    const resolvedList: unknown[] = [];
    let resolvedCount = 0;

    for(let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i]).then(res => {
        resolvedCount += 1;
        resolvedList[i] = res;
        if(resolvedCount === promises.length) {
          return resolve(resolvedList);
        }
      }).catch((err) => {
        return reject(err)
      });
    }

  })
}

const p1 = new Promise(function (resolve) {
  setTimeout(function () {
      resolve(1)
  }, 1000)
});

const p2 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve(2)
  }, 2000)
});

const p3 = new Promise(function (resolve) {
  setTimeout(function () {
      resolve(3)
  }, 3000)
});

const promiseTimeout = <T>(promise: Promise<T>, ms: number) => {
  const timeoutReject = new Promise((_, reject) => {
    setTimeout(() => {
      reject(`timeout : ${ms}ms`)
    }, ms);
  })

  return Promise.race([promise, timeoutReject]);
}

export default {
  run: () => {
    Promise.all([p1, p2, p3]).then((res) => {
      console.log('原生 Promise.all -> ', res);
    }).catch((err) => {
      console.log('原生 Promise.all reject -> ', err);
    });

    promiseAll([p1, p2, p3]).then((res) => {
      console.log('自定义 promiseAll -> ', res);
    }).catch((err) => {
      console.log('自定义 promiseAll reject -> ', err);
    });;

    promiseTimeout(p2, 1500).then((res) => {
      console.log('可超时promise -> ', res);
    }).catch((err) => {
      console.log('可超时promise reject -> ', err);
    })
  },
}