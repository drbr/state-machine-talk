/** Compile-time typecheck to make sure a certain code path will never be reached */
export const assertUnreachable = (x: never): void => {};

/**
 * Compile-time typecheck to make sure a certain code path will never be reached,
 * but also pass through a value to be returned as part of an expression
 */
export function assertUnreachableAndReturn<R>(x: never, result: R) {
  return result;
}
