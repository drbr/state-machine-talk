import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './Talk.css';

/*
 * Borrowed from:
 * https://github.com/hasparus/react-typescript-talk/blob/master/src/talkUtils/render.tsx
 */

function makeRoot() {
  const root = document.createElement('div');
  root.id = 'root';
  document.body.appendChild(root);
  return root;
}

function getRoot() {
  return document.getElementById('root') || makeRoot();
}

function getRenderedModuleName() {
  const stack = new Error().stack;
  if (stack) {
    const matched = (stack.match(/src\/(.+\.tsx)/g) || [])[2];
    return matched && matched.split('/').pop();
  }
  return undefined;
}

export function renderSlide(node: React.ReactNode) {
  const moduleName = getRenderedModuleName();
  ReactDOM.render(
    <div className="slide-styles-container">
      <div className="module-name">{moduleName || null}</div>
      {node}
    </div>,
    getRoot()
  );
}
