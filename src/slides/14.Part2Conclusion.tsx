import React from 'react';
import { MonoBlock } from '../talkUtils/FormatAndLayoutComponents';

const formula = `(previousState, action) =>
  (nextState, sideEffects)`;

export function Part2Conclusion() {
  return (
    <>
      <h1>Part 2 Conclusion</h1>
      <MonoBlock>{formula}</MonoBlock>
      <p>
        By implementing this formula, we can describe the behavior of anything
        in a stateless way!
      </p>
    </>
  );
}
