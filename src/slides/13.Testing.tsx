import React, { Dispatch } from 'react';
import {
  EffectReducer,
  EffectReducerExec,
  useEffectReducer,
} from 'use-effect-reducer';
import { assertUnreachable } from '../codeUtils/assertUnreachable';
import {
  Mono,
  MonoBlock,
  VerticalSpacer,
} from '../talkUtils/FormatAndLayoutComponents';

export function Testing() {
  return (
    <>
      <h1>How do we test this?</h1>
      <p>Depends on the use case and complexity.</p>
      <ul>
        <li>
          Test the entire component as a user would (using{' '}
          <a href="https://testing-library.com/docs/react-testing-library/">
            React Testing Library
          </a>{' '}
          or <a href="https://enzymejs.github.io/enzyme/">Enzyme</a>),
        </li>
        <li>or test the reducer and display components in isolation.</li>
      </ul>
      <VerticalSpacer />
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
        the coupling is minimal. We can test our effect reducer in context using{' '}
        <a href="https://react-hooks-testing-library.com/">
          React Hooks Testing Library
        </a>
        .
      </p>
    </>
  );
}

// Send actions and an initial state to the reducer,
// validate the state and effects it returns
function reducerTest() {
  const effects = [];
  const mockExec = (((effect: InlineEditorEffect) =>
    effects.push(effect)) as unknown) as EffectReducerExec<
    InlineEditorState,
    InlineEditorAction,
    InlineEditorEffect
  >;

  const prevState: InlineEditorState = {
    isBusySaving: false,
    isEditing: true,
    editorValue: 'Save me',
    savedValue: 'the original value',
  };

  const nextState = inlineEditorReducer(
    prevState,
    { type: 'START_SAVE' },
    mockExec
  );
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
