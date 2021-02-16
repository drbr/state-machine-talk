import React, { useState } from 'react';
import { SimpleEditor } from './examples/1.SimpleEditor';
import './index.css';
import { BasePlugin, PluginManager } from './talkUtils/PluginManager';
import { PluginSelectorDropdown } from './talkUtils/PluginSelectorDropdown';
import { renderSlide } from './talkUtils/render';

export interface SlidePlugin extends BasePlugin {
  element: React.ReactElement;
}

export const SlidePluginManager = new PluginManager<SlidePlugin>({
  name: '1. Simple editor',
  element: <SimpleEditor />,
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
