import React from 'react';
import { ReactComponent as ReducerRuntimeDiagram } from '../images/ReducerRuntimeDiagram.svg';
import { Centered } from '../talkUtils/FormatAndLayoutComponents';

export function AReducerNeedsARuntime() {
  return (
    <>
      <h1>A reducer needs a runtime</h1>
      <p>
        By itself, a reducer does nothing. To use it, we need to pair it with a
        runtime framework, which will use the information from the reducer to
        manage actual app/component state.
      </p>
      <Centered>
        <ReducerRuntimeDiagram title="Reducer runtime sequence diagram" />
      </Centered>
      <p>
        Once we have this adapter for our chosen UI framework, we can use it
        with any reducer!
      </p>
    </>
  );
}

/** Diagram was generated from this code using sequencediagram.org */
const rawSequenceDiagram = `
participant UI
participant "Framework\n(stores state)" as Framework
participant Reducer

UI->Framework:Action
Framework->Reducer:Current state,\nAction
Reducer->Framework:Next state
Framework->UI:Render
`;
