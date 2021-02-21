export type TestSpy = {
  (arg: any): void;
  readonly callCount: number;
};

/**
 * Simple function to make a "spy" without a unit test library.
 * Logs the first argument to the console when it's executed, and also returns a call count.
 */
export function testSpy(name: string): TestSpy {
  let callCount = 0;

  const spyFn = (arg: any) => {
    console.log(`Executing ${name} with ${JSON.stringify(arg)}`);
    callCount++;
  };

  Object.defineProperty(spyFn, 'callCount', {
    get: () => callCount,
  });

  return spyFn as TestSpy;
}
