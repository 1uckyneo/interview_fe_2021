// @ts-nocheck
Function.prototype.myCall = function(thisArg, ...args) {
  thisArg = thisArg || window; // 参数默认值并不会排除null，所以重新赋值

  const fn = Symbol();

  thisArg[fn] = this; // this是调用call的函数
  const result = thisArg[fn](...args);

  Reflect.deleteProperty(thisArg, fn);

  return result;
}

Function.prototype.myApply = function(thisArg = window, args = []) {
  thisArg = thisArg || window; // 参数默认值并不会排除null，所以重新赋值

  const fn = Symbol();

  thisArg[fn] = this; // this是调用call的函数
  const result = thisArg[fn](...args);

  Reflect.deleteProperty(thisArg, fn);

  return result;
}

Function.prototype.myBind = function(thisArg, ...args) {
  thisArg = thisArg || window;

  let fn = Symbol();
  thisArg[fn] = this;

  return (...restArgs) => {
    return thisArg[fn](...args, ...restArgs);
  }
}



export default {
  run: () => {
    function sayWord(name: string, supplement: string) {
      const talk = `${name} said ${this.word} and said ${supplement}`;
      console.log(talk);
      return talk;
    }
    
    const bottle = {
      word: 'hello'
    };
    
    // 使用 call 将 bottle 传递为 sayWord 的 this
    sayWord.myCall(bottle, 'myCall', 'do I look like call method?'); 
    sayWord.myApply(bottle, ['myApply', 'do I look like apply method?']);
    const bindSayWord = sayWord.myBind(bottle, 'myBind');
    bindSayWord('do I look like bind method?');
  }
}