import { Dispatch } from 'react';
import { assertUnreachableAndReturn } from '../../codeUtils/assertUnreachable';
import {
  StateMachineObject,
  useStateMachineReducer,
} from '../../examples/UseStateMachineReducer';
import { VerticalSpacer } from '../../talkUtils/FormatAndLayoutComponents';
import { renderSlide } from '../../talkUtils/renderSlide';

type InlineEditorState =
  | {
      name: 'readonlyMode';
      savedValue: string;
    }
  | {
      name: 'editMode';
      savedValue: string;
      editorValue: string;
    };

type InlineEditorAction =
  | {
      type: 'START_EDITING' | 'CANCEL' | 'SAVE';
    }
  | {
      type: 'EDIT_VALUE';
      value: string;
    };

const inlineEditorStateMachine: StateMachineObject<
  InlineEditorState,
  InlineEditorAction
> = {
  readonlyMode: {
    START_EDITING: (prev, action) => ({
      name: 'editMode',
      savedValue: prev.savedValue,
      editorValue: prev.savedValue,
    }),
  },
  editMode: {
    EDIT_VALUE: (prev, action) => ({
      ...prev,
      editorValue: action.value,
    }),
    SAVE: (prev, action) => ({
      name: 'readonlyMode',
      savedValue: prev.editorValue,
    }),
    CANCEL: (prev, action) => ({
      name: 'readonlyMode',
      savedValue: prev.savedValue,
    }),
  },
};

const initialInlineEditorState: InlineEditorState = {
  name: 'readonlyMode',
  savedValue: 'Edit me!',
};

function InlineEditorWidget() {
  // The state machine reducer (custom hook that I wrote) looks up the state
  // and action in the machine object and returns the result
  const [state, dispatch] = useStateMachineReducer(
    inlineEditorStateMachine,
    initialInlineEditorState
  );

  // With named states, now we can switch our UI on the state names,
  // which makes the code even more readable!
  return (
    <>
      <form className="inline-editor-box">
        {state.name === 'editMode' ? (
          <InlineEditorEditMode
            editorValue={state.editorValue}
            dispatch={dispatch}
          />
        ) : state.name === 'readonlyMode' ? (
          <InlineEditorReadonlyMode
            savedValue={state.savedValue}
            dispatch={dispatch}
          />
        ) : (
          assertUnreachableAndReturn(state, null)
        )}
      </form>
      <DispatcherButtons dispatch={dispatch} />
    </>
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
        <button onClick={() => props.dispatch({ type: 'START_EDITING' })}>
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
        onChange={(event) =>
          props.dispatch({ type: 'EDIT_VALUE', value: event.target.value })
        }
      />
      <div>
        <button
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            props.dispatch({ type: 'CANCEL' });
          }}
        >
          Cancel
        </button>
        <button
          type="submit"
          onClick={(event) => {
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

export function Slide_UseStateMachine() {
  return (
    <>
      <h1>Use the State Machine in the Component</h1>
      <p>Put it all together and use the state machine reducer!</p>
      <InlineEditorWidget />
      <VerticalSpacer />
      <p>Have we fixed the bugs from before?</p>
    </>
  );
}

function DispatcherButtons(props: { dispatch: Dispatch<InlineEditorAction> }) {
  return (
    <>
      <button
        style={{ marginTop: 10, marginRight: 10 }}
        onClick={() => props.dispatch({ type: 'START_EDITING' })}
      >
        START_EDITING
      </button>
      <button
        style={{ marginTop: 10, marginRight: 10 }}
        onClick={() => props.dispatch({ type: 'SAVE' })}
      >
        SAVE
      </button>
    </>
  );
}

renderSlide(Slide_UseStateMachine);
