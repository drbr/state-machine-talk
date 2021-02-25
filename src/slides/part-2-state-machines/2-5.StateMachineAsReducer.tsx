import { renderSlide } from '../../talkUtils/renderSlide';

export function Slide_StateMachineAsReducer() {
  return (
    <>
      <h1>State Machine as Reducer</h1>
      <p>
        With an extra set of guards, the reducer formula can also model a state
        machine.
      </p>
      <p>Two common patterns:</p>
      <ul>
        <li>Nested switch statements</li>
        <li>Lookup table</li>
      </ul>
    </>
  );
}
renderSlide(Slide_StateMachineAsReducer);
