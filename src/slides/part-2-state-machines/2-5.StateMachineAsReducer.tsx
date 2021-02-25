import { assertUnreachable } from '../../codeUtils/assertUnreachable';
import { renderSlide } from '../../talkUtils/renderSlide';
/* eslint-disable @typescript-eslint/no-unused-vars */

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

function inlineEditorStateMachine_NestedSwitch(
  prevState: InlineEditorState,
  action: InlineEditorAction
): InlineEditorState {
  // Now, there are two levels of switch statement:
  // - Outer switch for the state
  // - Inner switch for the action. Note that we no longer
  //   need to respond to every action in each state, so
  //   the default case is reachable.
  switch (prevState.name) {
    case 'readonlyMode':
      switch (action.type) {
        case 'START_EDITING':
          return {
            name: 'editMode',
            savedValue: prevState.savedValue,
            editorValue: prevState.savedValue,
          };
        default:
          return prevState;
      }
    case 'editMode':
      switch (action.type) {
        case 'EDIT_VALUE':
          return {
            ...prevState,
            editorValue: action.value,
          };
        case 'SAVE':
          return {
            name: 'readonlyMode',
            savedValue: prevState.editorValue,
          };
        case 'CANCEL':
          return {
            name: 'readonlyMode',
            savedValue: prevState.savedValue,
          };
        default:
          return prevState;
      }
    default:
      assertUnreachable(prevState);
      return prevState;
  }
}

/**
 * Type definition for a state machine, which enforces that the keys
 * match the state names and actions. All states must be present, but
 * a state need not respond to all actions.
 */
type StateMachineObject<
  S extends { name: string },
  A extends { type: string }
> = {
  [StateName in S['name']]: {
    [ActionType in A['type']]?: (
      prevState: { name: StateName } & S,
      action: { type: ActionType } & A
    ) => S;
  };
};

/** State machine represented as an object */
const inlineEditorStateMachine_Object: StateMachineObject<
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

export function Slide_StateMachineAsReducer() {
  return (
    <>
      <h1>State Machine as Reducer</h1>
      <p>
        With an extra set of guards, the reducer formula can also model a state
        machine.
      </p>
      <p>Two common patterns:</p>
      <ul>
        <li>Nested switch statements</li>
        <ul>
          <li>More familiar imperative style</li>
        </ul>
        <li>Lookup table / Object</li>
        <ul>
          <li>
            More compact, machine definition is data instead of a function
          </li>
          <li>Easier to run analysis or visulization tools on such machines</li>
        </ul>
      </ul>
    </>
  );
}
renderSlide(Slide_StateMachineAsReducer);
