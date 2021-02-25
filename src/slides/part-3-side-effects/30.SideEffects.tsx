import { Mono } from '../../talkUtils/FormatAndLayoutComponents';

export function Slide_SideEffects() {
  return (
    <>
      <h1>Side Effects</h1>
      <p>
        For this pattern to be useful in real-world components, we also need to
        handle side effects.
      </p>
      <p>
        A <em>side effect</em> is something initiated by the component that
        affects something external to the component:
      </p>
      <ul>
        <li>"Fire-and-forget" effects (e.g. telemetry, set browser title)</li>
        <li>Async/promises (e.g. fetch data from an API)</li>
        <li>
          Long-running actions (e.g. start a timer, setInterval, subscribe)
        </li>
      </ul>
      <p>
        In React, <Mono>useEffect</Mono> works well when we want to{' '}
        <a href="https://overreacted.io/a-complete-guide-to-useeffect/">
          synchronize side effects with state values
        </a>
        , but less well when we want to synchronize effects with particular
        <em>transitions</em>.
      </p>
      <ul>
        <li>
          <em>Sync effect to state value:</em> fetch item metadata; when{' '}
          <Mono>props.itemId</Mono> changes, fetch again
        </li>
        <li>
          <em>Sync effect to transition/action:</em> emit telemetry when we
          click Cancel vs. Save.
        </li>
      </ul>
    </>
  );
}