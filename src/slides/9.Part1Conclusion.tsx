import React from 'react';
import { Mono } from '../talkUtils/FormatAndLayoutComponents';

export function Part1Conclusion() {
  return (
    <>
      <h1>Part 1 Conclusion</h1>
      <h2>Reducers are not just for Redux!</h2>
      <p>
        You can use this pattern <em>anywhere</em> : a single component, or a
        parent of several components, or even in a service.
      </p>
      <p>
        Using reducers and <Mono>dispatch</Mono>ing actions has several
        advantages:
      </p>
      <ul>
        <li>Helps us understand what each UI element callback actually does</li>
        <li>Decouples state logic from display code</li>
        <li>State logic is encapsulated in one easily-testable function</li>
        <li>
          Child components don't need to be concerned with the details of the
          parent's state
        </li>
        <li>
          Helps cut down on "callback prop sprawl" (send a single{' '}
          <Mono>dispatch</Mono> to children, instead of several state updaters)
        </li>
      </ul>
    </>
  );
}
