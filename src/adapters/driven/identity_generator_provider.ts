import { v4 } from "uuid";
import { IdentityGenerator } from "../../core/ports/driven/identity_generator";

export const IdentityGeneratorProvider = (): IdentityGenerator => {
  return {
    v4: () => {
      return v4();
    },
  };
};
