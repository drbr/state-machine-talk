import React, { useState } from 'react';
import './index.css';
import { Introduction } from './slides/0.Introduction';
import { Slide_InlineEditorFirstAttempt } from './slides/part-1-reducers/1.InlineEditorFirstAttempt';
import { Slide_SideEffects } from './slides/part-3-side-effects/10.SideEffects';
import { Slide_IsTheCodeGoodNow } from './slides/14a.IsTheCodeGoodNow';
import { Slide_IsTheCodeGoodNow_ProblemsWithState } from './slides/14b.IsTheCodeGoodNow_ProblemsWithState';
import { Slide_IsThisCodeGood_Question } from './slides/part-1-reducers/3a.IsThisCodeGood_Question';
import { Slide_IsThisCodeGood_Answer } from './slides/part-1-reducers/3b.IsThisCodeGood_Answer';
import { Slide_DefineTheActions } from './slides/part-1-reducers/4.DefineTheActions';
import { Slide_TheReducerPattern } from './slides/part-1-reducers/5.TheReducerPattern';
import { Slide_ReducerInCode_SwitchStatement } from './slides/part-1-reducers/6.ReducerInCode_SwitchStatement';
import { Slide_AReducerNeedsARuntime } from './slides/part-1-reducers/7.AReducerNeedsARuntime';
import { Slide_UseReducerHook } from './slides/part-1-reducers/8.useReducerHook';
import { Slide_Part1Conclusion } from './slides/part-1-reducers/9.Part1Conclusion';
import { Slide_SideEffects_MentalModel } from './slides/part-3-side-effects/11.SideEffects_MentalModel';
import { Slide_UseEffectReducer } from './slides/part-3-side-effects/12.useEffectReducer';
import { Slide_Part2Conclusion } from './slides/part-3-side-effects/13.Part2Conclusion';
import { Slide_InlineEditorWithAsyncSave } from './slides/part-3-side-effects/2.InlineEditorWithAsyncSave';
import { BasePlugin, PluginManager } from './talkUtils/PluginManager';
import { PluginSelectorDropdown } from './talkUtils/PluginSelectorDropdown';
import { renderSlide } from './talkUtils/renderSlide';

export interface SlidePlugin extends BasePlugin {
  element: React.ReactElement;
}

/* eslint-disable react/jsx-pascal-case */
export const SlidePluginManager = new PluginManager<SlidePlugin>(
  {
    name: '0. Introduction',
    element: <Introduction />,
  },
  {
    name: '1. Inline Editor – First Attempt',
    element: <Slide_InlineEditorFirstAttempt />,
  },
  {
    name: '2. Inline Editor with async save',
    element: <Slide_InlineEditorWithAsyncSave />,
  },
  {
    name: '3a. Is this code good?',
    element: <Slide_IsThisCodeGood_Question />,
  },
  {
    name: '3. Is this code good? Answer',
    element: <Slide_IsThisCodeGood_Answer />,
  },

  {
    name: '4. Define the Actions',
    element: <Slide_DefineTheActions />,
  },
  {
    name: '5. The Reducer Pattern',
    element: <Slide_TheReducerPattern />,
  },
  {
    name: '6. Reducer in code – Switch Statement',
    element: <Slide_ReducerInCode_SwitchStatement />,
  },
  {
    name: '7. A reducer needs a runtime',
    element: <Slide_AReducerNeedsARuntime />,
  },
  {
    name: '8. useReducer Hook',
    element: <Slide_UseReducerHook />,
  },
  {
    name: '9. Part 1 Conclusion',
    element: <Slide_Part1Conclusion />,
  },
  {
    name: '10. Side Effects',
    element: <Slide_SideEffects />,
  },
  {
    name: '11. Side Effects – Mental Model',
    element: <Slide_SideEffects_MentalModel />,
  },
  {
    name: '12. useEffectReducer',
    element: <Slide_UseEffectReducer />,
  },
  {
    name: '13. Part 2 Conclusion',
    element: <Slide_Part2Conclusion />,
  },
  {
    name: '14a. Is the code good now?',
    element: <Slide_IsTheCodeGoodNow />,
  },
  {
    name: '14b. Is the code good now? Problems with state',
    element: <Slide_IsTheCodeGoodNow_ProblemsWithState />,
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
