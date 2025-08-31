import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createApplication, fetchCenters, fetchSlots } from './api';

export const qk = {
  centers: ['centers'] as const,
  slots: (centerId: string, date: string) => ['slots', centerId, date] as const,
  holidays: ['holidays'] as const,
};

export function useCenters() {
  return useQuery({ queryKey: qk.centers, queryFn: fetchCenters });
}

export function useSlots(centerId?: string, date?: string) {
  const enabled = !!centerId && !!date;
  return useQuery({
    queryKey: qk.slots(centerId ?? '', date ?? ''),
    queryFn: () => fetchSlots(centerId!, date!),
    enabled,
  });
}

export function useHolidays() {
  return useQuery({
    queryKey: qk.holidays,
    queryFn: async () => {
      // Mock holiday data - in real app, this would come from an API
      return [
        { date: '2025-09-11', name: '추석 연휴' },
        { date: '2025-09-12', name: '추석' },
        { date: '2025-09-13', name: '추석 연휴' },
      ];
    },
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
  });
}

export function useCreateApplication() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createApplication,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: qk.centers });
    },
  });
}