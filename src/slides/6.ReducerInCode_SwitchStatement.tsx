import React from 'react';

export function ReducerInCode_SwitchStatement() {
  return (
    <>
      <h1>How do we code a reducer?</h1>
      <h2>Then, write the function.</h2>
      <p>
        Implement a reducer however you want, but a common way is to use a
        switch statement.
      </p>
    </>
  );
}

type InlineEditorState = {
  readonly savedValue: string;
  readonly editorValue: string;
  readonly isEditing: boolean;
};

type InlineEditorAction =
  | {
      type: 'START_EDITING' | 'CANCEL' | 'SAVE';
    }
  | {
      type: 'EDIT_VALUE';
      value: string;
    };

/** Compile-time typecheck to make sure a certain code path will never be reached */
const assertUnreachable = (x: never) => {};

/** Reducer for the state transitions in the simple Inline Editor */
function inlineEditorReducer(
  prevState: InlineEditorState,
  action: InlineEditorAction
): InlineEditorState {
  switch (action.type) {
    case 'START_EDITING':
      // We can list each property explicitly,
      return {
        savedValue: prevState.savedValue,
        editorValue: prevState.savedValue,
        isEditing: true,
      };
    case 'EDIT_VALUE':
      // …or we can use the spread operator and list only the properties that change.
      return {
        ...prevState,
        // TypeScript knows that the EDIT_VALUE action has a `value` property
        editorValue: action.value,
      };
    case 'SAVE':
      return {
        ...prevState,
        savedValue: prevState.editorValue,
        isEditing: false,
      };
    case 'CANCEL':
      return {
        ...prevState,
        isEditing: false,
      };
    default:
      assertUnreachable(action);
      return prevState;
  }
}
