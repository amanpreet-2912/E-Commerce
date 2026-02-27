// let arr = [1, 2, 3, 4, 5];
// let size = 3;
// let i = 0;
// let j = size;
// let ans = [];
// let result = [];
// while (j <= arr.length) {
//   ans = arr.slice(i, j);
//   result.push(ans);
//   i += size;
//   j += size;
// }
// console.log(result)

// let obj = {
//   name: "category",
//   arr: [{ name: "Aman" }, { name: "Khushi" }],
// };
// const array = obj.arr;
// const names = array.find((arr) => {
//   return arr.name.toLowerCase() === "Ama".toLowerCase();
// });
// console.log(names);

// let arr=[33,4,7,8,1]
// arr.sort((a,b)=>b-a)
// console.log(arr)

const obj={
    name:"aman"
}
const obj1={
    name:"preet"
}
const obj3={...obj,obj1};
console.log(obj3)