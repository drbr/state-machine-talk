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
