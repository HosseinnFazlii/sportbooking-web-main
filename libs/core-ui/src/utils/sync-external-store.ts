import { useSyncExternalStore } from "react"

/**
 * A simple SyncExternalStore for use with React’s `useSyncExternalStore`.
 * @public
 */
export class SyncExternalStore<T> {
  private _state: T
  private _subscribers: Set<(value: T) => void> = new Set()

  /**
   * The `subscribe` function to pass as the 1st argument to `useSyncExternalStore`.
   */
  public subscribe: (onStoreChange: (value: T) => void) => () => void

  /**
   * The `getSnapshot` function to pass as the 2nd argument to `useSyncExternalStore`.
   */
  public getSnapshot: () => T

  /**
   * Creates a new SyncExternalStore.
   * @param _state - The initial state of the store
   */
  public constructor(initialState: T) {
    this._state = initialState
    this.subscribe = (onStoreChange) => {
      this._subscribers.add(onStoreChange)
      return () => this._subscribers.delete(onStoreChange)
    }
    this.getSnapshot = () => this._state
  }

  /**
   * The current state of the store.
   * Assigning a new value to this property will cause all subscribers to be notified.
   * @remarks
   * Assigning the same value will not cause any subscribers to be notified.
   */
  public get state(): T {
    return this._state
  }
  public set state(value: T) {
    if (value !== this._state) {
      this._state = value
      this._subscribers.forEach((subscriber) => subscriber(value))
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createStore = <T,>(defaultValue: T, beforeSetValue?: (state: T, newValue: T) => Promise<T>, beforeUpdate?: (state: T, updateValue: any) => Promise<object>) => {
  const store: SyncExternalStore<T> = new SyncExternalStore(defaultValue);

  return () => {
    return {
      value: store.state,
      subscribe: store.subscribe,
      getSnapshot: store.getSnapshot,
      setIfDefault: (value: T) => { if (store.state === defaultValue) { store.state = value } return store.state },
      useValue: () => useSyncExternalStore(store.subscribe, store.getSnapshot),
      setValue: async (value: T) => store.state = (beforeSetValue ? await beforeSetValue(store.state, value) : value),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      updateValue: async (updateValue: any) =>
        store.state = Array.isArray(store.state) ?
          [...store.state, ...(beforeUpdate ? await beforeUpdate(store.state, updateValue) : updateValue)] :
          { ...store.state, ...(beforeUpdate ? await beforeUpdate(store.state, updateValue) : updateValue) }
    };
  }
}