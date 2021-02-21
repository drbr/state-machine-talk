import React from 'react';
import {
  MonoBlock,
  VerticalSpacer,
} from '../talkUtils/FormatAndLayoutComponents';

const formula = `(previousState, action) =>
  (nextState, sideEffects)`;

export function Part2Conclusion() {
  return (
    <>
      <h1>Part 2 Conclusion</h1>
      <p>With Side Effects, we've completed the model of the system.</p>
      <MonoBlock>{formula}</MonoBlock>
      <p>
        This formula is capable of describing almost <em>any</em> stateful logic
        in a pure, self-contained way!
      </p>
      <ul>
        <li>State lives in the system</li>
        <li>Actions happen from the outside and affect the system</li>
        <li>Effects are emitted from the system and affect the outside</li>
      </ul>
      <VerticalSpacer />
      <h2>Is this pattern testable?</h2>
      <p>Yes … stay tuned!</p>
    </>
  );
}
