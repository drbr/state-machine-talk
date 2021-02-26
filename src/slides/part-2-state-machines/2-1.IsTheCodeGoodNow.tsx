import { Dispatch, useReducer } from 'react';
import { assertUnreachable } from '../../codeUtils/assertUnreachable';
import {
  Mono,
  VerticalSpacer,
} from '../../talkUtils/FormatAndLayoutComponents';
import { renderSlide } from '../../talkUtils/renderSlide';
import {
  ToggleAnswerButton,
  useAnswerVisibility,
} from '../../talkUtils/useAnswerVisibility';

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

function InlineEditorWidget(props: {
  showDispatcherButtons: boolean;
}) {
  const [state, dispatch] = useReducer(
    inlineEditorReducer,
    initialInlineEditorState
  );

  return (
    <>
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
      {props.showDispatcherButtons && (
        <DispatcherButtons dispatch={dispatch} />
      )}
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

function DispatcherButtons(props: {
  dispatch: Dispatch<InlineEditorAction>;
}) {
  return (
    <>
      <button
        style={{ marginTop: 10, marginRight: 10 }}
        onClick={() =>
          props.dispatch({ type: 'START_EDITING' })
        }
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

export function Slide_IsTheCodeGoodNow() {
  const [
    answerVisible,
    toggleAnswer,
  ] = useAnswerVisibility();
  return (
    <>
      <h1>Is the code good now?</h1>
      <InlineEditorWidget
        showDispatcherButtons={answerVisible}
      />
      <VerticalSpacer />
      <ToggleAnswerButton
        answerVisible={answerVisible}
        toggleAnswer={toggleAnswer}
      />
      {answerVisible && (
        <>
          <ul>
            <li>
              What happens if we're currently editing the
              value and the <Mono>START_EDITING</Mono>{' '}
              action gets dispatched again?
              {/*
            1. Start edit mode
            2. Type "I will never be overwritten!!"
            3. Dispatch START_EDITING
          */}
            </li>
            <li>
              Or if we're in readonly mode and{' '}
              <Mono>SAVE</Mono> gets dispatched?
              {/*
            1. Start edit mode
            2. Type "What happens in edit mode stays in edit mode"
            3. Cancel
            4. Dispatch SAVE
          */}
            </li>
          </ul>
          <VerticalSpacer />
          <p>
            If the component receives certain actions at
            unexpected times, we get unexpected behavior.
            How can we make this safer?
          </p>
        </>
      )}
    </>
  );
}
renderSlide(Slide_IsTheCodeGoodNow);
