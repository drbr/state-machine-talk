import React from 'react';
import {
  EmojiListItem,
  EmptyParagraph,
  Mono,
} from '../talkUtils/FormattedText';

export function TheReducerPattern() {
  return (
    <>
      <h1>The Reducer Pattern</h1>
      <p>A reducer is a pure function that implements a simple formula:</p>
      <p>
        <Mono>{'(previousState, action) => nextState'}</Mono>
      </p>
      <ul>
        <li>
          A reducer itself <em>doesn't manipulate any state</em>, it just tells
          what the next state would be for any given inputs.
        </li>
        <li>
          Since it's just a function that deals with plain JS objects, it can be
          used with any UI framework!
        </li>
        <li>
          It should return a <em>new copy</em> of the state, rather than
          mutating <Mono>previousState</Mono> directly
        </li>
      </ul>
      <EmptyParagraph />
      <ul>
        <EmojiListItem.Person>
          "O, wise reducer, hypothetically… if the current state were 2, what
          would the next state be after an 'add 1' action?"
        </EmojiListItem.Person>
        <EmojiListItem.Owl>
          "I don't know who you are or why you're asking … but the next state
          would be 3."
        </EmojiListItem.Owl>
      </ul>
    </>
  );
}
