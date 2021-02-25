import React from 'react';
import ReadonlyModeImg from '../../images/inlineEditorReadonlyMode.png';
import EditModeImg from '../../images/inlineEditorEditMode.png';
import { Mono } from '../../talkUtils/FormatAndLayoutComponents';

/**
 * With TypeScript, we can list the names as a string union.
 * If any of the actions have extra data, use a discriminated union
 */
type InlineEditorAction =
  | {
      type: 'START_EDITING' | 'CANCEL' | 'SAVE';
    }
  | {
      type: 'EDIT_VALUE';
      value: string;
    };

const MyAction: InlineEditorAction = {
  type: 'EDIT_VALUE',
  value: 'This is the text I typed into the input field',
};

export function Slide_DefineTheActions() {
  return (
    <>
      <h1>Define the Actions</h1>
      <p>
        What are the possible things that can happen to the Inline Editor from
        the outside (in this case, what can the user do)?
      </p>
      <div className="right-image-container">
        <img src={ReadonlyModeImg} alt="Inline Editor in readonly mode" />
        <img src={EditModeImg} alt="Inline Editor in edit mode" />
      </div>
      <ol>
        <li>Start editing</li>
        <li>Change the value in the text box</li>
        <li>Cancel</li>
        <li>
          Save <em>(let's consider only the non-async save for now)</em>
        </li>
      </ol>
      <h2>Declare the actions in code</h2>
      <p>
        <ul>
          <li>Represent actions as plain JS objects</li>
          <li>
            Each action has a name, which, by convention, goes in the{' '}
            <Mono>type</Mono> property
          </li>
          <li>
            {' '}
            The action object <em>has no behavior</em>, it only describes what
            happened.
          </li>
        </ul>
      </p>
    </>
  );
}
