import { AnyFn } from '../utils/typing';

const curry = <Fn extends AnyFn>(fn: Fn) => {
  type ArgType = Parameters<Fn>[0];

  const prevArgs: ArgType[] = [];

  const rec = (...currArgs: ArgType[]) => {
    prevArgs.push(...currArgs);
    
    if(fn.length - prevArgs.length <= 0) {
      return fn(...prevArgs) as ReturnType<Fn>;
    }
    
    return rec;
  }

  return rec;
}

export default {
  /**
   * 实现 add(1)(2)(3)
   */
  run: () => {
    const add = (a: number, b: number, c: number) => a + b + c;
    const curryAdd = curry(add);
    // @ts-ignore
    const r = curryAdd(1)(2)(3) as number;

    console.log(r);
  },
}