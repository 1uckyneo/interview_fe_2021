function bind<T>(fn: (this: T, ...args: any[]) => any, ctx: T, ...args: any[]): (...args: any[]) => any {
  return (...restArgs) => {
    return fn.call(ctx, ...args, ...restArgs);
  }
}

export default {
  run: () => {
    function sayWord(this: any, a: string, b: string, c: string, d: string, e: string, f: string, g: string) {
      const talk = `${this.word}, ${a + b + c + d + e + f + g}`;
      console.log(talk);
      return talk;
    }

    const bottle = {
      word: 'hello'
    };

    const fn1 = bind(sayWord, bottle);
  }
}