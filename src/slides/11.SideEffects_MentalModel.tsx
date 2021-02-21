import React from 'react';
import { MonoBlock } from '../talkUtils/FormatAndLayoutComponents';

const formula = `(previousState, action) =>
  (nextState, sideEffects)`;

export function SideEffects_MentalModel() {
  return (
    <>
      <h1>Side Effects: Mental Model</h1>
      <p>Add side effects to the output of the reducer formula:</p>
      <MonoBlock>{formula}</MonoBlock>
      <p>
        The reducer does not actually execute side effects, it only{' '}
        <em>describes</em> them.
      </p>
      <p>Side effects could be represented as:</p>
      <ul>
        <li>A zero-args function that executes the effect when invoked</li>
        <li>
          A JS object that names the effect and contains other params (paired to
          an actual implementation at runtime)
        </li>
      </ul>
    </>
  );
}

// Since effects are like "the opposite of actions", I'll represent them as objects for this
// example. We can make them type-safe in the same way.
type InlineEditorEffect =
  | {
      type: 'saveViaApi';
      value: string;
    }
  | {
      type: 'emitTelemetry';
      message: string;
    };
