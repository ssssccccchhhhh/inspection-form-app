// Re-export types
export type * from './types';

// Re-export queries and commands
export { queries } from './queries';
export { commands } from './commands';

// Legacy function exports for backward compatibility
import { queries } from './queries';
import { commands } from './commands';

export const fetchCenters = queries.getCenters;
export const fetchSlots = queries.getSlots;
export const fetchHolidays = queries.getHolidays;
export const createApplication = commands.createApplication;