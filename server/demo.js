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

// const obj={
//     name:"aman"
// }
// const obj1={
//     name:"preet"
// }
// const obj3={...obj,obj1};
// console.log(obj3)

// let arr=[6,2,3,4,5];
// console.log(arr.reduce((prev,current)=>prev+current,0))

// var ArrayWrapper = function (nums) {
//   return (this.arr = [...nums]);
// };
// ArrayWrapper.prototype.valueOf = function () {
// console.log(this.arr)
// };
// const obj1 = new ArrayWrapper([1, 2]);
// console.log(obj1.reduce((prev, current) => prev + current));
// console.log(obj1.valueOf());
// ArrayWrapper.valueOf()

// class Calculator{
//     constructor(value){
//         this.value=value;
//     }
//     add(value){
//         return this.value+value;
//     }
// }
// const cal=new Calculator(7);
// console.log(cal.add(8))

// const arr1=[{"id": 1, "x": 1},
//     {"id": 2, "x": 9}]
// const arr2 = [
//     {"id": 3, "x": 5}
// ]
// const arr3=[...arr1,...arr2]
// console.log(arr3)
// const obj1={
//     id:1,
//     name:"aman"
// }
// const obj2={...obj1, name:"preet"}
// console.log(obj2)

// let arr = [{ name: "Aman" }];
// arr = [...arr,{ id: 1 }];
// console.log(arr);

// let a=10;
// function call(){
// console.log(a)
// let a=20;

// }
// call();
function call(){
    var a=10;
}
console.log(a)

//  <Button
//               size="sm"
//               variant="destructive"
//               onClick={() =>
//                 handleSubDelete(category._id, sub._id)
//               }
//             >
//               Delete
//             </Button>