import { TimeProvider } from "../../hexagon/ports/driven/time_provider";

export const systemTimeProviderFactory = (): TimeProvider => {
  return {
    getTime: () => new Date(),
  };
};
