import { ChallangeRow } from "@prisma/client";

export interface ChallengeService {
  list: List;
  display: Display;
  add: Add;
  remove: Remove;
}

type List = () => Promise<ChallangeRow[]>;

type Display = (id: unknown) => Promise<ChallangeRow | null>;

type Add = (name: string) => Promise<void>;

type Remove = (id: unknown) => Promise<void>;
