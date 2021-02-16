import { Mono } from '../talkUtils/FormattedText';

export function ThisIsGettingOutOfHand() {
  return (
    <>
      <p>
        There's a lot of state to keep track of, and it's starting to resemble
        spaghetti code. 🍝
      </p>
      <ul>
        <li>
          "Business logic" of state updates is scattered throughout the
          component
        </li>
        <li>
          If we're not careful, we could end up in an invalid combination (e.g.{' '}
          <Mono>!isEditing && isBusySaving</Mono>, or not handling{' '}
          <Mono>savedValue</Mono> vs. <Mono>editorValue</Mono> correctly)
        </li>
      </ul>
      <p>
        <strong>Rule of thumb:</strong> If multiple pieces of state depend on
        each other, or if we need to update multiple at the same time, manage
        that state together.
      </p>
      <ul>
        <li>How do we do this?</li>
      </ul>
    </>
  );
}
