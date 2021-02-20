import { Mono, VerticalSpacer } from '../talkUtils/FormattedText';

export function SideEffects() {
  return (
    <>
      <h1>Side Effects</h1>
      <p>
        If this pattern is to be useful for real-world components, we need to
        account for <em>side effects</em>.
      </p>
      <p>
        <Mono>useEffect</Mono> works well when we want to{' '}
        <a href="https://overreacted.io/a-complete-guide-to-useeffect/">
          synchronize side effects with the state
        </a>
        , but less well when we want to synchronize effects with particular
        <em>transitions</em>
      </p>
      <ul>
        <li>Example: emit telemetry when we click Cancel vs. Save.</li>
      </ul>
      <VerticalSpacer />
      <p>
        Could implement the framework ourselves, but we can use the third-party{' '}
        <Mono>useEffectReducer</Mono> hook.
      </p>
    </>
  );
}
