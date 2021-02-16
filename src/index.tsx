import React, { useState } from 'react';
import { InlineEditorFirstAttempt } from './examples/1.InlineEditorFirstAttempt';
import { InlineEditorWithAsyncSave } from './examples/2.InlineEditorWithAsyncSave';
import { ThisIsGettingOutOfHand } from './examples/3.ThisIsGettingOutOfHand';
import { TheReducerPattern } from './examples/4.TheReducerPattern';
import { ReducerInCode } from './examples/5.ReducerInCode';
import './index.css';
import { BasePlugin, PluginManager } from './talkUtils/PluginManager';
import { PluginSelectorDropdown } from './talkUtils/PluginSelectorDropdown';
import { renderSlide } from './talkUtils/renderSlide';

export interface SlidePlugin extends BasePlugin {
  element: React.ReactElement;
}

export const SlidePluginManager = new PluginManager<SlidePlugin>(
  {
    name: '1. Inline Editor – First Attempt',
    element: <InlineEditorFirstAttempt />,
  },
  {
    name: '2. Inline Editor with async save',
    element: <InlineEditorWithAsyncSave />,
  },
  {
    name: '3. This is getting out of hand.',
    element: <ThisIsGettingOutOfHand />,
  },
  {
    name: '4. The Reducer Pattern',
    element: <TheReducerPattern />,
  },
  {
    name: '5. Reducer in code',
    element: <ReducerInCode />,
  }
);

export function SlideSelector() {
  const plugins = SlidePluginManager.getPluginsInOrder();
  const [slide, setSlide] = useState(plugins[plugins.length - 1]);

  return (
    <div className="slide-styles-container">
      <PluginSelectorDropdown
        label="Select Slide: "
        pluginManager={SlidePluginManager}
        selectedPlugin={slide}
        onChange={setSlide}
      />
      <div className="module-container">{slide.element}</div>
    </div>
  );
}

renderSlide(<SlideSelector />);
