import React from 'react';
import { assertUnreachable } from '../codeUtils/assertUnreachable';
import { renderSlide } from '../talkUtils/renderSlide';

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

/**
 * Example of the Inline Editor widget as a class component,
 * using our own `dispatch` method to set state using the
 * reducer.
 *
 * This is equivalent to the component built in part 1 of
 * the presentation. If we wanted to use an "object" state
 * machine as shown in part 2, we could easily change the
 * dispatch function to do that.
 */
export class InlineEditorClassComponent extends React.Component<
  unknown,
  InlineEditorState
> {
  constructor(props: unknown) {
    super(props);
    this.state = initialInlineEditorState;
  }

  /**
   * Dispatch an action to this component's reducer. The
   * value returned from the reducer will be assigned to the
   * component state.
   */
  private dispatch = (action: InlineEditorAction) => {
    this.setState(prevState =>
      inlineEditorReducer(prevState, action)
    );
  };

  render() {
    return (
      <form className="inline-editor-box">
        {this.state.isEditing
          ? this.renderEditMode()
          : this.renderReadonlyMode()}
      </form>
    );
  }

  private renderEditMode() {
    return (
      <>
        <input
          value={this.state.editorValue}
          onChange={event =>
            this.dispatch({
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
              this.dispatch({ type: 'CANCEL' });
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={event => {
              event.preventDefault();
              this.dispatch({ type: 'SAVE' });
            }}
          >
            Save
          </button>
        </div>
      </>
    );
  }

  private renderReadonlyMode() {
    return (
      <>
        <span>{this.state.savedValue}</span>
        <div>
          <button
            onClick={() =>
              this.dispatch({ type: 'START_EDITING' })
            }
          >
            Edit
          </button>
        </div>
      </>
    );
  }
}

renderSlide(InlineEditorClassComponent);
