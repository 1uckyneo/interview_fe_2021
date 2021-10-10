function myInstanceOf(left: object, right: Function) {
  let leftPtr: object | null = left;

  while(true) {
    if(leftPtr === null) {      
      return false;
    }

    const protoTypeOfLeft = Reflect.getPrototypeOf(leftPtr);

    if(protoTypeOfLeft === right.prototype) {
      return true;
    }

    leftPtr = protoTypeOfLeft;
  }
}

export default {
  run: () => {
    const arr = [1, 2, 3];
    console.log(myInstanceOf(arr, Array));
    console.log(myInstanceOf(arr, Object));

    const obj = { x: 1, y: 2 };
    console.log(myInstanceOf(obj, Array));
    console.log(myInstanceOf(obj, Object));
  },
}