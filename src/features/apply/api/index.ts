// Types
export type ExamCenter = { id: string; name: string };
export type TimeSlot = { time: string; capacity: number; available: number };
export type Holiday = { date: string; name: string };

// Queries (Read Operations)
export const queries = {
  getCenters: async (): Promise<ExamCenter[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 'gwanghwamun', name: '광화문 검사센터' },
          { id: 'yeouido', name: '여의도 검사센터' }
        ]);
      }, 300);
    });
  },

  getSlots: async (_centerId: string, _date: string): Promise<TimeSlot[]> => {
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
  },

  getHolidays: async (): Promise<Holiday[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { date: '2025-09-11', name: '추석 연휴' },
          { date: '2025-09-12', name: '추석' },
          { date: '2025-09-13', name: '추석 연휴' },
        ]);
      }, 200);
    });
  }
};

// Commands (Write Operations)
export const commands = {
  createApplication: async (_payload: unknown): Promise<{ id: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const applicationId = `APP-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
        resolve({ id: applicationId });
      }, 1000);
    });
  }
};