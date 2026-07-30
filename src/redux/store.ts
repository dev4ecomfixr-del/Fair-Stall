import { activeZoneReducer } from './reducers/Reducer1';
import { savedStallsReducer } from './reducers/Reducer2';

export type FairState = {
  activeZone: string;
  savedStalls: string[];
};

let state: FairState = {
  activeZone: activeZoneReducer(undefined, { type: '@@init' }),
  savedStalls: savedStallsReducer(undefined, { type: '@@init' }),
};

const listeners = new Set<() => void>();

export const store = {
  getState: () => state,
  dispatch: (action: { type: string; payload?: string }) => {
    state = {
      activeZone: activeZoneReducer(state.activeZone, action),
      savedStalls: savedStallsReducer(state.savedStalls, action),
    };
    listeners.forEach((listener) => listener());
  },
  subscribe: (listener: () => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
};

