import React, { useState } from 'react';
import { InlineEditorFirstAttempt } from './slides/1.InlineEditorFirstAttempt';
import { InlineEditorWithAsyncSave } from './slides/2.InlineEditorWithAsyncSave';
import { ThisIsGettingOutOfHand } from './slides/3.ThisIsGettingOutOfHand';
import { TheReducerPattern } from './slides/4.TheReducerPattern';
import { ReducerInCode_Actions } from './slides/5.ReducerInCode_Actions';
import { ReducerInCode_SwitchStatement } from './slides/6.ReducerInCode_SwitchStatement';
import { AReducerNeedsARuntime } from './slides/7.AReducerNeedsARuntime';
import './index.css';
import { BasePlugin, PluginManager } from './talkUtils/PluginManager';
import { PluginSelectorDropdown } from './talkUtils/PluginSelectorDropdown';
import { renderSlide } from './talkUtils/renderSlide';
import { ReactUseReducer } from './slides/8.ReactUseReducer';
import { NotJustForRedux } from './slides/9.NotJustForRedux';

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
    name: '5. Reducer in code - Actions',
    element: <ReducerInCode_Actions />,
  },
  {
    name: '6. Reducer in code – Switch Statement',
    element: <ReducerInCode_SwitchStatement />,
  },
  {
    name: '7. A reducer needs a runtime',
    element: <AReducerNeedsARuntime />,
  },
  {
    name: '8. React useReducer',
    element: <ReactUseReducer />,
  },
  {
    name: '9. Not just for Redux',
    element: <NotJustForRedux />,
  }
);

export function SlideSelector() {
  const plugins = SlidePluginManager.getPluginsInOrder();
  const [slide, setSlide] = useState(plugins[plugins.length - 1]);

  return (
    <div>
      <PluginSelectorDropdown
        label=""
        pluginManager={SlidePluginManager}
        selectedPlugin={slide}
        onChange={setSlide}
      />
      <div className="module-container">{slide.element}</div>
    </div>
  );
}

renderSlide(<SlideSelector />);
