import React from 'react';
import { MonoBlock } from '../../talkUtils/FormatAndLayoutComponents';
/* eslint-disable @typescript-eslint/no-unused-vars */

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

export function Slide_SideEffects_MentalModel() {
  return (
    <>
      <h1>Side Effects: Mental Model</h1>
      <p>Add side effects to the the reducer formula:</p>
      <MonoBlock>{formula}</MonoBlock>
      <p>
        The reducer does not actually execute side effects, it only{' '}
        <em>describes</em> them. Some ways to represent them in code:
      </p>
      <ul>
        <li>A function that executes the effect when invoked</li>
        <li>
          An object that names the effect and contains other params (bound to an
          actual implementation at runtime)
        </li>
      </ul>
    </>
  );
}

const formula = `(previousState, action) =>
  (nextState, sideEffects)`;
