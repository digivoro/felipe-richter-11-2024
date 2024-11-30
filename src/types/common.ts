export interface BasePokemon<GStats, GTypes> {
  id: number;
  name: string;
  height: number;
  weight: number;
  stats: GStats[];
  types: GTypes[];
}