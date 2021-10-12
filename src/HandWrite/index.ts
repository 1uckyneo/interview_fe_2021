// import compose from "./compose";
import setTimeoutAndSetInterval from './setTimeoutAndSetInterval';
import scheduler from './scheduler';
import myNew from './new';
import callApplyBind from './callApplyBind';
import myInstanceOf from './instanceOf';
import aop from './aop';
import lazyMan from './lazyMan';
import LRU from './LRUcache';

export default {
  run: () => {
    // compose.run(); // 1 compose
    // setTimeoutAndSetInterval.run(); // 第二题 setTimeout 模拟实现 setInterval（setInterval 模拟实现 setTimeout）
    // scheduler.run(); // 7 实现有并行限制的 Promise 调度器
    // myNew.run();
    // callApplyBind.run(); // 手写 call apply bind
    // myInstanceOf.run();
    // aop.run();
    // lazyMan.run(); 
    LRU.run();
  },
}