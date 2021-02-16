import React, { useState } from 'react';
import { InlineEditorFirstAttempt } from './examples/1.InlineEditorFirstAttempt';
import './index.css';
import { BasePlugin, PluginManager } from './talkUtils/PluginManager';
import { PluginSelectorDropdown } from './talkUtils/PluginSelectorDropdown';
import { renderSlide } from './talkUtils/renderSlide';

export interface SlidePlugin extends BasePlugin {
  element: React.ReactElement;
}

export const SlidePluginManager = new PluginManager<SlidePlugin>({
  name: '1. Simple editor',
  element: <InlineEditorFirstAttempt />,
});

export function SlideSelector() {
  const [slide, setSlide] = useState(SlidePluginManager.getPluginsInOrder()[0]);

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
