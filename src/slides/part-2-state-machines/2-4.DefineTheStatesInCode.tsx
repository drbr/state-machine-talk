import { renderSlide } from '../../talkUtils/renderSlide';
/* eslint-disable @typescript-eslint/no-unused-vars */

// Previously, we had the `isEditing` boolean – that is now encoded into the
// state names. `savedValue` and `editorValue` are exclusive to their respective
// states.
type InlineEditorState =
  | {
      name: 'readonlyMode';
      savedValue: string;
    }
  | {
      name: 'editMode';
      editorValue: string;
    };

export function Slide_DefineTheStatesInCode() {
  return (
    <>
      <h1>Define the States in Code</h1>
      <p>
        Each named state may have additional data associated with it. Like
        actions, we can use JS objects to represent each state and its context.
      </p>
      <p>
        TypeScript lets us be specific about which data are relevant to each
        state.
      </p>
    </>
  );
}
renderSlide(Slide_DefineTheStatesInCode);
