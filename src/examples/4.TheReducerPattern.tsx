import React from 'react';
import { Mono } from '../talkUtils/FormattedText';

export function TheReducerPattern() {
  return (
    <>
      <h1>The Reducer Pattern</h1>
      <p>A reducer is a pure function that implements a simple formula:</p>
      <p>
        <Mono>{'(previousState, action) => nextState'}</Mono>
      </p>
      <ul>
        <li>Made popular by Redux and the Elm Architecture</li>
        <li>
          A reducer is just a function that deals with plain JS objects, so it
          can be used with any UI library!
        </li>
        <li>
          It should return a <em>new copy</em> of the state, rather than
          mutating <Mono>previousState</Mono> directly
        </li>
      </ul>
      <p>What does a reducer look like in code?</p>
    </>
  );
}
