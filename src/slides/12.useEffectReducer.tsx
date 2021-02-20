import { Dispatch } from 'react';
import { EffectReducer, useEffectReducer } from 'use-effect-reducer';
import { assertUnreachable } from '../codeUtils/assertUnreachable';
import { Mono, MonoBlock } from '../talkUtils/FormatAndLayoutComponents';

const effectReducerExample = `const [state, dispatch] =
  useEffectReducer(
    reducer, initialState, effectMap
  );
`;

export function UseEffectReducerSlide() {
  return (
    <>
      <h1>useEffectReducer</h1>
      <p>
        With the reducer now returning side effects, the runtime framework needs
        to execute those effects.
      </p>
      <p>
        We could build a framework to return effect descriptors in the state and
        execute them with <Mono>useEffect</Mono>, but managing long-running
        effects correctly is tricky, so let's use the 3rd-party{' '}
        <a href="https://github.com/davidkpiano/useEffectReducer">
          <Mono>useEffectReducer</Mono>
        </a>{' '}
        hook instead.
      </p>
      <MonoBlock>{effectReducerExample}</MonoBlock>
      <ul>
        <li>
          <strong>EffectMap:</strong> A mapping of effect descriptors to
          functions that perform the effects
        </li>
      </ul>
      <InlineEditor />
    </>
  );
}

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
      type: 'saveToApi';
      value: string;
    };

async function saveToApi(dispatch: Dispatch<InlineEditorAction>) {
  // In the original implementation of `doSave` (without the reducer), we set `isBusySaving` to true
  // from inside the async function. But now the state management is handled by the reducer, and
  // this async function is very lightweight, dealing only with the "API call".
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // After the API returns, dispatch the FINISH_SAVE action to set the component state accordingly.
  // In a real-world scenario, we'd want more cancellation and error handling here.
  dispatch({ type: 'FINISH_SAVE' });
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
      // the effect to the list of effects to execute on this transition. So, given a simple
      // implementation of `exec` (e.g. array.push), this reducer is still an easily-testable pure
      // function.
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
      // which makes its way to here. We simultaneously update state and execute the `saveToApi`
      // side effect, which will dispatch a single FINISH_SAVE action when it completes.
      //
      // This may seem needlessly indirect, but it keeps more of the transition/effect logic in the
      // reducer where it's easier to control and test.
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
  // Send the initial state to the reducer
  const [state, dispatch] = useEffectReducer(
    inlineEditorReducer,
    initialInlineEditorState,
    {
      emitTelemetry: (state, effect) => {
        console.log(effect.message);
      },
      saveToApi: (state, effect, dispatch) => void saveToApi(dispatch),
    }
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
            dispatch({ type: 'START_SAVE' });
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
