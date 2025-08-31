export type ExamCenter = { id: string; name: string };
export type Slot = { time: string; capacity: number; available: number };

export async function fetchCenters(): Promise<ExamCenter[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 'gwanghwamun', name: '광화문 검사센터' },
        { id: 'yeouido', name: '여의도 검사센터' }
      ]);
    }, 300);
  });
}

export async function fetchSlots(_centerId: string, _date: string): Promise<Slot[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const timeSlots = [
        { time: '10:00', capacity: 10, available: Math.floor(Math.random() * 8) + 2 },
        { time: '11:00', capacity: 10, available: Math.floor(Math.random() * 8) + 2 },
        { time: '12:00', capacity: 10, available: Math.floor(Math.random() * 8) + 2 },
        { time: '13:00', capacity: 10, available: Math.floor(Math.random() * 8) + 2 },
        { time: '14:00', capacity: 10, available: Math.floor(Math.random() * 8) + 2 },
        { time: '15:00', capacity: 10, available: Math.floor(Math.random() * 8) + 2 }
      ];
      resolve(timeSlots);
    }, 500);
  });
}

export async function createApplication(_payload: unknown): Promise<{ id: string }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const applicationId = `APP-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
      resolve({ id: applicationId });
    }, 1000);
  });
}