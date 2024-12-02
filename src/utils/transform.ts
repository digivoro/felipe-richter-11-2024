import type {
  ApiChainLink,
  ApiEvolutionChainResponse,
  ApiPokemonResponse,
  ApiSpeciesResponse,
  Pokemon,
} from "@/types";
import { cleanDescription } from "./helpers";

export function transformPokemon(
  apiPokemon: ApiPokemonResponse,
  apiSpecies: ApiSpeciesResponse,
  apiEvolutionChain: ApiEvolutionChainResponse,
): Pokemon {
  const { id, height, name, weight, sprites, stats, cries, types } = apiPokemon;
  return {
    id,
    height,
    name,
    weight,
    stats: stats.map((s) => ({ base: s.base_stat, name: s.stat.name })),
    sprite: sprites.front_default,
    cry: cries.latest,
    description: cleanDescription(
      apiSpecies.flavor_text_entries[0].flavor_text,
    ),
    types: types.map((t) => t.type.name),
    evolutionChain: transformEvolutionChain(apiEvolutionChain.chain),
  };
}

function transformEvolutionChain(chainLink: ApiChainLink): Partial<Pokemon>[] {
  const evolutionChain: Partial<Pokemon>[] = [];

  function traverseChain(link: ApiChainLink) {
    evolutionChain.push({
      name: link.species.name,
    });

    if (link.evolves_to && link.evolves_to.length > 0) {
      link.evolves_to.forEach((evolvedFrom) => {
        traverseChain(evolvedFrom);
      });
    }
  }
  traverseChain(chainLink);

  return evolutionChain;
}
