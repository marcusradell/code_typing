import { TimeProvider } from "../../core/ports/driven/time_provider";

export const systemTimeProviderFactory = (): TimeProvider => {
  return {
    now: () => new Date(),
  };
};
