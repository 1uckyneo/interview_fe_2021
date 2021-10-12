type JsonTree = {
  tag: string;
  children: JsonTree[];
};

function dom2json(ele: Element) {
  const jsonTree: JsonTree = {
    tag: ele.tagName,
    children: [],
  };

  Array.from(ele.children).forEach((item) =>  jsonTree.children.push(dom2json(item)));

  return jsonTree;
}

export default {
  run: () => {
    // dom2json(document.getElementById('app'));
  },
};
