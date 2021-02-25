import React from 'react';
import { Mono, VerticalSpacer } from '../talkUtils/FormatAndLayoutComponents';

export function Slide_IsTheCodeGoodNow_ProblemsWithState() {
  return (
    <>
      <h1>Is the code good now?</h1>
      <p>
        Actions and side effects are in good shape, but we still have a problem
        with state.
      </p>
      <ul>
        <li>
          What happens if we're viewing the readonly display and we get a{' '}
          <Mono>START_SAVE</Mono> action?
        </li>
      </ul>
      <VerticalSpacer />
      <p>
        We've been talking about <em>readonly mode</em> and <em>edit mode</em>…
        can we structure the code to reflect these concepts?
      </p>
    </>
  );
}
