let arr = [1, 2, 3, 4, 5];
let size = 3;
let i = 0;
let j = size;
let ans = [];
let result = [];
while (j <= arr.length) {
  ans = arr.slice(i, j);
  result.push(ans);
  i += size;
  j += size;
}
console.log(result)