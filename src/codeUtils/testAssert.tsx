import * as _ from 'lodash';

/**
 * Simple function to do asserts without a unit test library.
 * Writes the result to the console.
 */
export function testExpect(actual: any) {
  return {
    toEqual(expected: any, message?: string) {
      testAssertEqual(expected, actual, message);
    },
  };
}

function testAssertEqual(expected: any, actual: any, message?: string) {
  if (!_.isEqual(expected, actual)) {
    const actualMessage = message ?? 'Objects not equal:';
    console.error(
      `${actualMessage}:\nExpected: %o\nActual:   %o`,
      expected,
      actual
    );
    throw new Error('Test failed!');
  }
}
