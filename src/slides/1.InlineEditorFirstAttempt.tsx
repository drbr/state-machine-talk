import { useState } from 'react';

export function InlineEditorFirstAttempt() {
  return (
    <>
      <Description />
      <InlineEditor />
    </>
  );
}

function Description() {
  return (
    <div>
      <h1>Inline editor component</h1>
      <ul>
        <li>Readonly and Edit Modes</li>
        <li>Click "Edit" to switch into edit mode</li>
        <li>"Save" exits edit mode and persists the value</li>
        <li>"Cancel" exits edit mode and discards the value</li>
      </ul>
    </div>
  );
}

function InlineEditor() {
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
