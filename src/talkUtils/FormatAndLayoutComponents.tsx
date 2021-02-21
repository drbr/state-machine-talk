import { ReactNode } from 'react';

/**
 * Inline monospace text.
 */
export function Mono(props: { children: string }) {
  return <span className="monospaced">{props.children}</span>;
}

export function MonoBlock(props: { children: ReactNode }) {
  return (
    <div className="monospaced mono-block">
      <pre>{props.children}</pre>
    </div>
  );
}

/**
 * Strikethrough text.
 */
export function Strike(props: { children: ReactNode }) {
  return <span className="strikethrough">{props.children}</span>;
}

export function VerticalSpacer() {
  return <div className="vertical-paragraph-spacer"></div>;
}

export function Centered(props: { children: ReactNode }) {
  return <div style={{ textAlign: 'center' }}>{props.children}</div>;
}

/**
 * React's `listStyleType` prop doesn't seem to be mapping to the DOM elements if I pass in an
 * arbitrary string to use as the bullet, so these little components each correspond to a class in
 * Talk.css that sets the particular emoji as the bullet.
 */
export const EmojiListItem = {
  Owl: (props: { children: ReactNode }) => (
    <li className="emoji-list-item-owl">{props.children}</li>
  ),
  Person: (props: { children: ReactNode }) => (
    <li className="emoji-list-item-person">{props.children}</li>
  ),
};
