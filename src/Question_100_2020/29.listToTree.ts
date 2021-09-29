// 数组转树 start
type Node<T> = {
  id: number;
  value: T;
  parentId: number;
};

type TreeNode<T> = {
  id: number;
  value: T;
  parentId: number;
  children: TreeNode<T>[];
};

const nodeList: Node<string>[] = [
  { id: 1, value: 'V1', parentId: 0 },
  { id: 3, value: 'V2', parentId: 1 },
  { id: 4, value: 'V3', parentId: 1 },
  { id: 5, value: 'V4', parentId: 2 },
  { id: 6, value: 'V5', parentId: 3 },
  { id: 7, value: 'V6', parentId: 2 },
  { id: 8, value: 'V7', parentId: 4 },
];

const listToTree = <T>(list: Node<T>[]): TreeNode<T> | undefined => {
  const map = list.reduce<Map<number, TreeNode<T>>>((prev, curr) => {
    prev.set(curr.id, { ...curr, children: [] });
    return prev;
  }, new Map());


  let headId = 1;

  map.forEach((treeNode) => {
    const parent = map.get(treeNode.parentId);

    if (parent) {
      parent.children.push(treeNode);
    }

    if(treeNode.parentId === 0) {
      headId = treeNode.id;
    }
  });

  return map.get(headId);
};
// 数组转树 end

// 数组转链表 start
class ListNode<T> {
  val: T;
  next: ListNode<T> | null = null;

  constructor(val: T) {
    this.val = val;
  }
}

const listToLinkedList = <T>(list: T[]) => {
  if(list.length) {
    const copyOfList = [...list];
    const node = new ListNode(copyOfList.shift() as T);
    let ptr = node;
    
    copyOfList.forEach((item) => {
      ptr.next = new ListNode(item);
      ptr = ptr.next;
    })

    return node;
  }

  return undefined;
}

// 数组转链表 end


export default {
  run: () => {
    const treeNode = listToTree(nodeList);
    console.log(treeNode);

    const list = [1, 2, 3, 4, 5];
    const linkedList = listToLinkedList(list);
    console.log(linkedList);
    
  },
};
