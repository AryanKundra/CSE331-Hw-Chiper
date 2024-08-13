import { List } from './list';


/** Returns the last element in the given list. */
export const last = <A,>(L: List<A>): A => {
  if (L.kind === "nil") {
      throw new Error("empty list has no last element");
  } else if (L.tl.kind === "nil") {
      return L.hd;
  } else {
      return last(L.tl);
  }
};


/** Returns the prefix consting of the first n elements of L. */
export const prefix = <A,>(n: bigint, L: List<A>): List<A> => {
  if (n < 0n) {
    throw new Error("Invalid value for n, must be a natural number");
  } else if (L.kind === "nil") {
    if (n === 0n) {
      return { kind: "nil" };
    } else {
      throw new Error("List contains fewer elements than what was specified by n");
    }
  } else if (n === 0n) {
    return { kind: "nil" };
  } else {
    return { kind: "cons", hd: L.hd, tl: prefix(n - 1n, L.tl) };
  }
};


/** Returns the suffix consting of the elements of L after the first n. */
export const suffix = <A,>(n: bigint, L: List<A>): List<A> => {
  if (n < 0n) {
    throw new Error("Invalid value for n, must be a natural number");
  } else if (L.kind === "nil") {
    if (n === 0n) {
      return { kind: "nil" };
    } else {
      throw new Error("List contains fewer elements than what was specified by n");
    }
  } else if (n === 0n) {
    return L;
  } else {
    return suffix(n - 1n, L.tl);
  }
};
