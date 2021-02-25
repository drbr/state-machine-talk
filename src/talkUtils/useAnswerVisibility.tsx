import { useState } from 'react';

export function useAnswerVisibility() {
  const [answerVisible, setAnswerVisible] = useState(false);
  const toggleAnswer = () => setAnswerVisible((value) => !value);
  return [answerVisible, toggleAnswer] as const;
}

export function ToggleAnswerButton(props: {
  answerVisible: boolean;
  toggleAnswer: () => void;
}) {
  return props.answerVisible ? null : (
    <button onClick={props.toggleAnswer}>
      {props.answerVisible ? 'Hide Answer' : 'Show Answer'}
    </button>
  );
}
