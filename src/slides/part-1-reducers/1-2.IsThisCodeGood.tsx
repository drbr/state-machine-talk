import React from 'react';
import { useState } from 'react';
import {
  Mono,
  VerticalSpacer,
} from '../../talkUtils/FormatAndLayoutComponents';
import { renderSlide } from '../../talkUtils/renderSlide';
import {
  ToggleAnswerButton,
  useAnswerVisibility,
} from '../../talkUtils/useAnswerVisibility';

function InlineEditorWidget() {
  // Keep track of the state in readonly and edit modes
  const [savedValue, setSavedValue] = useState('Edit me!');
  const [editorValue, setEditorValue] = useState(
    savedValue
  );
  const [isEditing, setIsEditing] = useState(false);

  const readonlyView = (
    <>
      <span>{savedValue}</span>
      <div>
        <button
          onClick={() => {
            setEditorValue(savedValue);
            setIsEditing(true);
          }}
        >
          Edit
        </button>
      </div>
    </>
  );

  const editingView = (
    <>
      <input
        value={editorValue}
        onChange={event => {
          setEditorValue(event.target.value);
        }}
      />
      <div>
        <button
          type="reset"
          onClick={event => {
            event.preventDefault();
            setIsEditing(false);
          }}
        >
          Cancel
        </button>
        <button
          type="submit"
          onClick={event => {
            event.preventDefault();
            setSavedValue(editorValue);
            setIsEditing(false);
          }}
        >
          Save
        </button>
      </div>
    </>
  );

  return (
    <form className="inline-editor-box">
      {isEditing ? editingView : readonlyView}
    </form>
  );
}

export function Slide_IsThisCodeGood() {
  const [
    answerVisible,
    toggleAnswer,
  ] = useAnswerVisibility();
  return (
    <>
      <h1>Is this code good?</h1>
      <h2>
        What do we like about this? What don't we like?
      </h2>
      <InlineEditorWidget />
      <VerticalSpacer />
      <ToggleAnswerButton
        answerVisible={answerVisible}
        toggleAnswer={toggleAnswer}
      />
      {answerVisible && (
        <>
          <p>
            It's not terrible at the current complexity, but
            it'll be harder to follow as we add more
            functionality. 🍝
          </p>
          <ul>
            <li>
              State updates' "business logic" is scattered
              throughout the component; hard to quickly
              understand what each handler does
            </li>
            <li>
              State management logic is tightly coupled with
              UI code
            </li>
            <li>
              If we're not careful, we could end up in an
              invalid combination of states (e.g. trying to
              use <Mono>editorValue</Mono> in readonly mode)
            </li>
          </ul>
          <VerticalSpacer />
          <p>
            <strong>Rule of thumb:</strong> If multiple
            pieces of state depend on each other, or if
            multiple values get updated at the same time,
            manage that state as one.
          </p>
          <ul>
            <li>How can we do this?</li>
          </ul>
        </>
      )}
    </>
  );
}
renderSlide(Slide_IsThisCodeGood);
