import React from 'react';
import { MonoBlock } from '../../talkUtils/FormatAndLayoutComponents';

export function Slide_Part2Conclusion() {
  return (
    <>
      <h1>Part 2 Conclusion</h1>
      <p>After adding Side Effects, we've completed the model of the system.</p>
      <MonoBlock>{formula}</MonoBlock>
      <p>
        This formula is capable of describing almost any stateful logic in a
        pure, self-contained way!
      </p>
      <p>Recap:</p>
      <ul>
        <li>
          <strong>State</strong> is persisted in the system
        </li>
        <li>
          <strong>Actions</strong> happen from the outside and affect the system
        </li>
        <li>
          <strong>Effects</strong> are emitted from the system and affect the
          outside
        </li>
      </ul>
      <p>
        A reducer can contain all the logic that coördinates state, actions and
        effects; it gets interpreted by a runtime framework to persist state and
        execute effects.
      </p>
    </>
  );
}

const formula = `(previousState, action) =>
  (nextState, sideEffects)`;
