import React from 'react';
import { Mono } from '../talkUtils/FormattedText';

export function ReducerInCode_Actions() {
  return (
    <>
      <h1>How do we code a reducer?</h1>
      <h2>First, list the actions.</h2>
      <p>
        What are the possible things that the user can do to the Inline Editor?
      </p>
      <ol>
        <li>Start editing</li>
        <li>Change the value in the text box</li>
        <li>Cancel</li>
        <li>
          Save <em>(let's consider only the non-async save for now)</em>
        </li>
      </ol>
      <p>
        We can represent actions as plain JS objects; by convention, its name
        goes in the <Mono>type</Mono> property.
      </p>
      <p>
        The action object has no behavior, it just describes an event that may
        have happened.
      </p>
    </>
  );
}

/** With TypeScript, we can list the names as a string union */
type InlineEditorAction_NamesOnly = {
  type: 'START_EDITING' | 'EDIT_VALUE' | 'CANCEL' | 'SAVE';
};

/** If any of the actions have extra data, use a discriminated union */
type InlineEditorAction =
  | {
      type: 'START_EDITING' | 'CANCEL' | 'SAVE';
    }
  | {
      type: 'EDIT_VALUE';
      value: string;
    };

const MyAction: InlineEditorAction = {
  type: 'EDIT_VALUE',
  value: 'I have carefully chosen this text',
};
