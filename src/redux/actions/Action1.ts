export const setActiveZone = (zone: string) =>
  ({ type: 'fair/setActiveZone', payload: zone }) as const;

