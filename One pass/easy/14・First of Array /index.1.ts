/*
  14 - First of Array
  -------
  by Anthony Fu (@antfu) #easy #array
  
  ### Question
  
  Implement a generic `First<T>` that takes an Array `T` and returns it's first element's type.
  
  For example
  
  ```ts
  type arr1 = ['a', 'b', 'c']
  type arr2 = [3, 2, 1]
  
  type head1 = First<arr1> // expected to be 'a'
  type head2 = First<arr2> // expected to be 3
  ```
  
  > View on GitHub: https://tsch.js.org/14
*/

/* _____________ Your Code Here _____________ */

//  判断 length 是否为0 或者 T extends [] 都可以
type First<T extends any[]> = T["length"] extends 0 ? never : T[0];
type First1<T extends any[]> = T extends [] ? never : T[0];
// 还可以通过类型推荐实现
type First2<T extends any[]> = T extends [infer F, ...unknown[]] ? F : never;

/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<First<[3, 2, 1]>, 3>>,
  Expect<Equal<First<[() => 123, { a: string }]>, () => 123>>,
  Expect<Equal<First<[]>, never>>,
  Expect<Equal<First<[undefined]>, undefined>>
];
type cases1 = [
  Expect<Equal<First1<[3, 2, 1]>, 3>>,
  Expect<Equal<First1<[() => 123, { a: string }]>, () => 123>>,
  Expect<Equal<First1<[]>, never>>,
  Expect<Equal<First1<[undefined]>, undefined>>
];

type cases2 = [
  Expect<Equal<First2<[3, 2, 1]>, 3>>,
  Expect<Equal<First2<[() => 123, { a: string }]>, () => 123>>,
  Expect<Equal<First2<[]>, never>>,
  Expect<Equal<First2<[undefined]>, undefined>>
];
type errors = [
  // @ts-expect-error
  First<"notArray">,
  // @ts-expect-error
  First<{ 0: "arrayLike" }>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/14/answer
  > View solutions: https://tsch.js.org/14/solutions
  > More Challenges: https://tsch.js.org
*/
