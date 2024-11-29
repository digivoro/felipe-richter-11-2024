export interface PokeApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: NamedApiResource[];
}

export interface NamedApiResource {
  name: string;
  url: string;
}

export interface Pokemon {
  id: number;
  name: string;
  base_experience: string;
  height: number;
  is_default: boolean;
  sprites: PokemonSprites;
}

export interface PokemonSprites {
  front_default: string;
  other?: any;
}