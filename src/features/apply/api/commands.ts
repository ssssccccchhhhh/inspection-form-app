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