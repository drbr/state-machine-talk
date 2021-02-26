import React from "react";
import {
  Mono,
  VerticalSpacer,
} from "../../talkUtils/FormatAndLayoutComponents";
import { renderSlide } from "../../talkUtils/renderSlide";

export function Slide_Part2Conclusion() {
  return (
    <>
      <h1>Part 2 Conclusion</h1>
      <p>State machines and reducers:</p>
      <ul>
        <li>
          are simple but powerful tools to describe stateful
          logic
        </li>
        <li>
          can be implemented without any special libraries
        </li>
        <li>
          can be used in local UI components; no need for
          external or global stores (e.g. Redux)
        </li>
        <li>
          keep state logic organized and fully decoupled
          from display logic
        </li>
        <li>
          improve understandability with named states and
          actions
        </li>
        <li>help reduce bugs</li>
        <li>are easily testable</li>
      </ul>

      <VerticalSpacer />

      <p>Next talk(s):</p>
      <ul>
        <li>Side Effects and async state management</li>
        <li>State Machine Libraries (XState and Robot)</li>
      </ul>
      <VerticalSpacer />

      <p>Further reading:</p>
      <ul>
        <li>
          <a href="https://github.com/drbr/state-machine-talk">
            This presentation
          </a>{" "}
          on GitHub
        </li>
        <li>
          <a href="https://kyleshevlin.com/how-to-use-usereducer-as-a-finite-state-machine">
            How to Use <Mono>useReducer</Mono> as a Finite
            State Machine
          </a>{" "}
          (same technique as in this talk)
        </li>
        <li>
          <a href="https://www.youtube.com/watch?v=RqTxtOXcv8Y">
            Simplifying Complex UIs with Finite Automata &
            Statecharts
          </a>{" "}
          (the talk I wish I gave)
        </li>
        <li>
          <a href="https://statecharts.github.io/what-is-a-state-machine.html">
            What is a state machine?
          </a>{" "}
          on statecharts.io
        </li>
        <li>
          <a href="https://www.freecodecamp.org/news/state-machines-basics-of-computer-science-d42855debc66/">
            Understanding State Machines
          </a>{" "}
          on FreeCodeCamp
        </li>
        <li>
          <a href="https://medium.com/@DavidKPiano/the-facetime-bug-and-the-dangers-of-implicit-state-machines-a5f0f61bdaa2">
            The FaceTime Bug and the Dangers of Implicit
            State Machines
          </a>
        </li>
        <li>
          <a href="https://twitter.com/jakubowskiandy/status/1359143458901004293/photo/1">
            Statechart describing a wristwatch
          </a>
        </li>
      </ul>
    </>
  );
}

renderSlide(Slide_Part2Conclusion);
