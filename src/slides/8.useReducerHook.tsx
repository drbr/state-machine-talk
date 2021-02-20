import React, { useReducer } from 'react';
import { assertUnreachable } from '../codeUtils/assertUnreachable';
import { Mono, MonoBlock } from '../talkUtils/FormatAndLayoutComponents';

const reducerExample = `const [state, dispatch] = useReducer(
  reducer, initialState
);
`;

export function UseReducerHook() {
  return (
    <>
      <h1>useReducer Hook</h1>
      <p>
        React provides the <Mono>useReducer</Mono> hook, which lets us use a
        reducer to manage a component's state.
      </p>
      <MonoBlock>{reducerExample}</MonoBlock>
      <ul>
        <li>
          <strong>State:</strong> The current state
        </li>
        <li>
          <strong>Dispatch:</strong> A function that accepts actions to initiate
          a possible state change
        </li>
      </ul>
      <p>
        In the component's UI callbacks, instead of calling the set state
        functions, we'll dispatch actions instead. React will send that action
        through the reducer and update the state.
      </p>
      <InlineEditor />
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

/** Reducer for the state transitions in the simple Inline Editor */
function inlineEditorReducer(
  prevState: InlineEditorState,
  action: InlineEditorAction
): InlineEditorState {
  switch (action.type) {
    case 'START_EDITING':
      return {
        savedValue: prevState.savedValue,
        editorValue: prevState.savedValue,
        isEditing: true,
      };
    case 'EDIT_VALUE':
      return {
        ...prevState,
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

const initialInlineEditorState: InlineEditorState = {
  savedValue: 'Edit me!',
  editorValue: 'I get overwritten when edit mode starts so I can be anything',
  isEditing: false,
};

function InlineEditor() {
  // Instead of having three separate useState instances, we have a single reducer
  const [state, dispatch] = useReducer(
    inlineEditorReducer,
    initialInlineEditorState
  );

  const readonlyView = (
    <>
      <span>{state.savedValue}</span>
      <div>
        {/* Instead of manually updating the state, we dispatch events */}
        <button onClick={() => dispatch({ type: 'START_EDITING' })}>
          Edit
        </button>
      </div>
    </>
  );

  const editingView = (
    <>
      <input
        value={state.editorValue}
        onChange={(event) =>
          dispatch({ type: 'EDIT_VALUE', value: event.target.value })
        }
      />
      <div>
        <button
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            dispatch({ type: 'CANCEL' });
          }}
        >
          Cancel
        </button>
        <button
          type="submit"
          onClick={(event) => {
            event.preventDefault();
            dispatch({ type: 'SAVE' });
          }}
        >
          Save
        </button>
      </div>
    </>
  );

  return (
    <form className="inline-editor-box">
      {state.isEditing ? editingView : readonlyView}
    </form>
  );
}
