/**
 * log: before
 * log: Neo
 * log: after
 * return: my name is Neo
 * 咋此处实现上面的 console.log 和 return
 */
function aop<
  Fn1 extends (...args: any) => any,
  Fn2 extends (...args: any) => any
>(fn: Fn1, injectType: 'before' | 'after', injectFn: Fn2) {
  return ((...args) => {
    let result;

    if(injectType === 'before') {
      injectFn();
    }

    result = fn(...args);

    if(injectType === 'after') {
      injectFn();
    }

  }) as Fn1;
  
}

export default {
  run: () => {
    const callMyName = (name: string): string => {
      console.log(name);
      return `my name is ${name}`;
    };
    
    const c1 = aop(callMyName, 'before', () => {
      console.log('before');
    });
    
    const c2 = aop(c1, 'after', () => {
      console.log('after');
    });

    const c3 = aop(c2, 'before', () => {
      console.log('before before');
    });

    c3('Neo');
  },
}


