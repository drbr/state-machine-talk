import React, { useState } from 'react';
import './index.css';
import { Slide_Introduction } from './slides/0.Introduction';
import { Slide_InlineEditorComponent } from './slides/part-1-reducers/1-1.InlineEditorComponent';
import { Slide_SideEffects } from './slides/part-3-side-effects/30.SideEffects';
import { Slide_IsTheCodeGoodNow } from './slides/part-2-state-machines/2-1a.IsTheCodeGoodNow';
import { Slide_IsTheCodeGoodNow_ProblemsWithState } from './slides/part-2-state-machines/2-1b.IsTheCodeGoodNow_ProblemsWithState';
import { Slide_IsThisCodeGood_Question } from './slides/part-1-reducers/1-2.IsThisCodeGood_Question';
import { Slide_IsThisCodeGood_Answer } from './slides/part-1-reducers/1-3.IsThisCodeGood_Answer';
import { Slide_DefineTheActions } from './slides/part-1-reducers/1-4.DefineTheActions';
import { Slide_TheReducerPattern } from './slides/part-1-reducers/1-5.TheReducerPattern';
import { Slide_ReducerInCode_SwitchStatement } from './slides/part-1-reducers/1-6.ReducerInCode_SwitchStatement';
import { Slide_AReducerNeedsARuntime } from './slides/part-1-reducers/1-7.AReducerNeedsARuntime';
import { Slide_UseReducerHook } from './slides/part-1-reducers/1-8.useReducerHook';
import { Slide_Part1Conclusion } from './slides/part-1-reducers/1-9.Part1Conclusion';
import { Slide_SideEffects_MentalModel } from './slides/part-3-side-effects/31.SideEffects_MentalModel';
import { Slide_UseEffectReducer } from './slides/part-3-side-effects/32.useEffectReducer';
import { Slide_Part2Conclusion } from './slides/part-3-side-effects/33.Part2Conclusion';
import { Slide_InlineEditorWithAsyncSave } from './slides/part-3-side-effects/2.InlineEditorWithAsyncSave';
import { BasePlugin, PluginManager } from './talkUtils/PluginManager';
import { PluginSelectorDropdown } from './talkUtils/PluginSelectorDropdown';
import { renderSlide } from './talkUtils/renderSlide';
import { Slide_FiniteStateMachines } from './slides/part-2-state-machines/2-2.FiniteStateMachines';
import { Slide_StateDiagrams } from './slides/part-2-state-machines/2-3.StateDiagrams';
import { Slide_DefineTheStatesInCode } from './slides/part-2-state-machines/2-4.DefineTheStatesInCode';

export interface SlidePlugin extends BasePlugin {
  element: React.ReactElement;
}

/* eslint-disable react/jsx-pascal-case */
export const SlidePluginManager = new PluginManager<SlidePlugin>(
  {
    name: '0. Introduction',
    element: <Slide_Introduction />,
  },
  {
    name: '1-1. Inline Editor Component',
    element: <Slide_InlineEditorComponent />,
  },
  {
    name: '1-2. Is this code good?',
    element: <Slide_IsThisCodeGood_Question />,
  },
  {
    name: '1-3. Is this code good? Answer',
    element: <Slide_IsThisCodeGood_Answer />,
  },

  {
    name: '1-4. Define the Actions',
    element: <Slide_DefineTheActions />,
  },
  {
    name: '1-5. The Reducer Pattern',
    element: <Slide_TheReducerPattern />,
  },
  {
    name: '1-6. Reducer in code – Switch Statement',
    element: <Slide_ReducerInCode_SwitchStatement />,
  },
  {
    name: '1-7. A reducer needs a runtime',
    element: <Slide_AReducerNeedsARuntime />,
  },
  {
    name: '1-8. useReducer Hook',
    element: <Slide_UseReducerHook />,
  },
  {
    name: '1-9. Part 1 Conclusion',
    element: <Slide_Part1Conclusion />,
  },

  {
    name: '2-1a. Is the code good now?',
    element: <Slide_IsTheCodeGoodNow />,
  },
  {
    name: '2-1b. Is the code good now? Problems with state',
    element: <Slide_IsTheCodeGoodNow_ProblemsWithState />,
  },
  {
    name: '2-2. Finite State Machines',
    element: <Slide_FiniteStateMachines />,
  },
  {
    name: '2-3. State Diagrams',
    element: <Slide_StateDiagrams />,
  },
  {
    name: '2-4. Define the states in code',
    element: <Slide_DefineTheStatesInCode />,
  }

  // {
  //   name: '[Part 3] 30. Side Effects',
  //   element: <Slide_SideEffects />,
  // },
  // {
  //   name: '[Part 3] 31. Side Effects – Mental Model',
  //   element: <Slide_SideEffects_MentalModel />,
  // },
  // {
  //   name: '[Part 3] 32. useEffectReducer',
  //   element: <Slide_UseEffectReducer />,
  // },
  // {
  //   name: '[Part 3] 33. Part 2 Conclusion',
  //   element: <Slide_Part2Conclusion />,
  // },

  // {
  //   name: 'Part 1: 2. Inline Editor with async save',
  //   element: <Slide_InlineEditorWithAsyncSave />,
  // }
);

export function SlideSelector() {
  const plugins = SlidePluginManager.getPluginsInOrder();
  const [slide, setSlide] = useState(plugins[0]);

  return (
    <>
      <PluginSelectorDropdown
        label=""
        pluginManager={SlidePluginManager}
        selectedPlugin={slide}
        onChange={setSlide}
      />
      <div className="module-container">{slide.element}</div>
    </>
  );
}

renderSlide(<SlideSelector />);
