import { Dispatch } from 'react';
import { EffectReducer, useEffectReducer } from 'use-effect-reducer';
import { assertUnreachable } from '../codeUtils/assertUnreachable';

export function Testing() {
  return (
    <>
      <h1>How do we test this?</h1>
      <p>Depends on the use case and complexity.</p>
      <ul>
        <li>
          Test the entire component (try{' '}
          <a href="https://testing-library.com/docs/react-testing-library/">
            React Testing Library
          </a>
          )
        </li>
        <li>or test the reducer and display components in isolation.</li>
      </ul>
    </>
  );
}

// Send actions and an initial state to the reducer,
// validate the state and effects it returns
function testReducer() {
  const effects = [];
  const mockExec = (effect: InlineEditorEffect) => effects.push(effect);
}

// Test the readonly and edit mode components in isolation,
// validate that "dispatch" was called with the expected action
function testComponentDisplay() {
  const mockDispatch = jest.fn();
}

type InlineEditorState = {
  readonly savedValue: string;
  readonly editorValue: string;
  readonly isEditing: boolean;
  readonly isBusySaving: boolean;
};

type InlineEditorAction =
  | {
      type: 'START_EDITING' | 'CANCEL' | 'START_SAVE' | 'FINISH_SAVE';
    }
  | {
      type: 'EDIT_VALUE';
      value: string;
    };

type InlineEditorEffect =
  | {
      type: 'emitTelemetry';
      message: string;
    }
  | {
      type: 'saveToApi';
      value: string;
    };

async function saveToApi(value: string) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log(`Saved ${value}`);
}

// The reducer can be tested in isolation – just validate that the input and output objects are
// as we expect
const inlineEditorReducer: EffectReducer<
  InlineEditorState,
  InlineEditorAction,
  InlineEditorEffect
> = function inlineEditorReducer(prevState, action, exec): InlineEditorState {
  switch (action.type) {
    case 'START_EDITING':
      exec({ type: 'emitTelemetry', message: 'Starting edit' });
      return {
        savedValue: prevState.savedValue,
        editorValue: prevState.savedValue,
        isEditing: true,
        isBusySaving: false,
      };
    case 'EDIT_VALUE':
      return {
        ...prevState,
        editorValue: action.value,
      };
    case 'START_SAVE':
      exec({ type: 'saveToApi', value: prevState.editorValue });
      exec({ type: 'emitTelemetry', message: 'Starting save' });
      return {
        ...prevState,
        isBusySaving: true,
      };
    case 'FINISH_SAVE':
      exec({ type: 'emitTelemetry', message: 'Finishing save' });
      return {
        ...prevState,
        savedValue: prevState.editorValue,
        isEditing: false,
        isBusySaving: false,
      };
    case 'CANCEL':
      exec({ type: 'emitTelemetry', message: 'Cancel' });
      return {
        ...prevState,
        isEditing: false,
      };
    default:
      assertUnreachable(action);
      return prevState;
  }
};

const initialInlineEditorState: InlineEditorState = {
  savedValue: 'Edit me!',
  editorValue: 'I get overwritten when edit mode starts so I can be anything',
  isEditing: false,
  isBusySaving: false,
};

function InlineEditor() {
  const [state, dispatch] = useEffectReducer(
    inlineEditorReducer,
    initialInlineEditorState,
    {
      emitTelemetry: (state, effect) => {
        console.log(effect.message);
      },
      saveToApi: (state, effect, dispatch) =>
        void saveToApi(effect.value).then(() =>
          dispatch({ type: 'FINISH_SAVE' })
        ),
    }
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
        <button onClick={() => props.dispatch({ type: 'START_EDITING' })}>
          Edit
        </button>
      </div>
    </>
  );
}

// Each of these components could be tested in isolation if we want.
// The single `dispatch` cuts down on the number of props.
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
            props.dispatch({ type: 'START_SAVE' });
          }}
        >
          Save
        </button>
      </div>
    </>
  );
}
