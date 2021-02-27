import React, { useState } from 'react';
import './index.css';
import { Slide_Introduction } from './slides/Introduction';
import { Slide_InlineEditorComponent } from './slides/part-1-reducers/1-1.InlineEditorComponent';
import { Slide_IsThisCodeGood } from './slides/part-1-reducers/1-2.IsThisCodeGood';
import { Slide_DefineTheActions } from './slides/part-1-reducers/1-3.DefineTheActions';
import { Slide_TheReducerPattern } from './slides/part-1-reducers/1-4.TheReducerPattern';
import { Slide_ReducerInCode_SwitchStatement } from './slides/part-1-reducers/1-5.ReducerInCode_SwitchStatement';
import { Slide_AReducerNeedsARuntime } from './slides/part-1-reducers/1-6.AReducerNeedsARuntime';
import { Slide_UseReducerHook } from './slides/part-1-reducers/1-7.useReducerHook';
import { Slide_Part1Conclusion } from './slides/part-1-reducers/1-8.Part1Conclusion';
import { Slide_IsTheCodeGoodNow } from './slides/part-2-state-machines/2-1.IsTheCodeGoodNow';
import { Slide_FiniteStateMachines } from './slides/part-2-state-machines/2-2.FiniteStateMachines';
import { Slide_StateDiagrams } from './slides/part-2-state-machines/2-3.StateDiagrams';
import { Slide_DefineTheStatesInCode } from './slides/part-2-state-machines/2-4.DefineTheStatesInCode';
import { Slide_StateMachineAsReducer } from './slides/part-2-state-machines/2-5.StateMachineAsReducer';
import { Slide_UseStateMachine } from './slides/part-2-state-machines/2-6.UseStateMachine';
import { Slide_Part2Conclusion } from './slides/part-2-state-machines/2-7.Part2Conclusion';
import {
  BasePlugin,
  PluginManager,
} from './talkUtils/PluginManager';
import { PluginSelectorDropdown } from './talkUtils/PluginSelectorDropdown';
import { renderSlide } from './talkUtils/renderSlide';

export interface SlidePlugin extends BasePlugin {
  element: React.ReactElement;
}

/* eslint-disable react/jsx-pascal-case */
export const SlidePluginManager = new PluginManager<SlidePlugin>(
  {
    name: 'Introduction',
    element: <Slide_Introduction />,
  },
  {
    name: '----------------------------',
    element: <></>,
  },

  {
    name: '1-1. Inline Editor Component',
    element: <Slide_InlineEditorComponent />,
  },
  {
    name: '1-2. Is this code good?',
    element: <Slide_IsThisCodeGood />,
  },

  {
    name: '1-3. Define the Actions',
    element: <Slide_DefineTheActions />,
  },
  {
    name: '1-4. The Reducer Pattern',
    element: <Slide_TheReducerPattern />,
  },
  {
    name: '1-5. Reducer in code – Switch Statement',
    element: <Slide_ReducerInCode_SwitchStatement />,
  },
  {
    name: '1-6. A reducer needs a runtime',
    element: <Slide_AReducerNeedsARuntime />,
  },
  {
    name: '1-7. useReducer Hook',
    element: <Slide_UseReducerHook />,
  },
  {
    name: '1-8. Part 1 Conclusion',
    element: <Slide_Part1Conclusion />,
  },

  {
    name: '-----------------------------',
    element: <></>,
  },

  {
    name: '2-1. Is the code good now?',
    element: <Slide_IsTheCodeGoodNow />,
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
  },
  {
    name: '2-5. State Machine as Reducer',
    element: <Slide_StateMachineAsReducer />,
  },
  {
    name: '2-6. Use State Machine',
    element: <Slide_UseStateMachine />,
  },
  {
    name: '2-7. Part 2 Conclusion',
    element: <Slide_Part2Conclusion />,
  }
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
      <div className="module-container">
        {slide.element}
      </div>
    </>
  );
}

renderSlide(SlideSelector);
