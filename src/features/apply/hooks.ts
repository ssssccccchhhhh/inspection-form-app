import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { queries, commands } from './api';
import { applyQueryKeys } from './queryKeys';

export function useCenters() {
  return useQuery({ 
    queryKey: applyQueryKeys.centers(), 
    queryFn: queries.getCenters,
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
  });
}

export function useHolidays() {
  return useQuery({
    queryKey: applyQueryKeys.holidays(),
    queryFn: queries.getHolidays,
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
  });
}

export function useTimeSlots(centerId?: string, date?: string) {
  const enabled = !!centerId && !!date;
  return useQuery({
    queryKey: applyQueryKeys.timeSlot(centerId ?? '', date ?? ''),
    queryFn: () => queries.getSlots(centerId!, date!),
    enabled,
  });
}

export function useCreateApplication() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: commands.createApplication,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: applyQueryKeys.centers() });
    },
  });
}