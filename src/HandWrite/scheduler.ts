class Scheduler<T = string> {
  queue: (() => Promise<T>)[] = [];
  maxCount: number = 0;
  runCount: number = 0;

  constructor(maxCount: number) {
    this.maxCount = maxCount;
  }

  addTask(ms: number, message: T) {
    const promiseCreator = () => {
      return new Promise<T>((resolve) => {
        setTimeout(() => {
          resolve(message);
        }, ms);
      });
    };

    this.queue.push(promiseCreator);
  }

  taskStart() {
    for (let i = 0; i < this.maxCount; i++) {
      this.request();
    }
  }

  private request() {
    if (!this.queue.length || this.runCount >= this.maxCount) {
      return;
    }

    this.runCount += 1;
    const promiseCreator = this.queue.shift();

    if (promiseCreator) {
      promiseCreator().then((msg) => {
        console.log(msg);
        this.runCount -= 1;
        this.request();
      });
    }
  }
}

export default {
  /**
   * 题目描述:JS 实现一个带并发限制的异步调度器 Scheduler，保证同时运行的任务最多有两个
   * 一开始1、2两个任务开始执行
   * 500ms时，2任务执行完毕，输出2，任务3开始执行
   * 800ms时，3任务执行完毕，输出3，任务4开始执行
   * 1000ms时，1任务执行完毕，输出1，此时只剩下4任务在执行
   * 1200ms时，4任务执行完毕，输出4
   */
  run: () => {
    const scheduler = new Scheduler(2);
    scheduler.addTask(1000, '1');
    scheduler.addTask(500, '2');
    scheduler.addTask(300, '3');
    scheduler.addTask(400, '4');
    scheduler.taskStart();
  },
};
