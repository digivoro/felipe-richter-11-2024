import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { pokeApi } from "../services/axios"
import type { PokeApiResponse, Pokemon } from "@/types";

export const usePokemonStore = defineStore("pokemons", () => {
  const pokemons = ref<Pokemon[]>([]);
  const myTeam = ref<Pokemon[]>([]);
  
  const isMyTeamFull = computed<Boolean>(() => myTeam.value.length >= 6);

  async function fetchPokemons(limit: number = 25, offset: number = 0) {
    try {
      const listResponse = await pokeApi<PokeApiResponse>(
        `pokemon?limit=${limit}&offset=${offset}`
      );
      if (!listResponse) {
        throw new Error("Error fetching pokemon list");
      }

      const pokemonsPromises = listResponse.data.results.map(async (pokemon) =>
        fetchPokemon(pokemon.url),
      );
      const pokemonsResponses = await Promise.allSettled(pokemonsPromises);
      const pokemonsData = pokemonsResponses
        .filter((pr) => pr.status === "fulfilled")
        .map((pr) => pr.value);
      pokemons.value = pokemonsData;

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
      const pokemonResponse = await fetch(url, { method: "GET" });
      if (!pokemonResponse.ok) {
        throw new Error("");
      }
      return await pokemonResponse.json();
    } catch (e) {
      console.error(`Error fetching ${url}:`);
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
    // Actions
    fetchPokemons,
    addToMyTeam,
    removeFromMyTeam,
  };
});
