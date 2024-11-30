import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { pokeApi } from "../services/axios";
import type {
  ApiEvolutionChainResponse,
  ApiPokemonResponse,
  ApiResourceListResponse,
  ApiSpeciesResponse,
  Pokemon,
} from "@/types";
import { transformPokemon } from "@/utils/transform";

export const usePokemonStore = defineStore("pokemons", () => {
  const pokemons = ref<Pokemon[]>([]);
  const myTeam = ref<Pokemon[]>([]);
  const next = ref<string | null>(null);
  const prev = ref<string | null>(null);

  const isMyTeamFull = computed<Boolean>(() => myTeam.value.length >= 6);

  async function fetchPokemons(limit = 25, offset = 0) {
    try {
      const url = `pokemon?limit=${limit}&offset=${offset}`;
      const listResponse = await pokeApi<ApiResourceListResponse>(url);
      if (!listResponse) {
        throw new Error("Error fetching pokemon list");
      }

      const pokemonsPromises = listResponse.data.results.map(async (pokemon) =>
        fetchPokemon(pokemon.name),
      );
      const pokemonsResponses = await Promise.allSettled(pokemonsPromises);
      pokemons.value = pokemonsResponses
        .filter((pr) => pr.status === "fulfilled")
        .map((pr) => pr.value);

      return {
        ok: true,
      };
    } catch (e) {
      return {
        ok: false,
        error: e instanceof Error ? e.message : e,
      };
    }
  }

  async function fetchPokemon(id: number | string): Promise<Pokemon> {
    try {
      const pokemonResponse = await pokeApi<ApiPokemonResponse>(
        "pokemon/" + id,
      );
      if (!pokemonResponse) {
        throw new Error("Error fetching pokemon: " + id);
      }
      const species = await fetchSpecies(pokemonResponse.data.id);
      if (!species) {
        throw new Error("Error fetching species: " + id);
      }
      const evolutionChain = await fetchEvolutionChain(pokemonResponse.data.id);
      if (!evolutionChain) {
        throw new Error("Error fetching evolution chain: " + id);
      }

      const transformedPokemon = transformPokemon(
        pokemonResponse.data,
        species,
        evolutionChain,
      );

      return transformedPokemon;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async function fetchSpecies(id: number) {
    try {
      const speciesResponse = await pokeApi<ApiSpeciesResponse>(
        "pokemon-species/" + id,
      );
      if (!speciesResponse) {
        throw new Error("");
      }
      return speciesResponse.data;
    } catch (e) {
      throw e;
    }
  }

  async function fetchEvolutionChain(id: number) {
    try {
      const speciesResponse = await pokeApi<ApiEvolutionChainResponse>(
        "evolution-chain/" + id,
      );
      if (!speciesResponse) {
        throw new Error("");
      }
      return speciesResponse.data;
    } catch (e) {
      throw e;
    }
  }

  function addToMyTeam(pokemon: Pokemon) {
    if (isMyTeamFull.value) {
      return;
    }
    myTeam.value.push(pokemon);
  }

  function removeFromMyTeam(pokemon: Pokemon) {
    myTeam.value.splice(myTeam.value.indexOf(pokemon), 1);
  }

  return {
    // State & Getters
    pokemons,
    myTeam,
    isMyTeamFull,
    prev,
    next,
    // Actions
    fetchPokemons,
    addToMyTeam,
    removeFromMyTeam,
  };
});
