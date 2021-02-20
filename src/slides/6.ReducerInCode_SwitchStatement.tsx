import React from 'react';
import { assertUnreachable } from '../codeUtils/assertUnreachable';

export function ReducerInCode_SwitchStatement() {
  return (
    <>
      <h1>How do we code a reducer?</h1>
      <h2>Then, write the function.</h2>
      <p>
        Implement a reducer however you want, but a common way is to use a
        switch statement.
      </p>
      <p>
        Let's look at the code. Note how the action names give context and
        meaning to the state changes.
      </p>
    </>
  );
}

// These are the same state variables as in the original component
type InlineEditorState = {
  readonly savedValue: string;
  readonly editorValue: string;
  readonly isEditing: boolean;
};

// The actions we defined in the previous slide
type InlineEditorAction =
  | {
      type: 'START_EDITING' | 'CANCEL' | 'SAVE';
    }
  | {
      type: 'EDIT_VALUE';
      value: string;
    };

// The reducer has the same state transitions that we originally had in each of the input handlers
// on the original component, but now they're all together
function inlineEditorReducer(
  prevState: InlineEditorState,
  action: InlineEditorAction
): InlineEditorState {
  switch (action.type) {
    case 'START_EDITING':
      // We can list each property in the next state explicitly,
      return {
        savedValue: prevState.savedValue,
        editorValue: prevState.savedValue,
        isEditing: true,
      };
    case 'EDIT_VALUE':
      // …or we can use the spread operator and list only the properties that change.
      return {
        ...prevState,
        // In this case of the switch, TypeScript knows that this action has a `value` property
        editorValue: action.value,
      };
    case 'CANCEL':
      return {
        ...prevState,
        isEditing: false,
      };
    case 'SAVE':
      return {
        ...prevState,
        savedValue: prevState.editorValue,
        isEditing: false,
      };
    default:
      assertUnreachable(action);
      return prevState;
  }
}
