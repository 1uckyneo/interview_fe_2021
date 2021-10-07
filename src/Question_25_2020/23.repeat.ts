function repeat<Fn extends (...args: unknown[]) => unknown>(func: Fn, times: number, wait: number) {
  return ((...args) => {
    let counter = 0;
  
    const timer = setInterval(() => {
      if(counter >= times) {
        clearInterval(timer);
      } else {
        func(...args);
      }
      
      counter += 1;
      
    }, wait);
  }) as Fn;
}

console.log

export default {
  run: () => {
    const repeatFunc = repeat(console.log, 4, 500);
    repeatFunc('hello');
  },
}