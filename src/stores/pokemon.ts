import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { pokeApi } from "../services/axios";
import type {
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
        fetchPokemon(pokemon.url),
      );
      const pokemonsResponses = await Promise.allSettled(pokemonsPromises);
      pokemonsResponses
        .filter((pr) => pr.status === "fulfilled")
        .forEach((pr) => {
          if (!pr.value) {
            return;
          }
          pokemons.value.push(transformPokemon(pr.value));
        });

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

  async function fetchPokemon(url: string) {
    try {
      const pokemonResponse = await pokeApi<ApiPokemonResponse>(url);
      if (!pokemonResponse) {
        throw new Error("");
      }
      return pokemonResponse.data;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  async function fetchSpecies(url: string) {
    try {
      const speciesResponse = await pokeApi<ApiSpeciesResponse>(url);
      if (!speciesResponse) {
        throw new Error("");
      }
      return speciesResponse.data;
    } catch (e) {
      console.error(e);
      return null;
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
