const LATENCY_MS = 450;

export const api = {
  get<T>(resource: T, ms: number = LATENCY_MS): Promise<T> {
    return new Promise((resolve) => setTimeout(() => resolve(resource), ms));
  },
};
