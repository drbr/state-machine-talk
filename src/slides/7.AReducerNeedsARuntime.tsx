import { ReactComponent as ReducerRuntimeDiagram } from '../images/ReducerRuntimeDiagram.svg';
import { Centered, Strike } from '../talkUtils/FormattedText';

export function AReducerNeedsARuntime() {
  return (
    <>
      <h1>A reducer needs a runtime</h1>
      <p>
        To use a reducer, we need to pair it with a runtime framework (or
        "driver"), which will use the information from the reducer to manage
        actual app/component state.
      </p>
      <Centered>
        <ReducerRuntimeDiagram title="Reducer runtime sequence diagram" />
      </Centered>
      <p>
        The reducer implements the business logic, and the framework/driver
        interprets that logic in the context of the application.
      </p>
      <p>
        <Strike>Many popular technologies</Strike> Our entire computing world is
        based on this general concept:
      </p>
      <ul>
        <li>
          <strong>Redux</strong> (we write reducers, the framework uses them to
          update the state tree and pass the result to components)
        </li>
        <li>
          <strong>Redux Saga</strong> (we write saga generators that describe
          each step in a workflow, the saga middleware executes that workflow)
        </li>
        <li>
          <strong>async/await</strong> (async function compiles to a switch
          statement that is driven by an "awaiter")
        </li>
        <li>
          <strong>React components</strong> (We write components that tell React
          what should be rendered for any given props/state)
        </li>
        <li>
          <strong>JavaScript interpreter, microprocessors…</strong>
        </li>
      </ul>
    </>
  );
}

/** Diagram can be edited using sequencediagram.org */
const rawSequenceDiagram = `
participant UI
participant "Framework\n(stores state)" as Framework
participant Reducer

UI->Framework:Action
Framework->Reducer:Current state,\nAction
Reducer->Framework:Next state
Framework->UI:Render
`;
