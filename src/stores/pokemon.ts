import { defineStore } from "pinia";
import { ref } from "vue";
import { pokeApi } from "../services/axios"
import type { PokeApiResponse, Pokemon } from "@/types";

export const usePokemonStore = defineStore("pokemons", () => {
  const pokemons = ref<Pokemon[]>([]);

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

  return {
    pokemons,
    fetchPokemons,
  };
});
