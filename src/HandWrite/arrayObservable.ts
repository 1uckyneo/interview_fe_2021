function observable<T>(target: Array<T>, callback: (target: Array<T>) => void) {
  return new Proxy(target, {
    

    set: (target, key, value) => {
      const res = Reflect.set(target, key, value);

      callback(target);

      return res;
    }
  })
}

export default {
  run: () => {
    const originArray: string[] = ['a', 'b', 'c'];
    const observedArray = observable(originArray, (arg) => {
      console.log(arg);
    })

    observedArray[0] = 'd'
  }
}