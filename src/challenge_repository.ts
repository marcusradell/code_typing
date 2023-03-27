export interface ChallengeRepository {
  add(data: {
    id: string;
    name: string;
    content: string;
    level: number;
  }): Promise<void>;
}
