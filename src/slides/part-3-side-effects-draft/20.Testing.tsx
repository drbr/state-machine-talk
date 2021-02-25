import { renderHook } from '@testing-library/react-hooks/dom';
import { EffectReducer, useEffectReducer } from 'use-effect-reducer';
import { assertUnreachable } from '../../codeUtils/assertUnreachable';
import {
  Mono,
  MonoBlock,
  VerticalSpacer,
} from '../../talkUtils/FormatAndLayoutComponents';
import { testExpect } from '../../codeUtils/testAssert';
import { testSpy } from '../../codeUtils/testSpy';

export function Slide_Testing() {
  return (
    <>
      <h1>How do we test this?</h1>
      <p>Depends on the use case and complexity.</p>
      <ul>
        <li>
          We could test the entire component as a user would (using{' '}
          <a href="https://testing-library.com/docs/react-testing-library/">
            React Testing Library
          </a>{' '}
          or <a href="https://enzymejs.github.io/enzyme/">Enzyme</a>),
        </li>
        <li>or test the reducer and display components in isolation.</li>
      </ul>
      <p>
        For a reducer without effects, simply pass in arguments and check the
        result:
      </p>
      <MonoBlock>
        const result = myReducer(prevState, action);
        <br />
        expect(result).to.equal(expected);
      </MonoBlock>
      <VerticalSpacer />
      <p>
        <Mono>useEffectReducer</Mono> does break the "no libraries" purity, but
        the coupling is minimal. We can test the effect reducer using{' '}
        <a href="https://react-hooks-testing-library.com/">
          React Hooks Testing Library
        </a>
        .
      </p>
      <p>
        <button onClick={() => reducerTest_startEditMode()}>
          Run test case: Start Edit Mode
        </button>
      </p>
      <p>
        <button onClick={() => reducerTest_startSave()}>
          Run test case: Start Save
        </button>
      </p>
    </>
  );
}

async function reducerTest_startEditMode() {
  console.log('Starting reducer test');

  const initialState_readonlyMode: InlineEditorState = {
    isBusySaving: false,
    isEditing: false,
    editorValue: 'Nothing to see here',
    savedValue: 'the original value',
  };

  const expectedResultState_editMode: InlineEditorState = {
    isBusySaving: false,
    isEditing: true,
    editorValue: 'the original value',
    savedValue: 'the original value',
  };

  const telemetrySpy = testSpy('emitTelemetry');
  const saveToApiSpy = testSpy('saveToApi');

  const { result, waitForNextUpdate } = renderHook(() =>
    useEffectReducer(inlineEditorReducer, initialState_readonlyMode, {
      emitTelemetry: (state, effect) => telemetrySpy(effect),
      saveToApi: (state, effect) => saveToApiSpy(effect),
    })
  );

  const dispatch = result.current[1];
  dispatch({ type: 'START_EDITING' });
  await waitForNextUpdate();

  const resultState = result.current[0];
  testExpect(resultState).toEqual(expectedResultState_editMode);

  testExpect(telemetrySpy.callCount).toEqual(
    1,
    'Expected telemetry to have been called once'
  );
  testExpect(saveToApiSpy.callCount).toEqual(
    0,
    'Expected save to have been called zero times'
  );

  console.log('%cTest passed!', 'color: green');
}

async function reducerTest_startSave() {
  console.log('Starting reducer test');

  const initialState_editMode: InlineEditorState = {
    isBusySaving: false,
    isEditing: true,
    editorValue: 'Save me',
    savedValue: 'the original value',
  };

  const expectedResultState_busySaving: InlineEditorState = {
    ...initialState_editMode,
    isBusySaving: true,
  };

  const telemetrySpy = testSpy('emitTelemetry');
  const saveToApiSpy = testSpy('saveToApi');

  const { result, waitForNextUpdate } = renderHook(() =>
    useEffectReducer(inlineEditorReducer, initialState_editMode, {
      emitTelemetry: (state, effect) => telemetrySpy(effect),
      saveToApi: (state, effect) => saveToApiSpy(effect),
    })
  );

  const dispatch = result.current[1];
  dispatch({ type: 'START_SAVE' });
  await waitForNextUpdate();

  const resultState = result.current[0];
  testExpect(resultState).toEqual(expectedResultState_busySaving);

  testExpect(telemetrySpy.callCount).toEqual(
    1,
    'Expected telemetry to have been called once'
  );
  testExpect(saveToApiSpy.callCount).toEqual(
    1,
    'Expected save to have been called once'
  );

  console.log('%cTest passed!', 'color: green');
}

//
// The effect reducer is defined below, same as in the previous slide
//

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
