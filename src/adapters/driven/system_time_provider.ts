import { TimeProvider } from "../../core/ports/driven/time_provider";

export const SystemTimeProvider = (): TimeProvider => {
  return {
    now: () => new Date(),
  };
};
