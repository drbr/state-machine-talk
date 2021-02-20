import React from 'react';
import {
  EmojiListItem,
  VerticalSpacer,
  Mono,
} from '../talkUtils/FormatAndLayoutComponents';

export function TheReducerPattern() {
  return (
    <>
      <h1>The Reducer Pattern</h1>
      <p>A reducer is a pure function that implements this formula:</p>
      <p>
        <Mono>{'(previousState, action) => nextState'}</Mono>
      </p>
      <p>What is a "pure function"?</p>
      <ul>
        <li>
          Has no dependencies and <em>doesn't manipulate any state</em>, it just
          provides information.
        </li>
        <li>
          Instead of mutating <Mono>previousState</Mono> directly, returns a new
          object representing <Mono>nextState</Mono>.
        </li>
        <li>
          Since it's just a function that deals with plain JS objects, a reducer
          can be used with any UI framework!
        </li>
      </ul>
      <VerticalSpacer />
      <ul>
        <EmojiListItem.Person>
          "O, wise reducer, hypothetically … if the current state were 2, what
          would the state be after an 'add 1' action?"
        </EmojiListItem.Person>
        <EmojiListItem.Owl>
          "I don't know who you are or why you're asking, but … 3." 🍭
        </EmojiListItem.Owl>
      </ul>
    </>
  );
}
