import React from 'react';
import { Mono } from '../../talkUtils/FormatAndLayoutComponents';
import { renderSlide } from '../../talkUtils/renderSlide';

export function Slide_Part1Conclusion() {
  return (
    <>
      <h1>Part 1 Conclusion</h1>
      <h2>Reducers are not just for Redux!</h2>
      <p>
        You can use this pattern <em>anywhere</em> : a single component, or a
        parent of several components, or even in a stateful service.
      </p>
      <p>
        Using reducers and <Mono>dispatch</Mono>ing actions has several
        advantages:
      </p>
      <ul>
        <li>Decouples state logic from display code</li>
        <li>All state logic is encapsulated in one easily-testable function</li>
        <li>
          Named actions help us understand what each UI element callback
          actually does
        </li>
        <li>
          Child components don't need to be concerned with the details of the
          parent's state; helps cut down on "callback prop sprawl" (send a
          single <Mono>dispatch</Mono> to children, instead of several state
          updaters)
        </li>
      </ul>
    </>
  );
}
renderSlide(Slide_Part1Conclusion);
