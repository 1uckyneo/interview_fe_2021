class LazyMan {
  tasks: (() => void)[] = [];

  constructor(name: string) {
    const task = () => {
      console.log(`Hi! This is ${name}`);
      this.next();
    };

    this.tasks.push(task);

    setTimeout(() => {
      this.next();
    }, 0);
  }

  next() {
    const task = this.tasks.shift();
    task && task();
  }

  private sleepWrapper(sec: number, isFirst: boolean) {
    const task = () => {
      setTimeout(() => {
        console.log(`Wake up after ${sec} second`);
        this.next();
      }, sec * 1000);
    };

    if (isFirst) {
      this.tasks.unshift(task);
    } else {
      this.tasks.push(task);
    }
  }

  sleep(sec: number) {
    this.sleepWrapper(sec, false);
    return this;
  }

  sleepFirst(sec: number) {
    this.sleepWrapper(sec, true);
    return this;
  }

  eat(name: string) {
    const task = () => {
      console.log(`Eat ${name}`);
      this.next();
    };
    this.tasks.push(task);
    return this;
  }
}

function getLazyMan(name: string) {
  return new LazyMan(name);
}

export default {
  /**
   * 题目描述：
   * 实现一个LazyMan，可以按照以下方式调用:
   * LazyMan(“Hank”)输出:
   * Hi! This is Hank!
   *
   * LazyMan(“Hank”).sleep(10).eat(“dinner”)输出
   * Hi! This is Hank!
   * //等待10秒..
   * Wake up after 10
   * Eat dinner~
   *
   * LazyMan(“Hank”).eat(“dinner”).eat(“supper”)输出
   * Hi This is Hank!
   * Eat dinner~
   * Eat supper~
   *
   * LazyMan(“Hank”).eat(“supper”).sleepFirst(5)输出
   * //等待5秒
   * Wake up after 5
   * Hi This is Hank!
   * Eat supper
   */
  run: () => {
    // getLazyMan("Hank");
    // getLazyMan("Hank").sleep(2).eat('dinner');
    // getLazyMan("Hank").eat('dinner').eat('supper');
    getLazyMan('Hank').eat('dinner').sleepFirst(1);        
  },
};
