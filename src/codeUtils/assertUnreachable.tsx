/** Compile-time typecheck to make sure a certain code path will never be reached */
export const assertUnreachable = (x: never): void => {};
