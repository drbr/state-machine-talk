import { useState } from 'react';

function InlineEditorWidget() {
  // Keep track of the state in readonly and edit modes
  const [savedValue, setSavedValue] = useState('Edit me!');
  const [editorValue, setEditorValue] = useState(savedValue);
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
        onChange={(event) => {
          setEditorValue(event.target.value);
        }}
      />
      <div>
        <button
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            setIsEditing(false);
          }}
        >
          Cancel
        </button>
        <button
          type="submit"
          onClick={(event) => {
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

export function Slide_IsThisCodeGood_Question() {
  return (
    <>
      <h1>Is this code good?</h1>
      <InlineEditorWidget />
    </>
  );
}
