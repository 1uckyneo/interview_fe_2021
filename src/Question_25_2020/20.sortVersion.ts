function isLeftVersionGtRight(left: string, right: string): boolean {
  const leftNums = left.split('.').map((str) => Number.parseInt(str, 10));
  const rightNums = right.split('.').map((str) => Number.parseInt(str, 10));

  for (let i = 0; i < leftNums.length; i += 1) {
    const currRight = rightNums[i] ?? 0;

    if(leftNums[i]! === currRight) {
      continue;
    } else {
      return leftNums[i]! > currRight;
    }
  }

  return false;
}

function sortVersion(versions: string[]): string[] {
  if(versions.length < 2) {
    return versions;
  }

  const pivot = versions[0]!;
  const left: string[] = [];
  const right: string[] = [];

  for(let i = 1; i < versions.length; i += 1) {
    if(isLeftVersionGtRight(pivot, versions[i]!)) {
      left.push(versions[i]!);
    } else {
      right.push(versions[i]!);
    }
  }

  return sortVersion(left).concat([pivot]).concat(sortVersion(right));
}

export default {
  /**
   * 21.versions 是一个项目的版本号列表，因多人维护，不规则，动手实现一个版本号处理函数
   */
  run: () => {
    const versions = ['1.45.0', '1.5', '6', '3.3.3.3.3.3.3'];
    console.log(sortVersion(versions)); // ['1.5','1.45.0','3.3.3.3.3.3','6']
  },
};
