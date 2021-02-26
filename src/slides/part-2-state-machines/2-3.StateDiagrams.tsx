import StateDiagram from '../../images/inlineEditorStateDiagram.png';
import { Centered } from '../../talkUtils/FormatAndLayoutComponents';
import { renderSlide } from '../../talkUtils/renderSlide';

export function Slide_StateDiagrams() {
  return (
    <>
      <h1>State Diagrams</h1>
      <p>
        Draw it out! ✏️ Building a diagram by hand is a
        great way to figure out what the FSM actually looks
        like.
      </p>
      <ol>
        <li>A box for each of the possible states</li>
        <li>
          A line representing each transition, and which
          action causes it
        </li>
        <li>
          The FSM must have an <em>initial state</em>. FSMs
          may also have a <em>final state</em>.
        </li>
      </ol>
      <Centered>
        <img
          src={StateDiagram}
          style={{ maxWidth: '100%' }}
          alt="Diagram of the inline editor finite state machine"
        />
      </Centered>
    </>
  );
}
renderSlide(Slide_StateDiagrams);
