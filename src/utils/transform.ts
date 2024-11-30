import type { ApiPokemonResponse, Pokemon } from "@/types";

export function transformPokemon(apiPokemon: ApiPokemonResponse): Pokemon {
  const { id, height, name, weight, sprites, stats } = apiPokemon;
  return {
    id,
    height,
    name,
    weight,
    stats: stats.map((s) => {
      return { base: s.base_stat, name: s.stat.name };
    }),
    sprite: sprites.front_default,
    cry: "",
    description: "",
    evolutionChain: [],
    types: [],
  };
}
