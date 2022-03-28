/*
  3057 - Push
  -------
  by jiangshan (@jiangshanmeta) #easy #array
  
  ### Question
  
  Implement the generic version of ```Array.push```
  
  For example
  
  ```typescript
  type Result = Push<[1, 2], '3'> // [1, 2, '3']
  ```
  
  > View on GitHub: https://tsch.js.org/3057
*/

/* _____________ Your Code Here _____________ */
type MyEqual<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y
  ? 1
  : 2
  ? true
  : false;

type Includes<T extends readonly any[], U> = T extends [
  infer First,
  ...infer Rest
]
  ? MyEqual<First, U> extends true
    ? true
    : Includes<Rest, U>
  : false;
type Push<T extends unknown[], U> = Includes<T, U> extends true
  ? [...T]
  : [...T, U];

type Push1<T extends unknown[], U> = [
  ...T,
  ...(Includes<T, U> extends true ? [] : [U])
];

// 转换为联合类型判断
type Push2<T extends unknown[], U> = [U] extends [T[number]] ? T : [...T, U];
type case1 = Push1<["1", 2, "3"], "3">;

/* _____________ Test Cases _____________ */
import { Equal, Expect, ExpectFalse, NotEqual } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Push<[], 1>, [1]>>,
  Expect<Equal<Push<[1, 2], "3">, [1, 2, "3"]>>,
  Expect<Equal<Push<["1", 2, "3"], boolean>, ["1", 2, "3", boolean]>>,
  Expect<Equal<Push<["1", 2, "3"], "3">, ["1", 2, "3"]>>
];
type cases2 = [
  Expect<Equal<Push2<[], 1>, [1]>>,
  Expect<Equal<Push2<[1, 2], "3">, [1, 2, "3"]>>,
  Expect<Equal<Push2<["1", 2, "3"], boolean>, ["1", 2, "3", boolean]>>,
  Expect<Equal<Push2<["1", 2, "3"], "3">, ["1", 2, "3"]>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/3057/answer
  > View solutions: https://tsch.js.org/3057/solutions
  > More Challenges: https://tsch.js.org
*/
