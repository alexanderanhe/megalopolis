export type HoyNoCirculaData = {
  date: string;
  scope: string[];
  restrictionStart: string;
  restrictionEnd: string;
  restrictions: {
    color: string;
    plateEndings: number[];
    holograms: string[];
  };
  exemptions: string[];
};

export default abstract class HoyNoCirculaProvider {
  abstract getToday(): Promise<HoyNoCirculaData>;
}
