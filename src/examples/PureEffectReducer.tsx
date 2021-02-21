import { EffectObject, EffectReducer, EventObject } from 'use-effect-reducer';

/**
 * A simple "Effect Reducer" that emits effect descriptions along with a given transition.
 * If we want to test a reducer in isolation, we could declare it like this and then wrap it
 * with the `exec` function expected by `useEffectReducer`.
 */
export type PureEffectReducer<TState, TAction, TEffect> = (
  prevState: TState,
  action: TAction
) => [TState, ReadonlyArray<TEffect>];

/**
 * Wraps a PureEffectReducer in the format expected by the useEffectReducer hook. This should be
 * used ONLY for one-time "fire-and-forget" effects; it does not handle long-running effects that
 * need to be cancelled or otherwise managed over multiple invocations of the reducer.
 *
 * @param pureReducer The PureEffectReducer to wrap
 */
export function makeEffectReducer<
  TState,
  TAction extends EventObject,
  TEffect extends EffectObject<TState, TAction>
>(
  pureReducer: PureEffectReducer<TState, TAction, TEffect>
): EffectReducer<TState, TAction, TEffect> {
  return function effectReducer(prevState, action, exec) {
    const [nextState, effects] = pureReducer(prevState, action);
    for (const effect of effects) {
      exec(effect);
    }
    return nextState;
  };
}
