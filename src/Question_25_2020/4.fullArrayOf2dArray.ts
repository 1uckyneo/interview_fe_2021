function getFullArray(source: string[][]): string[] {
  const mixed = (prev: string[], curr: string[]) => {
    if (!prev.length) {
      return curr;
    }

    if (!curr.length) {
      return prev;
    }

    const result: string[] = [];

    prev.forEach((p) => {
      curr.forEach((c) => {
        result.push(p + c);
      })
    })

    return result;
  };

  return source.reduce((prev, curr) => {
    return mixed(prev, curr);
  }, []);
}

export default {
  run: () => {
    const source = [
      ['A', 'B'],
      ['a', 'b'],
      ['1', '2'],
    ];

    console.log(getFullArray(source));
  },
};
