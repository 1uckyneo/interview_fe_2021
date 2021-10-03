class ListNode<T> {
  val: T;
  next: ListNode<T> | null = null;

  constructor(val: T) {
    this.val = val;
  }
}

class Queue<T> {
  private head: ListNode<T> | null;
  private tail: ListNode<T> | null;
  length: number = 0;

  constructor() {
    this.head = null;
    this.tail = null;
  }

  append(val: T) {
    if (this.tail) {
      this.tail.next = new ListNode(val);
      this.tail = this.tail.next;
    } else {
      const node = new ListNode(val);
      this.head = node;
      this.tail = node;
    }

    this.length += 1; // 更新长度
  }

  remove(index: number = 0) {
    let fast = this.head; // 记录当前节点
    let slow = this.head; // 记录上一个节点
    let counter = 0;

    while (fast && counter <= index) {
      // 找到删除元素
      if (counter === index) {
        // 如果删除目标为队头
        if (index === 0) {
          // 如果队列里不只有队头一个元素
          if(fast.next) {
            this.head = fast.next;
          } else {
            this.head = null;
            this.tail = null;
          }
        // 删除队尾元素
        } else if (!fast.next) {
          slow!.next = null;
          this.tail = slow;
        } else {
          // 删除非队首或者非队尾
          slow!.next = fast.next;
        }

        this.length -= 1; // 更新长度

        return fast.val;
      }

      slow = fast;
      fast = fast.next;
      counter++;
    }

    return undefined;
  }

  // 增加迭代器
  [Symbol.iterator]() {
    let ptr = this.head;

    return {
      next(){
        if(ptr) {
          const value = ptr.val;
          ptr = ptr.next;
          return { done: false, value }
        }

        return { done: true, value: undefined }
      }
    }
  }
}

export default {
  run: () => {
    const queue = new Queue<number>();
    queue.append(1);
    queue.append(2);
    queue.append(3);
    queue.append(4);
    queue.append(5);

    for(const value of queue) {
      console.log(value);
    }

    // 删除队头
    queue.remove();
    for(const value of queue) {
      console.log(value);
    }

    // 删除指定位置
    queue.remove(2);
    for(const value of queue) {
      console.log(value);
    }

    console.log('length：', queue.length);
  },
}