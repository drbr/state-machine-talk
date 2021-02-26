import React, { Dispatch, useReducer } from 'react';
import { assertUnreachable } from '../../codeUtils/assertUnreachable';
import { Mono } from '../../talkUtils/FormatAndLayoutComponents';
import { renderSlide } from '../../talkUtils/renderSlide';
/* eslint-disable @typescript-eslint/no-unused-vars */

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
  editorValue:
    'I get overwritten when edit mode starts so I can be anything',
  isEditing: false,
};

function InlineEditorWidget() {
  const [state, dispatch] = useReducer(
    inlineEditorReducer,
    initialInlineEditorState
  );

  return (
    <form className="inline-editor-box">
      {state.isEditing ? (
        <InlineEditorEditMode
          editorValue={state.editorValue}
          dispatch={dispatch}
        />
      ) : (
        <InlineEditorReadonlyMode
          savedValue={state.savedValue}
          dispatch={dispatch}
        />
      )}
    </form>
  );
}

function InlineEditorReadonlyMode(props: {
  savedValue: string;
  dispatch: Dispatch<InlineEditorAction>;
}) {
  return (
    <>
      <span>{props.savedValue}</span>
      <div>
        <button
          onClick={() =>
            props.dispatch({ type: 'START_EDITING' })
          }
        >
          Edit
        </button>
      </div>
    </>
  );
}

function InlineEditorEditMode(props: {
  editorValue: string;
  dispatch: Dispatch<InlineEditorAction>;
}) {
  return (
    <>
      <input
        value={props.editorValue}
        onChange={event =>
          props.dispatch({
            type: 'EDIT_VALUE',
            value: event.target.value,
          })
        }
      />
      <div>
        <button
          type="reset"
          onClick={event => {
            event.preventDefault();
            props.dispatch({ type: 'CANCEL' });
          }}
        >
          Cancel
        </button>
        <button
          type="submit"
          onClick={event => {
            event.preventDefault();
            props.dispatch({ type: 'SAVE' });
          }}
        >
          Save
        </button>
      </div>
    </>
  );
}

export function Slide_Part1Conclusion() {
  return (
    <>
      <h1>Part 1 Conclusion</h1>
      <h2>Reducers are not just for Redux!</h2>
      <p>
        You can use this pattern <em>anywhere</em> : a
        single component, or a parent of several components,
        or even in a stateful service.
      </p>
      <p>
        Using reducers and <Mono>dispatch</Mono>ing actions
        has several advantages:
      </p>
      <ul>
        <li>Decouples state logic from display code</li>
        <li>
          All state logic is encapsulated in one
          easily-testable function
        </li>
        <li>
          Named actions help us understand what each UI
          element callback actually does
        </li>
        <li>
          Child components don't need to be concerned with
          the details of the parent's state; helps cut down
          on "callback prop sprawl" (send a single{' '}
          <Mono>dispatch</Mono> to children, instead of
          several state updaters)
        </li>
      </ul>
    </>
  );
}
renderSlide(Slide_Part1Conclusion);
