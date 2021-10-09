function myNew(fn: Function, ...args: any) {
  const obj = Object.create(fn.prototype);

  const res = fn.apply(obj, args);

  if (res && (typeof res === "object" || typeof res === "function")) {
    return res;
  }

  return obj;
}

class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  say() {
    console.log(`My name is ${this.name} and I'm ${this.age} years old`);
  }
}
 
export default {
  run: () => {
    const person: Person = myNew(Person, 'Neo', 29);

    person.say()
  },
};
