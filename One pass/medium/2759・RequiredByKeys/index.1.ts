/*
  2759 - RequiredByKeys
  -------
  by jiangshan (@jiangshanmeta) #medium #object
  
  ### Question
  
  Implement a generic `RequiredByKeys<T,  K>` which takes two type argument `T` and `K`.
  
  `K` specify the set of properties of `T` that should set to be required. When `K` is not provided, it should make all properties required just like the normal `Required<T>`.
  
  For example
  
  ```typescript
  interface User {
    name?: string
    age?: number
    address?: string
  }
  
  type UserPartialName = RequiredByKeys<User, 'name'> // { name: string; age?: number; address?: string }
  
  ```
  
  > View on GitHub: https://tsch.js.org/2759
*/

/* _____________ Your Code Here _____________ */
type Copy<T> = Pick<T, keyof T>;
type RequiredByKeys<T extends object, K = keyof T> = Copy<
  Required<Pick<T, Extract<keyof T, K>>> & Pick<T, Exclude<keyof T, K>>
>;

type RequiredByKeys1<T extends object, K extends keyof any = keyof T> = Copy<
  Required<Pick<T, Extract<keyof T, K>>> & Omit<T, K>
>;
type case1 = RequiredByKeys<User, "name">;
/* _____________ Test Cases _____________ */
import { Equal, Expect, ExpectFalse, NotEqual } from "@type-challenges/utils";

interface User {
  name?: string;
  age?: number;
  address?: string;
}

interface UserRequiredName {
  name: string;
  age?: number;
  address?: string;
}

interface UserRequiredNameAndAge {
  name: string;
  age: number;
  address?: string;
}

type cases = [
  Expect<Equal<RequiredByKeys<User, "name">, UserRequiredName>>,
  Expect<Equal<RequiredByKeys<User, "name" | "unknown">, UserRequiredName>>,
  Expect<Equal<RequiredByKeys<User, "name" | "age">, UserRequiredNameAndAge>>,
  Expect<Equal<RequiredByKeys<User>, Required<User>>>
];
type cases1 = [
  Expect<Equal<RequiredByKeys1<User, "name">, UserRequiredName>>,
  Expect<Equal<RequiredByKeys1<User, "name" | "unknown">, UserRequiredName>>,
  Expect<Equal<RequiredByKeys1<User, "name" | "age">, UserRequiredNameAndAge>>,
  Expect<Equal<RequiredByKeys1<User>, Required<User>>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/2759/answer
  > View solutions: https://tsch.js.org/2759/solutions
  > More Challenges: https://tsch.js.org
*/
