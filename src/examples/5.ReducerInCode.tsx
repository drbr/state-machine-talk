import React from 'react';
import { Mono } from '../talkUtils/FormattedText';

export function ReducerInCode() {
  return (
    <>
      <h1>How do we code a reducer?</h1>
      <p>
        Think about the state changes in terms of <em>actions</em>, rather than
        the individual data that change
      </p>
      <ul>
        <li>Actions can be described by plain JS objects.</li>
        <li>
          By convention, an action's name goes in the <Mono>type</Mono>{' '}
          property.
        </li>
      </ul>
      <p>In Inline Editor, state changes happen from these user actions:</p>
      <ul>
        <li>Start editing</li>
        <li>Edit value in the text box</li>
        <li>Cancel</li>
        <li>
          Save <em>(just the non-async save for now)</em>
        </li>
      </ul>
    </>
  );
}

/** With TypeScript, we can list the names as a string union */
type InlineEditorAction = {
  type: 'START_EDITING' | 'EDIT_VALUE' | 'CANCEL' | 'SAVE';
};

/** If any of the actions have extra data, use a discriminated union */
type InlineEditorActionDiscriminatedUnion =
  | {
      type: 'START_EDITING' | 'CANCEL' | 'SAVE';
    }
  | {
      type: 'EDIT_VALUE';
      value: string;
    };
