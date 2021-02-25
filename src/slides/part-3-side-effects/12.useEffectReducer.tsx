import { Dispatch } from 'react';
import { EffectReducer, useEffectReducer } from 'use-effect-reducer';
import { assertUnreachable } from '../../codeUtils/assertUnreachable';
import {
  Mono,
  MonoBlock,
  VerticalSpacer,
} from '../../talkUtils/FormatAndLayoutComponents';

type InlineEditorState = {
  readonly savedValue: string;
  readonly editorValue: string;
  readonly isEditing: boolean;
  // Reïntroduce boolean to represent the busy state
  readonly isBusySaving: boolean;
};

// Because we're dispatching actions from the async effect,
// the SAVE action now becomes two actions: START_SAVE and FINISH_SAVE
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
      type: 'saveViaApi';
      value: string;
    };

// In the original implementation of `doSave` (without the reducer), we set `isBusySaving` to true
// after awaiting the async result. But now the reducer handles all the state management, and
// this async function is very lightweight, dealing only with the "API call".
async function saveViaApi(value: string) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log(`Saved "${value}"`);
}

// In TypeScript, we give the effect reducer all three shapes: state, action, effect
const inlineEditorReducer: EffectReducer<
  InlineEditorState,
  InlineEditorAction,
  InlineEditorEffect
> = function inlineEditorReducer(prevState, action, exec): InlineEditorState {
  switch (action.type) {
    case 'START_EDITING':
      // The effect reducer hook provides an `exec` function, which, despite its name, merely adds
      // the effect to the list of effects to execute on this transition.
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
      // Originally, the Save button invoked the `doSave` async function, which did a combination of
      // state updates and the actual API call. Now, the button dispatches the START_SAVE action,
      // which makes its way to here. We simultaneously update state and execute the `saveViaApi`
      // side effect, which will dispatch a single FINISH_SAVE action when it completes.
      //
      // This may seem needlessly indirect, but it keeps more of the transition/effect logic in the
      // reducer where it's easier to control and test.
      exec({ type: 'saveViaApi', value: prevState.editorValue });
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

function InlineEditorWidget() {
  // Set up the reducer as before, but also define the actual behaviors for each of the possible
  // side effects
  const [state, dispatch] = useEffectReducer(
    inlineEditorReducer,
    initialInlineEditorState,
    {
      emitTelemetry: (state, effect) => {
        console.log(effect.message);
      },
      saveViaApi: (state, effect, dispatch) =>
        void saveViaApi(effect.value).then(() =>
          dispatch({ type: 'FINISH_SAVE' })
        ),
    }
  );

  // The rest of this file is the same as it was with useReducer,
  // except that we're now disabling the inputs when `isBusySaving` is true

  return (
    <form className="inline-editor-box">
      {state.isEditing ? (
        <InlineEditorEditMode
          editorValue={state.editorValue}
          isBusySaving={state.isBusySaving}
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

function InlineEditorEditMode(props: {
  editorValue: string;
  isBusySaving: boolean;
  dispatch: Dispatch<InlineEditorAction>;
}) {
  return (
    <>
      <input
        value={props.editorValue}
        disabled={props.isBusySaving}
        onChange={(event) =>
          props.dispatch({ type: 'EDIT_VALUE', value: event.target.value })
        }
      />
      <div>
        <button
          type="reset"
          disabled={props.isBusySaving}
          onClick={(event) => {
            event.preventDefault();
            props.dispatch({ type: 'CANCEL' });
          }}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={props.isBusySaving}
          onClick={(event) => {
            event.preventDefault();
            props.dispatch({ type: 'START_SAVE' });
          }}
        >
          {props.isBusySaving ? 'Saving…' : 'Save'}
        </button>
      </div>
    </>
  );
}

export function Slide_UseEffectReducer() {
  return (
    <>
      <h1>useEffectReducer</h1>
      <p>
        With a reducer that returns side effects, the runtime framework needs to
        execute those effects. React does not have this built-in.
      </p>
      <p>
        We could build a framework to take effect descriptors from the reducer
        and execute them with <Mono>useEffect</Mono>, but managing long-running
        effects correctly is tricky, so (in React) we can use the 3rd-party{' '}
        <a href="https://github.com/davidkpiano/useEffectReducer">
          <Mono>useEffectReducer</Mono>
        </a>{' '}
        hook instead.
      </p>
      <MonoBlock>{effectReducerExampleCode}</MonoBlock>
      <ul>
        <li>
          <strong>EffectMap:</strong> A mapping of effect descriptors to
          functions that perform the effects. Splitting the descriptor from the
          implementation keeps the reducer pure (and easily-testable).
        </li>
      </ul>
      <VerticalSpacer />
      <p>The widget with async save, implemented with an effect reducer:</p>
      <InlineEditorWidget />
    </>
  );
}

const effectReducerExampleCode = `const [state, dispatch] =
  useEffectReducer(
    reducer, initialState, effectMap
  );
`;
