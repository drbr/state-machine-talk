import React from 'react';
import {
  Centered,
  Mono,
  VerticalSpacer,
} from '../talkUtils/FormatAndLayoutComponents';

export function Slide_Introduction() {
  return (
    <>
      <Centered>
        <h1>Reducers and State Machines in Local UI</h1>
        <h2>Andrew Brandon</h2>
        <VerticalSpacer />
        <p>Patterns to build and organize logic for stateful components</p>
      </Centered>
      <VerticalSpacer />
      <p>Today's talk is in two parts:</p>
      <ol>
        <li>Reducers and Actions</li>
        <li>State Machines</li>
      </ol>
      <p>Future:</p>
      <ul>
        <li>Side Effects and async state management</li>
      </ul>
      <p>
        Yes, the slides have a lot of words. This is an a11y feature. Watch or
        listen; your choice!
      </p>
      <p>
        <em>If viewing on CodeSandbox:</em> Select "Current Module View" (in the
        toolbar above the web view), then open each slide individually from the{' '}
        <Mono>slides</Mono> folder.
      </p>
    </>
  );
}
