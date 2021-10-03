type RecArrayItem<T> = T | RecArrayItem<T>[];

function flat<T>(source: RecArrayItem<T>[]): T[] {
  return source.reduce<T[]>(
    (prev, curr) =>
      Array.isArray(curr) ? prev.concat(flat(curr)) : prev.concat(curr),
    []
  );
}

export default {
  run: () => {
    const source = [1, [2, [3, [4, [5]]]]];

    console.log('原数组：', source);
    console.log('打平数组：,', flat(source));
    
  },
}
