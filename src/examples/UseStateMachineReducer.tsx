import { useMemo, useReducer } from 'react';

/**
 * Type definition for a state machine, which enforces that the keys
 * match the state names and actions. All states must be present, but
 * a state need not respond to all actions.
 */
export type StateMachineObject<
  S extends { name: string },
  A extends { type: string }
> = {
  [StateName in S['name']]: {
    [ActionType in A['type']]?: (
      prevState: { name: StateName } & S,
      action: { type: ActionType } & A
    ) => S;
  };
};

/**
 * Returns a reducer function that uses the given state machine
 * @param stateMachine
 */
function makeReducer<
  StateName extends string,
  ActionType extends string,
  S extends { name: StateName },
  A extends { type: ActionType }
>(stateMachine: StateMachineObject<S, A>) {
  return (prev: S, action: A): S => {
    const transition = stateMachine[prev.name][action.type];
    return transition ? transition(prev, action) : prev;
  };
}

/**
 * Uses a state machine to manage state, as one would use a reducer.
 * @param stateMachine
 * @param initialState
 */
export function useStateMachineReducer<
  StateName extends string,
  ActionType extends string,
  S extends { name: StateName },
  A extends { type: ActionType }
>(stateMachine: StateMachineObject<S, A>, initialState: S) {
  const reducer = useMemo(() => makeReducer(stateMachine), [stateMachine]);
  return useReducer(reducer, initialState);
}
