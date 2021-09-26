/**
 * 剑指 Offer 48. 最长不含重复字符的子字符串
 * 解题思路：双指针（1个序列快慢指针）+ 哈希表判重
 */
 function lengthOfLongestSubstring(s: string) {
  let max = 0;
  let idxMap = new Map();

  for (let slow = -1, fast = 0; fast < s.length; fast++) {
      // 重复：重新设置 slow
      if (idxMap.has(s.charAt(fast)) && idxMap.get(s.charAt(fast)) > slow) {
          slow = idxMap.get(s.charAt(fast));
          console.log(slow, '<- slow --- fast ->', fast);
          
      } else {
          // 没重复：更新 max
          max = Math.max(max, fast - slow);
          console.log('max: -> ', max);
          
      }

      idxMap.set(s.charAt(fast), fast);
  }

  console.log(idxMap);
  

  return max;
};

export default {
  /**
   * 字符串出现的不重复最长长度
   */
  run: () => {
    const originStr = "tmmzuxt";
    const max = lengthOfLongestSubstring(originStr);

    console.log('原始字符串 -> :', originStr);
    console.log('字符串出现的不重复最长长度 -> :', max);
    
  },
};
