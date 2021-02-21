import React, { useState } from 'react';
import './index.css';
import { Introduction } from './slides/0.Introduction';
import { InlineEditorFirstAttempt } from './slides/1.InlineEditorFirstAttempt';
import { SideEffects } from './slides/10.SideEffects';
import { SideEffects_ExtendTheReducerFormula } from './slides/11.SideEffects_ExtendTheReducerFormula';
import { UseEffectReducerSlide } from './slides/12.useEffectReducer';
import { Testing } from './slides/13.Testing';
import { Part2Conclusion } from './slides/14.Part2Conclusion';
import { InlineEditorWithAsyncSave } from './slides/2.InlineEditorWithAsyncSave';
import { ThisIsGettingOutOfHand as IsThisCodeGood } from './slides/3.IsThisCodeGood';
import { TheReducerPattern } from './slides/4.TheReducerPattern';
import { ReducerInCode_Actions } from './slides/5.ReducerInCode_Actions';
import { ReducerInCode_SwitchStatement } from './slides/6.ReducerInCode_SwitchStatement';
import { AReducerNeedsARuntime } from './slides/7.AReducerNeedsARuntime';
import { UseReducerHook } from './slides/8.useReducerHook';
import { Part1Conclusion } from './slides/9.Part1Conclusion';
import { BasePlugin, PluginManager } from './talkUtils/PluginManager';
import { PluginSelectorDropdown } from './talkUtils/PluginSelectorDropdown';
import { renderSlide } from './talkUtils/renderSlide';

export interface SlidePlugin extends BasePlugin {
  element: React.ReactElement;
}

export const SlidePluginManager = new PluginManager<SlidePlugin>(
  {
    name: '0. Introduction',
    element: <Introduction />,
  },
  {
    name: '1. Inline Editor – First Attempt',
    element: <InlineEditorFirstAttempt />,
  },
  {
    name: '2. Inline Editor with async save',
    element: <InlineEditorWithAsyncSave />,
  },
  {
    name: '3. Is this code good?',
    element: <IsThisCodeGood />,
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
    name: '8. useReducer Hook',
    element: <UseReducerHook />,
  },
  {
    name: '9. Part 1 Conclusion',
    element: <Part1Conclusion />,
  },
  {
    name: '10. Side Effects',
    element: <SideEffects />,
  },
  {
    name: '11. Side Effects – Extend the reducer formula',
    element: <SideEffects_ExtendTheReducerFormula />,
  },
  {
    name: '12. useEffectReducer',
    element: <UseEffectReducerSlide />,
  },
  {
    name: '13. Testing',
    element: <Testing />,
  },
  {
    name: '14. Part 2 Conclusion',
    element: <Part2Conclusion />,
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
