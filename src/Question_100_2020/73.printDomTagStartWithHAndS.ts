function printSpecifiedTags(tagNameStartWith: string | string[]) {
  const matchList = typeof tagNameStartWith === 'string' ? [tagNameStartWith] : tagNameStartWith;
  const matchCondition = matchList.join('|');
  const reg = new RegExp(`^[${matchCondition}].+`, 'gi');
  const elements = Array.from(document.getElementsByTagName('*'));
  const targetElements : Element[] = [];
  const uniqTagNames = new Set<string>();

  elements.forEach((ele) => {
    const { tagName } = ele;
    if(reg.test(tagName)) {
      targetElements.push(ele);
      if(!uniqTagNames.has(tagName)) {
        uniqTagNames.add(tagName);
      }
    }
  })

  console.log(targetElements); // 打印
  
  return Array.from(uniqTagNames);
}

export default {
  /**
   * 73.随便打开一个网页，用 JavaScript 打印所有以 s 和 h 开头的标签，并计算出标签的种类 
   */
  run: () => {
    const uniqTagNames = printSpecifiedTags(['s', 'h']); 
    console.log('所有以 s 和 h 开头的标签的种类：', uniqTagNames);
  },
}
