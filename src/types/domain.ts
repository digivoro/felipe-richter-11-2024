import type { BasePokemon } from "./common";

export interface Pokemon extends BasePokemon<_DomainStats, _DomainTypes> {
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

interface _DomainTypes extends String {}
