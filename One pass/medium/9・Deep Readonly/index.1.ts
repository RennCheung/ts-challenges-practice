/*
  9 - Deep Readonly
  -------
  by Anthony Fu (@antfu) #medium #readonly #object-keys #deep
  
  ### Question
  
  Implement a generic `DeepReadonly<T>` which make every parameter of an object - and its sub-objects recursively - readonly.
  
  You can assume that we are only dealing with Objects in this challenge. Arrays, Functions, Classes and so on are no need to take into consideration. However, you can still challenge your self by covering different cases as many as possible.
  
  For example
  
  ```ts
  type X = { 
    x: { 
      a: 1
      b: 'hi'
    }
    y: 'hey'
  }
  
  type Expected = { 
    readonly x: { 
      readonly a: 1
      readonly b: 'hi'
    }
    readonly y: 'hey' 
  }
  
  type Todo = DeepReadonly<X> // should be same as `Expected`
  ```
  
  > View on GitHub: https://tsch.js.org/9
*/

/* _____________ Your Code Here _____________ */

// 这里必须是 unknown
type DeepReadonly<T extends object> = {
  readonly [K in keyof T]: T[K] extends Record<string, unknown>
    ? DeepReadonly<T[K]>
    : T[K];
};

// 关于 Record<string, any> ，官方给出的解答：
// https://github.com/microsoft/TypeScript/issues/41746
// 所有的引用数据类型都可以通过类型检查
const a1: Record<string, any> = [22];
const a2: Record<string, any> = /\d/;
const a3: Record<string, any> = {};
let a4: Record<string, any> = { name: "张三" };
a4 = [];
const a5: Record<string, any> = new Map();
const a6: Record<string, any> = new Set();
const a7: Record<string, any> = class Person {};
const a8: Record<string, any> = new Promise(() => {});

// Record<string, unknown> 只有"对象" 才能通过类型检查
const b: Record<string, unknown> = () => 22; // error
const b1: Record<string, unknown> = [22]; // error
const b2: Record<string, unknown> = /\d/; // error
const b3: Record<string, unknown> = {};
let b4: Record<string, unknown> = { name: "张三" };
b4 = []; // error
const b5: Record<string, unknown> = new Map(); // error
const b6: Record<string, unknown> = new Set(); // error
const b7: Record<string, unknown> = class Person {}; // error
const b8: Record<string, unknown> = new Promise(() => {}); // error

type case1 = DeepReadonly<X>;
type case2 = Record<string, unknown>;
/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [Expect<Equal<DeepReadonly<X>, Expected>>];

type X = {
  a: () => 22;
  b: string;
  c: {
    d: boolean;
    e: {
      g: {
        h: {
          i: true;
          j: "string";
        };
        k: "hello";
      };
    };
  };
};

type Expected = {
  readonly a: () => 22;
  readonly b: string;
  readonly c: {
    readonly d: boolean;
    readonly e: {
      readonly g: {
        readonly h: {
          readonly i: true;
          readonly j: "string";
        };
        readonly k: "hello";
      };
    };
  };
};

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/9/answer
  > View solutions: https://tsch.js.org/9/solutions
  > More Challenges: https://tsch.js.org
*/
