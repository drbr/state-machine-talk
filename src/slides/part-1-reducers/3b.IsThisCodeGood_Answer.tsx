import React from 'react';
import {
  Mono,
  VerticalSpacer,
} from '../../talkUtils/FormatAndLayoutComponents';
export function Slide_IsThisCodeGood_Answer() {
  return (
    <>
      <h1>Is this code good?</h1>
      <p>
        It's not terrible at the current complexity, but it'll be harder to
        follow as we add more functionality. 🍝
      </p>
      <ul>
        <li>
          State updates' "business logic" is scattered throughout the component;
          hard to quickly understand what each handler does
        </li>
        <li>State management logic is tightly coupled with UI code</li>
        <li>
          If we're not careful, we could end up in an invalid combination (e.g.{' '}
          <Mono>!isEditing && isBusySaving</Mono>, or using{' '}
          <Mono>editorValue</Mono> in readonly mode)
        </li>
      </ul>
      <VerticalSpacer />
      <p>
        <strong>Rule of thumb:</strong> If multiple pieces of state depend on
        each other, or if multiple values get updated at the same time, manage
        that state as one.
      </p>
      <ul>
        <li>How can we do this?</li>
      </ul>
    </>
  );
}
