import type { BasePokemon } from "./common";

export interface ApiResourceListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: _ApiNamedResource[];
}

export interface ApiPokemonResponse extends BasePokemon<_ApiStats, _ApiTypes> {
  sprites: {
    front_default: string;
    other?: any;
  };
  cries: {
    latest: string;
  };
  stats: _ApiStats[];
  types: _ApiTypes[];
  species: _ApiNamedResource;
}

export interface ApiSpeciesResponse {
  flavor_text_entries: {
    flavor_text: string;
  }[];
  evolution_chain: string;
}

export interface ApiEvolutionChainResponse {
  chain: ApiChainLink;
}

export interface ApiChainLink {
  evolves_to: ApiChainLink[];
  species: _ApiNamedResource;
}

// Internal
interface _ApiResource {
  url: string;
}

interface _ApiNamedResource extends _ApiResource {
  name: string;
}

interface _ApiStats {
  base_stat: number;
  stat: {
    name: string;
  };
}

interface _ApiTypes {
  slot: number;
  type: {
    name: string;
  };
}
