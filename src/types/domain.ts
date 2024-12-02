import type { BasePokemon } from "./common";

export interface Pokemon extends BasePokemon<_DomainStats, string> {
  sprite: string;
  cry: string;
  evolutionChain: Partial<Pokemon>[];
  description: string;
}

// Internal
interface _DomainStats {
  name: string;
  base: number;
}
