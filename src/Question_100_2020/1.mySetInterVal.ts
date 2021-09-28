import type { UnknownFn } from '../utils/typing';

class MySetInterval<Fn extends UnknownFn = UnknownFn> {
  private callback: Fn;
  private timeoutId?: ReturnType<typeof setTimeout>;
  private a: number;
  private b: number;
  private bTimes = 0;

  constructor(callback: Fn, a: number, b: number) {
    this.callback = callback;
    this.a = a;
    this.b = b;

    this.start();
  }

  private start() {
    const currentTimeout = this.a + this.b * this.bTimes;

    this.timeoutId = setTimeout(() => {
      this.callback();
      this.bTimes += 1;
      this.start();
    }, currentTimeout)
  }

  clear() {
    clearTimeout(this.timeoutId!);
  }
}


export default {
  /**
   * 1.写一个 mySetInterVal(fn, a, b),每次间隔 a,a+b,a+2b 的时间，然后写一个 myClear，停止上面的 mySetInterVal
   */
  run: () => {
    const mySetInterval = new MySetInterval(() => {
      console.log('mySetInterval');
    },1000, 1000);

    setTimeout(() => {
      mySetInterval.clear();
    }, 10000);
  }
}