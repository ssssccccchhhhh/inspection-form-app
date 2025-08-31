import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createApplication, fetchCenters, fetchSlots } from './api';

export const qk = {
  centers: ['centers'] as const,
  slots: (centerId: string, date: string) => ['slots', centerId, date] as const,
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

export function useCreateApplication() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createApplication,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: qk.centers });
    },
  });
}