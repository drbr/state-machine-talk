import React from 'react';
import { VerticalSpacer, Mono } from '../talkUtils/FormattedText';

export function ThisIsGettingOutOfHand() {
  return (
    <>
      <h1>Is this code good?</h1>
      <p>
        It's not terrible at the current complexity, but it'll be harder to
        follow as we add more functionality. 🍝
      </p>
      <ul>
        <li>
          State updates' "business logic" is scattered throughout the component
        </li>
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
