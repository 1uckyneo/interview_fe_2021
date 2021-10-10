const deepClone = <T extends unknown = any>(source: T, set = new Set()): T => {
  if (typeof source !== 'object' || source === null) {
    return source;
  }

  // 防止引用循环
  if(set.has(source)) {
    return source;
  }

  set.add(source);

  if (Reflect.getPrototypeOf(source as object) === Date.prototype) {
    return new Date(source as Date) as T;
  }

  if (Reflect.getPrototypeOf(source as object) === RegExp.prototype) {
    return new RegExp(source as RegExp) as T;
  }

  const constructor = Reflect.get(source as object, 'constructor');
  const clonedObject = constructor();

  Reflect.ownKeys(source as object).forEach((key) => {
    const value = Reflect.get(source as object, key);
    Reflect.set(clonedObject, key, deepClone(value, set));
  });

  return clonedObject as T;
};

export default {
  run: () => {
    console.log('浅拷贝只复制一层对象的属性，并不包括对象里面的为引用类型的属性值，因此修改拷贝后的属性值是引用类型的，就会影响源对象');
    console.log('深拷贝就是对对象以及对象的所有子对象进行拷贝');

    const obj = {
      x: 10,
    };

    const loopObj = {
      ref: obj,
    }
    
    const sourceObject = {
      a: 100,
      b: [10, 20, 30],
      c: obj,
      d: new Date(),
      f: undefined,
      g: /\s+/g,
      fn: function () {},
      symbol: Symbol.for('Symbol'),
      loopRef: loopObj,
    };

    const clonedObject = deepClone(sourceObject);

    console.log('原始数据: ', sourceObject);
    console.log('克隆数据：', clonedObject);
  },
};
