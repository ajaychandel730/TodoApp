export default function <T extends object>(obj: T, arr: string[]) {
  let todo:object = {};
  for (let key of arr) {
    if (obj[key] !== undefined) {
      todo[key] = obj[key];
    }
  }
  return todo;
}
