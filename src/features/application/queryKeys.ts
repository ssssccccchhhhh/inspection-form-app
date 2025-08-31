export const applyQueryKeys = {
  all: ['apply'] as const,
  
  // Centers
  centers: () => [...applyQueryKeys.all, 'centers'] as const,
  
  // Time Slots
  timeSlots: () => [...applyQueryKeys.all, 'timeSlots'] as const,
  timeSlot: (centerId: string, date: string) => [...applyQueryKeys.timeSlots(), centerId, date] as const,
  
  // Holidays
  holidays: () => [...applyQueryKeys.all, 'holidays'] as const,
} as const;