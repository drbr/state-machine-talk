import React from 'react';
import { Mono } from '../talkUtils/FormattedText';

export function NotJustForRedux() {
  return (
    <>
      <h1>Reducers are not just for Redux!</h1>
      <p>
        You can use this pattern at any level in the React tree: a single
        component, or in a parent component
      </p>
      <p>
        Using reducers and <Mono>dispatch</Mono> has several advantages:
      </p>
      <ul>
        <li>Helps us understand what each UI element callback actually does</li>
        <li>Decouples state logic from display code</li>
        <li>
          All the state logic is encapsulated in one easily-testable function
        </li>
        <li>
          Child components don't need to be aware of the details of the parent's
          state
        </li>
        <li>Helps cut down on "callback prop sprawl"</li>
      </ul>
    </>
  );
}
