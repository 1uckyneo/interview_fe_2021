const source1 = {
  a: [
    { b: 10 },
    { b: 'str' },
    { b: null },
    { b: undefined },
  ]
};

function lodashGet<R extends unknown = unknown, S extends object = object>(source: S, path: string) {
  // a[3].b -> a.3.b -> [a,3,b]
  // path 中也可能是数组的路径，全部转化成 . 运算符并组成数组
  const paths = path.replace(/\[(\d+)\]/g, ".$1").split(".");
  
  let ptr = source as R | undefined;;
  
  for(const p of paths) {
    const r = Object(ptr)[p] as R | undefined;;
    
    if(r == null) {
      return r;
    }

    ptr = r;
  }

  return ptr;
}

export default {
  /**
   * 14.实现 lodash 的_.get
   */
  run: () => {
    const r = lodashGet(source1, "a[4].b");
    console.log('14.实现 lodash 的_.get 返回值 -> ', r);
  },
}

