import React from 'react';
import { VerticalSpacer } from '../../talkUtils/FormatAndLayoutComponents';
import { renderSlide } from '../../talkUtils/renderSlide';

export function Slide_FiniteStateMachines() {
  return (
    <>
      <h1>Finite State Machines</h1>
      <p>
        Paraphrased from{' '}
        <a href="https://en.wikipedia.org/wiki/Finite-state_machine">
          Wikipedia
        </a>
        :
      </p>
      <ul>
        <li>
          An abstract machine that can be in exactly one of a finite number of{' '}
          <strong>states</strong> at any given time.
        </li>
        <li>
          The FSM <strong>transitions</strong> from one state to another in
          response to some inputs (<strong>actions</strong>).
        </li>
      </ul>
      <VerticalSpacer />
      <h2>What does that mean for us?</h2>
      <p>
        We can avoid those unexpected transitions by modeling our logic as a
        state machine!
      </p>
    </>
  );
}
renderSlide(Slide_FiniteStateMachines);
