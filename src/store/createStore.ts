import { useEffect, useState } from 'react';

type Listener = () => void;

type SetterFn<TState> = (prevState: TState) => Partial<TState>;
type SetStateFn<TState> = (
  partialState: Partial<TState> | SetterFn<TState>,
) => void;

export function createStore<TState extends Record<string, any>>(
  createState: (setState: SetStateFn<TState>) => TState,
) {
  let state: TState;
  let listeners: Set<Listener>;

  function setState(partialState: Partial<TState> | SetterFn<TState>) {
    const newValue =
      typeof partialState === 'function' ? partialState(state) : partialState;

    state = {
      ...state,
      ...newValue,
    };

    notifyListeners();
  }

  function getState() {
    return state;
  }

  function subscribe(listener: Listener) {
    listeners.add(listener);

    return () => {
      listeners.delete(listener);
    };
  }

  function notifyListeners() {
    listeners.forEach((listener) => listener());
  }

  function useStore<TValue>(
    selector: (currentState: TState) => TValue,
  ): TValue {
    const [value, setValue] = useState(() => selector(state));
    useEffect(() => {
      const unsubscribe = subscribe(() => {
        const newValue = selector(state);
        if (value !== newValue) setValue(newValue);
      });
      return () => {
        unsubscribe();
      };
    }, [selector, value]);
    return value;
  }

  state = createState(setState);
  listeners = new Set<Listener>();

  return { getState, setState, subscribe, useStore };
}
