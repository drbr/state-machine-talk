import { assertUnreachable } from '../../codeUtils/assertUnreachable';
import { VerticalSpacer } from '../../talkUtils/FormatAndLayoutComponents';
import { renderSlide } from '../../talkUtils/renderSlide';
/* eslint-disable @typescript-eslint/no-unused-vars */

// These are the same state variables as in the original
// component
type InlineEditorState = {
  readonly savedValue: string;
  readonly editorValue: string;
  readonly isEditing: boolean;
};

// The actions we defined in the previous slide
type InlineEditorAction =
  | {
      type: 'START_EDITING' | 'CANCEL' | 'SAVE';
    }
  | {
      type: 'EDIT_VALUE';
      value: string;
    };

// The reducer has the same state transitions that we
// originally had in each of the input handlers on the
// original component, but now they're all together
function inlineEditorReducer(
  prevState: InlineEditorState,
  action: InlineEditorAction
): InlineEditorState {
  switch (action.type) {
    case 'START_EDITING':
      // We can list each property in the next state
      // explicitly,
      return {
        savedValue: prevState.savedValue,
        editorValue: prevState.savedValue,
        isEditing: true,
      };
    case 'EDIT_VALUE':
      // …or we can use the spread operator and list only
      // the properties that change.
      return {
        ...prevState,
        // In this case of the switch, TypeScript knows that this action has a `value` property
        editorValue: action.value,
      };
    case 'CANCEL':
      return {
        ...prevState,
        isEditing: false,
      };
    case 'SAVE':
      return {
        ...prevState,
        savedValue: prevState.editorValue,
        isEditing: false,
      };
    default:
      assertUnreachable(action);
      return prevState;
  }
}

export function Slide_ReducerInCode_SwitchStatement() {
  return (
    <>
      <h1>How do we code a reducer?</h1>
      <p>
        Implement a reducer however you want, but a common
        way is to use a switch statement.
      </p>
      <p>
        Let's look at the code. Note how the action names
        give context and meaning to the state changes.
      </p>
      <VerticalSpacer />
      <p>Using a reducer has a few benefits:</p>
      <ol>
        <li>Defines all the state updates in one place</li>
        <li>Decouples state code from display code.</li>
        <li>
          Increases clarity about what happens in response
          to each user action (because actions have names)
        </li>
      </ol>
    </>
  );
}
renderSlide(Slide_ReducerInCode_SwitchStatement);
