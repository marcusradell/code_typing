import { TimeProvider } from "../core/time_provider";

export const SystemTimeProvider = (): TimeProvider => {
  return {
    now: () => new Date(),
  };
};
