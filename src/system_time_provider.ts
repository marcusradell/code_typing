import { TimeProvider } from "./time_provider";

export const SystemTimeProvider = (): TimeProvider => {
  return {
    now: () => new Date(),
  };
};
