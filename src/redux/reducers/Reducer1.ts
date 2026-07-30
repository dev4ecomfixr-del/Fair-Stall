type Action = { type: string; payload?: string };

export function activeZoneReducer(state = 'Mega brands', action: Action) {
  return action.type === 'fair/setActiveZone' && action.payload
    ? action.payload
    : state;
}

