import React from 'react';
import { VerticalSpacer } from '../talkUtils/FormatAndLayoutComponents';

export function IsTheCodeGoodNow_ProblemsWithState() {
  return (
    <>
      <h1>Is the code good now?</h1>
      <p>Actions and side effects are in good shape, but…</p>
      <h2>There are some problems with state.</h2>
      <ul>
        <li>Not all the pieces are valid all the time</li>
        <li>
          Any action can take effect at any time, but that doesn't actually make
          sense
        </li>
      </ul>
      <VerticalSpacer />
      <p>
        I've been talking about <em>modes</em>…
      </p>
    </>
  );
}
