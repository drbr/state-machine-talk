import { useReducer } from 'react';

export type BaseState = { name: string };
export type BaseAction = { type: string };

/**
 * An object describing a simple finite state machine, particularly how it transitions state in
 * response to various actions. Implement a state machine in a React component by passing an
 * instance of this object into `useStateMachineReducer`.
 *
 * ## Type parameters
 *
 * - `S` should be a
 *   {@link https://basarat.gitbook.io/typescript/type-system/discriminated-unions discriminated union type}
 *   describing all the possible states of the machine. Each type in the union should have a `name`,
 *   along with any other data needed to be stored in that state.
 *
 * - `A` should also be a discriminated union type describing all the possible actions that can be
 *   sent to the machine. Each type in the union should have a `type` (i.e. an action's name; but
 *   Redux calls them `type` so I'm following that convention), along with any other data that
 *   should be sent to the machine along with that action.
 *
 * ## Object structure
 *
 * The `StateMachineObject` is a two-tiered key-value mapping: the outer object should contain keys
 * corresponding to each of the possible state `name`s; every state name must be present.
 *
 * For each state name key, declare an inner object whose keys are the `type`s of the actions to
 * which the machine should respond while in that state. Not all actions need to be represented
 * here; while in a given state, the machine will ignore any actions whose `type` is not listed.
 *
 * The value for each state/action key pair should be a function that describes the next state for
 * that particular state and action:
 *
 *     (prevState, action) => nextState
 *
 * When an action is dispatched to the machine, the reducer instantiated by `useStateMachineReducer`
 * will use this mapping to return the correct next state for the current state and dispatched
 * action. The type definition of this object ensures that the `prevState` and `action` arguments in
 * each "next state" function is narrowed down to the corresponding member of the union types `S`
 * and `A`.
 */
export type StateMachineObject<S extends BaseState, A extends BaseAction> = {
  [StateName in S['name']]: {
    [ActionType in A['type']]?: (
      prevState: Readonly<{ name: StateName } & S>,
      action: Readonly<{ type: ActionType } & A>,
    ) => S;
  };
};

/**
 * Uses a reducer to manage state transitions according to the given state machine object. Returns
 * `[state, dispatch]` from the underlying `useReducer` call.
 *
 * This is essentially the simple "transition table lookup" pattern described in the article
 * {@link https://dev.to/davidkpiano/you-don-t-need-a-library-for-state-machines-k7h You don't need a library for state machines},
 * and as such, does not support defining side effects alongside the states. If you want to model a
 * state machine with side effects, consider a 3rd-party library such as
 * {@link https://www.npmjs.com/package/use-effect-reducer useEffectReducer} or
 * {@link https://xstate.js.org/docs/ XState}.
 *
 * @param stateMachine A {@link StateMachineObject} describing the states and actions.
 * @param initialState The initial state for the machine.
 */
export function useStateMachineReducer<
  StateName extends string,
  ActionType extends string,
  S extends { name: StateName },
  A extends { type: ActionType },
>(stateMachine: StateMachineObject<S, A>, initialState: S) {
  const reducer = (prev: Readonly<S>, action: Readonly<A>): Readonly<S> => {
    const transition = stateMachine[prev.name][action.type];
    return transition ? transition(prev, action) : prev;
  };
  return useReducer(reducer, initialState);
}
