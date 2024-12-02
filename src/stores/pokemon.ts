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
  // Pokemon data
  const pokemons = ref<Pokemon[]>([]);
  const fetchedPokemons = ref<Map<string, Pokemon>>(new Map());

  async function fetchPokemons(url: string = "pokemon?limit=25&offset=0") {
    try {
      const listResponse = await pokeApi<ApiResourceListResponse>(url);
      if (!listResponse) {
        throw new Error("Error fetching pokemon list");
      }

      function isValidPokemon(pokemonUrl: string) {
        const pokemonId = pokemonUrl
          .split("/")
          .filter((segment) => segment !== "" && !isNaN(Number(segment)))[0];
        return +pokemonId <= MAX_POKEMON;
      }

      const unfetchedPokemonPromises = listResponse.data.results
        .filter((pokemon) => !fetchedPokemons.value.has(pokemon.name))
        .filter((pokemon) => isValidPokemon(pokemon.url))
        .map(async (pokemon) => fetchPokemon(pokemon.url));

      const pokemonsResponses = await Promise.all(unfetchedPokemonPromises);

      if (!pokemonsResponses) {
        throw new Error("Failed to fetch pokemon batch: " + url);
      }

      pokemonsResponses.forEach((pokemon) => {
        pokemons.value.push(pokemon);
        fetchedPokemons.value.set(pokemon.name, pokemon);
        fetchedPokemons.value.set(pokemon.id.toString(), pokemon);
      });

      next.value = listResponse.data.next;
      prev.value = listResponse.data.previous;
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
  async function fetchPokemon(url: string): Promise<Pokemon> {
    // console.log(url);
    try {
      const pokemonResponse = await pokeApi<ApiPokemonResponse>(url);
      if (!pokemonResponse) {
        throw new Error("Error fetching pokemon: " + url);
      }

      const species = await fetchSpecies(pokemonResponse.data.species.url);
      if (!species) {
        throw new Error(
          "Error fetching species: " + pokemonResponse.data.species.url,
        );
      }

      const evolutionChain = await fetchEvolutionChain(species.evolution_chain);
      if (!evolutionChain) {
        throw new Error(
          "Error fetching evolution chain: " + species.evolution_chain,
        );
      }

      const transformedPokemon = transformPokemon(
        pokemonResponse.data,
        species,
        evolutionChain,
      );
      if (url === "https://pokeapi.co/api/v2/pokemon/151/") {
        console.log(transformedPokemon);
      }

      return transformedPokemon;
    } catch (e) {
      console.error(e);
      throw e;
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
      throw e;
    }
  }
  async function fetchEvolutionChain(url: string) {
    try {
      const evolutionResponse = await pokeApi<ApiEvolutionChainResponse>(url);
      if (!evolutionResponse) {
        throw new Error("");
      }
      return evolutionResponse.data;
    } catch (e) {
      throw e;
    }
  }

  // My team
  const myTeam = ref<Pokemon[]>([]);
  const isMyTeamFull = computed<Boolean>(() => myTeam.value.length >= 6);

  function addToMyTeam(pokemon: Pokemon) {
    if (isMyTeamFull.value) {
      return;
    }
    myTeam.value.push(pokemon);
  }
  function removeFromMyTeam(pokemon: Pokemon) {
    myTeam.value.splice(myTeam.value.indexOf(pokemon), 1);
  }

  // Pagination
  const PAGE_SIZE = +import.meta.env.VITE_PAGE_SIZE;
  const MAX_POKEMON = +import.meta.env.VITE_MAX_POKEMON;

  const next = ref<string | null>(null);
  const prev = ref<string | null>(null);
  const lastPage = ref(Math.ceil(MAX_POKEMON / PAGE_SIZE));
  const currentPage = ref(1);

  const pageRange = computed(() => ({
    start: (currentPage.value - 1) * PAGE_SIZE,
    end: currentPage.value * PAGE_SIZE,
  }));

  async function changePage(direction: "prev" | "next") {
    if (
      direction === "next" &&
      next.value &&
      currentPage.value < lastPage.value
    ) {
      await fetchPokemons(next.value);
      currentPage.value += 1;
    } else if (direction === "prev" && prev.value && currentPage.value > 1) {
      await fetchPokemons(prev.value);
      currentPage.value -= 1;
    }
  }

  return {
    // State & Getters
    pokemons,
    myTeam,
    isMyTeamFull,
    prev,
    next,
    currentPage,
    lastPage,
    pageRange,
    // Actions
    fetchPokemons,
    addToMyTeam,
    removeFromMyTeam,
    changePage,
  };
});
