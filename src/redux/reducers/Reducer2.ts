type Action = { type: string; payload?: string };

export function savedStallsReducer(state: string[] = [], action: Action) {
  if (action.type !== 'fair/toggleSavedStall' || !action.payload) return state;
  return state.includes(action.payload)
    ? state.filter((slug) => slug !== action.payload)
    : [...state, action.payload];
}

