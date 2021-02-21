import {
  Centered,
  VerticalSpacer,
} from '../talkUtils/FormatAndLayoutComponents';

export function Introduction() {
  return (
    <>
      <Centered>
        <h1>Reducers and State Machines in Local UI</h1>
        <h2>Andrew Brandon</h2>
        <VerticalSpacer />
        <p>A pattern to build and organize logic for stateful components</p>
      </Centered>
      <VerticalSpacer />
      <p>This talk has three sections:</p>
      <ol>
        <li>Reducers and Actions</li>
        <li>Side Effects</li>
        <li>State Machines</li>
      </ol>
      <p>
        Yes, the slides have a lot of words. This is an a11y feature. Watch or
        listen; your choice!
      </p>
    </>
  );
}
