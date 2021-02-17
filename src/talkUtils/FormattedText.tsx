import { ReactNode } from 'react';

/**
 * Inline monospace text.
 */
export function Mono(props: { children: string }) {
  return <span className="monospaced">{props.children}</span>;
}

/**
 * Strikethrough text.
 */
export function Strike(props: { children: ReactNode }) {
  return <span className="strikethrough">{props.children}</span>;
}

export function EmptyParagraph() {
  return <p>{'\u200b'}</p>;
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
