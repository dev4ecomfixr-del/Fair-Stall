export const toggleSavedStall = (slug: string) =>
  ({ type: 'fair/toggleSavedStall', payload: slug }) as const;

