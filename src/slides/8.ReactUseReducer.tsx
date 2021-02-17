import React, { useReducer } from 'react';
import { VerticalSpacer, Mono, MonoBlock } from '../talkUtils/FormattedText';

const assertUnreachable = (x: never) => {};

const reducerExample = `const [state, dispatch] = useReducer(
  reducer, initialState
);
`;

export function ReactUseReducer() {
  return (
    <>
      <h1>useReducer hook</h1>
      <p>
        React provides the <Mono>useReducer</Mono> hook, which lets us use a
        reducer to manage a component's state.
      </p>
      <p>
        <MonoBlock>{reducerExample}</MonoBlock>
      </p>
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
        functions, dispatch actions instead. React will run that action through
        the reducer and update the state.
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
  // Send the initial state to the reducer
  const [state, dispatch] = useReducer(
    inlineEditorReducer,
    initialInlineEditorState
  );

  const readonlyView = (
    <>
      <span>{state.savedValue}</span>
      <div>
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
    <form style={{ border: '1px solid black', padding: 10 }}>
      {state.isEditing ? editingView : readonlyView}
    </form>
  );
}
