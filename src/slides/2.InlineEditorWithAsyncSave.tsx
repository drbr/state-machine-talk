import { useState } from 'react';
import { Mono } from '../talkUtils/FormatAndLayoutComponents';

export function InlineEditorWithAsyncSave() {
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
      <p>Add async "save" callback to the editor</p>
      <ul>
        <li>In a real app, this might call an API</li>
        <li>
          Saving takes some time, so the UI should show a "busy" state until the
          promise resolves
        </li>
        <li>
          Add an async <Mono>doSave</Mono> function and{' '}
          <Mono>isBusySaving</Mono> state variable, and disable the inputs if
          busy
        </li>
      </ul>
    </div>
  );
}

function InlineEditor() {
  const [savedValue, setSavedValue] = useState('Edit me!');
  const [editorValue, setEditorValue] = useState(savedValue);
  const [isEditing, setIsEditing] = useState(false);

  // New boolean for the "busy" state
  const [isBusySaving, setIsBusySaving] = useState(false);

  async function doSave(value: string) {
    setIsBusySaving(true);
    // Pretend to call an API
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(`Saved ${value}`);
    setSavedValue(value);
    setIsEditing(false);
    setIsBusySaving(false);
  }

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
        disabled={isBusySaving}
        onChange={(event) => {
          setEditorValue(event.target.value);
        }}
      />
      <div>
        <button
          type="reset"
          disabled={isBusySaving}
          onClick={(event) => {
            event.preventDefault();
            setIsEditing(false);
          }}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isBusySaving}
          onClick={(event) => {
            event.preventDefault();
            // Call the `doSave` routine instead of directly setting savedValue
            doSave(editorValue);
          }}
        >
          {isBusySaving ? 'Saving…' : 'Save'}
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
