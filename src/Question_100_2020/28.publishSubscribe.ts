
type Caches<T extends any = unknown> =  {
  [key: string]: Array<(data: T) => void>;
}

class Observer<T extends any = unknown> {
  private cashes: Caches<T> = {};

  /**
   * eventName事件名-独一无二, fn订阅后执行的自定义行为
   */
  on(eventName: string, fn: (data: T) => void) {
    if(!this.cashes[eventName]) {
      this.cashes[eventName] = [];
    }

    this.cashes[eventName]!.push(fn);

    return this;
  }

  /**
   * 发布 => 将订阅的事件进行统一执行
   */
  emit(eventName: string, data: T) {
    this.cashes[eventName]?.forEach((fn) => fn(data));
  }

  /**
   * 取消订阅 => 若fn不传, 直接取消该事件所有订阅信息
   */
  off(eventName: string, fn?: (data: T) => void) {
    if(this.cashes[eventName]) {
      this.cashes[eventName] = fn ? this.cashes[eventName]!.filter(existsFn => existsFn !== fn) : [];
    }
  }
}

export default {
  run: () => {
    const fn1 = (data: string) => console.log(data);
    const fn2 = (data: string) => console.log(data);
    const fn3 = (data: string) => console.log(data);

    const observer = new Observer<string>();

    observer.on('eventFoo', fn1);
    observer.on('eventFoo', fn2);
    observer.on('eventBar', fn3);

    observer.emit('eventFoo', '1.eventFoo');
    observer.emit('eventBar', '1.eventBar');

    observer.off('eventFoo', fn1);
    observer.emit('eventFoo', '2.eventFoo');

    observer.off('eventFoo');
    observer.emit('eventFoo', '3.eventFoo');
    observer.emit('eventBar', '3.eventBar');
  },
}